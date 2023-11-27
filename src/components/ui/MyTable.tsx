import { Table } from "antd";

type MyTableProps = {
  loading?: boolean;
  columns: any;
  dataSource: any;
  pageSize?: number;
  totalData?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: (pagination: any, filter: any, short: any) => void;
  showPagination?: boolean;
};

const MyTable = ({
  loading = false,
  columns,
  dataSource,
  pageSize = 5,
  totalData,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
}: MyTableProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize,
        total: totalData,
        pageSizeOptions: [5, 10, 15],
        showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
      scroll={{ x: 400 }}
    />
  );
};

export default MyTable;
