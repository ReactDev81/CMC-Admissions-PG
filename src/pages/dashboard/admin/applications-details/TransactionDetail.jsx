import InputField from "../../../../components/forms/Inputfield";
import SelectField from "../../../../components/forms/SelectField";
import { useForm } from "react-hook-form";

const PersonalInformation = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
    },
  });
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <form action="" className={`w-full bg-white-default rounded-md `}>
      <div className="flex gap-10">
        <div className="w-full mt-0">
          <InputField label="Amount Paid" labelclass="font-medium" />
        </div>
        <div className="w-full mt-0">
          <InputField label="Date of Birth" labelclass="font-medium" />
        </div>
        <div className="w-full mt-0">
          <InputField label="UTR/Transaction ID" labelclass="font-medium" />
        </div>
      </div>
      <div className="flex gap-10 items-end">
        <div className="w-full">
          <InputField
            label="Mode of Payment(NEFT, RTGS, IMPS, GPay etc)"
            labelclass="font-medium"
          />
        </div>
        <div className="w-full">
          <InputField label="Sender’s Name" labelclass="font-medium" />
        </div>
        <div className="w-full">
          <SelectField
            name="category"
            control={control}
            label="Sender’s Branch"
            labelclass="mb-2"
            options={options}
            placeholder="Select a Nationality"
            rules={{ required: "Category is required" }}
            className="flex flex-wrap flex-col mt-6"
          />
        </div>
      </div>
    </form>
  );
};

export default PersonalInformation;
