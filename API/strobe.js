var five = require("johnny-five");
var EtherPortClient = require("etherport-client").EtherPortClient;
const express = require('express');

const app = express();
const port = 3000;
var lolTest;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
app.get('/startFlash', (req, res) => {
    console.log('starting flashy boi');
board.pinMode(LED_PIN, five.Pin.OUTPUT);
  // the Led class was acting hinky, so just using Pin here
  const pin = five.Pin(LED_PIN);
  let value = 0;
  board.info("Board", "Beginning blinkies");
  lolTest = setInterval(() => {
    if (value) {
      pin.high();
      value = 0;
    } else {
      pin.low();
      value = 1;
    }
  }, 500);
    
});

app.get('/endFlash', (req, res) => {
    console.log('Ending flashy boi');
    board.pinMode(LED_PIN, five.Pin.OUTPUT);
    // the Led class was acting hinky, so just using Pin here
    const pin = five.Pin(LED_PIN);
    board.info("Board", "Ending blinkies");
    clearInterval(lolTest);
    pin.low(); 
    board.info("Board", "Blinkies stopped");
});


var board = new five.Board({
  port: new EtherPortClient({
    host: "10.0.0.213",  // IP ESP8266 10.0.0.213
    port: 5001                
  }),
  timeout: 10000,
  repl: false
});


const LED_PIN = 2;

board.on('ready', () => {
    console.log('were ready!');
    board.info("Board", "Yeah, we ready tho");
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