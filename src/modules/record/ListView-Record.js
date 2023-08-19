import { Table, Space, Tooltip, message } from "antd";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useGetRecordListQuery } from "@redux/slice/record";
import SortableTableHeader from "@components/core/SortableTableHeader";
import { toQueryString } from "@helpers/util";
import { useEffect } from "react";

const ListViewRecord = ({ onUpdateSortQuery, onItemActionSelect }) => {

  const router = useRouter();
  const {
    data: recordData,
    isLoading: recordLoader,
    isFetching,
    error,
  } = useGetRecordListQuery(router.query, {
    refetchOnMountOrArgChange: true,
    fixedCacheKey: "shared-record-update-mutation",
  });

  useEffect(()=>{
    
    if(error){
      message.error((error?.data?.message || error?.error )?? "Operation failed");
    }
  },[error])

  const columns = [
    {
      title: "SL No",
      key: "serial-record",
      editable: false,
      render: (item, _, index) => {
        return (
          <div>
            {(parseInt(router.query?.page ?? "0") - 1) *
              (parseInt(router.query?.count) ?? 0) +
              index +
              1}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action-record",
      ellipsis: false,
      // width: 150,
      ellipsis: false,
      render: (item, index) => {
        return (
          <Space size="middle">
            <a
              onClick={(e) => {
                e.stopPropagation();
                onItemActionSelect({ item, type: "view" });
              }}
            >
              View
            </a>
            <a
              onClick={(e) => {
                e.stopPropagation();
                onItemActionSelect({ item, type: "edit" });
              }}
            >
              Edit
            </a>
            <a
              onClick={(e) => {
                e.stopPropagation();
                onItemActionSelect({ item, type: "delete" });
              }}
              style={{ color: "red" }}
            >
              Delete
            </a>
          </Space>
        );
      },
    },
    {
      title: (
        <SortableTableHeader
          property="name"
          sort_by={router.query?.sort_by ?? ""}
          sort_order={router.query?.sort_order ?? ""}
          onClick={({ sort_by }) => {
            onUpdateSortQuery({ sort_by });
          }}
          title="Project name"
        />
      ),
      dataIndex: "name",
      key: "name-record",
      ellipsis: false,
    },
    {
      title: (
        <SortableTableHeader
          property="client"
          sort_by={router.query?.sort_by ?? ""}
          sort_order={router.query?.sort_order ?? ""}
          onClick={({ sort_by }) => {
            onUpdateSortQuery({ sort_by });
          }}
          title="Client"
        />
      ),
      dataIndex: "client",
      key: "client-record",
      ellipsis: false,
      render: (item) => {
        return <>{item ?? "[n/a]"}</>;
      },
    },
    {
      title: (
        <SortableTableHeader
          property="contractor"
          sort_by={router.query?.sort_by ?? ""}
          sort_order={router.query?.sort_order ?? ""}
          onClick={({ sort_by }) => {
            onUpdateSortQuery({ sort_by });
          }}
          title="Contractor"
        />
      ),
      dataIndex: "contractor",
      key: "contractor-record",
      ellipsis: false,
      render: (item) => {
        return <>{item ?? "[n/a]"}</>;
      },
    },
    {
      title: (
        <SortableTableHeader
          property="max_x"
          sort_by={router.query?.sort_by ?? ""}
          sort_order={router.query?.sort_order ?? ""}
          onClick={({ sort_by }) => {
            onUpdateSortQuery({ sort_by });
          }}
          title="X(Max)"
        />
      ),
      dataIndex: "max_x",
      key: "max_x-record",
      ellipsis: false,
    },
    {
      title: (
        <SortableTableHeader
          property="min_x"
          sort_by={router.query?.sort_by ?? ""}
          sort_order={router.query?.sort_order ?? ""}
          onClick={({ sort_by }) => {
            onUpdateSortQuery({ sort_by });
          }}
          title="X(Min)"
        />
      ),
      dataIndex: "min_x",
      key: "min_x-record",
      ellipsis: false,
    },
    {
      title: (
        <SortableTableHeader
          property="max_y"
          sort_by={router.query?.sort_by ?? ""}
          sort_order={router.query?.sort_order ?? ""}
          onClick={({ sort_by }) => {
            onUpdateSortQuery({ sort_by });
          }}
          title="Y(Max)"
        />
      ),
      dataIndex: "max_y",
      key: "max_y-record",
      ellipsis: false,
    },
    {
      title: (
        <SortableTableHeader
          property="min_y"
          sort_by={router.query?.sort_by ?? ""}
          sort_order={router.query?.sort_order ?? ""}
          onClick={({ sort_by }) => {
            onUpdateSortQuery({ sort_by });
          }}
          title="Y(Min)"
        />
      ),
      dataIndex: "min_y",
      key: "min_y-record",
      ellipsis: false,
    },
    {
      title: (
        <SortableTableHeader
          property="max_z"
          sort_by={router.query?.sort_by ?? ""}
          sort_order={router.query?.sort_order ?? ""}
          onClick={({ sort_by }) => {
            onUpdateSortQuery({ sort_by });
          }}
          title="Z(Max)"
        />
      ),
      dataIndex: "max_z",
      key: "max_z-record",
      ellipsis: false,
    },
    {
      title: (
        <SortableTableHeader
          property="min_z"
          sort_by={router.query?.sort_by ?? ""}
          sort_order={router.query?.sort_order ?? ""}
          onClick={({ sort_by }) => {
            onUpdateSortQuery({ sort_by });
          }}
          title="Z(Min)"
        />
      ),
      dataIndex: "min_z",
      key: "min_z-record",
      ellipsis: false,
    },
    {
      title: (
        <SortableTableHeader
          property="createdAt"
          sort_by={router.query?.sort_by ?? ""}
          sort_order={router.query?.sort_order ?? ""}
          onClick={({ sort_by }) => {
            onUpdateSortQuery({ sort_by });
          }}
          title="Created at"
        />
      ),
      key: "created-at-record",
      dataIndex: "createdAt",
      ellipsis: false,
      render: (item) => {
        return (
          <div>{item ? dayjs(item).format("DD-MM-YYYY, h:mm a") : "n/a"}</div>
        );
      },
    },
  ];

  const updatePagination = ({ page, pageSize }) => {
    router.replace(
      "/record" +
        toQueryString({
          ...router.query,
          page: page,
          count: pageSize,
        })
    );
  };

  return (
    <div>
      <br />
      <p style={{ fontSize: "0.8rem", marginBottom: "1rem", color: "gray" }}>
        {`   Page: ${recordData?.data?.data?.meta?.current ?? 1} out of ${
          recordData?.data?.data?.meta?.last_page ??
          recordData?.data?.data?.meta?.current ??
          1
        } | Showing results: ${
          recordData?.data?.data?.meta?.results ?? 0
        } out of ${recordData?.data?.data?.meta?.total ?? 0}`}
      </p>
      <br />
      <Table
        scroll={{ x: 500 }}
        loading={recordLoader}
        size="small"
        columns={columns}
        dataSource={recordData?.data?.data?.results}
        // onRow={(item, index) => {
        //   return {
        //     onClick: () => onItemSelect({ item, index }),
        //   };
        // }}
        pagination={{
          showSizeChanger: true,
          // defaultPageSize: pageSize,
          pageSize: router?.query?.count ?? 0,
          current: recordData?.data?.data?.meta?.current ?? 1,
          total: recordData?.data?.data?.meta?.total ?? 0,
          onChange: (page, pageSize) => {
            updatePagination({ page, pageSize });
          },
        }}
      />
    </div>
  );
};

export default ListViewRecord;
