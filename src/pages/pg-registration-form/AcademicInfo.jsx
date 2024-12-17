import MbbsDetails from './academic-info/MbbsDetails';
import GraduateOfCmc from "./academic-info/GraduateOfCmc";
import PeriodOfService from "./academic-info/PeriodOfService";
import NeetPgDetails from "./academic-info/NeetPgDetails";
import GraduateOfOther from "./academic-info/GraduateOfOther";
import { useForm, } from "react-hook-form";
import { useEffect } from 'react';
import Button from '../../components/ui/Button';
import UseAxios from "../../hooks/UseAxios";

const AcademicInfo = ({activeTab, setActiveTab}) => {

  const {control, register, handleSubmit, formState: { errors }} = useForm();

  const {loading, error, status, fetchData} = UseAxios('/applications', 'post')

  const onSubmit = async (formData) => {

    const data = {
      ...formData,
      step: 'academic',
      application_id: 1,
    }

    await fetchData({data: data});

  };

  useEffect(() => {
      if(status === 201){
        setActiveTab(activeTab + 1);
      }
  }, [status])

  return (
    <form className='w-full mt-2.5' onSubmit={handleSubmit(onSubmit)}>
      <MbbsDetails register={register} errors={errors} />
      <GraduateOfCmc register={register} errors={errors} control={control} />
      <GraduateOfOther register={register} errors={errors} control={control} />
      <PeriodOfService register={register} errors={errors} />
      <NeetPgDetails register={register} errors={errors} control={control} />
      <div className="text-right mt-8">
        <Button
          type="submit"
          text={loading ? 'Loading....' : "Save"}
          classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
        />
      </div>
      {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal">{error}</p>}
    </form>
  );
};

export default AcademicInfo;
