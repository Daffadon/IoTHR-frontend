import UserLayout from '../components/layout/UserLayout';
// import dummyPict from '../assets/ilustration/profile_dummy.jpg';
import dummypict from '../assets/profpicdummy.jpg';
import { optionsSelection } from '../data/page/analysis/options';
const Profile = () => {
  return (
    <UserLayout>
      <h1 className="text-center py-5 font-bold text-2xl">Welcome to Your Profile Page!</h1>
      <div className="flex justify-center items-center">
        <img src={dummypict} alt="" className="rounded-full w-40 h-40 object-cover" />
      </div>
      <h1 className="text-center text-2xl pt-5">Daffa Putra Narendra</h1>
      <h2 className="text-center text-lg">daffadummy@gmail.com</h2>
      <h3 className="text-center text-lg">Doctor: dr. Achmad </h3>
      <h6 className="text-center cursor-pointer hover:text-[#1565c0] duration-300">
        Change Your password
      </h6>
      {/* ubah kata santi */}
      {/* history */}
      <h3 className="text-center mt-5">History</h3>
      <div className="flex justify-around items-center mt-3">
        <table className="border-2 border-black rounded-md p-2 w-1/2">
          <thead>
            <tr className="">
              <th className="w-1/2 border border-black py-2">Data Name</th>
              <th className="w-1/2 border border-black py-2">Analyzed</th>
            </tr>
          </thead>
          <tbody>
            {optionsSelection.map((option) => {
              return (
                <tr className="border border-black">
                  <td className="w-1/2 border border-black text-center py-1">{option.label}</td>
                  <td className="w-1/2 border border-black text-center py-1">
                    {option.analyzed ? 'V' : 'X'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Data belum dianalisis */}
      {/* Data telah dianalisis */}

      {/* Admin // suster/perawat */}
      {/* Doctor */}
    </UserLayout>
  );
};

export default Profile;
