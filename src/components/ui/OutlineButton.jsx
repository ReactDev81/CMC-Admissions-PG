const OutlineButton = ({text, className, onclick, type}) => {
    return (
      <button 
        className={`capitalize text-danger-default text-base font-medium leading-5 px-3 py-1 border border-danger-default rounded-full ${className}`}
        onClick={onclick}
        type={type}
      >
        {text}
      </button>
    );
  };
  
  export default OutlineButton;