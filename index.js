var express = require('express');
var app = express();
app.set('view engine', 'pug');

const si = require('systeminformation');
const fs = require('fs');

var cpuTemp;

app.get('/', function (req, res) {

    si.cpuTemperature(function(data) {
        cpuTemp = data;

        console.log(cpuTemp)
      });

    res.render('index', { title: 'Hey', cpu_temp_main: cpuTemp.main, core_temps: cpuTemp.cores  });
    console.log('Someone connected!');
    // si.cpuTemperature().then(data => { return data})
    
});

app.get('/cpu', function (req, res) {
    res.send(cpuTemp)
    console.log(cpuTemp)
});

app.listen(80, function () {
    console.log('Listening to Port 80');
});
