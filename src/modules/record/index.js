import React, { useEffect, useState } from "react";
import SearchPanelRecord from "./SearchPanel-Record";
import ListViewRecord from "./ListView-Record";
import { handleSortQuery } from "@helpers/util";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import COERecord from "./COE-Record";
import { useDeleteRecordMutation } from "@redux/slice/record";
import { Card, Modal, message } from "antd";
import { showAlertDialog } from "@components/core/AlertDialog";
import { AddDatabaseScript } from "iconoir-react";

const Record = ({ base = "/record" }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [deleteRecord, resultDeleteRecord] = useDeleteRecordMutation();

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
      message.error(resultDeleteRecord?.data?.message ?? "Operation failed");
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
        <SearchPanelRecord onCreate={onCreate} />
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
    </div>
  );
};

export default Record;
