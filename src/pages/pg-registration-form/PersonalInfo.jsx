import Inputfield from "../../components/forms/Inputfield";
import SelectField from "../../components/forms/SelectField";
import RadioField from "../../components/forms/RadioField";
import Button from "../../components/ui/Button";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/UseAxios"
import { useEffect } from "react";

const PersonalInfo = ({activeTab, setActiveTab}) => {

  const { status, loading, error, fetchData } = useAxios('/applications', 'post');

  const { register, control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      gender: "",
    },
  });

  const Gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (formData) => {

    const formattedData = {
      ...formData,
      date_of_birth: formatDate(formData.date_of_birth), // Format the date_of_birth field
      step: "personal", // Include the step field
    };
    // Send the data to the API
    await fetchData({ data: formattedData });
  
  };

  useEffect(() => {
    if(status === 201) {
      setActiveTab(activeTab + 1);
    }
  }, [status])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full mt-2.5'>
      <div className="grid grid-cols-3 gap-7">
          <Inputfield 
            label="Name of Applicant"
            {...register("name", { required: true})}
            error={errors.name?.type === 'required' ? "Name is required" : undefined}
          />
          <Inputfield 
            type="number"
            label="BFUHS Registration Id" 
            {...register("bfuhs_regstration_id", { required: true, maxLength: 25})}
            error={errors.bfuhs_regstration_id?.type === 'required' ? "BFUHS Registration Id is required" : errors.bfuhs_regstration_id?.type === 'required' ? 'BFUHS Registration Id is not greather than 25 number' : undefined}
          />
          <Inputfield
            type="number" 
            label="NEET PG 2024 Roll No."
            {...register("roll_number", { required: true, maxLength: 25})}
            error={errors.roll_number?.type === 'required' ? "Roll No is required" : errors.roll_number?.type === 'maxLength' ? "Roll No is not greather than 25 number" : undefined}
          />
          <Inputfield 
            label="Date of Birth" 
            type="date" 
            {...register("date_of_birth", { required: true})}
            error={errors.date_of_birth?.type === 'required' ? "DOB No is required" : undefined}
          />
          <SelectField
            name="gender"
            control={control}
            label="Gender"
            options={Gender}
            placeholder="Select a Gender"
          />
          <Inputfield 
            label="Nationality" 
            {...register("nationality", { required: true})}
            error={errors.nationality?.type === 'required' ? "Nationality is required" : undefined}
          />
          <Inputfield 
            label="Religion" 
            {...register("religion", { required: true})}
            error={errors.religion?.type === 'required' ? "Religion is required" : undefined}
          />
          <Inputfield 
            label="Correspondence Address" 
            {...register("correspondence_address", { required: true})}
            error={errors.correspondence_address?.type === 'required' ? "Correspondence Address is required" : undefined}
          />
          <Inputfield 
            label="City" 
            {...register("city", { required: true})}
            error={errors.city?.type === 'required' ? "City is required" : undefined}
          />
          <Inputfield 
            label="State" 
            {...register("state", { required: true})}
            error={errors.state?.type === 'required' ? "State is required" : undefined}
          />
          <Inputfield 
            type="number"
            label="Pin" 
            {...register("pin", { required: true})}
            error={errors.pin?.type === 'required' ? "Pin is required" : undefined}
          />
          <Inputfield 
            label="Email" 
            {...register("email", { required: true})}
            error={errors.email?.type === 'required' ? "Email is required" : undefined}
          />
          <Inputfield
            type="number" 
            label="Mobile No. 1"
            {...register("mobile_1", { required: true, minLength: 12, maxLength: 12 })}
            error={errors.mobile_1?.type === 'required' ? "Mobile No is required" : errors.mobile_1?.type === 'minLength' ||  errors.mobile_1?.type === 'maxLength' ? 'Mobile No must have at least 12 digit' : undefined}
          />
          <Inputfield 
            type="number"
            label="Mobile No. 2" 
            {...register("mobile_2")}
          />
          <Inputfield 
            label="State of Domicile" 
            {...register("state_of_domicile", { required: true})}
            error={errors.state_of_domicile?.type === 'required' ? "State is required" : undefined}
          />
          <Inputfield
            type="number" 
            label="Aadhar Number" 
            {...register("aadhar_no", { required: true, minLength: 12, maxLength: 12 })}
            error={errors.aadhar_no?.type === 'required' ? "Aadhar Number is required" : errors.aadhar_no?.type === 'minLength' || errors.aadhar_no?.type === 'maxLength' ? 'The aadhar no field must have at least 12 digits' : undefined}
          />
          <Inputfield 
            label="Father’s Name" 
            {...register("father_name", { required: true})}
            error={errors.father_name?.type === 'required' ? "Father’s Name is required" : undefined}
          />
          <Inputfield 
            label="Mother’s Name" 
            {...register("mother_name", { required: true})}
            error={errors.mother_name?.type === 'required' ? "Mother’s Name is required" : undefined}
          />
          <RadioField 
            label="Are Your Parents Graduates"
            name="are_parents_graduates"
            control={control}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
      </div>
      {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal">{error}</p>}
      <div className="text-right mt-8">
        <Button
          type="submit"
          text={loading ? 'Loading....' : "Save"}
          classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
        />
      </div>
    </form>
  );
};

export default PersonalInfo;
