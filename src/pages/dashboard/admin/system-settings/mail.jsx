import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import InputField from "../../../../components/forms/Inputfield";
import Button from "../../../../components/ui/Button";
const Mail = ({data}) => {

    const { userData } = useContext(UserContext);
    const { fetchData, error } = useAxios('/settings/mail', 'post', { headers: { Authorization: `Bearer ${userData.token}` } })

    const {register, reset, handleSubmit, formState: { errors }} = useForm();

    // Set default values when component mounts
    useEffect(() => {
        if (data) {
            // Create default values object from data array
            const defaultValues = data.reduce((acc, field) => {
                acc[field.key] = field.value;
                return acc;
            }, {});

            // Reset form with default values
            reset(defaultValues);
        }
    }, [data, reset]);

    const onSubmit = (formData) => {
        console.log('Form submitted:', formData);
        fetchData({data: formData});
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="notification-settings border rounded-md">

                <div className="p-5 border-b">
                    <h2 className="text-black-default mb-2.5">Mail Configuration</h2>
                    <p className="text-black-300 font-normal">
                        Configure the email settings for your application. Ensure the
                        information provided here is correct to send emails successfully.
                    </p>
                </div>

                <div className="p-5 w-full grid grid-cols-3 gap-7">
                    {data.map((field) => {
                        return(
                        <InputField
                            key={field.key}
                            label={field.description}
                            type="text"
                            className="text-black-default"
                            {...register(field.key, { required: true})}
                            error={errors[field.key]?.type === 'required' ? `${field.description} is required` : undefined}
                        />
                        )
                    })}
                </div>
                {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: error }}></p>}
            </div>
            <div className="flex items-center justify-end mt-6 -mx-5 p-5 pb-0 border-t">
                <Button
                    text="Save Changes"
                    classname="px-8 py-2.5 [&]:rounded-full border-0"
                />
            </div>
        </form>
    )
}
export default Mail