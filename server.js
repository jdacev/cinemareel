const compression = require('compression')
const express = require('express');
const path = require('path');

const app = express();

app.use(compression())

// Serve only the static files form the dist directory
app.use(express.static('./dist/cinemareel'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname,'/dist/cinemareel/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
