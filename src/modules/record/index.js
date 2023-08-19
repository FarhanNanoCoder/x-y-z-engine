import React, { useEffect, useState } from "react";
import SearchPanelRecord from "./SearchPanel-Record";
import ListViewRecord from "./ListView-Record";
import { handleSortQuery } from "@helpers/util";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import COERecord from "./COE-Record";
import {
  useDeleteRecordMutation,
  useGetRecordListQuery,
} from "@redux/slice/record";
import { Card, message } from "antd";
import { showAlertDialog } from "@components/core/AlertDialog";
import { AddDatabaseScript } from "iconoir-react";
import * as XLSX from "xlsx-js-style";
import dayjs from "dayjs";
import DetailsRecord from "./Details-Record";

const Record = ({ base = "/record" }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [deleteRecord, resultDeleteRecord] = useDeleteRecordMutation();
  const { data: recordData } = useGetRecordListQuery(router.query, {
    refetchOnMountOrArgChange: true,
    fixedCacheKey: "shared-record-update-mutation",
  });

  const [values, setValues] = useState({
    showViewModal: false,
    showEditModal: false,
    itemToBeShown: undefined,
  });

  const { showEditModal, showViewModal, itemToBeShown } = values;

  useEffect(() => {
    if (resultDeleteRecord?.isSuccess) {
      message.success(
        resultDeleteRecord?.data?.message ?? "Operation is successfull"
      );
    } else if (resultDeleteRecord?.isError) {
      message.error(resultDeleteRecord?.error?.message ?? "Operation failed");
    }
  }, [resultDeleteRecord]);

  const onItemActionSelect = ({ type, item }) => {
    if (type === "view") {
      console.log(type, item);
      setValues({
        ...values,
        itemToBeShown: item._id,
        showViewModal: true,
      });
    } else if (type === "edit") {
      console.log(type, item);
      setValues({
        ...values,
        itemToBeShown: item._id,
        showEditModal: true,
      });
    } else if (type === "delete") {
      showAlertDialog({
        title: "Are you  sure to delete this record?",
        onConfirm: onConfirmAlertDialog,
        onCancel: onCloseAlertDialog,
        item: item._id,
      });
      console.log(type, item);
    }
  };

  const onCreate = () => {
    setValues({
      ...values,
      showEditModal: true,
    });
  };

  const onCloseModal = () => {
    console.log("modal closed");
    setValues({
      ...values,
      showViewModal: false,
      showEditModal: false,
      itemToBeShown: undefined,
    });
  };

  const onCloseAlertDialog = () => {
    console.log("cancelled");
  };

  const onConfirmAlertDialog = (_id) => {
    console.log("confirmed", _id);
    deleteRecord(_id);
  };

  const getHeaders = () => {
    const titles = [
      "SL No",
      "Project(name)",
      "Project(description)",
      "Client",
      "Contractor",
      "X(max)",
      "X(min)",
      "Y(max)",
      "Y(min)",
      "Z(max)",
      "Z(min)",
    ];
    var temp = [];
    titles.map((item, index) => {
      temp.push({
        v: `${item}`,
        t: "s",
        wpx: 50,
        hpt: 5,
        s: {
          alignment: { wrapText: true },
          font: {
            sz: 11,
            bold: true,
            color: { rgb: "FFFFFF" },
          },
          fill: {
            fgColor: { rgb: "434242" },
          },
        },
      });
    });
    return temp;
  };

  const getProcessedArrayOfRecords = (records) => {
    let temp = [];
    records.map((item, index) => {
      let row = [];
      row.push(
        (parseInt(router.query?.page ?? "0") - 1) *
          (parseInt(router.query?.count) ?? 0) +
          index +
          1
      );
      row.push(item?.name ?? "[n/a]");
      row.push(item?.desc ?? "[n/a]");
      row.push(item?.client ?? "[n/a]");
      row.push(item?.contractor ?? "[n/a]");
      row.push(item?.max_x ?? "[n/a]");
      row.push(item?.min_x ?? "[n/a]");
      row.push(item?.max_y ?? "[n/a]");
      row.push(item?.min_y ?? "[n/a]");
      row.push(item?.max_z ?? "[n/a]");
      row.push(item?.min_z ?? "[n/a]");
      temp.push(row);
    });
    return temp;
  };

  const onExport = ({
    records = recordData?.data?.data?.results ?? [],
    type = "excel",
  }) => {
    switch (type) {
      case "excel": {
        const data = XLSX.utils.aoa_to_sheet([
          [],
          getHeaders(),
          ...getProcessedArrayOfRecords(records),
        ]);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, data, "Record Report");
        XLSX.writeFile(
          wb,
          `Record_Report_[${dayjs().format("DD-MM-YYYY")}].xlsx`
        );
        break;
      }

      default:
        break;
    }
  };

  return (
    <div className="record-parent">
      <Card
        size="sm"
        title={
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <AddDatabaseScript />
            <h3>Record</h3>
          </div>
        }
      >
        <SearchPanelRecord onCreate={onCreate} onExport={onExport} />
      </Card>
      <br />
      <Card size="sm">
        <ListViewRecord
          onItemActionSelect={onItemActionSelect}
          onUpdateSortQuery={({ sort_by }) =>
            handleSortQuery({ sort_by, router: router, base: base })
          }
        />
      </Card>
      {showEditModal && (
        <COERecord _id={itemToBeShown} onClose={onCloseModal} />
      )}
      {showViewModal && (
        <DetailsRecord _id={itemToBeShown} onClose={onCloseModal} />
      )}
    </div>
  );
};

export default Record;
