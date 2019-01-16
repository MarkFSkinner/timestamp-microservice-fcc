// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  const dateVal = req.params.date_string;
  let date, unixVal, utcVal;
  if (!isNaN(dateVal)) {
    unixVal = parseInt(dateVal);
    date = new Date(unixVal);
    utcVal = date.toUTCString();
    res.json({unix: unixVal, utc: utcVal});
  } 
  else {
    date = new Date(dateVal);
    unixVal = date.getTime() / 1000;
    utcVal = date.toUTCString();
    if (utcVal === "Invalid Date") {
      res.json({"error" : "Invalid Date" });
    }
    else {
      res.json({unix: unixVal, utc: utcVal});
    }
  }
});

app.get("/api/timestamp", (req, res) => {
  let date, unixVal, utcVal;
  date = new Date();
  unixVal = date.getTime();
  utcVal = date.toUTCString(); 
  res.json({unix: unixVal, utc: utcVal});
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});