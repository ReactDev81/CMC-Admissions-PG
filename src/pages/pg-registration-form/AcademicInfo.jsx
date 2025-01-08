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

  const {control, register, handleSubmit, formState: { errors }} = useForm();

  const {data, loading, error, status, fetchData} = UseAxios(`/applications/${ApplicationId}`, 'put', {headers: {Authorization: `Bearer ${Token}`}})

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
      <div className="flex flex-wrap items-center justify-between">
        <Button
          text="Previous"
          onclick={() => setActiveTab(activeTab - 1)}
          classname="[&]:py-2.5 [&]:px-7 [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
        />
        <Button
          text="Next"
          onclick={() => setActiveTab(activeTab + 1)}
          classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
        />
      </div>
    </>
  );
};

export default AcademicInfo;
