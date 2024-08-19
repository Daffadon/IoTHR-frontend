import { useEffect, useState } from "react";
import DoctorLayout from "../../components/layout/DoctorLayout";
import { axiosClient } from "../../lib/axios-client";
import { errorNotification } from "../../components/toast/notification";
import { calculateAge } from "../../utils/calcualteAge";
import { Link } from "react-router-dom";

interface User {
  id: string
  email: string;
  birthDate: string;
  fullname: string;
}

const Patient = () => {
  const [users, setUsers] = useState<User[]>();

  const getUsers = async () => {
    try {
      const { data } = await axiosClient.get("/doctor/user");
      setUsers(data.data);
    } catch (error: any) {
      errorNotification(error.message);
    }
  }
  useEffect(() => {
    getUsers()
  }, [])
  return (
    <DoctorLayout>
      <h1 className="text-center text-2xl font-bold py-5">Patient List</h1>
      {/* search feature */}
      <div className="flex justify-around items-center mt-3">
        <table className="rounded-md p-2 w-3/4">
          <thead>
            <tr>
              <th className="w-1/12 py-2">No</th>
              <th className="w-1/4 py-2">Full Name</th>
              <th className="w-1/4 py-2">Birth Date</th>
              <th className="w-1/4 py-2">Age</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, index) => {
              return (
                <tr key={user.id} className={`text-white mt-2 ${index % 2 == 0 ? "bg-blue-600" : "bg-blue-500"}`}>
                  <td className="w-1/12 text-center py-3">{index + 1}</td>
                  <td className="w-1/4 text-center py-3">{user.fullname}</td>
                  <td className="w-1/4 text-center py-3">{user.birthDate}</td>
                  <td className="w-1/4 text-center py-3">{calculateAge(user.birthDate)} Years old</td>
                  <td className="w-1/4 text-center py-3">
                    <Link to={`/patient/${user.id}`}>
                      <button className="px-3 py-2 bg-white rounded text-black hover:scale-95text-sm font-semibold hover:text-white hover:bg-black duration-150">More Detail</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DoctorLayout>
  );
};

export default Patient;
