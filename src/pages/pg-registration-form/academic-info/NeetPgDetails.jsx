import InputField from "../../../components/forms/Inputfield"
import SelectField from '../../../components/forms/SelectField'

const NeetPgDetails = ({register, control}) => {

  const ChurchBody = [
    {value: "Church of South India", label: "Church of South India" },
    {value: "SYNODICAL BOARD OF HEALTH SERVICES CHURCH OF NORTH INDIA", label: "SYNODICAL BOARD OF HEALTH SERVICES CHURCH OF NORTH INDIA" },
    {value: "CHURCH OF SOUTH INDIA", label: "CHURCH OF SOUTH INDIA"},
    {value: "COUNCIL OF BAPTIST CHURCHES IN NORTH EAST INDIA", label: "COUNCIL OF BAPTIST CHURCHES IN NORTH EAST INDIA"},
    {value: "COUNCIL OF MEDICAL WORK, METHODIST CHURCH IN INDIA", label: "COUNCIL OF MEDICAL WORK, METHODIST CHURCH IN INDIA"}
  ];

  return (
    <div className="mt-10">
      <h2 className="text-black-default leading-5 capitalize">
        NEET PG 2024 DETAILS
      </h2>
      <div className="grid grid-cols-3 gap-7 mt-8">
        <InputField 
          label="Neet Marks" 
          type="number"
          {...register('neet_marks')}
        />
        <InputField 
          label="Neet Percentile"
          type="number" 
          {...register('neet_percentile')}
        />
        <InputField 
          label="Neet PG 2024 Rank" 
          type="number"
          {...register('neet_pg_2024_rank')}
        />
        <InputField 
          label="Membership & Denomination of the Church:" 
          type="text"
          {...register('membership_denomination_church_cmc_ludhiana')}
        />
        <InputField 
          label="Duration of Membership( in years ):" 
          type="number"
          {...register('duration_membership_church_cmc_ludhiana')}
        />
        <SelectField
          name="body_church_cmc_ludhiana"
          control={control}
          label="Name of Body"
          options={ChurchBody}
          placeholder="Select Church Body"
        />
      </div>
    </div>
  );
};

export default NeetPgDetails;
