const dbconnection = require('./somewhere/dbconnection.js');
const moment = require('moment');
var CronJob = require('cron').CronJob;
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
  'SELECT PatientID, DeviceToken AS token, LastAcquisition AS lastSeen FROM Patients'

new CronJob('* */12 * * *', function() { //run every 12 hours.
    dbConnection.query(getLastAcquisitionsQuery, (err, res) => {
        if (err) console.error(`
            failed to retrieve data for last user acquisition.
            Aborting notifying users....
            `);

          res.rows.forEach(notifyUserOfMissingDays)
      });
    }, null, true, 'Europe/London');

//Server endpoints----------------------------------------------------------------------

const query = `INSERT INTO Patients (Name, CurrentMedication, DeviceToken)
    VALUES ($1, $2)', (SELECT PatientID FROM Patients WHERE users.username = '$3'));`

server.route({
        method: 'GET',
        path: '/???',
        handler: {
            (req, reply) => {
                const date = new Date().toDateString().slice(4);
                dbConnection.query(query, [req.payload.name, req.payload.CurrentMedication],
                (err, res) => {
                  /* do not return from async cb!!!!! */
                  // this is not how javascript works (or any language that has async cb funcs)
                    if (err) {
                        return err;
                    }

                    // What are you doing with the response??

                }
              });
        }
}
