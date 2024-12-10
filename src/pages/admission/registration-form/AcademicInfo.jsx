import InputField from "../../../components/forms/Inputfield";
import SelectField from "../../../components/forms/SelectField";
import Button from "../../../components/ui/Button";
import OutlineButton from "../../../components/ui/OutlineButton"
import { useForm } from "react-hook-form";

const AcademicInfo = () => {
  
  const { control } = useForm({
    defaultValues: {
      category: "",
      gender: "",
      religion: "",
      nationality: "",
      city: "",
      state: "",
      stateofdomicile: "",
    },
  });

  const Gender = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const Religion = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const Nationality = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const City = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const State = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const Stateofdomicile = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
      <form
        action=""
        className={`w-full bg-white-default`}
      >
        <h1 className="text-primary-default">Academic Info</h1>
        <div className="flex gap-10">
          <div className="w-full mt-0">
            <InputField
              label="BFUHS REGISTRATION ID "
              labelclass="font-medium"
            />
          </div>
          <div className="w-full mt-0">
            <InputField
              label="NEET PG 2024 ROLL NO."
              labelclass="font-medium"
            />
          </div>
          <div className="w-full mt-0">
            <InputField
              label="Name of the Applicant *"
              labelclass="font-medium"
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-full">
            <InputField label="Date of Birth *" labelclass="font-medium" />
          </div>
          <div className="w-full">
            <SelectField
              name="gender"
              control={control}
              label="Gender *"
              labelclass="mb-2"
              options={Gender}
              placeholder="Select a Gender"
              rules={{ required: "Gender is required" }}
              className="flex flex-wrap flex-col mt-6"
            />
          </div>
          <div className="w-full">
            <SelectField
              name="nationality"
              control={control}
              label="Nationality *"
              labelclass="mb-2"
              options={Nationality}
              placeholder="Select a Nationality"
              rules={{ required: "Category is required" }}
              className="flex flex-wrap flex-col mt-6"
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-full">
            <SelectField
              name="religion"
              control={control}
              label="Religion *"
              labelclass="mb-2"
              options={Religion}
              placeholder="Select a Relegion"
              rules={{ required: "Relegion is required" }}
              className="flex flex-wrap flex-col mt-6"
            />
          </div>
          <div className="w-full">
            <InputField
              label="Correspondence Address *"
              labelclass="font-medium"
            />
          </div>
          <div className="w-full">
            <SelectField
              name="city"
              control={control}
              label="City *"
              labelclass="mb-2"
              options={City}
              placeholder="Select a City"
              rules={{ required: "City is required" }}
              className="flex flex-wrap flex-col mt-6"
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-full">
            <SelectField
              name="state"
              control={control}
              label="State *"
              labelclass="mb-2"
              options={State}
              placeholder="Select a State"
              rules={{ required: "State is required" }}
              className="flex flex-wrap flex-col mt-6"
            />
          </div>
          <div className="w-full">
            <InputField label="Pin *" labelclass="font-medium" />
          </div>
          <div className="w-full">
            <InputField label="Email *" labelclass="font-medium" />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-full">
            <InputField label="State of Domicile *" labelclass="font-medium" />
          </div>
          <div className="w-full">
            <InputField label="Mobile No. 1" labelclass="font-medium" />
          </div>
          <div className="w-full">
            <InputField label="Mobile No. 2" labelclass="font-medium" />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-full">
            <InputField label="Aadhar Number *" labelclass="font-medium" />
          </div>
          <div className="w-full">
            <InputField label="Father’s Name *" labelclass="font-medium" />
          </div>
          <div className="w-full">
            <InputField label="Mother’s Name *" labelclass="font-medium" />
          </div>
        </div>
        <div className="mt-5 flex justify-between">
          <OutlineButton text="Previous"
            classname="[&]:rounded-full self-end [&]:px-8 [&]:py-2.5 [&]:text-primary-default border-primary-default" />
          <Button
            text="Next"
            classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
          />
        </div>
      </form>
  );
};

export default AcademicInfo;
