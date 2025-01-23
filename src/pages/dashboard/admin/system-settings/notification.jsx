import ToggleButton from "../../../../components/forms/ToggleButton";
import Button from "../../../../components/ui/Button";

const Notification = () => {
  return (
    <>
      <div className="flex gap-7">
        <div className="notification-settings basis-1/2 border rounded-md">
          <div className="p-5">
            <h2 className="text-black-default mb-2.5">User Notifications</h2>
            <p className="text-black-300 font-normal">
              Lorem ipsum dolor sit amet consectetur adipiscing elit dui, mi
              facilisis malesuada leo sem dictum turpis cursus varius.
            </p>
          </div>
          <div className="grid ">
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">User Login Email</p>
              <ToggleButton />
            </div>
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                Password Reset OTP
              </p>
              <ToggleButton />
            </div>
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                Password Reset Successfully
              </p>
              <ToggleButton />
            </div>
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                Application Submitted
              </p>
              <ToggleButton />
            </div>
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                Application Changes Asked
              </p>
              <ToggleButton />
            </div>
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                Application Approved
              </p>
              <ToggleButton />
            </div>
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                Application Rejected
              </p>
              <ToggleButton />
            </div>
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                Application Incomplete
              </p>
              <ToggleButton />
            </div>
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                Announcements and Updates
              </p>
              <ToggleButton />
            </div>
          </div>
        </div>
        <div className="notification-settings basis-1/2 border rounded-md h-fit">
          <div className="p-5">
            <h2 className="text-black-default mb-2.5">Admin Notifications</h2>
            <p className="text-black-300 font-normal">
              Lorem ipsum dolor sit amet consectetur adipiscing elit dui, mi
              facilisis malesuada leo sem.
            </p>
          </div>
          <div className="grid">
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                Application Submitted
              </p>
              <ToggleButton />
            </div>
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                Application Changes Submitted
              </p>
              <ToggleButton />
            </div>
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                Application Reports
              </p>
              <ToggleButton />
            </div>
            <div className="flex items-center gap-3.5 justify-between border-t p-5">
              <p className="text-black-default font-medium">
                User Support and Feedback
              </p>
              <ToggleButton />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2.5 items-center justify-end mt-6 pt-5 border-t">
        <Button
          text="Cancel"
          classname="px-8 py-2.5 [&]:text-black-300 [&]:rounded-full [&]:bg-primary-200 border-0"
        />
        <Button
          text="Save Changes"
          classname="px-8 py-2.5 [&]:rounded-full border-0"
        />
      </div>
    </>
  );
};

export default Notification;
