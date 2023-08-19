const { updateRecord } = require("../../helpers/record");

module.exports = updateRecordController = async (req, res, next) => {
  console.log("req", req?.body);
  let keys = Object.keys(req?.body ?? []);
  let validKeys = [
    "name",
    "client",
    "contractor",
    "max_x",
    "max_y",
    "max_z",
    "min_x",
    "min_y",
    "min_z",
    "desc",
  ];
  let immutableKeys = ["createdAt", "_id"];

  try {
    if (keys.length === 0) {
      throw new Error("No data provided");
    }
    keys.forEach((key) => {
      if (!validKeys.includes(key) && !immutableKeys.includes(key)) {
        throw Error(`Invalid key: ${key}`);
      }
    });
    immutableKeys?.forEach((key) => {
      req?.body[key]!=null && delete req?.body[key];
    });

    const record = await updateRecord({ _id: req.params?._id }, req.body);
    if (!record) throw Error("Error updating record");

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Record updated successfully",
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
