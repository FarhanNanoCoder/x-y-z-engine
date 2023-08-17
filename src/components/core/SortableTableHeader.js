import React from "react";
import { NavArrowDown, NavArrowUp } from "iconoir-react";
import { Tooltip } from "antd";

const SortableTableHeader = ({
  sort_by,
  sort_order = "",
  property = "",
  title = "Sortable header",
  onClick,
}) => {
  return (
    <Tooltip
      title={
        sort_by !== property
          ? "Click to sort in ascending order"
          : sort_order === "asc"
          ? "Click to  sort in descending order"
          : sort_order === "desc"
          ? "Click here to cancel sort"
          : "Click to  sort in ascending order:"
      }
    >
      <div
        className={`${property} sortable-table-header ${sort_by===property?"active":" "}`}
        style={{
          width: "100%",
          display: "flex",
          gap: "0.5rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={() => onClick({ sort_by: property })}
      >
        <p style={{ margin: 0 }}>{title}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem",
          }}
        >
          <NavArrowUp
            color={
              sort_by && sort_by === property && sort_order === "asc"
                ? "blue"
                : "gray"
            }
          />
          <NavArrowDown
            color={
              sort_by && sort_by === property && sort_order === "desc"
                ? "blue"
                : "gray"
            }
          />
        </div>
      </div>
    </Tooltip>
  );
};

export default SortableTableHeader;
