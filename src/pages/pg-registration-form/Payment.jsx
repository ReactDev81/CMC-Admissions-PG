import InputField from "../../components/forms/Inputfield";
import Button from "../../components/ui/Button";
import { useForm } from "react-hook-form";

const Payment = () => {
  const {control, handleSubmit, formState: { errors },} = useForm({
    defaultValues: {
      category: "",
    },
  });

  return (
    <form className='w-full mt-2.5'>
      <div className="grid grid-cols-3 gap-7">
        <InputField label="Amount Paid"  />
        <InputField label="UTR/Transaction ID"  />
        <InputField type="date" label="Date of Birth"  />
        <InputField label="Mode of Payment(NEFT, RTGS, IMPS, GPay etc)" />
        <InputField label="Sender’s Name"  />
        <InputField label="Sender’s Branch"  />
      </div>
      <div className="flex justify-end gap-3.5 mt-6">
        <Button
          text="Cancel"
          classname="[&]:py-2.5 [&]:px-7 [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
        />
        <Button
          text="Save Changes"
          classname="[&]:rounded-full px-7 [&]:py-2.5"
        />
      </div>
    </form>
  );
};

export default Payment;
