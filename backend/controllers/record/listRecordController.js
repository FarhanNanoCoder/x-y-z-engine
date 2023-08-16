// const { baseCount } = require("../../globals/constants");
const { listRecord } = require("../../helpers/record");

module.exports = listRecordController = async (req, res, next) => {
  try {
    let params = Object.keys(req.query);
    let page = req?.query.page ? parseInt(req?.query.page) : 1;
    let count = req?.query.count ? parseInt(req?.query.count) : 20;
    let offset = (page - 1) * count;
    const validParams = [
      "date_from",
      "date_to",
      "name",
      "client",
      "contractor",
      "count",
      "page",
      "sort_order",
      "sort_by",
    ];

    params.forEach((param) => {
      if (!validParams.includes(param)) {
        throw Error(`Invalid query param: ${param}`);
      }
    });

    const data = await listRecord({
      offset,
      limit: count,
      currentPage: page,
      ...req.query,
    });

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Retrieved records successfully",
      data,
    });
  } catch (err) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      message: err.message,
    });
  }
};
