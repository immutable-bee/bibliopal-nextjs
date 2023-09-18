import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        >
          Business Name
        </th>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        >
          Email
        </th>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        >
          State
        </th>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        >
          Membership
        </th>
      </tr>
    </thead>
  );
};

const TableBody = ({ userData }) => {
  return (
    <tbody className="border-2 text-gray-700 text-xs sm:text-sm font-light border-[rgb(222, 226, 230)]">
      {userData.map((row) => (
        <tr className="border-b" key={row.id}>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {row?.business_name}
          </td>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {row?.email}
          </td>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {row?.business_state}
          </td>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {row?.membership}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const AdminTable = () => {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    const response = await fetch("/api/admin/fetchUsers");

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    setUserData(data);
  };

  useEffect(() => {
    if (!user) return;

    if (user.business.email === "neurogoop@gmail.com" || "nate@bibliopal.com") {
      setIsAdmin(true);
      fetchUserData();
    } else {
      router.push("/");
    }
  }, [user]);

  return isAdmin ? (
    <div className="relative mt-6 overflow-x-auto">
      <table className="w-full rounded-lg border-2 border-[rgb(222, 226, 230)]  text-sm text-left text-gray-500 ">
        <TableHead />
        <TableBody userData={userData} />
      </table>
    </div>
  ) : (
    <div className="flex justify-center">
      <h1>You do not have permission</h1>
    </div>
  );
};

export default AdminTable;
