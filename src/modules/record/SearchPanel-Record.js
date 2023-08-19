import DebounceInput from "@components/core/DebouceInput";
import { initQuery } from "@helpers/global";
import {
  extraKeysAfterComparing,
  hasMoreThanQuery,
  toQueryString,
} from "@helpers/util";
import { useGetRecordListQuery } from "@redux/slice/record";
import { Button, Col, DatePicker, Row, Space, Tooltip } from "antd";
import dayjs from "dayjs";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
const SearchPanelRecord = ({
  basePath = "/record",
  onCreate,
  onExport,
  hidePrint = false,
  includeQuery = {},
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, error } = useGetRecordListQuery(
    router.query,
    {
      refetchOnMountOrArgChange: true,
      fixedCacheKey: "shared-record-update-mutation",
    }
  );

  const updateQuery = ({ key, value, obj = {} }) => {
    if (router?.query[key] === value) return;
    if (
      router.query.redirected_from &&
      router.query.redirected_with === key &&
      !value &&
      !obj
    ) {
      //have to remove extra navigator routes
      router.replace(
        basePath +
          toQueryString({
            ...router.query,
            ...includeQuery,

            [key]: value,
            ...obj,
            _id: null,
            // ...defaultRedirectedValues,
          })
      );
    } else {
      if (
        !(!value && !router.query[key]) &&
        (router.query[key] !== value || router.query[key] !== obj)
      ) {
        router.replace(
          basePath +
            toQueryString({
              ...router.query,
              ...includeQuery,
              ...obj,
              [key]: value,
            })
        );
      }
    }
  };

  const onClearAllFilters = () => {
    router.replace(
      basePath +
        toQueryString({
          ...initQuery,
          ...includeQuery,
          // ...defaultRedirectedValues,
        })
    );
  };

  return (
    <div>
      <Space size="middle" direction="vertical" style={{ width: "100%" }}>
        <Row gutter={[16, 12]}>
          <Col xs={24} sm={12} md={4} xl={4}>
            <DebounceInput
              syncWithRouter
              routingProperty="name"
              placeholder="Search by project name"
              onChange={(value) => {
                updateQuery({ key: "name", value });
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={4} xl={4}>
            <DebounceInput
              syncWithRouter
              routingProperty="client"
              placeholder="Search by client"
              onChange={(value) => {
                updateQuery({ key: "client", value });
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={4} xl={4}>
            <DebounceInput
              syncWithRouter
              routingProperty="contractor"
              placeholder="Search by contractor"
              onChange={(value) => {
                updateQuery({ key: "contractor", value });
              }}
            />
          </Col>
          {/* <Col xs={24} sm={12} md={2} xl={2}>
            <DebounceInput
              syncWithRouter
              type="number"
              routingProperty="x_max"
              placeholder="Search by x(max)"
              onChange={(value) => {
                updateQuery({ key: "x_max", value });
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={2} xl={2}>
            <DebounceInput
              syncWithRouter
              routingProperty="x_min"
              type="number"
              placeholder="Search by x(min)"
              onChange={(value) => {
                updateQuery({ key: "x_min", value });
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={2} xl={2}>
            <DebounceInput
              syncWithRouter
              routingProperty="y_max"
              type="number"
              placeholder="Search by y(max)"
              onChange={(value) => {
                updateQuery({ key: "y_max", value });
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={2} xl={2}>
            <DebounceInput
              syncWithRouter
              routingProperty="y_min"
              type="number"
              placeholder="Search by y(min)"
              onChange={(value) => {
                updateQuery({ key: "y_min", value });
              }}
            />
          </Col> */}
          <Col xs={24} sm={12} md={4} xl={4}>
            <Tooltip title="Date from">
              <DatePicker
                style={{ width: "100%" }}
                value={
                  router.query.date_from
                    ? dayjs(router.query.date_from)
                    : undefined
                }
                placeholder="Date from"
                onChange={(date, dateString) => {
                  updateQuery({
                    key: "date_from",
                    value: dateString,
                  });
                }}
              />
            </Tooltip>
          </Col>
          <Col xs={24} sm={12} md={4} xl={4}>
            <Tooltip title="Date to">
              <DatePicker
                style={{ width: "100%" }}
                value={
                  router.query.date_to ? dayjs(router.query.date_to) : undefined
                }
                placeholder="Date to"
                onChange={(date, dateString) => {
                  updateQuery({
                    key: "date_to",
                    value: dateString,
                  });
                }}
              />
            </Tooltip>
          </Col>

          <Col xs={24} sm={12} md={4} xl={4}>
            {hasMoreThanQuery({ query: router.query }) ? (
              <Button
                type="primary"
                danger
                style={{ width: "100%" }}
                onClick={onClearAllFilters}
              >
                {`Clear filters (${extraKeysAfterComparing({
                  obj1: router.query,
                  obj2: initQuery,
                })})`}
              </Button>
            ) : (
              <Button
                type="dashed"
                danger
                style={{ width: "100%" }}
                onClick={onClearAllFilters}
              >
                Clear filters
              </Button>
            )}
          </Col>
        </Row>
        <Row gutter={[16, 12]} justify="end">
          <Col xs={24} sm={12} md={8} xl={4}>
            <Button type="primary" style={{ width: "100%" }} onClick={onCreate}>
              Create
            </Button>
          </Col>

          <Col xs={24} sm={12} md={8} xl={4}>
            <Button
              style={{
                width: "100%",
                color: "white",
                backgroundColor: "#DAB033",
                borderColor: "#DAB033",
              }}
              onClick={() => {}}
            >
              Export to CSV
            </Button>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default SearchPanelRecord;
