import { useContext, useEffect } from "react";
import { toast } from 'react-toastify';
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import RichTextEditor from "../../../../components/ui/RichTextEditor";
const HomeInstructions = () => {

    const { userData } = useContext(UserContext);
    const { status, loading, fetchData} = useAxios('/pages/1', 'put', { headers: { Authorization: `Bearer ${userData.token}` } })
    const getCurrentContent = useAxios('/pages/1', 'get', { headers: { Authorization: `Bearer ${userData.token}` } })
    
    useEffect(() => {
        getCurrentContent.fetchData();
    }, []);

    const handleSave = (content) => {
        fetchData({
            data: {
                content: content,  
                title: "Home Page",
                status: "published"
            }
        });
    };

    useEffect(() => {
        if (status === 200) {
            toast.success("Content Updated Successfully");
        }
    }, [loading]);

    return(
        <RichTextEditor onSave={handleSave} initialValue={getCurrentContent.data?.content} /> 
    )
}

export default HomeInstructions;