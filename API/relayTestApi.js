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

var board = new five.Board({
  port: new EtherPortClient({
    host: "10.0.0.213",  // IP ESP8266 10.0.0.213
    port: 5001                
  }),
  timeout: 30000,
  debug: true,    
  repl: false
});


app.listen(port, () => console.log(`API Ready at ` + port));
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

function openGarageDoorRelay(req, res){
  board.pinMode(RELAY_PIN, five.Pin.OUTPUT);
  // the Led class was acting hinky, so just using Pin here
  const pin = five.Pin(RELAY_PIN);
  let value = 0;
  board.info("Board", "Relay on");
  pin.high();
  setTimeout( () => { closeGarageDoorRelay(pin, req, res) } , 500);  
}

function closeGarageDoorRelay(pin, req, res)
{
    pin.low();
    board.info("Board", "Relay off");
    res.send(JSON.stringify( { message : 'relay triggered!' } ) );
    alreadyProcessingGarageDoor = 0;
}

app.get('/info', (req, res) => {
    console.log('supplying states info!');
    board.pinMode(RELAY_PIN, five.Pin.OUTPUT);
    const pin = five.Pin(RELAY_PIN);
    pin.query(function(state) {
        console.log(state);
        board.info("Board", "Relay state:" + state.value);
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


board.on('ready', () => {
    board.info("Board", "Ready steady freddy");
});

board.on("info", function(event) {
  /*
    Event {
      type: "info"|"warn"|"fail",
      timestamp: Time of event in milliseconds,
      class: name of relevant component class,
      message: message [+ ...detail]
    }
  */
  console.log("%s INFO: %s", event.class, event.message);
});