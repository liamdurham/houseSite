const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`API Ready at ` + port);
});
app.use(cors());

app.get('/open', (req, res) => {
    console.log('hi lol');
    res.send(JSON.stringify({
        message: 'fuck off'
    }));
}
});
