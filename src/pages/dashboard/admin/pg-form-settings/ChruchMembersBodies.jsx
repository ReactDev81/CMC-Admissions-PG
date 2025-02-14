import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaPenClip } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import Loader from '../../../../components/ui/Loader';
import Button from "../../../../components/ui/Button";


const ChruchMembersBodies = () => {

  const { userData } = useContext(UserContext);
  const [editingMember, setEditingMember] = useState(null);
  const { register, handleSubmit, reset, setValue,  formState: { errors }} = useForm();

  // get all chruch members bodies
  const getChurchMembers = useAxios('/churches', "get", { headers: { Authorization: `Bearer ${userData.token}` } });
  const allChurchMembers = getChurchMembers.data?.data;

  // create church member body
  const createChurchMembers = useAxios('/churches', "post", { headers: { Authorization: `Bearer ${userData.token}` } });

  // edit church member body
  const editChurchMembers = useAxios(null, "put", { headers: { Authorization: `Bearer ${userData.token}` } });

  // delete church member body
  const deleteChurchMembers = useAxios(null, "delete", { headers: { Authorization: `Bearer ${userData.token}` } });

  const deleteChurchMember = async (id) => {
    await deleteChurchMembers.fetchData({ url: `/churches/${id}` });
    await getChurchMembers.fetchData();
  }

  const onSubmit = async (formdata) => {
    if (editingMember) {
      // Handle edit
      await editChurchMembers.fetchData({ 
        url: `/churches/${editingMember.id}`,
        data: { ...formdata, description: '', status: 1 },
      });
    } else {
      // Handle create
      await createChurchMembers.fetchData({
        data: { ...formdata, description: '', status: 1 }
      });
    }
    await getChurchMembers.fetchData();
    setEditingMember(null);
  }

  // Add function to handle edit click
  const handleEdit = (member) => {
    setEditingMember(member);
    setValue('name', member.name);
  }

  // Add effect for edit success
  useEffect(() => {
    if (editChurchMembers.status === 202) {
      toast.success("Member Updated Successfully");
      reset();
      setEditingMember(null);
    }
  }, [editChurchMembers.loading]);

  // Add effect for deleted members
  useEffect(() => {
    if (deleteChurchMembers.status === 204) {
      toast.success("Member Deleted Successfully");
    }
  }, [deleteChurchMembers.loading]);

  // Add effect for created new members
  useEffect(() => {
    if (createChurchMembers.status === 201) {
      toast.success("Member Created Successfully");
      reset();
    }
  }, [createChurchMembers.loading]);

  // Add effect for fetched all members
  useEffect(() => {
    const getMembers = async () => {
      await getChurchMembers.fetchData();
    }
    getMembers();
  }, []);

    return(
        <div className="px-8 py-6 max-w-[650px] w-full bg-white-default rounded-lg shadow-flex">
          
          <h2 className="text-black-default capitalize mb-9">Church Member Bodies</h2>

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
            {(createChurchMembers.error || editChurchMembers.error) && (
              <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal">
                {createChurchMembers.error || editChurchMembers.error}
              </p>
            )}
          </form>

          {getChurchMembers.loading ? ( <Loader /> ) : (
              allChurchMembers && allChurchMembers.map((churchMember) => {
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

export default ChruchMembersBodies;