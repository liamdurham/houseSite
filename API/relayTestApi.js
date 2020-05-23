var five = require("johnny-five");
var EtherPortClient = require("etherport-client").EtherPortClient;
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const RELAY_PIN = 5;


var lolTest;
app.listen(port, () => console.log(`Ready at ` + port));
app.use(cors())
app.get('/open', (req, res) => {
 openRelay(req, res);
});

function openRelay(req, res){
  board.pinMode(RELAY_PIN, five.Pin.OUTPUT);
  // the Led class was acting hinky, so just using Pin here
  const pin = five.Pin(RELAY_PIN);
  let value = 0;
  board.info("Board", "Relay on");
  pin.high();
  setTimeout( () => { closeRelay(pin, req, res) } , 500);  
}

function closeRelay(pin, req, res)
{
    pin.low();
    board.info("Board", "Relay off");
    res.send(JSON.stringify( { message : 'relay triggered!' } ) );
}

app.get('/close', (req, res) => {
    console.log('Trying to turn off relay!');
    board.pinMode(RELAY_PIN, five.Pin.OUTPUT);
    // the Led class was acting hinky, so just using Pin here
    const pin = five.Pin(RELAY_PIN);
    pin.low(); 
    board.info("Board", "turning relay off");
    res.send('relay off');
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

var board = new five.Board({
  port: new EtherPortClient({
    host: "10.0.0.213",  // IP ESP8266 10.0.0.213
    port: 5001                
  }),
  timeout: 10000,
  repl: false
});

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