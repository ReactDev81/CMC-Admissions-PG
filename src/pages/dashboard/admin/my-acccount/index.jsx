import ChangePassword from "./changepassword";
import Profile from "./Profile";
const MyAccount = () => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <Profile />
        <ChangePassword />
      </div>
    </div>
  );
};

export default MyAccount;
