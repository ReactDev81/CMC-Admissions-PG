const RadioBtn = () => {
  return (
    <div>
      <div className="text-black-default mt-6">
        <p className="text-sm">
          Are your parents graduates/postgraduates of CMC Ludhiana/CMC Vellore
          Give details of their Service Completion if applicable :
        </p>
        <div className="flex flex-col mt-4">
          <div className="flex gap-1">
            <input type="radio" className="w-4 h-4 text-primary-default bg-primary-default border-primary-default focus:ring-blue-500 focus:ring-2" />
            <label htmlFor="" className="text-base font-normal uppercase">
              no
            </label>
          </div>
          <div className="flex gap-1">
            <input type="radio" />
            <label htmlFor="" className="text-base font-normal uppercase">
              yes
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioBtn;
