import InputField from "../../../../../components/forms/Inputfield";
import RadioField from "../../../../../components/forms/RadioField";

const GraduateOfOther = ({register, errors, control}) => {

    const currentDate = new Date().toISOString().split("T")[0];

    return(
        <div className="mt-10">
            <h2 className="text-black-default leading-5 capitalize">
                For Graduate of Other medical college:
            </h2>
            <div className="grid grid-cols-3 gap-7 mt-8">
                <InputField 
                    label="Date of Joining" 
                    type="date"
                    max={currentDate} 
                    {...register('mbbs_date_of_joining_other_college', {required: true})}
                    error={errors.mbbs_date_of_joining_other_college?.type === 'required' ? 'Date of Joining is Required' : undefined}
                />
                <InputField 
                    label="College Roll No."
                    type="number"  
                    {...register('mbbs_college_roll_no_other_college', {required: true})}
                    error={errors.mbbs_college_roll_no_other_college?.type === 'required' ? 'College Roll No is Required' : undefined}
                />
                <InputField 
                    label="Date of Passing" 
                    type="date"
                    max={currentDate} 
                    {...register('mbbs_date_of_passing_other_college', {required: true})}
                    error={errors.mbbs_date_of_passing_other_college?.type === 'required' ? 'Date of Passing is Required' : undefined}
                />
                <InputField 
                    label="Name of College"  
                    {...register('mbbs_name_college_other_college', {required: true})}
                    error={errors.mbbs_name_college_other_college?.type === 'required' ? 'Name of College is Required' : undefined}
                />
                <RadioField 
                    label="Sponsored Aggrement"
                    name="mbbs_sponsorship_agreement_other_college"
                    control={control}
                    options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                    ]}
                />
            </div>
        </div>
    )
}

export default GraduateOfOther;