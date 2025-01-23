import { useForm } from "react-hook-form";
import InputField from "../../../../components/forms/Inputfield";
import SelectField from "../../../../components/forms/SelectField";
import Button from "../../../../components/ui/Button";

const Mail = () => {
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
    <>
      <div className="notification-settings border rounded-md">
        <div className="p-5 border-b">
          <h2 className="text-black-default mb-2.5">Mail Configuration</h2>
          <p className="text-black-300 font-normal">
            Configure the email settings for your application. Ensure the
            information provided here is correct to send emails successfully.
          </p>
        </div>
        <div className="p-5 w-full max-w-[530px]">
          <SelectField
            name="category"
            control={control}
            options={options}
            placeholder="Smtp"
            rules={{ required: "option is required" }}
            className="flex flex-wrap flex-col w-full text-black-default mb-5"
            label="Mail Driver"
          />

          <InputField
            label="Mail Host"
            placeholder="smtp.mailtrap.io"
            type="text"
            className="text-black-default mb-5"
          />

          <InputField
            label="Mail Port"
            placeholder="587"
            type="text"
            className="text-black-default mb-5"
          />

          <InputField
            label="Mail Username"
            placeholder="hostingeremailuser"
            type="text"
            className="text-black-default mb-5"
          />

          <InputField
            label="Mail Password"
            type="password"
            placeholder="Enter your password"
            className="text-black-default mb-5"
          />

          <SelectField
            name="category"
            control={control}
            options={options}
            placeholder="Select Encryption Type"
            rules={{ required: "option is required" }}
            className="flex flex-wrap flex-col w-full text-black-default mb-5"
            label="Mail Encryption"
          />

          <InputField
            label="From Name"
            placeholder="CMC Ludhiana"
            type="text"
            className="text-black-default mb-5"
          />

          <InputField
            label="From Email"
            placeholder="admin@cmcadmissions.com"
            type="text"
            className="text-black-default mb-5"
          />

          <InputField
            label="Reply-To Email"
            placeholder="support@example.com"
            type="text"
            className="text-black-default"
          />
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

export default Mail;
