import InputField from "../../../../components/forms/Inputfield";
import GraduateOfCmc from "./GraduateOfCmc";
import PeriodOfService from "./PeriodOfService";
import NeetPgDetails from "./NeetPgDetails";
import GraduateOfOther from "./GraduateOfOther";
import { useForm } from "react-hook-form";

const AcademicDetail = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
    },
  });
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className="w-full">
      <form action="" className={`w-full bg-white-default rounded-md `}>
        <div className="flex gap-10">
          <div className="w-full mt-0">
            <InputField label="Amount Paid" labelclass="font-medium" className="[&]:mt-0" />
          </div>
          <div className="w-full mt-0">
            <InputField label="Date of Birth" labelclass="font-medium" className="[&]:mt-0" />
          </div>
          <div className="w-full mt-0">
            <InputField label="UTR/Transaction ID" labelclass="font-medium" className="[&]:mt-0" />
          </div>
        </div>
        <div className="flex gap-10 items-end">
          <div className="">
            <InputField
              label="Mode of Payment(NEFT, RTGS, IMPS, GPay etc)"
              labelclass="font-medium"
            />
          </div>
        </div>
        <div className="table-form mt-6">
          <div className="grid grid-cols-5 gap-4 font-medium text-black-default text-2xl leading-5">
            <div>Examination/Year</div>
            <div>Max. Marks</div>
            <div>Marks Obtained</div>
            <div>% Gained</div>
            <div>No. Of Attempts</div>
          </div>
          <div className="grid grid-cols-5 gap-4 items-end">
            <div className="font-medium text-base leading-5 text-black-default self-center">
              First
            </div>
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="First Max. Marks"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="First Marks Obtained"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="First Gained"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="First No. Of Attempts"
              labelclass="text-base font-medium leading-5"
            />
          </div>
          <div className="grid grid-cols-5 gap-4 items-end">
            <div className="font-medium text-base leading-5 text-black-default self-center">
              Second
            </div>
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Second Max. Marks"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Second Marks Obtained"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Second Gained"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Second No. Of Attempts"
              labelclass="text-base font-medium leading-5"
            />
          </div>
          <div className="grid grid-cols-5 gap-4 items-end">
            <div className="font-medium text-base leading-5 text-black-default self-center">
              Third
            </div>
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Third Max. Marks"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Third Marks Obtained"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Third Gained"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Third No. Of Attempts"
              labelclass="text-base font-medium leading-5"
            />
          </div>
          <div className="grid grid-cols-5 gap-4 items-end">
            <div className="font-medium text-base leading-5 text-black-default self-center">
              Final
            </div>
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Final Max. Marks"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Final Marks Obtained"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Final Gained"
              labelclass="text-base font-medium leading-5"
            />
            <InputField
              inputclass="w-full text-base font-normal text-purple-default"
              text="text"
              label="Final No. Of Attempts"
              labelclass="text-base font-medium leading-5"
            />
          </div>
          <div className="grid grid-cols-5 items-end">
            <div className="font-medium text-base leading-5 text-black-default self-center ">
              Total:
            </div>
            <div className="col-span-4">
              <InputField
                inputclass="w-full text-base font-normal text-purple-default"
                type="text"
                label="Grand Total %"
                labelclass="text-base font-medium leading-5"
              />
            </div>
          </div>
        </div>
        <GraduateOfCmc />
        <GraduateOfOther />
        <PeriodOfService />
        <NeetPgDetails />
      </form>
    </div>
  );
};

export default AcademicDetail;