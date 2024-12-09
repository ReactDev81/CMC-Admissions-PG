import Inputfield from "../../../components/forms/Inputfield";
import SelectField from "../../../components/forms/SelectField";
import RadioBtn from "../../../components/ui/radiobtn";
import Button from "../../../components/ui/Button";
import { useForm } from "react-hook-form";

const PersonalInfo = () => {
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
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

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
        <h1 className="text-primary-default">Personal Info</h1>
        <div className="flex gap-10">
          <div className="w-full mt-0">
            <Inputfield
              label="BFUHS REGISTRATION ID "
              labelclass="font-medium"
            />
          </div>
          <div className="w-full mt-0">
            <Inputfield
              label="NEET PG 2024 ROLL NO."
              labelclass="font-medium"
            />
          </div>
          <div className="w-full mt-0">
            <Inputfield
              label="Name of the Applicant *"
              labelclass="font-medium"
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-full">
            <Inputfield label="Date of Birth *" labelclass="font-medium" />
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
            <Inputfield
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
            <Inputfield label="Pin *" labelclass="font-medium" />
          </div>
          <div className="w-full">
            <Inputfield label="Email *" labelclass="font-medium" />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-full">
            <Inputfield label="State of Domicile *" labelclass="font-medium" />
          </div>
          <div className="w-full">
            <Inputfield label="Mobile No. 1" labelclass="font-medium" />
          </div>
          <div className="w-full">
            <Inputfield label="Mobile No. 2" labelclass="font-medium" />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-full">
            <Inputfield label="Aadhar Number *" labelclass="font-medium" />
          </div>
          <div className="w-full">
            <Inputfield label="Father’s Name *" labelclass="font-medium" />
          </div>
          <div className="w-full">
            <Inputfield label="Mother’s Name *" labelclass="font-medium" />
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <RadioBtn />
          </div>
        </div>
        <div className="text-right mt-5">
          <Button
            text="Next"
            classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
          />
        </div>
      </form>
  );
};

export default PersonalInfo;
