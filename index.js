var express = require('express');
var app = express();
app.set('view engine', 'pug');

const si = require('systeminformation');
const fs = require('fs');

var cpuTemp;
var memUsage;

var memUsed;

app.get('/', function (req, res) {

    si.cpuTemperature(function(data) {
        cpuTemp = data;

        console.log(cpuTemp)
    });

    si.mem(function(data) {
        memUsage = data;

        memUsed = (parseInt(JSON.stringify(memUsage.used)) / 1073741824).toFixed(1)
        console.log(memUsed) //Divided by 1073741824
    });

    // si.mem().then(data => console.log(data));


    res.render('index', { title: memUsed + 'GB - ' + cpuTemp.main + ' Grader', cpu_temp_main: cpuTemp.main, core_temps: cpuTemp.cores, memUsed:memUsed, memFree: memUsage.free  });
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
