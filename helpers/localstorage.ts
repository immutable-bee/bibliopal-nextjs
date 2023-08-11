import { DEFAULT_TABLE_DATA, TableData } from "../context/TableDataContext";

const TABLE_DATA_KEY = "table-data";
const FUTURE_TABLE_DATA_KEY = "future-table-data";

const setTableDataToStorage = (tableData: TableData) => {
  const tableDataAsString = JSON.stringify(tableData);

  return window.localStorage.setItem(TABLE_DATA_KEY, tableDataAsString);
};

const setFutureTableDataToStorage = (futureTableData: TableData) => {
  const futureTableDataAsString = JSON.stringify(futureTableData);

  return window.localStorage.setItem(
    FUTURE_TABLE_DATA_KEY,
    futureTableDataAsString
  );
};

const getTableDataFromStorage = (): TableData => {
  const tableDataAsString = window.localStorage.getItem(TABLE_DATA_KEY);

  if (tableDataAsString) {
    const tableData = JSON.parse(tableDataAsString);
    return tableData;
  }

  return DEFAULT_TABLE_DATA;
};

const getFutureTableDataFromStorage = (): TableData => {
  const futureTableDataAsString = window.localStorage.getItem(
    FUTURE_TABLE_DATA_KEY
  );

  if (futureTableDataAsString) {
    const tableData = JSON.parse(futureTableDataAsString);
    return tableData;
  }

  return DEFAULT_TABLE_DATA;
};

export {
  getTableDataFromStorage,
  setTableDataToStorage,
  getFutureTableDataFromStorage,
  setFutureTableDataToStorage,
};
