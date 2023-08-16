const { delRecord } = require("../../helpers/record");

module.exports = delRecordController = async (req, res, next) => {
  try {
    await delRecord(req.params?._id ?? "");

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Record deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      code: 400,
      status: "Bad Request",
      message: err.message,
    });
  }
};
