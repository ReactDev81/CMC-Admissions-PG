import { useContext, useEffect} from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserContext } from "../../../../context/UserContext"
import useAxios from "../../../../hooks/UseAxios";
import InputField from "../../../../components/forms/Inputfield";
import Button from "../../../..//components/ui/Button";

const TransactionDetails = ({activeTab, setActiveTab, applicationId}) => {

    const currentDate = new Date().toISOString().split("T")[0];
    const { userData } = useContext(UserContext);
    const {register, handleSubmit, formState: { errors },} = useForm();
    const {data, loading, error, status, fetchData} = useAxios(`/applications/${applicationId}`, 'put', {headers: {Authorization: `Bearer ${userData.token}`}});

    const onSubmit = async (formData) => {

        const data = {
            ...formData,
            step: 'payment',
            application_id: applicationId,
        };
    
        await fetchData({data: data});
    };

    useEffect(() => {
        if(status === 201) {
            toast.success(data.message);
        }
    }, [status])

    return(
        <form onSubmit={handleSubmit(onSubmit)} className='w-full mt-2.5'>
            <div className="grid grid-cols-3 gap-7">
                <InputField
                    type="number" 
                    label="Amount Paid"
                    {...register('amount_paid', {required: true})} 
                    error={errors.amount_paid?.type === 'required' ? "Amount Paid is Required" : undefined}
                />
                <InputField 
                    label="UTR/Transaction ID"  
                    {...register('utr_transaction_id', {required: true})} 
                    error={errors.utr_transaction_id?.type === 'required' ? "UTR/Transaction ID is Required" : undefined}
                />
                <InputField 
                    type="date" 
                    max={currentDate}
                    label="Date of Transaction"
                    {...register('date_of_transaction', {required: true})} 
                    error={errors.date_of_transaction?.type === 'required' ? "Date of Transaction is Required" : undefined}  
                />
                <InputField 
                    label="Mode of Payment(NEFT, RTGS, IMPS, GPay etc)" 
                    {...register('mode_of_payment', {required: true})} 
                    error={errors.mode_of_payment?.type === 'required' ? "Mode Of Payment is Required" : undefined}
                />
                <InputField 
                    label="Sender's Name"
                    {...register('sender_name', {required: true})} 
                    error={errors.sender_name?.type === 'required' ? "Sender's Name is Required" : undefined}  
                />
                <InputField 
                    label="Sender's Branch"
                    {...register('sender_branch', {required: true})} 
                    error={errors.sender_branch?.type === 'required' ? "Sender's Branch is Required" : undefined}  
                />
            </div>
            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: error }}></p>}
            <div className="flex flex-wrap items-center justify-end gap-x-2 mt-8">
                <Button
                    type="button"
                    text="Previous"
                    onclick={() => setActiveTab(activeTab - 1)}
                    classname="[&]:py-2.5 [&]:px-7 [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
                />
                <Button
                    type="submit"
                    text={loading ? 'Loading....' : "Submit"}
                    classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
                />
            </div>
        </form>
    )
}

export default TransactionDetails;