const dayjs = require("dayjs");


const utils = {
  generateDateQuery: (date_from, date_to) => {
    const date_from_dayjs = dayjs(date_from).startOf("day").toDate();
    const date_to_dayjs = dayjs(date_to).endOf("day").toDate();
    if (date_from && date_to)
      return { $gte: date_from_dayjs, $lte: date_to_dayjs };
    if (date_from)
      return {
        $gte: date_from_dayjs,
        $lt: dayjs(date_from_dayjs).add(1, "days").toDate(),
      };
    if (date_to)
      return {
        $gte: date_to_dayjs,
        $lt: dayjs(date_to_dayjs).add(1, "days").toDate(),
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
