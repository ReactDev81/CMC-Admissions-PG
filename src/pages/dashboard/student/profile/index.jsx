import Title from "../../../../components/ui/Title";
import { PiChurch } from "react-icons/pi";
import ChangePassword from "./ChangePassword"

const Profile = () => {
    
    return (
        <>
            <div className="flex flex-col mb-5 bg-white-default rounded-md">
                <div className="w-full">
                    <img
                        src="/assets/images/profile-bg.png"
                        className="h-[150px] w-full object-cover object-center rounded-t-md"
                        alt="Profile Bg"
                    />
                </div>
                <div className="max-w-[1192px] w-full flex items-center px-5 gap-3.5">
                    <div className="relative -top-9">
                        <img
                            src="/assets/images/profile.jpg"
                            className="h-[150px] w-[150px] [&]:max-w-[150px] rounded-full object-cover"
                            alt="User Profile Avatar"
                        />
                    </div>
                    <div className="w-full">
                        <Title
                            title="Anisha sandalas"
                            classname="text-3xl font-medium mb-2.5"
                        />
                        <div className="flex justify-between">
                            <div>
                                <p className="text-black-200 mb-3">
                                    Registeration ID : PGM24-05
                                </p>
                                <div className="flex items-center gap-3">
                                    <p className="text-black-200 flex items-center">
                                        <PiChurch className="mr-1.5" />
                                        Church of south india
                                    </p>
                                    <span className="text-black-200">|</span>
                                    <p className="text-black-200 flex items-center">
                                        <PiChurch className="mr-1.5" />
                                        15-55A, Raj cottage, Chemponvilai.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-black-200 mb-3">
                                    Date of Birth : 28-11-2003
                                </p>
                                <p className="text-black-200">Gender : Female</p>
                            </div>
                            <div>
                                <p className="text-black-200 mb-3">
                                    Date of Birth : 28-11-2003
                                </p>
                                <p className="text-black-200">
                                    Email : anishasandalas@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChangePassword />
        </>
    );
};
export default Profile;