import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  message,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  useCreateRecordMutation,
  useGetRecordQuery,
  useUpdateRecordMutation,
} from "@redux/slice/record";

const COERecord = ({ _id, onClose }) => {
  const {
    data,
    isLoading: isFetching,
    isError,
    isSuccess,
    error: errorFetching,
  } = useGetRecordQuery(_id, {
    skip: !_id,
  });
  const [
    createRecord,
    { isLoading: isCreating, error: errorCreating, isSuccess: successCreating },
  ] = useCreateRecordMutation();
  const [
    updateRecord,
    { isLoading: isUpdating, error: errorUpdating, isSuccess: successUpdating },
  ] = useUpdateRecordMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    // if (_id) {
    //   dispatch(setHeadTitle("Update record"));
    // } else {
    //   dispatch(setHeadTitle("Create record"));
    // }
  }, []);

  useEffect(() => {
    if (errorCreating || errorUpdating || errorFetching) {
      // message.error(errorCreating || errorUpdating || errorFetching);
    }
  }, [errorCreating, errorUpdating, errorFetching]);

  useEffect(() => {
    if (successCreating) {
      message.success("Succesfully created Record");
      onClose();
    } else if (successUpdating) {
      message.success("Succesfuly updated Record");
      onClose();
    }
  }, [successCreating, successUpdating]);

  useEffect(() => {
    if (data?.code === 200) {
      form.setFieldsValue(data?.data);
    }
  }, [data]);

  const processRecordData = (data) => {
    data.max_x = Number(data?.max_x);
    data.max_y = Number(data?.max_y);
    data.min_x = Number(data?.min_x);
    data.min_y = Number(data?.min_y);
    return data;
  };
  const onSubmit = (data) => {
    console.log("data", data);
    if (_id) {
      // delete data._id;
      // delete data.createdAt;
      updateRecord({ _id, body: processRecordData(data) });
    } else {
      createRecord(processRecordData(data));
    }
  };

  return (
    <Modal
      width={800}
      centered
      title="Record"
      open={true}
      onCancel={() => {
        onClose();
        // dispatch(setHeadTitle("Record"));
        form.resetFields();
      }}
      footer={[
        <Button
          size="default"
          key="submit"
          type="primary"
          htmlType="submit"
          form="coe-record-form"
          loading={isFetching || isCreating || isUpdating}
        >
          {_id ? "Update" : "Create"}
        </Button>,
      ]}
    >
      <Content>
        <Spin spinning={isFetching || isCreating || isUpdating}>
          <Form
            form={form}
            id="coe-record-form"
            layout="vertical"
            // initialValues={currentRecord}
            onFinish={onSubmit}
          >
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={24} md={24} xl={24}>
                <Form.Item
                  className=" animate__animated animate__fadeIn"
                  label="Project(Name)"
                  name="name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Write here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} xl={24}>
                <Form.Item
                  className=" animate__animated animate__fadeIn"
                  label="Project(Description)"
                  name="desc"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Write here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <Form.Item
                  className=" animate__animated animate__fadeIn"
                  label="Client"
                  name="client"
                >
                  <Input placeholder="Write here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <Form.Item
                  className=" animate__animated animate__fadeIn"
                  label="Contractor"
                  name="contractor"
                >
                  <Input placeholder="Write here" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} xl={12}>
                <Form.Item
                  label="X(max)"
                  rules={[
                    {
                      required: true,
                      validator: (_, val) => {
                        return isNaN(val)
                          ? Promise.reject("not a valid number")
                          : Number(val) > -1
                          ? Promise.resolve()
                          : Promise.reject("cannot be negative");
                      },
                    },
                  ]}
                  name="max_x"
                >
                  <Input placeholder="Write here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <Form.Item
                  label="X(min)"
                  rules={[
                    {
                      required: true,
                      validator: (_, val) => {
                        return isNaN(val)
                          ? Promise.reject("not a valid number")
                          : Number(val) > -1
                          ? Promise.resolve()
                          : Promise.reject("cannot be negative");
                      },
                    },
                  ]}
                  name="min_x"
                >
                  <Input placeholder="Write here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <Form.Item
                  label="Y(max)"
                  rules={[
                    {
                      required: true,
                      validator: (_, val) => {
                        return isNaN(val)
                          ? Promise.reject("not a valid number")
                          : Number(val) > -1
                          ? Promise.resolve()
                          : Promise.reject("cannot be negative");
                      },
                    },
                  ]}
                  name="max_y"
                >
                  <Input placeholder="Write here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <Form.Item
                  label="Y(min)"
                  rules={[
                    {
                      required: true,
                      validator: (_, val) => {
                        return isNaN(val)
                          ? Promise.reject("not a valid number")
                          : Number(val) > -1
                          ? Promise.resolve()
                          : Promise.reject("cannot be negative");
                      },
                    },
                  ]}
                  name="min_y"
                >
                  <Input placeholder="Write here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <Form.Item
                  label="Z(max)"
                  rules={[
                    {
                      required: true,
                      validator: (_, val) => {
                        return isNaN(val)
                          ? Promise.reject("not a valid number")
                          : Number(val) > -1
                          ? Promise.resolve()
                          : Promise.reject("cannot be negative");
                      },
                    },
                  ]}
                  name="max_z"
                >
                  <Input placeholder="Write here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <Form.Item
                  label="Z(min)"
                  rules={[
                    {
                      required: true,
                      validator: (_, val) => {
                        return isNaN(val)
                          ? Promise.reject("not a valid number")
                          : Number(val) > -1
                          ? Promise.resolve()
                          : Promise.reject("cannot be negative");
                      },
                    },
                  ]}
                  name="min_z"
                >
                  <Input placeholder="Write here" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Content>
    </Modal>
  );
};

export default COERecord;
