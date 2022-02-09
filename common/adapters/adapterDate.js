const { DateTime } = require("luxon");
import { DATE_FULL_YEAR_FORMAT, DATE_FULL_FORMAT_LUXON } from '../constants/date';

function getYearAdapter() {
    return DateTime.now().toFormat(DATE_FULL_YEAR_FORMAT);
}

function parseDateToObject(date) {
    console.log(DateTime.fromISO(date).toFormat(DATE_FULL_FORMAT_LUXON));
}

export {
    getYearAdapter,
    parseDateToObject
}