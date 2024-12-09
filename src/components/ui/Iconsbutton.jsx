const Iconsbutton = ({ icon, onclick, classname }) => {
    return (
      <button
      className={` text-black-default text-2xl p-3 bg-white-300 rounded-full ${classname}`}
        onClick={onclick}
      >
        {icon}
      </button>
    );
  };
  
  export default Iconsbutton;