import InputField from "../../../components/forms/Inputfield"
import RadioField from "../../../components/forms/RadioField"

const GraduateOfCmc = ({register, errors, control}) => {

  return (
    <div className="mt-10">
      <h2 className="text-black-default leading-5 capitalize">
        For Graduate of christian medical college ludhiana
      </h2>
      <div className="grid grid-cols-3 gap-7 mt-8">
        <InputField 
          label="Date of Joining" 
          type="date"
          {...register('mbbs_date_of_joining_cmc_ludhiana', {required: true})}
          error={errors.mbbs_date_of_joining_cmc_ludhiana?.type === 'required' ? 'Date of Joining is Required' : undefined}
        />
        <InputField 
          label="College Roll No." 
          type="number"
          {...register('mbbs_college_roll_no_cmc_ludhiana', {required: true})}
          error={errors.mbbs_college_roll_no_cmc_ludhiana?.type === 'required' ? 'College Roll No is Required' : undefined}
        />
        <InputField 
          label="Date of Passing" 
          type="date" 
          {...register('mbbs_date_of_passing_cmc_ludhiana', {required: true})}
          error={errors.mbbs_date_of_passing_cmc_ludhiana?.type === 'required' ? 'Date of Passing is Required' : undefined}
        />
        <RadioField 
          label="Mission Sponsored"
          name="mbbs_mission_sponsored_cmc_ludhiana"
          control={control}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        <RadioField 
          label="College Sponsored"
          name="mbbs_college_sponsored_cmc_ludhiana"
          control={control}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        <RadioField 
          label="Staff Dependent"
          name="mbbs_staff_dependent_cmc_ludhiana"
          control={control}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </div>
    </div>
  );
};

export default GraduateOfCmc;
