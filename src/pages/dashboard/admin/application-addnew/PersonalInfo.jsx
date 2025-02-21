import { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import Inputfield from '../../../../components/forms/Inputfield';
import SelectField from "../../../../components/forms/SelectField";
import RadioField from "../../../../components/forms/RadioField";
import Button from "../../../../components/ui/Button";
import OutlineButton from "../../../../components/ui/OutlineButton";

const formatAadharNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedValue = numbersOnly
        .slice(0, 12) // Limit to 12 digits
        .replace(/(\d{4})(\d{4})?(\d{4})?/, (match, p1, p2, p3) => {
        return [p1, p2, p3].filter(Boolean).join("-");
        });
    return formattedValue;
};

// Format date to YYYY-MM-DD
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const PersonalInfo = ({activeTab, setActiveTab, setApplicationId}) => {

    const { register, control, handleSubmit, watch, clearErrors, unregister, formState: { errors }} = useForm({
        defaultValues: {
            gender: "",
            nationality: "Indian"
        },
    });

    const Gender = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ];

    // Clear dependent fields when parent graduation status changes
    const areParentsGraduates = watch("are_parents_graduates");

    useEffect(() => {
        if (areParentsGraduates === "no") {
            clearErrors("are_parents_graduates_text");
            unregister("are_parents_graduates_text"); 
        }
    }, [areParentsGraduates, clearErrors, unregister]);

    const { userData } = useContext(UserContext);
    const { data, status, loading, fetchData, error } = useAxios("/applications", "post", { headers: { Authorization: `Bearer ${userData.token}` } });

    const onSubmit = async (formData) => {
        const formattedData = {
            ...formData,
            aadhar_no: formData.aadhar_no.replace(/-/g, ""),
            date_of_birth: formatDate(formData.date_of_birth),
            step: "personal",
        };
        await fetchData({ data: formattedData });
    }

    useEffect(() => {
        if(status === 201) {
            setApplicationId(data.application_id);
            toast.success(data.message);
            setActiveTab(activeTab + 1);
        }
    }, [status])

    return(
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
                    max="2008-12-31"
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
                    {...register("mobile_1", { required: true, minLength: 10, maxLength: 12 })}
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
                    type="text"
                    label="Aadhar Number"
                    {...register("aadhar_no", {
                        required: true,
                        validate: (value) => value.replace(/-/g, "").length === 12 || "Aadhar Number must have exactly 12 digits",
                        pattern: /^[0-9-]+$/,
                        onChange: (e) => {
                            e.target.value = formatAadharNumber(e.target.value);
                        },
                    })}
                    error={
                        errors.aadhar_no?.type === "required"
                        ? "Aadhar Number is required"
                        : errors.aadhar_no?.message || undefined
                    }              
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
            <div className="flex items-center justify-end gap-x-2 mt-8">
                <Button
                    type="submit"
                    text={loading ? 'Loading....' : "Save"}
                    classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
                />
                <OutlineButton
                    type="button"
                    text="Next"
                    onclick={() => setActiveTab(activeTab + 1)}
                    className="rounded-full text-primary-default border-primary-default px-8 py-2"
                />
            </div>
        </form>
    )
}

export default PersonalInfo;