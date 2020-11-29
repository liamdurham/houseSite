const express = require('express');
const cors = require('cors');
const app = express();
const port = 3003;

app.listen(port, () => {
    console.log(`API Ready at ` + port);
});
app.use(cors());

app.get('/open', (req, res) => {
    console.log('stop spamming plz');
    res.send(JSON.stringify({
        message: 'stop spamming plz!'
    }));
});
