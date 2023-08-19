import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Spin,
  Tooltip,
  Upload,
  message,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import {
  useCreateRecordMutation,
  useGetRecordQuery,
  useUpdateRecordMutation,
} from "@redux/slice/record";
import Papa from "papaparse";
import ChartRecord from "./Chart-Record";
import { useDispatch } from "react-redux";
import { setHeadTitle } from "@redux/reducer/extra";

const COERecord = ({ _id, onClose }) => {
  const dispatch = useDispatch();
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
    {
      data: dataCreating,
      isLoading: isCreating,
      error: errorCreating,
      isSuccess: successCreating,
    },
  ] = useCreateRecordMutation();
  const [
    updateRecord,
    {
      data: dataUpdating,
      isLoading: isUpdating,
      error: errorUpdating,
      isSuccess: successUpdating,
    },
  ] = useUpdateRecordMutation();
  const [form] = Form.useForm();
  const [state, setState] = useState(!_id ? 0 : 1); //0 = first step, 1 = second step
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    if (_id) {
      dispatch(setHeadTitle("Update record"));
    } else {
      dispatch(setHeadTitle("Create record"));
    }
  }, []);

  useEffect(() => {
    if (errorCreating || errorUpdating || errorFetching) {
      console.log("error", errorCreating);
      message.error(
        errorCreating?.data?.message ||
          errorUpdating?.data?.message ||
          errorFetching?.data?.message ||
          errorCreating?.error ||
          errorUpdating?.error ||
          errorFetching?.error
      );
    }
  }, [errorCreating, errorUpdating, errorFetching]);

  useEffect(() => {
    if (successCreating) {
      message.success(dataCreating?.message);
      onClose();
    } else if (successUpdating) {
      message.success(dataUpdating?.message);
      onClose();
    }
  }, [successCreating, successUpdating]);

  useEffect(() => {
    if (data?.code === 200) {
      form.setFieldsValue(data?.data);
    }
  }, [data]);

  const handleFormValueChange = () => {
    let data = form.getFieldsValue();
    if (data?.name && data?.desc && data?.client && data?.contractor) {
      setState(1);
    } else {
      setState(0);
    }
  };

  const onFileChange = (info) => {
    if (info.file.status === "done") {
      // console.log("file transferred", info);
      if (info?.fileList?.length !== 0) {
        Papa.parse(info.file.originFileObj, {
          complete: (res) => {
            if (res?.data?.length < 2) {
              message.warning("File has no data");
              return;
            }

            var max_x = Number(res?.data[1][1]),
              min_x = Number(res?.data[1][1]),
              max_y = Number(res?.data[1][2]),
              min_y = Number(res?.data[1][2]),
              max_z = Number(res?.data[1][3]),
              min_z = Number(res?.data[1][3]);

            for (var i = 2; i < res?.data?.length; i++) {
              if (res?.data[i]?.length < 4) continue;
              max_x = Math.max(max_x, Number(res?.data[i][1]));
              min_x = Math.min(min_x, Number(res?.data[i][1]));
              max_y = Math.max(max_y, Number(res?.data[i][2]));
              min_y = Math.min(min_y, Number(res?.data[i][2]));
              max_z = Math.max(max_z, Number(res?.data[i][3]));
              min_z = Math.min(min_z, Number(res?.data[i][3]));
            }

            setFileData(res?.data);
            form.setFieldsValue({ max_x, min_x, max_y, min_y, max_z, min_z });
          },
          error: (error) => {
            message.error(error?.toString());
          },
        });
      }
    }
  };

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
      updateRecord({ _id, body: processRecordData(data) });
    } else {
      createRecord(processRecordData(data));
    }
  };

  return (
    <Drawer
      width="100%"
      centered
      title={`Record ${_id ? "(Update)" : "(Create)"}`}
      open={true}
      extra={[
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
      onClose={() => {
        onClose();
        dispatch(setHeadTitle("Record"));
        form.resetFields();
      }}
      // footer={[
      //   <Button
      //     size="default"
      //     key="submit"
      //     type="primary"
      //     htmlType="submit"
      //     form="coe-record-form"
      //     loading={isFetching || isCreating || isUpdating}
      //   >
      //     {_id ? "Update" : "Create"}
      //   </Button>,
      // ]}
    >
      <Content>
        <Spin spinning={isFetching || isCreating || isUpdating}>
          <Form
            form={form}
            id="coe-record-form"
            layout="vertical"
            onChange={handleFormValueChange}
            onFinish={onSubmit}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} xl={12}>
                <Card title="Info" size="sm" style={{ height: "100%" }}>
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
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input placeholder="Write here" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} xl={12}>
                      <Form.Item
                        className=" animate__animated animate__fadeIn"
                        label="Contractor"
                        name="contractor"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input placeholder="Write here" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <Tooltip
                  title={state === 0 ? "Please fill the Info first" : ""}
                >
                  <Card
                    style={{ height: "100%" }}
                    title="Data(Please fill the Info first)"
                  >
                    <Divider>
                      <Col xs={24} sm={24} md={24} xl={24}>
                        <Upload
                          disabled={!state}
                          style={{ width: "100%" }}
                          name="file"
                          accept=".txt, .csv"
                          maxCount={1}
                          onRemove={() => {
                            setFileData([]);
                          }}
                          beforeUpload={(file) => {
                            let isCSV =
                              file.type === "application/csv" ||
                              file.type === "text/csv";

                            if (!isCSV) {
                              message.error(`${file.name} is not a csv file`);
                            }
                            return isCSV || Upload.LIST_IGNORE;
                          }}
                          onChange={onFileChange}
                        >
                          <Button
                            disabled={!state}
                            style={{ width: "100%" }}
                            type="dashed"
                          >
                            Get input from a CSV file
                          </Button>
                        </Upload>
                      </Col>
                    </Divider>
                    <Row gutter={[16, 0]}>
                      <Col xs={24} sm={24} md={24} xl={24}>
                        <br />
                      </Col>
                      <Card>
                        <Row gutter={[16, 0]}>
                          <Col xs={24} sm={24} md={12} xl={12}>
                            <Form.Item
                              label="X(max)"
                              rules={[
                                {
                                  required: true,
                                  validator: (_, val) => {
                                    return isNaN(val)
                                      ? Promise.reject("not a valid number")
                                      : Number(val)
                                      ? Promise.resolve()
                                      : Promise.reject("not a valid number");
                                  },
                                },
                              ]}
                              name="max_x"
                            >
                              <Input
                                disabled={!state}
                                placeholder="Write here"
                              />
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
                                      : Number(val)
                                      ? Promise.resolve()
                                      : Promise.reject("not a valid number");
                                  },
                                },
                              ]}
                              name="min_x"
                            >
                              <Input
                                disabled={!state}
                                placeholder="Write here"
                              />
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
                                      : Number(val)
                                      ? Promise.resolve()
                                      : Promise.reject("not a valid number");
                                  },
                                },
                              ]}
                              name="max_y"
                            >
                              <Input
                                disabled={!state}
                                placeholder="Write here"
                              />
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
                                      : Number(val)
                                      ? Promise.resolve()
                                      : Promise.reject("not a valid number");
                                  },
                                },
                              ]}
                              name="min_y"
                            >
                              <Input
                                disabled={!state}
                                placeholder="Write here"
                              />
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
                                      : Number(val)
                                      ? Promise.resolve()
                                      : Promise.reject("not a valid number");
                                  },
                                },
                              ]}
                              name="max_z"
                            >
                              <Input
                                disabled={!state}
                                placeholder="Write here"
                              />
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
                                      : Number(val)
                                      ? Promise.resolve()
                                      : Promise.reject("not a valid number");
                                  },
                                },
                              ]}
                              name="min_z"
                            >
                              <Input
                                disabled={!state}
                                placeholder="Write here"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    </Row>
                  </Card>
                </Tooltip>
              </Col>
              <Col xs={24} sm={24} md={24} xl={24}>
                {fileData && fileData?.length !== 0 && (
                  <Card size="sm">
                    <ChartRecord data={fileData} />
                  </Card>
                )}
              </Col>
            </Row>
          </Form>
        </Spin>
      </Content>
    </Drawer>
  );
};

export default COERecord;
