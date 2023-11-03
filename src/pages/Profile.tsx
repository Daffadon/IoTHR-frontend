import UserLayout from '../components/layout/UserLayout';
import dummyPict from '../assets/ilustration/profile_dummy.jpg';
const Profile = () => {
  return (
    <UserLayout>
      <h1 className="text-center py-5 font-bold text-2xl">Welcome to Your Profile Page!</h1>
      <div className="flex justify-center items-center">
        <img src={dummyPict} alt="" className="rounded-full w-48 h-48" />
      </div>
      <h1 className="text-center text-3xl pt-5 pb-2">Daffa Putra Narendra</h1>
      <h2 className="text-center text-xl">daffadummy@zzz.com</h2>
      <h3 className="text-center text-xl">Doctor: dr. Achmad </h3>
      <h6>Change Your password</h6>
      {/* ubah kata santi */}
      {/* history */}
      <h3 className="text-center">History</h3>
      <div className="flex justify-around items-center">
        <p>Data belum dianalisis</p>
        <p>Data telah dianalisis</p>
      </div>
      {/* Data belum dianalisis */}
      {/* Data telah dianalisis */}

      {/* Admin // suster/perawat */}
      {/* Doctor */}
    </UserLayout>
  );
};

export default Profile;
