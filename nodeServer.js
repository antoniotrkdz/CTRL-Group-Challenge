const dbconnection = require('./somewhere/dbconnection.js');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');
const MY_NAMESPACE = uuidv4();

const apns = require("apns"), options, connection, notification;

options = {
  some.certificate.options
};

connection = new apns.Connection(options);

notification = new apns.Notification();

function main() {
const date = new Date().toDateString().slice(4);
console.log(date);
// Jul 09 2017

dbConnection.query('SELECT DeviceToken AS token, LastAcquisition AS lastSeen FROM Patients',
    (err, res) => {
        if (err) return err;
        return res;
       });

res.forEach(row, () => {
    notification.device = new apns.Device(row.token);
    const daysMissing = [.....]; //an array of dates given by each day between date - row.lastSeen;
    notification.badge = daysMissing.length;
    dayMissing.foreach(day, () => {
        var array = [];
        var d = uuidv5(row.token + ' ' + day , MY_NAMESPACE)
        array.push(d);
        return array
        });
    notification.payload = {"daysToCollect" : array};
    connection.sendNotification(notification);
    });
}

setInterval(function () { main() }, (24*60*60*1000));
