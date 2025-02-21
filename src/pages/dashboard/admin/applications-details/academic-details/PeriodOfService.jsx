import InputField from "../../../../../components/forms/Inputfield";

const PeriodOfService = ({register, errors}) => {
  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <div className="mt-10">
      <h2 className="text-black-default leading-5 capitalize">
        Period of service obligation/service after MBBS course
      </h2>
      <div className="grid grid-cols-3 gap-7 mt-8">
          <InputField 
            label="Hospital/Sponsoring Agency" 
            type="text"
            {...register('mbbs_hospital_sponsoring_agency_service_obligation', {required: true})}
            error={errors.mbbs_hospital_sponsoring_agency_service_obligation?.type === 'required' ? 'Date of Joining is Required' : undefined} 
          />
          <InputField 
            label="Remarks if Any" 
            {...register('mbbs_remarks_service_obligation', {required: true})}
            error={errors.mbbs_remarks_service_obligation?.type === 'required' ? 'Date of Joining is Required' : undefined} 
          />
          <InputField 
            label="Period of Service From:" 
            type="date"
            max={currentDate}
            {...register('mbbs_period_from_service_obligation', {required: true})}
            error={errors.mbbs_period_from_service_obligation?.type === 'required' ? 'Date of Joining is Required' : undefined} 
          />
          <InputField 
            label="To:" 
            type="date"
            max={currentDate} 
            {...register('mbbs_period_to_service_obligation', {required: true})}
            error={errors.mbbs_period_to_service_obligation?.type === 'required' ? 'Date of Joining is Required' : undefined}
          />
          <InputField 
            label="Total( in Years and Months ):"
            type="number"
            {...register('mbbs_period_total_service_obligation', {required: true})}
            error={errors.mbbs_period_total_service_obligation?.type === 'required' ? 'Date of Joining is Required' : undefined} 
          />
          <InputField 
            label="Diploma Holder" 
            type="text" 
            {...register('mbbs_diploma_holder_service_obligation', {required: true})}
            error={errors.mbbs_diploma_holder_service_obligation?.type === 'required' ? 'Date of Joining is Required' : undefined}
          />
      </div>
    </div>
  );
};

export default PeriodOfService;
