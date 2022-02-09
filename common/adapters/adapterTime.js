const { DateTime } = require("luxon");
import { TIME_HOURS_MINUTES_FORMAT } from '../constants/time'

function createDateTime(time) {
    return DateTime.fromISO(time);
}

function isValidTime(time) {
    return createDateTime(time).isValid;
}

function compareTime(time1, time2) {    
    return createDateTime(time1).toFormat(TIME_HOURS_MINUTES_FORMAT) < createDateTime(time2).toFormat(TIME_HOURS_MINUTES_FORMAT);
}

function calcDurrationTime(time1, time2) {
    let diffTimeObj = createDateTime(time2).diff(createDateTime(time1),['hour','minutes']).toObject();
    let diffTime = DateTime.fromObject({hour: diffTimeObj['hours'], minute: diffTimeObj['minutes']});
    return diffTime.toFormat(TIME_HOURS_MINUTES_FORMAT);
}

export {
    compareTime,
    calcDurrationTime,
    isValidTime
}