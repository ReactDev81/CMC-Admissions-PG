import { useContext, useEffect } from "react";
import { toast } from 'react-toastify';
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import RichTextEditor from "../../../../components/ui/RichTextEditor";

const PaymentDetails = () => {

  const { userData } = useContext(UserContext);
  const {status, loading, fetchData} = useAxios('/pages/2', 'put', { headers: { Authorization: `Bearer ${userData.token}` } })
  const getCurrentContent = useAxios('/pages/2', 'get', { headers: { Authorization: `Bearer ${userData.token}` } })

  useEffect(() => {
      getCurrentContent.fetchData();
  }, []);

  const handleSave = (content) => {
    console.log(content);
    fetchData({
        data: {
          content: content,  
          title: "Payment Page",
          status: "published"
        }
    });
  };

  useEffect(() => {
      if (status === 200) {
        toast.success("Content Updated Successfully");
      }
  }, [loading]);

  return (
    <RichTextEditor
      onSave={handleSave}
      initialValue={getCurrentContent.data?.content}
    /> 
  );
};

export default PaymentDetails;
