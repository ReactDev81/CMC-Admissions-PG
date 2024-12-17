import { Link } from "react-router-dom";

const StudentHeader = () => {
  return (
    <div className="bg-white-default">
      <div className="max-w-lg w-full mx-auto py-5">
        <div className="flex items-center justify-between">
            <Link to="/">
              <img className="h-[60px] w-[260px] object-contain object-left" src="/assets/images/StudentHeaderLogo.png" alt="CMC Logo" />
            </Link>
            <div>
                <h4 className="text-black-default text-xl font-bold">Christian Medical College, Ludhiana</h4>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
