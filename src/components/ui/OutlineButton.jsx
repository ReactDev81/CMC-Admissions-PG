const OutlineButton = ({text, className, onclick, type, disabled}) => {
    return (
      <button 
        className={`capitalize text-danger-default text-base font-medium leading-5 px-3 py-1 border border-danger-default rounded-full disabled:opacity-50 ${className}`}
        onClick={onclick}
        type={type}
        disabled={disabled}
      >
        {text}
      </button>
    );
  };
  
  export default OutlineButton;