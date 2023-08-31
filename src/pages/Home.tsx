import UserLayout from '../components/layout/UserLayout';
import { useUserContext } from '../context/userContext';
import feature from '../assets/ilustration/feature.svg';
const Home = () => {
  const { user } = useUserContext();
  return (
    <UserLayout>
      <div className="px-2 py-3 pt-8">
        <h1 className="text-center font-semibold text-xl">
          WELCOME TO DASHBOARD, {user?.name ?? 'DAFFA!'}
        </h1>
        <p className="text-center">Here you can do these following things</p>
        <div className="flex justify-center items-center">
          <img src={feature} />
        </div>
      </div>
    </UserLayout>
  );
};

export default Home;
