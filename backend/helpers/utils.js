const moment = require("moment/moment");

const utils = {
  generateDateQuery: (date_from, date_to) => {
    const date_from_moment = moment(date_from).startOf("day").toDate();
    const date_to_moment = moment(date_to).endOf("day").toDate();
    if (date_from && date_to)
      return { $gte: date_from_moment, $lte: date_to_moment };
    if (date_from)
      return {
        $gte: date_from_moment,
        $lt: moment(date_from_moment).add(1, "days").toDate(),
      };
    if (date_to)
      return {
        $gte: date_to_moment,
        $lt: moment(date_to_moment).add(1, "days").toDate(),
      };
    return null;
  },
  generateRangeQuery: (range_from, range_to) => {
    if (range_from && range_to) return { $gte: range_from, $lte: range_to };
    if (range_from) return { $gte: range_from };
    if (range_to) return { $lte: range_to };
    return null;
  },
};

module.exports = utils;
