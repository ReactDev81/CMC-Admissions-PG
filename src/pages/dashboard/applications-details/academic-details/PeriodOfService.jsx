import InputField from "../../../../components/forms/Inputfield";

const PeriodOfService = () => {
  return (
    <>
      <div className="mt-8">
        <h2 className="text-black-default leading-5 capitalize">
          Period of service obligation/service after MBBS course
        </h2>
        <div className="flex gap-10">
          <div className="w-full mt-0">
            <InputField
              label="Hospital/Sponsoring Agency"
              type="text"
              labelclass="font-medium"
            />
          </div>
          <div className="w-full mt-0">
            <InputField label="Remarks if Any" labelclass="font-medium" />
          </div>
          <div className="w-full mt-0">
            <InputField
              label="Period of Service From:"
              type="date"
              labelclass="font-medium"
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-full mt-0">
            <InputField
              label="To:"
              type="date"
              labelclass="font-medium"
            />
          </div>
          <div className="w-full mt-0">
            <InputField label="Total( in Years and Months ): " labelclass="font-medium" />
          </div>
          <div className="w-full mt-0">
            <InputField
              label="Diploma Holder"
              type="text"
              labelclass="font-medium"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PeriodOfService;
