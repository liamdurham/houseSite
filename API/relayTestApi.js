var five = require("johnny-five");
var EtherPortClient = require("etherport-client").EtherPortClient;
const express = require('express');
const cors = require('cors');
var Gpio = require('onoff').Gpio;

const app = express();
const port = 3000;
const RELAY_PIN = 5;
var alreadyProcessingGarageDoor = 0;
var lolTest;

var garageBoard;


app.listen(port, () => {
           console.log(`API Ready at ` + port);
           connectGarageBoard();
});
app.use(cors())
app.get('/open', (req, res) => {
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
  garageBoard.pinMode(RELAY_PIN, five.Pin.OUTPUT);
  // the Led class was acting hinky, so just using Pin here
  const pin = five.Pin(RELAY_PIN);
  let value = 0;
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
    garageBoard.pinMode(RELAY_PIN, five.Pin.OUTPUT);
    const pin = five.Pin(RELAY_PIN);
    pin.query(function(state) {
        console.log(state);
        garageBoard.info("Board", "Relay state:" + state.value);
        res.send(JSON.stringify( { message : 'state: '+state.value } ));
    });
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
