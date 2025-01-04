import Inputfield from "../../components/forms/Inputfield";
import SelectField from "../../components/forms/SelectField";
import RadioField from "../../components/forms/RadioField";
import Button from "../../components/ui/Button";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/UseAxios"
import { useEffect } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

const PersonalInfo = ({activeTab, setActiveTab}) => {

  const navigate = useNavigate();
  const {applicationInfo, setApplicationInfo} = useContext(ApplicationContext);
  
  const {userData, setUserData} = useContext(UserContext);
  const Token = userData.token;

  const { register, control, handleSubmit, watch, clearErrors, unregister, reset, formState: { errors }} = useForm({
    defaultValues: {
      gender: "",
    },
  });

  const areParentsGraduates = watch("are_parents_graduates");

  // API hooks for geting application data
  const fetchApplicationData = useAxios( `/applications/${applicationInfo?.application_id}`, "get", { headers: { Authorization: `Bearer ${Token}` } });
  const applicationData = fetchApplicationData.data;
  console.log('applicationData', applicationData);

  // API hook for submitting application data
  const submitApplicationData = useAxios("/applications", "post", {headers: { Authorization: `Bearer ${Token}` },});
  const data = submitApplicationData.data;
  const loading = submitApplicationData.loading;
  const error = submitApplicationData.error;
  const status = submitApplicationData.status;

  // Fetch application data for logged-in user
  useEffect(() => {
    if (Token && applicationInfo?.application_id) {
      fetchApplicationData.fetchData();
    }
  }, []);

  // Prefill form with fetched data
  useEffect(() => {
    if (applicationData) {
      reset({
        name: applicationData.name || "",
        bfuhs_regstration_id: applicationData.bfuhs_regstration_id || "",
        roll_number: applicationData.roll_number || "",
        date_of_birth: applicationData.date_of_birth || "",
        gender: applicationData.gender || "",
        nationality: applicationData.nationality || "",
        religion: applicationData.religion || "",
        correspondence_address: applicationData.correspondence_address || "",
        city: applicationData.city || "",
        state: applicationData.state || "",
        pin: applicationData.pin || "",
        email: applicationData.email || "",
        mobile_1: applicationData.mobile_1 || "",
        mobile_2: applicationData.mobile_2 || "",
        state_of_domicile: applicationData.state_of_domicile || "",
        aadhar_no: applicationData.aadhar_no || "",
        father_name: applicationData.father_name || "",
        mother_name: applicationData.mother_name || "",
        are_parents_graduates: applicationData.are_parents_graduates || "",
        are_parents_graduates_text: applicationData.are_parents_graduates_text || "",
      });
    }
  }, [applicationData, reset]);

  // Clear dependent fields when parent graduation status changes
  useEffect(() => {
    if (areParentsGraduates === "no") {
      clearErrors("are_parents_graduates_text");
      unregister("are_parents_graduates_text"); 
    }
  }, [areParentsGraduates, clearErrors, unregister]);

  const Gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle form submission
  const onSubmit = async (formData) => {

    const formattedData = {
      ...formData,
      date_of_birth: formatDate(formData.date_of_birth),
      step: "personal",
    };

    await submitApplicationData.fetchData({ data: formattedData });

  };

  useEffect(() => {
    if (status === 201) {
      navigate("/");
      setApplicationInfo((prevInfo) => ({
        ...prevInfo,
        application_id: data.application_id,
        steps: {
          step_personal: "complete",
          step_academic: "pending",
          step_documents: "pending",
          step_payment: "pending",
        },
      }));
    }
  }, [status])

  useEffect(() => {
    if(data?.user){
      const { token, user: { role, permissions_list: permissions, id, name, email, password_changed} } = data;
      const userDetails = { id, name, email, password_changed };
      setUserData({token, role, permissions, userDetails})
    }
  }, [data, setUserData])

  return (
    <>
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
              label="Father's Name" 
              {...register("father_name", { required: true})}
              error={errors.father_name?.type === 'required' ? "Father’s Name is required" : undefined}
            />
            <Inputfield 
              label="Mother's Name" 
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
            {areParentsGraduates === "yes" && (
              <Inputfield 
                label="Enter your Graduation Details" 
                {...register("are_parents_graduates_text", { required: true})}
                error={errors.are_parents_graduates_text?.type === 'required' ? "Parents Graduation Details is required" : undefined}
              />
            )}
        </div>
        {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: error }}></p>}
        <div className="text-left mt-8">
          <Button
            type="submit"
            text={loading ? 'Loading....' : "Save"}
            classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
          />
        </div>
      </form>
      <div className="text-right">
        <Button
          text="Next"
          onclick={() => setActiveTab(activeTab + 1)}
          classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
        />
      </div>
    </>
  );
};

export default PersonalInfo;
