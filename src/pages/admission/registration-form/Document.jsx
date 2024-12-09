import Button from "../../../components/ui/Button";
import FileFeild from "../../../components/forms/filefeild";
const Document = () => {
  return (
    <form action="" className={`w-full bg-white-default`}>
      <h1 className="text-primary-default">Document</h1>
      {/* row-1 */}
      <div className="grid grid-rows-1 mt-7 mb-5">
        <div className="grid grid-cols-3 gap-10">
          <div>
            <FileFeild label="NEET PG-2024 Admit Card" />
          </div>
          <div>
            <FileFeild label="NEET UG-2024 Score Card" />
          </div>
          <div>
            <FileFeild label="Matriculation (10th Class Certificate)" />
          </div>
        </div>
      </div>
      {/* row-2 */}
      <div className="grid grid-rows-1 mb-5">
        <div className="grid grid-cols-3 gap-10">
          <div>
            <FileFeild label="Baptism Certificate" />
          </div>
          <div>
            <FileFeild label="Church Membership Certificate" />
          </div>
          <div>
            <FileFeild label="PG Letter of Service Commitment (Sponsorship Letter)" />
          </div>
        </div>
      </div>
      {/* row-3 */}
      <div className="grid grid-rows-1 mb-5">
        <div className="grid grid-cols-3 gap-10">
          <div>
            <FileFeild label="UG Service Obligation Completion/Service Cerficate" />
          </div>
          <div>
            <FileFeild label="Domicile/Residence Certificate" />
          </div>
          <div>
            <FileFeild label="Aadhar Card" />
          </div>
        </div>
      </div>
      {/* row-4 */}
      <div className="grid grid-rows-1 mb-5">
        <div className="grid grid-cols-3 gap-10">
          <div>
            <FileFeild label="Affidavit of Service (as per Format B)" />
          </div>
          <div>
            <FileFeild label="PG Diploma" />
          </div>
          <div>
            <FileFeild label="Profile Pic" />
          </div>
        </div>
      </div>
      {/* row-5 */}
      <div className="grid grid-rows-1 mb-5">
        <div className="grid grid-cols-3 gap-10">
          <div>
            <FileFeild label="Signature Pic" />
          </div>
          <div>
            <FileFeild label="MBBS First Prof marksheet" />
          </div>
          <div>
            <FileFeild label="MBBS Second Prof marksheet" />
          </div>
        </div>
      </div>
      {/* row-6 */}
      <div className="grid grid-rows-1 mb-5">
        <div className="grid grid-cols-3 gap-10">
          <div>
            <FileFeild label="MBBS Third Prof marksheet" />
          </div>
          <div>
            <FileFeild label="MBBS Final Prof marksheet" />
          </div>
          <div>
            <FileFeild label="MBBS Degree" />
          </div>
        </div>
      </div>
      {/* row-7 */}
      <div className="grid grid-rows-1 mb-5">
        <div className="grid grid-cols-3 gap-10">
          <div>
            <FileFeild label="Certificate as per Format A (if applicable)" />
          </div>
          <div>
            <FileFeild label="Internship Completion Certificate" />
          </div>
          <div>
            <FileFeild label="Online Document Verification" />
          </div>
        </div>
      </div>
      <div className="text-right pt-5 pr-5">
        <Button text="Next" classname="[&]:rounded-full [&]:px-5 [&]:py-1" />
      </div>
    </form>
  );
};
export default Document;