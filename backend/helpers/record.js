const Record = require("../models/record");
const { generateDateQuery, generateRangeQuery } = require("./utils");
module.exports = {
  createRecord: async (body) => {
    try {
      const record = new Record(body).save();
      return record;
    } catch (error) {
      console.log(error.message);
      //   throw error;
      return null;
    }
  },
  updateRecord: async (filter, body) => {
    try {
      const updated = await Record.findOneAndUpdate(filter, body, {
        new: true,
        runValidators: true,
      });
      return updated;
    } catch (error) {
      console.log(error.message);
      throw error;
      // return null;
    }
  },
  listRecord: async (params) => {
    try {
      let filter = {
        $match: {},
      };
      let orArray = [];

      //direct matchers
      // if (params?.price) {
      //   filter.$match["price"] = parseFloat(params?.price);
      // }
      // if (params?.price_from || params?.price_to) {
      //   filter.$match["price"] = generateRangeQuery(
      //     parseFloat(params?.price_from),
      //     parseFloat(params?.price_to)
      //   );
      // }
      if (params?.date_from || params?.date_to) {
        filter.$match["createdAt"] = generateDateQuery(
          params?.date_from,
          params?.date_to
        );
      }

      //or matchers
      ["name", "client", "contractor"].forEach((key) => {
        if (params[key]) {
          orArray.push({
            [key]: {
              $regex: params[key],
              $options: "i",
            },
          });
        }
      });

      if (orArray.length !== 0) {
        filter.$match["$or"] = orArray;
      }

      const sortOrder =
        params?.sort_order && params?.sort_order === "asc" ? 1 : -1;
      const sortBy = params?.sort_by || "createdAt";
      const total = await Record.countDocuments(filter.$match);

      let aggregate = [
        filter,
        {
          $sort: {
            [sortBy]: sortOrder,
            _id: -1,
          },
        },
        { $skip: params?.offset },
        { $limit: params?.limit },
        {
          $project: {
            password: 0,
            __v: 0,
          },
        },
        {
          $group: {
            _id: null,
            results: { $push: "$$ROOT" },
          },
        },
        {
          $addFields: { total },
        },
        {
          $project: {
            _id: 0,
            meta: {
              previous: {
                $cond: [
                  params?.currentPage === 1,
                  null,
                  params?.currentPage - 1,
                ],
              },
              next: {
                $cond: {
                  if: { $lte: ["$total", params?.offset + params?.limit] },
                  then: null,
                  else: params?.currentPage + 1,
                },
              },
              total: "$total",
              page_size: { $size: "$results" },
              last_page: { $ceil: { $divide: ["$total", params?.limit] } },
            },
            results: 1,
          },
        },
      ];

      let docs = await Record.aggregate(aggregate);
      if (docs.length === 0) {
        throw Error("No records found");
      }
      return docs[0];
    } catch (error) {
      console.log(error.message);
      return {
        meta: {
          previous: null,
          next: null,
          total: 0,
          page_size: 1,
          last_page: 1,
        },
        results: [],
      };
    }
  },
  delRecord: async (_id) => {
    try {
      let record = await Record.findById(_id);
      if (record) {
        await record.deleteOne();
        return true;
      } else {
        throw Error("record not found");
      }
    } catch (error) {
      console.log(error.message);
      throw error;
      // return null;
    }
  },
  getRecord: async (_id) => {
    try {
      console.log("deleting ", _id);
      let record = await Record.findById(_id);
      if (record) {
        return record;
      } else {
        throw Error("record not found");
      }
    } catch (error) {
      console.log(error.message);
      throw error;
      // return null;
    }
  },
};
