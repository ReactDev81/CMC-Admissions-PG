import { CiSearch } from "react-icons/ci";
const Searchbar = ({ placeholder }) => {
  return (
    <div className="bg-white-300 flex items-center p-3 rounded-full">
      <label htmlFor="" className="text-black-default mr-2 text-2xl flex-1">
        <CiSearch />
      </label>
      <input
        className="text-black-300 text-base bg-transparent w-full"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
export default Searchbar;