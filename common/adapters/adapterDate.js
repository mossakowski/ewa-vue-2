const { DateTime } = require("luxon");
import { DATE_FULL_YEAR_FORMAT, DATE_FULL_FORMAT } from '../constants/date';

function getYear() {
    return DateTime.now().toFormat(DATE_FULL_YEAR_FORMAT);
}

function getFullDate() {
    return DateTime.now().toFormat(DATE_FULL_FORMAT);
}

export {
    getYear,
    getFullDate
}