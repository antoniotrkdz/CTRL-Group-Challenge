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
