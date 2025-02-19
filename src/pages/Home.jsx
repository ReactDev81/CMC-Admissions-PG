import { useEffect } from 'react';
import UseAxios from "../hooks/UseAxios";
import StudentHeader from "../components/common/StudentHeader";
import Footer from "../components/common/Footer";
import Loader from "../components/ui/Loader"

const Home  = () => {

    const {data, loading, fetchData} = UseAxios( '/pages/1', "get");

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <>
            <StudentHeader />
            <div className="max-w-lg mx-auto py-5 min-h-[calc(100vh-150px)]">
                <div className="home-content text-black-default py-10">
                    {loading ? <Loader /> : data && data.content && (
                        <div dangerouslySetInnerHTML={{ __html: data.content }} />
                    )}
                </div>
            </div>
            <Footer className="max-w-lg mx-auto [&]:px-0" />
        </>
    )
}

export default Home;