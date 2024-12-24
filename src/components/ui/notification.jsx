import { Link } from "react-router-dom";
import { CiWallet } from "react-icons/ci"; 
import { RxCross2 } from "react-icons/rx"; 

const Notification = () => {
  return (
    <div className="invisible opacity-0 translate-y-[30px] group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 bg-white-default absolute shadow-md w-[280px] top-12 -right-5 rounded-md z-50 ease-linear duration-300">
      <ul className="transition-all text-black-default">
        <div className="border-dotted border-b-2 px-5 py-3.5">
          <h1 className="text-black-default text-center text-xl font-medium">
            Notifications
          </h1>
        </div>
        <li className="mx-4">
          <Link
            to=""
            className="flex flex-wrap items-center gap-[10px] p-[10px] mb-3 mt-4 bg-black-100 rounded-md justify-between"
          >
            <div className="flex flex-wrap gap-[10px]">
              <span className="text-black-default text-2xl bg-purple-default p-2 rounded-full self-center">
                <CiWallet />
              </span>
              <p className="text-base font-medium text-black-default uppercase flex flex-wrap flex-col">
                Daily Offer Added
                <span className="text-sm normal-case text-black-200">
                  User-only offer added
                </span>
              </p>
            </div>
            <span className="text-black-default">
              <RxCross2 />
            </span>
          </Link>
        </li>
        <li className="mx-4">
          <Link
            to=""
            className="flex flex-wrap items-center gap-[10px] p-[10px] mb-3 bg-black-100 rounded-md justify-between"
          >
            <div className="flex flex-wrap gap-[10px]">
              <span className="text-black-default text-2xl bg-purple-default p-2 rounded-full self-center">
                <CiWallet />
              </span>
              <p className="text-base font-medium text-black-default uppercase flex flex-wrap flex-col">
              Product Review
                <span className="text-sm normal-case text-black-200">
                Changed to a workflow
                </span>
              </p>
            </div>
            <span className="text-black-default">
              <RxCross2 />
            </span>
          </Link>
        </li>
        <li className="mx-4">
          <Link
            to=""
            className="flex flex-wrap items-center gap-[10px] p-[10px] mb-3 bg-black-100 rounded-md justify-between"
          >
            <div className="flex flex-wrap gap-[10px]">
              <span className="text-black-default text-2xl bg-purple-default p-2 rounded-full self-center">
                <CiWallet />
              </span>
              <p className="text-base font-medium text-black-default uppercase flex flex-wrap flex-col">
              Return Products
                <span className="text-sm normal-case text-black-200">
                52 items were returned
                </span>
              </p>
            </div>
            <span className="text-black-default">
              <RxCross2 />
            </span>
          </Link>
        </li>
        <li className="mx-4">
          <Link
            to=""
            className="flex flex-wrap items-center gap-[10px] p-[10px] mb-3 bg-black-100 rounded-md justify-between"
          >
            <div className="flex flex-wrap gap-[10px]">
              <span className="text-black-default text-2xl bg-purple-default p-2 rounded-full self-center">
                <CiWallet />
              </span>
              <p className="text-base font-medium text-black-default uppercase flex flex-wrap flex-col">
              Recently Paid
                <span className="text-sm normal-case text-black-200">
                Card payment of $343
                </span>
              </p>
            </div>
            <span className="text-black-default">
              <RxCross2 />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Notification;
