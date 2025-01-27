const MaintenanceMode = () => {
  return (
    <div className="maintenance flex justify-center items-center">
      <div className="wrapper text-center">

        <div className="image flex justify-center">
          <img src="/assets/images/logo-black.png" alt="cmc logo" />
        </div>

        <div className="flex justify-center mb-9 h-[399px] w-[583px]">
          <img
            src="/assets/images/maintenance.png"
            alt="Maintenance Mode"
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-black-default mb-3.5">
            We Are Under Maintenance
          </h1>
          <p className="text-black-300 max-w-sm w-full font-normal text-lg leading-7">
            Please check back later, We are working hard to get everything just
            right.
          </p>
        </div>

      </div>
    </div>
  );
};

export default MaintenanceMode;
