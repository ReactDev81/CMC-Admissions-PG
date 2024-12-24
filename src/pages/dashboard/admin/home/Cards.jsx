const Cards = ({title, subtitle, downarrowicon, numbertext, text, roundedicon, classname, arrowbg, arrowicon, numbercolor}) => {
    return (
      <div className="card flex justify-between flex-1 flex-wrap gap-14 items-center p-5 bg-white-default rounded-[10px] shadow-flex">
        <div className="card-body text-black-default">
          <h1 className="mb-7">{title}</h1>
          <div className="flex flex-col">
            <p className="mb-3.5 text-xl capitalize text-black-300">
              {subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-1">
              <span className={`text-[#FF0000] bg-[#FDE9ED] p-1 rounded-md ${arrowbg} ${arrowicon}`}>
                {downarrowicon}
              </span>
              <p className="flex flex-wrap gap-1 items-center text-black-200 capitalize text-base font-normal">
                <span className={`text-[#FF0000] ${numbercolor}`}>{numbertext}</span>
                <span>{text}</span>
              </p>
            </div>
          </div>
        </div>
        <div className={`p-[15px] text-[28px] rounded-full flex flex-wrap items-center justify-center ${classname}`}>
          {roundedicon}
        </div>
      </div>
    );
  };
  
export default Cards;