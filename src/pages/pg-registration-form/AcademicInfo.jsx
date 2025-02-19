import MbbsDetails from './academic-info/MbbsDetails';
import GraduateOfCmc from "./academic-info/GraduateOfCmc";
import PeriodOfService from "./academic-info/PeriodOfService";
import NeetPgDetails from "./academic-info/NeetPgDetails";
import GraduateOfOther from "./academic-info/GraduateOfOther";
import { useForm, } from "react-hook-form";
import { useEffect } from 'react';
import Button from '../../components/ui/Button';
import UseAxios from "../../hooks/UseAxios";
import { useContext } from 'react';
import { UserContext } from "../../context/UserContext"
import { ApplicationContext } from '../../context/ApplicationContext';


const AcademicInfo = ({activeTab, setActiveTab}) => {

  const { userData } = useContext(UserContext);
  const {applicationInfo, updateStepStatus} = useContext(ApplicationContext);
  const Token = userData.token;
  const ApplicationId = applicationInfo.application_id;

  const {control, register, handleSubmit, reset, formState: { errors }} = useForm();

  const { loading, error, status, fetchData } = UseAxios(`/applications/${ApplicationId}`, 'put', {headers: {Authorization: `Bearer ${Token}`}})

  // API hooks for geting application data
  const fetchApplicationData = UseAxios( `/applications/${ApplicationId}`, "get", { headers: { Authorization: `Bearer ${Token}` } });
  const applicationData = fetchApplicationData?.data;

  useEffect(() => {
    if(Token !== ''){
      fetchApplicationData.fetchData();
    }
  }, [Token])

  const onSubmit = async (formData) => {

    const data = {
      ...formData,
      step: 'academic',
      application_id: applicationInfo.application_id,
    }

    await fetchData({data: data});

  };

  useEffect(() => {
      if(status === 201){
        setActiveTab(activeTab + 1);
        updateStepStatus('step_academic', 'complete');
      }
  }, [status])

  // Prefill form with fetched data
  useEffect(() => {
    if (applicationData) {
      reset({
        // MbbsDetails
        mbbs_college_name: applicationData.mbbs_college_name || "",
        mbbs_name_university: applicationData.mbbs_name_university || "",
        mbbs_data_passing_date: applicationData.mbbs_data_passing_date || "",
        mbbs_internship_completion_date: applicationData.mbbs_internship_completion_date || "",

        mbbs_max_marks_first: applicationData.mbbs_max_marks_first || "",
        mbbs_marks_obtained_first: applicationData.mbbs_marks_obtained_first || "",
        mbbs_percent_gained_first: applicationData.mbbs_percent_gained_first || "",
        mbbs_no_of_attempts_first: applicationData.mbbs_no_of_attempts_first || "",

        mbbs_max_marks_second: applicationData.mbbs_max_marks_second || "",
        mbbs_marks_obtained_second: applicationData.mbbs_marks_obtained_second || "",
        mbbs_percent_gained_second: applicationData.mbbs_percent_gained_second || "",
        mbbs_no_of_attempts_second: applicationData.mbbs_no_of_attempts_second || "",
        
        mbbs_max_marks_third: applicationData.mbbs_marks_obtained_third || "",
        mbbs_marks_obtained_third: applicationData.mbbs_marks_obtained_third || "",
        mbbs_percent_gained_third: applicationData.mbbs_percent_gained_third || "",
        mbbs_no_of_attempts_third: applicationData.mbbs_no_of_attempts_third || "",

        mbbs_max_marks_final: applicationData.mbbs_max_marks_final || "",
        mbbs_marks_obtained_final: applicationData.mbbs_marks_obtained_final || "",
        mbbs_percent_gained_final: applicationData.mbbs_percent_gained_final || "",
        mbbs_no_of_attempts_final: applicationData.mbbs_no_of_attempts_final || "",

        mbbs_max_marks_total: applicationData.mbbs_max_marks_total || "",
        mbbs_marks_obtained_total: applicationData.mbbs_marks_obtained_total || "",
        mbbs_percent_gained_total: applicationData.mbbs_percent_gained_total || "",
        mbbs_no_of_attempts_total: applicationData.mbbs_no_of_attempts_total || "",

        // GraduateOfCmc
        mbbs_date_of_joining_cmc_ludhiana: applicationData.mbbs_date_of_joining_cmc_ludhiana || "",
        mbbs_college_roll_no_cmc_ludhiana: applicationData.mbbs_college_roll_no_cmc_ludhiana || "",
        mbbs_date_of_passing_cmc_ludhiana: applicationData.mbbs_date_of_passing_cmc_ludhiana || "",
        mbbs_mission_sponsored_cmc_ludhiana: applicationData.mbbs_mission_sponsored_cmc_ludhiana || "",
        mbbs_college_sponsored_cmc_ludhiana: applicationData.mbbs_college_sponsored_cmc_ludhiana || "",
        mbbs_staff_dependent_cmc_ludhiana: applicationData.mbbs_staff_dependent_cmc_ludhiana || "",

        // GraduateOfOther
        mbbs_date_of_joining_other_college: applicationData.mbbs_date_of_joining_other_college || "",
        mbbs_college_roll_no_other_college: applicationData.mbbs_college_roll_no_other_college || "",
        mbbs_date_of_passing_other_college: applicationData.mbbs_date_of_passing_other_college || "",
        mbbs_name_college_other_college: applicationData.mbbs_name_college_other_college || "",
        mbbs_sponsorship_agreement_other_college: applicationData.mbbs_sponsorship_agreement_other_college || "",

        // PeriodOfService
        mbbs_hospital_sponsoring_agency_service_obligation: applicationData.mbbs_hospital_sponsoring_agency_service_obligation || "",
        mbbs_remarks_service_obligation: applicationData.mbbs_remarks_service_obligation || "",
        mbbs_period_from_service_obligation: applicationData.mbbs_period_from_service_obligation || "",
        mbbs_period_to_service_obligation: applicationData.mbbs_period_to_service_obligation || "",
        mbbs_period_total_service_obligation: applicationData.mbbs_period_total_service_obligation || "",
        mbbs_diploma_holder_service_obligation: applicationData.mbbs_diploma_holder_service_obligation || "",

        // NeetPgDetails
        neet_marks: applicationData.neet_marks || "",
        neet_percentile: applicationData.neet_percentile || "",
        neet_pg_2024_rank: applicationData.neet_pg_2024_rank || "",
        membership_denomination_church_cmc_ludhiana: applicationData.membership_denomination_church_cmc_ludhiana || "",
        duration_membership_church_cmc_ludhiana: applicationData.duration_membership_church_cmc_ludhiana || "",
        body_church_cmc_ludhiana: applicationData.body_church_cmc_ludhiana || "",

      });
    }
  }, [applicationData, reset]);

  return (
    <>
      <form className='w-full mt-2.5' onSubmit={handleSubmit(onSubmit)}>
        <MbbsDetails register={register} errors={errors} />
        <GraduateOfCmc register={register} errors={errors} control={control} />
        <GraduateOfOther register={register} errors={errors} control={control} />
        <PeriodOfService register={register} errors={errors} />
        <NeetPgDetails register={register} errors={errors} control={control} />
        <div className="text-left mt-8">
          <Button
            type="submit"
            text={loading ? 'Loading....' : "Save"}
            classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
          />
        </div>
        {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: error }}></p>}
      </form>
      <div className="flex flex-wrap items-center justify-end gap-x-2 -mt-[42px]">
        <Button
          text="Previous"
          onclick={() => setActiveTab(activeTab - 1)}
          classname="[&]:py-2.5 [&]:px-7 [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
        />
        <Button
          text="Next"
          disabled={applicationInfo.steps?.step_academic === "pending" ? true : false}
          onclick={() => setActiveTab(activeTab + 1)}
          classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
        />
      </div>
    </>
  );
};

export default AcademicInfo;
