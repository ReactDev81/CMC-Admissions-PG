import ChangePassword from "./changepassword";
import MyProfile from "./myprofile";

const MyAccount = () => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <MyProfile />
        <ChangePassword />
      </div>
    </div>
  );
};

export default MyAccount;
