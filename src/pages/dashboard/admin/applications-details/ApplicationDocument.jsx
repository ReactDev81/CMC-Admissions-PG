import Button from "../../../../components/ui/Button";
import StudentsDocumentData from "./academic-details/StudentsDocumentData";
import { MdMessage } from "react-icons/md"; //Message icon
import SelectField from "../../../../components/forms/SelectField";
import { useForm } from "react-hook-form";

const ApplicationDocument = () => {
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
    <div className="-mx-5">
      <div className="flex justify-end pb-5 pr-5">
        <Button
          text="Add Remark"
          icon={<MdMessage className="h-4 w-4 mr-1.5" />}
          classname="[&]:rounded-full [&]:px-5 [&]:py-2.5 flex items-center"
        />
      </div>

      <div className="grid grid-rows-1">
        <div className="grid grid-cols-5 text-black-default bg-black-100 px-5 py-3">
          <div className="text-base font-medium leading-5">Document</div>
          <div className="text-base font-medium leading-5">Document Name</div>
          <div className="text-base font-medium leading-5">Date</div>
          <div className="text-base font-medium leading-5">Status</div>
          <div className="text-base font-medium leading-5">Actions</div>
        </div>
      </div>

      {/* Student Data -1 */}
      <StudentsDocumentData
        documentsrc="/assets/images/default-applicants-image.jpeg"
        documentname="NEET PG-2024 Admit Card"
        date="23 June 2022"
        verified={<SelectField
          name="category"
          control={control}
          options={options}
          placeholder="Verified"
          rules={{ required: "option is required" }}
          className="flex flex-wrap flex-col w-full"
          selectclass="py-1.5"
        />}
      />

      {/* Student Data -2 */}
      <StudentsDocumentData
        documentsrc="/assets/images/default-applicants-image.jpeg"
        documentname="NEET PG-2024 Score Card"
        date="23 June 2022"
        verified={<SelectField
          name="category"
          control={control}
          options={options}
          placeholder="Verified"
          rules={{ required: "option is required" }}
          className="flex flex-wrap flex-col w-full"
          selectclass="py-1.5"
        />}
      />

      {/* Student Data -3 */}
      <StudentsDocumentData
        documentsrc="/assets/images/default-applicants-image.jpeg"
        documentname="Matriculation (10th Class Certificate )"
        date="28 April 2023"
        verified={<SelectField
          name="category"
          control={control}
          options={options}
          placeholder="Verified"
          rules={{ required: "option is required" }}
          className="flex flex-wrap flex-col w-full"
          selectclass="py-1.5"
        />}
      />

      {/* Student Data -4 */}
      <StudentsDocumentData
        documentsrc="/assets/images/default-applicants-image.jpeg"
        documentname="Baptism Certificate"
        date="11 Nov 2021"
        verified={<SelectField
          name="category"
          control={control}
          options={options}
          placeholder="Verified"
          rules={{ required: "option is required" }}
          className="flex flex-wrap flex-col w-full"
          selectclass="py-1.5"
        />}
      />

      {/* Student Data -5 */}
      <StudentsDocumentData
        documentsrc="/assets/images/default-applicants-image.jpeg"
        documentname="Church Membership Certificate"
        date="09 May 2024"
        verified={<SelectField
          name="category"
          control={control}
          options={options}
          placeholder="Verified"
          rules={{ required: "option is required" }}
          className="flex flex-wrap flex-col w-full"
          selectclass="py-1.5"
        />}
      />

    </div>
  );
};

export default ApplicationDocument;
