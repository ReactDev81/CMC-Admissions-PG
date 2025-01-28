import ToggleButton from "../../../../components/forms/ToggleButton";

const ControlRolesAndPermissions = () => {
  return (
    <div className="p-5 bg-white-default shadow-flex w-full rounded-md">
      <h2 className="text-black-default font-medium capitalize mb-5">
        Roles & Permissions
      </h2>
      <div className="border rounded-md">
        <div className="flex border-b w-full">
          <p className="text-lg text-black-default basis-[40%] py-5 px-8 border-r">
            Roles & Permissions List
          </p>
          <p className="text-lg text-black-default basis-[20%] py-5 px-8 border-r">
            Admin
          </p>
          <p className="text-lg text-black-default basis-[20%] py-5 px-8 border-r">
            Manager
          </p>
          <p className="text-lg text-black-default basis-[20%] py-5 px-8">
            Student
          </p>
        </div>
        <div className="flex border-b w-full">
          <p className="text-base font-normal text-black-default basis-[40%] py-5 px-8 border-r">
            Roles & Permissions List
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8 border-r">
            <ToggleButton />
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8 border-r">
            <ToggleButton />
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8">
            <ToggleButton />
          </p>
        </div>
        <div className="flex border-b w-full">
          <p className="text-base font-normal text-black-default basis-[40%] py-5 px-8 border-r">
            Roles & Permissions List
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8 border-r">
            <ToggleButton />
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8 border-r">
            <ToggleButton />
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8">
            <ToggleButton />
          </p>
        </div>
        <div className="flex border-b w-full">
          <p className="text-base font-normal text-black-default basis-[40%] py-5 px-8 border-r">
            Roles & Permissions List
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8 border-r">
            <ToggleButton />
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8 border-r">
            <ToggleButton />
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8">
            <ToggleButton />
          </p>
        </div>
        <div className="flex border-b w-full">
          <p className="text-base font-normal text-black-default basis-[40%] py-5 px-8 border-r">
            Roles & Permissions List
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8 border-r">
            <ToggleButton />
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8 border-r">
            <ToggleButton />
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8">
            <ToggleButton />
          </p>
        </div>
        <div className="flex w-full">
          <p className="text-base font-normal text-black-default basis-[40%] py-5 px-8 border-r">
            Roles & Permissions List
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8 border-r">
            <ToggleButton />
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8 border-r">
            <ToggleButton />
          </p>
          <p className="text-base font-normal text-black-default basis-[20%] py-5 px-8">
            <ToggleButton />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ControlRolesAndPermissions;
