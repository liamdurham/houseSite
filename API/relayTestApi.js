var five = require("johnny-five");
var EtherPortClient = require("etherport-client").EtherPortClient;
const express = require('express');
const cors = require('cors');
var Gpio = require('onoff').Gpio;

const app = express();
const port = 3000;
const GARAGE_RELAY_PIN = 0;
const GARAGE_DOOR_PIN = 4;
var alreadyProcessingGarageDoor = 0;
var lolTest;
var frontDoorStatus;

var garageBoard, garageDoorSwitch, garageDoorBool;


var pdfFiller = require('pdffiller');


const {
    networkInterfaces
} = require('os');

const nets = networkInterfaces();
console.log(nets);

app.listen(port, () => {
    console.log(`API Ready at ` + port);
    connectGarageBoard();
});
app.use(cors());

app.get('/open', (req, res) => {
    console.log('garage door called');
    if (alreadyProcessingGarageDoor == 0) {
        alreadyProcessingGarageDoor = 1;
        openGarageDoorRelay(req, res);
    } else {
        console.log('stop spamming plz');
        res.send(JSON.stringify({
            message: 'stop spamming plz!'
        }));
    }
});

function connectGarageBoard() {
    garageBoard = new five.Board({
        port: new EtherPortClient({
            host: "10.0.0.213", // IP OF ESP8266/ nodemcuv1 10.0.0.213
            port: 5001 // PORT CONFIGED IN wificonfig.h     
        }),
        timeout: 30000,
        debug: true,
        repl: false
    });

    garageBoard.on('ready', () => {
        garageBoard.info("Board", "Ready steady freddy");
        garageDoorSwitch = new five.Switch(GARAGE_DOOR_PIN);
        garageDoorRelay = new five.Switch(GARAGE_DOOR_PIN);

        garageDoorSwitch.on("open", () => {
            console.log("garage open!");
            garageDoorBool = 0;
        });
        garageDoorSwitch.on("close", () => {
            console.log("garage closed!");
            garageDoorBool = 1;
        });
    });

    garageBoard.on('close', () => {
        console.log('Connection closed. Attempting to reconnect in 30 seconds');
        setTimeout(() => {
            connectGarageBoard()
        }, 30000);
    });

    garageBoard.on("info", function (event) {
        /*
          Event {
            type: "info"|"warn"|"fail",
            timestamp: Time of event in milliseconds,
            class: name of relevant component class,
            message: message [+ ...detail]
          }
        */
        console.log("%s Garage Board INFO: %s", event.class, event.message);
    });
}

function openGarageDoorRelay(req, res) {
    garageBoard.pinMode(GARAGE_RELAY_PIN, five.Pin.OUTPUT);
    const pin = five.Pin(GARAGE_RELAY_PIN);
    garageBoard.info("Board", "Relay on");
    pin.high();
    setTimeout(() => {
        closeGarageDoorRelay(pin, req, res)
    }, 500);
}

function closeGarageDoorRelay(pin, req, res) {
    pin.low();
    garageBoard.info("Board", "Relay off");
    res.send(JSON.stringify({
        message: 'relay triggered!'
    }));
    alreadyProcessingGarageDoor = 0;
}

app.get('/info', (req, res) => {
    console.log('supplying states info!');
    var respToReq = [
        {
            data: garageDoorBool,
            message: 'garage'
        },
        {
            data: frontDoorIn.readSync(),
            message: 'frontDoor'
        },
        {
            data: bsmtOfficeIn.readSync(),
            message: 'bsmtOffice'
        }, //bsmt office windows
        {
            data: bsmtMudIn.readSync(),
            message: 'bsmtMud'
        }, //basement door + windows
        {
            data: kitchenDingIn.readSync(),
            message: 'kitchenDing'
        } //kitchen window and dining window
    ];
    res.send(JSON.stringify(respToReq));
});


const frontDoorIn = new Gpio('17', 'in', 'both');
const kitchenDingIn = new Gpio('27', 'in', 'both');
const bsmtMudIn = new Gpio('22', 'in', 'both');
const bsmtOfficeIn = new Gpio('10', 'in', 'both');
const buzzerOut = new Gpio('9', 'out');
console.log('lolDiyBrinks v1.8');



frontDoorIn.watch((err, value) => {
    if (err) {
        console.log(err);
    }
    console.log('Front door Opened/Closed, trying to buzzzz. State = ' + frontDoorIn.readSync());
    buzzerOut.writeSync(1);
    setTimeout(() => {
        turnOffBuzzer()
    }, 500);
});

kitchenDingIn.watch((err, value) => {
    if (err) {
        console.log(err);
    }
    console.log('Kitchen windows Opened/Closed State = ' + kitchenDingIn.readSync());
});

bsmtOfficeIn.watch((err, value) => {
    if (err) {
        console.log(err);
    }
    console.log('Bsmt Office windows Opened/Closed State = ' + bsmtOfficeIn.readSync());
});

bsmtMudIn.watch((err, value) => {
    if (err) {
        console.log(err);
    }
    console.log('Bsmt Mud Room Opened/Closed State = ' + bsmtMudIn.readSync());
});

function turnOffBuzzer() {
    buzzerOut.writeSync(0);
}
/*
loopWatchButton();
function loopWatchButton()
{
    console.log(kitchenDingIn.readSync());
    setTimeout(loopWatchButton, 1000);
}
*/

process.on('SIGINT', _ => {
    frontDoorIn.unexport();
    bsmtOfficeIn.unexport();
    bsmtMudIn.unexport();
    topPorchIn.unexport();
    kitchenDingIn.unexport();
});


function testypdfy() {

    var data = {
        "last_name": "John",
        "first_name": "Doe",
        "date": "Jan 1, 2013",
        "football": "Off",
        "baseball": "Yes",
        "basketball": "Off",
        "hockey": "Yes",
        "nascar": "Off"
    };
    console.log('generating pdf!');
    var sourcePDF = "test/test.pdf";
    var destinationPDF = "test/test_complete.pdf";

    pdfFiller.fillForm(sourcePDF, destinationPDF, data, function (err) {
        if (err) throw err;
        console.log("In callback (we're done).");
    });
    res.send(JSON.stringify(respToReq));
}



/*
app.get('/status', (req, res) => {
    console.log('Getting Relay Status!');
    board.pinMode(RELAY_PIN, five.Pin.OUTPUT);
    // the Led class was acting hinky, so just using Pin here
    const pin = five.Pin(RELAY_PIN);
    pin.low(); 
    board.info("Board", "Getting status of relay");
    res.send('Relay Status: ');
});
*/
