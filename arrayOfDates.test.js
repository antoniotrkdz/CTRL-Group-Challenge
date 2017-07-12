/*Small test of the function which assembles the array of dates missig from the Patients.
using tape + tap-spec. Use 'node arrayOfDates.test.js' to run.*/
const moment = require('moment');

var arrayOfMissingDates = lastAcquiredDate => {
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

const test = require('tape');

test('test the test', (t) => {
  t.equal(1, 1, '1 should be equal to 1');
  t.end();
})

test('test the arrayOfMissingDates function', (t) => {
      t.equal(arrayOfMissingDates(moment()).length, 1,
      'the array should contain at least today' );
      t.end();
});

test('test the arrayOfMissingDates function', (t) => {
      t.equal(arrayOfMissingDates(moment().subtract(3,'days')).length, 4,
      'The array of the missing dates from 3 days ago should contain 3 elements + today' );
      t.end();
});
