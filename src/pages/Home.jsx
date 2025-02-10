import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAxios from "../hooks/UseAxios";
import StudentHeader from "../components/common/StudentHeader";
import Footer from "../components/common/Footer";
import Button from "../components/ui/Button";
import OutlineButton from "../components/ui/OutlineButton";

const Home  = () => {

    const {data, fetchData} = UseAxios( '/pages/1', "get");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <>
            <StudentHeader />
            <div className="max-w-lg mx-auto py-5 min-h-[calc(100vh-150px)]">
                <div className="flex items-center gap-x-10">
                    <OutlineButton onclick={() => navigate('/login')} className="text-primary-default border-primary-default px-6 py-2 w-full" text="Login" />
                    <Button onclick={() => navigate('/pg-registration-form')} classname="[&]:rounded-full w-full" text="Submit Application" />
                </div>
                <div className="home-content text-black-default py-10">
                    {data && data.content && (
                        <div dangerouslySetInnerHTML={{ __html: data.content }} />
                    )}
                </div>
            </div>
            <Footer className="max-w-lg mx-auto [&]:px-0" />
        </>
    )
}

export default Home;