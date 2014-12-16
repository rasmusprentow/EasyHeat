
var request = require('request');
var moment = require('moment');


var getDay = function ()
{
   switch(moment().day())
   {
     case 5: return 'friday'; break;
     case 6: return 'saturday'; break;
     case 7: return 'sunday'; break;
     default: return 'weekday';
   }
  return moment().day()
};

var getHour = function ()
{
  return moment().hour();
}

console.log(getHour());


console.log("sss");
request('http://localhost:3000/temperatures/lollandsgade9/living/friday', function (error, response, body) {

  if (!error && response.statusCode == 200) {

    var temp = JSON.parse(body).days[0].hours[getHour()].temperature;
    console.log("Received: " + temp);
    request('http://192.168.87.108:8083/ZWaveAPI/Run/devices[2].instances[0].commandClasses[67].Set(1,' + temp + ')', function(error, response, body) {
      console.log("Thermostat said "  +response.statusCode);
    });
  }
})


// http://192.168.87.108:8083/ZWaveAPI/Run/devices[2].instances[0].commandClasses[67]
