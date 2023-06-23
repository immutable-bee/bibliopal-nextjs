import { ActionIcon, Table } from "@mantine/core";
import { useTableDataContext } from "../context/TableDataContext";
import { Delete } from "../assets/svg/delete";
import { DeleteBookRow } from "@/pages";

export interface Rows {
  title: string;
  author: string;
  ISBN: string;
}

const TableHead = () => {
  return (
    <thead className="text-base font-semibold text-gray-700   ">
      <tr>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        >
          Title
        </th>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        >
          Author
        </th>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        >
          ISBN
        </th>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        ></th>
      </tr>
    </thead>
  );
};

const TableBody = ({ deleteBookRow }: { deleteBookRow: DeleteBookRow }) => {
  const { tableData } = useTableDataContext();

  const handleDelete = (ISBN: string) => deleteBookRow(ISBN);

  return (
    <tbody className="border-2 text-gray-700 text-xs sm:text-sm font-light border-[rgb(222, 226, 230)]">
      {tableData.rows.map((row) => (
        <tr className=" border-b  " key={row.ISBN}>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {row?.title}
          </td>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {row?.author}
          </td>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {row?.ISBN}
          </td>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            <ActionIcon onClick={() => handleDelete(row?.ISBN)}>
              <Delete />
            </ActionIcon>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const ContentTable = ({ deleteBookRow }: { deleteBookRow: DeleteBookRow }) => {
  return (
    <div className="relative mt-6 overflow-x-auto">
      <table className="w-full rounded-lg border-2 border-[rgb(222, 226, 230)]  text-sm text-left text-gray-500 ">
        <TableHead />
        <TableBody deleteBookRow={deleteBookRow} />
      </table>
    </div>
  );
};

export default ContentTable;
