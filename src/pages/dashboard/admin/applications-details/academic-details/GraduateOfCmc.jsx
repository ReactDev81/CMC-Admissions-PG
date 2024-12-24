import InputField from "../../../../../components/forms/Inputfield";

const GraduateOfCmc = () => {
  return (
    <div className="mt-8">
          <h2 className="text-black-default leading-5 capitalize">
            For Graduate of christian medical college ludhiana
          </h2>
          <div className="flex gap-10">
            <div className="w-full mt-0">
              <InputField
                label="Date of Joining"
                type="date"
                labelclass="font-medium"
              />
            </div>
            <div className="w-full mt-0">
              <InputField label="College Roll No." labelclass="font-medium" />
            </div>
            <div className="w-full mt-0">
              <InputField
                label="Date of Passing"
                type="date"
                labelclass="font-medium"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-10">

            {/* 1rd radio */}
            <div className="mt-6">
              <h4 className="text-black-300 mb-2 leading-5">Mission Sponsored</h4>
              <div className="radio flex flex-wrap gap-5 items-center">
                <div className="text-black-default space-x-2 flex items-center">
                  <input type="radio" id="Yes" />
                  <label htmlFor="Yes">Yes</label>
                </div>
                <div className="text-black-default space-x-2 flex items-center">
                  <input type="radio" id="No" />
                  <label htmlFor="No">No</label>
                </div>
              </div>
            </div>

            {/* 2rd radio */}
            <div className="mt-6">
              <h4 className="text-black-300 mb-2 leading-5">College Sponsored</h4>
              <div className="radio flex flex-wrap gap-5 items-center">
                <div className="text-black-default space-x-2 flex items-center">
                  <input type="radio" id="Yes" />
                  <label htmlFor="Yes">Yes</label>
                </div>
                <div className="text-black-default space-x-2 flex items-center">
                  <input type="radio" id="No" />
                  <label htmlFor="No">No</label>
                </div>
              </div>
            </div>

            {/* 3rd radio */}
            <div className="mt-6">
              <h4 className="text-black-300 mb-2 leading-5">Staff Dependent</h4>
              <div className="radio flex flex-wrap gap-5 items-center">
                <div className="text-black-default space-x-2 flex items-center">
                  <input type="radio" id="Yes" />
                  <label htmlFor="Yes">Yes</label>
                </div>
                <div className="text-black-default space-x-2 flex items-center">
                  <input type="radio" id="No" />
                  <label htmlFor="No">No</label>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default GraduateOfCmc;
