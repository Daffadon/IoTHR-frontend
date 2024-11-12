import UserLayout from '../../components/layout/UserLayout';

const Contact = () => {
  return (
    <UserLayout>
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold ">CONTACT</h1>
        <div className="mt-3 text-center">
          <h3>Admin: 0821-1233-2131</h3>
          <h3>Doctor: xxx-xxxx-xxxx</h3>
        </div>
      </div>
    </UserLayout>
  );
};

export default Contact;
