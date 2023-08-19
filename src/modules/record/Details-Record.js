import { setHeadTitle } from "@redux/reducer/extra";
import { useGetRecordQuery } from "@redux/slice/record";
import { Card, Descriptions, Modal, Tooltip, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const DetailsRecord = ({ _id, onClose }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetRecordQuery(_id);
  useEffect(() => {
    if (error) {
      message.error(error?.data?.message);
    }
  }, [error]);

  return (
    <Modal
      width={800}
      centered
      title="Record details"
      open={true}
      onCancel={() => {
        onClose();
        dispatch(setHeadTitle("Record"));
      }}
      onOk={() => {
        onClose();
        dispatch(setHeadTitle("Record(Details)"));
      }}
    >
      <Card loading={isLoading}>
        <Descriptions
          size="small"
          layout="vertical"
          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Project (Name)">
            {data?.data?.name ?? "[n/a]"}
          </Descriptions.Item>
          <Descriptions.Item label="Project (Description)">
            {data?.data?.desc ?? "[n/a]"}
          </Descriptions.Item>
          <Descriptions.Item label="Client">
            {data?.data?.client ?? "[n/a]"}
          </Descriptions.Item>
          <Descriptions.Item label="Contractor">
            {data?.data?.contractor ?? "[n/a]"}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <Descriptions
          title="Card details"
          size="small"
          // layout="vertical"
          column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="X(Max)">
            {data?.data?.max_x ?? "[n/a]"}
          </Descriptions.Item>
          <Descriptions.Item label="X(Min)">
            {data?.data?.min_x ?? "[n/a]"}
          </Descriptions.Item>
          <Descriptions.Item label="Y(Max)">
            {data?.data?.max_y ?? "[n/a]"}
          </Descriptions.Item>
          <Descriptions.Item label="Y(Min)">
            {data?.data?.min_y ?? "[n/a]"}
          </Descriptions.Item>
          <Descriptions.Item label="Z(Max)">
            {data?.data?.max_z ?? "[n/a]"}
          </Descriptions.Item>
          <Descriptions.Item label="Z(Min)">
            {data?.data?.min_z ?? "[n/a]"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Modal>
  );
};

export default DetailsRecord;
