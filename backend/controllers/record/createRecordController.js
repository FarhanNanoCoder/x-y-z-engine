const { createRecord } = require("../../helpers/record");

module.exports = createRecordController = async (req, res, next) => {
  let keys = Object.keys(req.body);
  let mustKeys = [
    "name",
    "client",
    "contractor",
    "max_x",
    "max_y",
    "max_z",
    "min_x",
    "min_y",
    "min_z",
  ];
  let validKeys = ["desc"];

  try {
    if (keys.length === 0) {
      throw new Error("No data provided");
    }
    keys.forEach((key) => {
      if (!validKeys.includes(key) && !mustKeys.includes(key)) {
        throw Error(`Invalid key: ${key}`);
      }
    });
    mustKeys.forEach((key) => {
      if (!keys.includes(key)) {
        throw Error(`Missing key: ${key}`);
      }
    });

    const record = await createRecord(req.body);
    if (!record) throw Error("Error creating record");

    return res.status(201).json({
      code: 201,
      status: "success",
      message: "Record created successfully",
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
