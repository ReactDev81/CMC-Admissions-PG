import { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import Button from "../../../../components/ui/Button";
import OutlineButton from "../../../../components/ui/OutlineButton";
import Mbbs from "./academic-details/Mbbs";
import GraduateOfCmc from "./academic-details/GraduateOfCmc";
import GraduateOfOther from "./academic-details/GraduateOfOther";
import NeetPgDetails from "./academic-details/NeetPgDetails";
import PeriodOfService from "./academic-details/PeriodOfService";

const AcademicDetails = ({ activeTab, setActiveTab, applicationId }) => {

    const { userData } = useContext(UserContext);
    const { data, loading, error, status, fetchData } = useAxios(`/applications/${applicationId}`, 'put', {headers: {Authorization: `Bearer ${userData.token}`}})

    const { control, register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (formData) => {
        const data = {
            ...formData,
            step: 'academic',
            application_id: applicationId,
        }
        await fetchData({data: data});
    };
    
    useEffect(() => {
        if(status === 201){
            setActiveTab(activeTab + 1);
            toast.success(data.message);
        }
    }, [status])

    return(
        <form className='w-full mt-2.5' onSubmit={handleSubmit(onSubmit)}>
            <Mbbs register={register} errors={errors} />
            <GraduateOfCmc register={register} errors={errors} control={control} />
            <GraduateOfOther register={register} errors={errors} control={control} />
            <PeriodOfService register={register} errors={errors} />
            <NeetPgDetails register={register} control={control} />
            <div className="flex flex-wrap items-center justify-between mt-8">
                <div>
                    <Button
                        type="button"
                        text="Previous"
                        onclick={() => setActiveTab(activeTab - 1)}
                        classname="[&]:py-2.5 [&]:px-7 [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        text={loading ? 'Loading....' : "Save"}
                        classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
                    />
                    <OutlineButton
                        type="button"
                        text="Next"
                        onclick={() => setActiveTab(activeTab + 1)}
                        className="rounded-full text-primary-default border-primary-default px-8 py-2 ml-2"
                    />
                </div>
            </div>
            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: error }}></p>}
        </form>
    )
}

export default AcademicDetails;