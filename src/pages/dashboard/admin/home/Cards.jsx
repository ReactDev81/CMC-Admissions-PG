const Cards = ({title, count, numbertext, roundedicon, roundedIconBgColor, arrowbgColor, arrowicon, numbercolor}) => {
    return (
      <div className="card flex justify-between flex-1 flex-wrap gap-14 items-center p-5 bg-white-default rounded-[10px] shadow-flex">
        <div className="card-body text-black-default">
          <h1 className="mb-7">{count}</h1>
          <div className="flex flex-col">
            <p className="mb-3.5 text-xl capitalize text-black-300">
              {title}
            </p>
            <div className="flex flex-wrap items-center gap-1">
              <span className={`p-1 rounded-md ${arrowbgColor}`}>
                {arrowicon}
              </span>
              <p className="flex flex-wrap gap-1 items-center text-black-200 capitalize text-base font-normal">
                <span className={`${numbercolor}`}>{numbertext}</span>
                <span>than last 6 month</span>
              </p>
            </div>
          </div>
        </div>
        <div className='p-[15px] text-[28px] rounded-full flex flex-wrap items-center justify-center' style={{backgroundColor: roundedIconBgColor || '#ccc'}}>
          {roundedicon}
        </div>
      </div>
    );
  };
  
export default Cards;