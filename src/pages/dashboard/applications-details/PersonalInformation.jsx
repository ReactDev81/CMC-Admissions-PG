import Inputfield from '../../../components/forms/Inputfield'
import SelectField from "../../../components/forms/SelectField";
import { useForm } from 'react-hook-form';
const PersonalInformation = () => {

    const {control,handleSubmit,formState: { errors }} = useForm({
      defaultValues: {
        category: '',
      },
    });

    const category = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];

    const nationality = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];

  return (
    <form action="" className={`w-full bg-white-default rounded-md `}>
      <div className="flex gap-10">
        <div className="w-full">
          <Inputfield label="Name of Application" labelclass="font-medium" className="[&]:mt-0" />
        </div>
        <div className="w-full">
          <Inputfield label="BFUHS Registration Id" labelclass="font-medium" className="[&]:mt-0" />
        </div>
        <div className="w-full">
          <Inputfield label="NEET pg 2024 Roll No." labelclass="font-medium" className="[&]:mt-0" />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="w-full">
          <Inputfield label="Date of Birth" labelclass="font-medium" />
        </div>
        <div className="w-full">
          <SelectField
            name="category"
            control={control}
            label="Category"
            labelclass="mb-2"
            options={category}
            placeholder="Select a category"
            rules={{ required: "Category is required" }}
            className="flex flex-wrap flex-col mt-6"
          />
        </div>
        <div className="w-full">
        <SelectField
            name="category"
            control={control}
            label="Nationality"
            labelclass="mb-2"
            options={nationality}
            placeholder="Select a category"
            rules={{ required: "Category is required" }}
            className="flex flex-wrap flex-col mt-6"
          />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="w-full">
          <Inputfield label="Religion" labelclass="font-medium" />
        </div>
        <div className="w-full">
          <Inputfield label="Address" labelclass="font-medium" />
        </div>
        <div className="w-full">
          <Inputfield label="City" labelclass="font-medium" />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="w-full">
          <Inputfield label="State" labelclass="font-medium" />
        </div>
        <div className="w-full">
          <Inputfield label="Pin" labelclass="font-medium" />
        </div>
        <div className="w-full">
          <Inputfield label="Email" labelclass="font-medium" />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="w-full">
          <Inputfield label="Mobile No. 1" labelclass="font-medium" />
        </div>
        <div className="w-full">
          <Inputfield label="Mobile No. 2" labelclass="font-medium" />
        </div>
        <div className="w-full">
          <Inputfield label="State of domicile" labelclass="font-medium" />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="w-full">
          <Inputfield label="Adhar Number" labelclass="font-medium" />
        </div>
        <div className="w-full">
          <Inputfield label="Father’s Name" labelclass="font-medium" />
        </div>
        <div className="w-full">
          <Inputfield label="Mother’s Name" labelclass="font-medium" />
        </div>
      </div>
    </form>
  );
};
export default PersonalInformation;