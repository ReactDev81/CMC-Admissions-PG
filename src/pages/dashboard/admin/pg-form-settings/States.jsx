import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaPenClip } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import Loader from '../../../../components/ui/Loader';
import Button from "../../../../components/ui/Button";

const States = () => {

    const { userData } = useContext(UserContext);
    const [editingMember, setEditingMember] = useState(null);
    const { register, handleSubmit, reset, setValue,  formState: { errors }} = useForm();

    // get all states
    const getStates = useAxios('/bible-centers', "get", { headers: { Authorization: `Bearer ${userData.token}` } });
    const allStates = getStates.data?.data;

    // create states api
    const createStates = useAxios('/bible-centers', "post", { headers: { Authorization: `Bearer ${userData.token}` } });

    // edit states api
    const editStates = useAxios(null, "put", { headers: { Authorization: `Bearer ${userData.token}` } });

    // delete states api
    const deleteStates = useAxios(null, "delete", { headers: { Authorization: `Bearer ${userData.token}` } });

    // create and edit states
    const onSubmit = async (formdata) => {
        if (editingMember) {
            // Handle edit
            await editStates.fetchData({ 
                url: `/bible-centers/${editingMember.id}`,
                data: { ...formdata, description: '', status: 1 },
            });
        } else {
            // Handle create
            await createStates.fetchData({
                data: { ...formdata, description: '', status: 1 }
            });
        }
        await getStates.fetchData();
        setEditingMember(null);
    }

    // delete states
    const deleteChurchMember = async (id) => {
        await deleteStates.fetchData({ url: `/bible-centers/${id}` });
        await getStates.fetchData();
    }

    // Add function to handle edit click
    const handleEdit = (member) => {
        setEditingMember(member);
        setValue('name', member.name);
    }

    // Add effect for edit success
    useEffect(() => {
        if (editStates.status === 202) {
            toast.success("State Updated Successfully");
            reset();
            setEditingMember(null);
        }
    }, [editStates.loading]);

    // Add effect for deleted members
    useEffect(() => {
        if (deleteStates.status === 204) {
            toast.success("State Deleted Successfully");
        }
    }, [deleteStates.loading]);

    // Add effect for created new members
    useEffect(() => {
        if (createStates.status === 201) {
            toast.success("State Created Successfully");
            reset();
        }
    }, [createStates.loading]);

    // Add effect for fetched all members
    useEffect(() => {
        const getMembers = async () => {
            await getStates.fetchData();
        }
        getMembers();
    }, []);

    return(
        <div className="px-8 py-6 max-w-[650px] w-full bg-white-default rounded-lg shadow-flex">

            <h2 className="text-black-default capitalize mb-9">States</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between border border-primary-default rounded-full mb-6">
                    <input 
                        type="text"
                        className="text-black-200 w-full px-5 py-2.5 bg-transparent rounded-l-full"
                        placeholder="Enter church body name here..."
                        {...register("name")}
                    />
                    <Button 
                        text={editingMember ? "Update" : "Add"} 
                        classname="[&]:px-6 [&]:py-2.5 [&]:rounded-full border-0" 
                    />
                </div>
                {/* Show errors from either create or edit */}
                {(createStates.error || editStates.error) && (
                    <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal">
                        {createStates.error || editStates.error}
                    </p>
                )}
            </form>

            {getStates.loading ? ( <Loader /> ) : (
                allStates && allStates.map((churchMember) => {
                    return(
                        <div key={churchMember.id} className="px-1.5 py-2.5 flex items-center justify-between border-b">
                            <span className="text-black-300 text-base font-normal">{churchMember.name}</span>
                            <span className="flex items-center gap-2.5">
                                <FaPenClip onClick={() => handleEdit(churchMember)} className="text-black-default cursor-pointer"/>
                                <FaTrashCan onClick={() => deleteChurchMember(churchMember.id)} className="text-black-default cursor-pointer"/>
                            </span>
                        </div>
                    )
                })
            )}
            
        </div>
    )
}

export default States;