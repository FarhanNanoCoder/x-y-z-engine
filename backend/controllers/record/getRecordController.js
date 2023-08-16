const { getRecord } = require("../../helpers/record");

module.exports = getRecordController = async (req, res, next) => {
  try {
    const record = await getRecord(req.params?._id ?? "");

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Retrieved record successfully",
      data: record,
    });
  } catch (err) {
    return res.status(400).json({
      code: 400,
      status: "Bad Request",
      message: err.message,
    });
  }
};
