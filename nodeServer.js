const dbconnection = require('./somewhere/dbconnection.js');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');
const MY_NAMESPACE = uuidv4();

var moment = require('moment');

const apns = require("apns");
const options = {
    keyFile : "conf/key.pem",
    certFile : "conf/cert.pem",
    debug : true
};
const connection = new apns.Connection(options);
const notification = new apns.Notification();

//const missingDays = lastReportData => {
const arrayOfMissingDates = lastAcquiredDate => {
    moment.locale('gb')
    var arrayOfDates = [];
    var currentDate = moment(lastAcquiredDate);
    var today = moment();
    while (moment(currentDate) <= today) {
        arrayOfDates.push(moment(currentDate).format('L'));
        currentDate = moment(currentDate).add(1, 'days');
    }
    return arrayOfDates;
}

const notifyUserOfMissingDays = userData => {
  const daysMissing = missingDays(row.lastSeen);

  if (daysMissing.length !== 0) {
    notification.payload = {"daysToCollect" : daysMissing};
    notification.device = new apns.Device(row.token);
    notification.badge = daysMissing.length;
    connection.sendNotification(notification);
  }
}

const getLastAcquisitionsQuery =
  'SELECT PatientID AS token, LastAcquisition AS lastSeen FROM Patients'


function main() {

    dbConnection.query('SELECT DeviceToken AS token, LastAcquisition AS lastSeen FROM Patients',
        (err, res) => {
            if (err) return err;
            return res;
          });

    const date = new Date().toDateString().slice(4);
    console.log(date);
    // Jul 09 2017


    function datesArray(lastAcquisition,today) { //adapted from StackOverflow
        const listDate = [];
        const dateMove = new Date(lastAcquisition);
        let shDate = lastAcquisition;

        while (shDate < today) {
            shDate = dateMove.toDateString().slice(4);
            listDate.push(strDate);
            dateMove.setDate(dateMove.getDate()+1);
        };
        return listDate;
    }

    res.forEach(row, () => {
        const daysMissing = datesArray(row.lastSeen,date);

        if (daysMissing.length !== 0) {
            notification.device = new apns.Device(row.token);
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
}

setInterval(function () { main() }, (24*60*60*1000));

--------------------------------------------------------------------------------

server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            (req, reply) => {
                const date = new Date().toDateString().slice(4);
                dbConnection.query(`INSERT INTO Patients (Name, CurrentMedication, DeviceToken)
                    VALUES ('${req.payload.name}', '${req.payload.CurrentMedication}', '${req.payload.DeviceToken}', (SELECT PatientID FROM Patients WHERE users.username = '${name}'));`,
                (err, res) => {
                    if (err) {
                        return err;
                    }
                }
              });
        }
}
