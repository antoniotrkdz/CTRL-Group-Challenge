const server = require('./arrayOfDates.js');
const moment = require('moment');
// var test = require('tape');
//
// test('test the server', function (t) {
//     arrayOfMissingDates(function (lastAcquiredDate) {
//       t.equal(moment().subtract(3,'days'), arrayOfDates.length===3 );
//       // t.notOk('id' in model);
//       t.end();
//     });
// });





test('arrayOfMissingDates should return an array with 3 elements', () => {
  expect(arrayOfMissingDates(moment().subtract(3, 'days')))
  .toBe(arrayOfDates.length === 3);
});
