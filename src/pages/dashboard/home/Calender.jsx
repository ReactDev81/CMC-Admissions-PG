import Title from "../../../components/ui/Title";
import { IoCalendarOutline } from "react-icons/io5";
import OutlineButton from "../../../components/ui/OutlineButton";
import { useState } from 'react';
import Calendar from 'react-calendar';
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";



const Calender = () => {

    const [value, setValue] = useState(new Date());

    return(
        <div className="bg-white-default p-5 mb-6 rounded-lg shadow-flex">
            <div className="flex flex-wrap items-center justify-between mb-8">
                <div className="flex gap-x-2.5">
                    <IoCalendarOutline color="#1F1E1E" size={26} />
                    <Title title="Calender" />
                </div>
                <OutlineButton text="See More" className="text-primary-default border-primary-default" />
            </div>
            <Calendar 
                onChange={setValue} 
                value={value} 
                prevLabel={<FaChevronLeft color="#1F1E1E" size={14} />} 
                nextLabel={<FaChevronRight color="#1F1E1E" size={14} />} 
                prev2Label={null}
                next2Label={null}
            />
        </div>
    )
}

export default Calender;