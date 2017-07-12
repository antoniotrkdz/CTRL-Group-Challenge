//This code is for demostration only, it will NOT run//

const dbconnection = require('./somewhere/dbconnection.js');
const moment = require('moment'); //required for easy and precice date operations.
var CronJob = require('cron').CronJob; //nice tool for repetitive tasks
const apns = require("apns");
const options = {
    keyFile : "conf/key.pem",
    certFile : "conf/cert.pem",
    debug : true
};
const connection = new apns.Connection(options);
const notification = new apns.Notification();


//This function creates an array of days from lastAcquiredDate to today.
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

/*This function assembles and sends the notification to the APNs
It does it for each PatientID of the table Patients*/
const notifyUserOfMissingDays = userData => {
  const daysMissing = missingDays(row.lastSeen);

  if (daysMissing.length !== 0) {
    notification.payload = {"daysToCollect" : daysMissing};
    notification.device = new apns.Device(row.token);
    notification.badge = daysMissing.length;
    connection.sendNotification(notification);
  }
}

/*PostgresSQL query to get the array of Patients.
should include also those due for the forthnight acquisition*/
const getLastAcquisitionsQuery =
    `SELECT Patients.PatientID,
            Patients.DeviceToken AS token,
            Patients.LastAcquisition AS lastSeen,
            ForthnighCHK.FortnightLastAqDate
            FROM Patients
              LEFT JOIN ForthnighCHK
                ON Patients.PatientID = ForthnighCHK.PatientID AND
                FortnightLastAqDate BETWEEN now()::timestamp - (interval '2w') and
                now()::timestamp;`

new CronJob('* */12 * * *', function() { //runs every 12 hours.
    dbConnection.query(getLastAcquisitionsQuery, (err, res) => {
        if (err) console.error(`
            failed to retrieve data for last user acquisition.
            Aborting notifying users....
            `);

          res.rows.forEach(notifyUserOfMissingDays)
      });
    }, null, true, 'Europe/London');
