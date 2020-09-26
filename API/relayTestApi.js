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

var garageBoard, garageDoorSwitch, garageDoorBool;


app.listen(port, () => {
           console.log(`API Ready at ` + port);
           connectGarageBoard();
});
app.use(cors());

app.get('/open', (req, res) => {
    console.log('garage door called');
    if (alreadyProcessingGarageDoor == 0)
        {
             alreadyProcessingGarageDoor = 1;
             openGarageDoorRelay(req, res);
        }
    else
        {
            console.log('stop spamming retard');
            res.send(JSON.stringify( { message : 'stop spamming retard!' } ));
        }
});

function connectGarageBoard()
{
    garageBoard = new five.Board({
      port: new EtherPortClient({
        host: "10.0.0.213",  // IP OF ESP8266/ nodemcuv1 10.0.0.213
        port: 5001           // PORT CONFIGED IN wificonfig.h     
      }),
      timeout: 30000,
      debug: true,    
      repl: false
    });
    
    garageBoard.on('ready', () => {
        garageBoard.info("Board", "Ready steady freddy");
        garageDoorSwitch = new five.Switch(GARAGE_DOOR_PIN);
        garageDoorRelay = new five.Switch(GARAGE_DOOR_PIN);

            garageDoorSwitch.on("open", () => 
            {
                console.log("garage open!");
                garageDoorBool = 1;
            });
            garageDoorSwitch.on("close", () => 
            {
                console.log("garage closed!");
                garageDoorBool = 0;
            });
    });

    garageBoard.on('close', () => {
        console.log('Connection closed. Attempting to reconnect in 30 seconds');
        setTimeout( () => { connectGarageBoard() } , 30000);  
    });

    garageBoard.on("info", function(event) {
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

function openGarageDoorRelay(req, res)
{
  garageBoard.pinMode(GARAGE_RELAY_PIN, five.Pin.OUTPUT);
  const pin = five.Pin(GARAGE_RELAY_PIN);
  garageBoard.info("Board", "Relay on");
  pin.high();
  setTimeout( () => { closeGarageDoorRelay(pin, req, res) } , 500);  
}

function closeGarageDoorRelay(pin, req, res)
{
    pin.low();
    garageBoard.info("Board", "Relay off");
    res.send(JSON.stringify( { message : 'relay triggered!' } ) );
    alreadyProcessingGarageDoor = 0;
}

app.get('/info', (req, res) => {
    console.log('supplying states info!');
    var respToReq = [{data: garageDoorBool, message:  'garage'}];
    res.send(JSON.stringify(respToReq));
});


const button = new Gpio(5, 'in');
console.log(button.direction()); 
console.log('watching gpio5');
/*
button.watch((err, value) => {
  if (err) {
    throw err;
  }
  console.log(value);
});
 */
loopWatchButton();
function loopWatchButton()
{
    console.log(button.readSync());
    setTimeout(loopWatchButton, 500);
}

process.on('SIGINT', _ => {
  button.unexport();
});





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
