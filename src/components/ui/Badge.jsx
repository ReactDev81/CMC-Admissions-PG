const Badge = ({ text }) => {
    return (
      <div className="mt-6 mb-3 px-5">
        <span className="py-1 px-3 text-base font-bold leading-5 uppercase bg-primary-300 rounded-md">
          {text}
        </span>
      </div>
    );
  };
  
  export default Badge;