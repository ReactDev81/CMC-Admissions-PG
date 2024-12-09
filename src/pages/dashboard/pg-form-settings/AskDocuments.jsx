import ToggleButton from '../../../components/forms/ToggleButton'

const AskDocument = () => {
  return(
    <div className="px-8 py-6 max-w-[650px] w-full bg-white-default rounded-lg shadow-flex">

      <h2 className="text-black-default mb-14 capitalize">Ask Documents</h2>

      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">NEET PG-2024 Admit Card</span>
        <ToggleButton id="toggel-1"/>
      </div>

      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">NEET PG-2024 Score Card</span>
        <ToggleButton id="toggel-2"/>
      </div>

      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">Matriculation (10th Class Certificate)</span>
        <ToggleButton id="toggel-3"/>
      </div>

      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">Baptism Certificate</span>
        <ToggleButton id="toggel-4"/>
      </div>

      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">Church Membership Certificate</span>
        <ToggleButton id="toggel-5"/>
      </div>

      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">PG Letter of Service Commitment (Sponsorship Letter)</span>
        <ToggleButton id="toggel-6"/>
      </div>

      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">UG Service Obligation Completion/Service Cerficate</span>
        <ToggleButton id="toggel-7"/>
      </div>
      
      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">Domicile/Residence Certificate</span>
        <ToggleButton id="toggel-8"/>
      </div>

      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">Aadhar Card</span>
        <ToggleButton id="toggel-9"/>
      </div>

      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">Affidavit of Service (as per Format B)</span>
        <ToggleButton id="toggel-10"/>
      </div>

      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">PG Diploma</span>
        <ToggleButton id="toggel-11"/>
      </div>

      <div className="flex items-center justify-between border-b">
        <span className="text-lg font-normal text-black-300 px-1.5 py-3">Profile Pic</span>
        <ToggleButton id="toggel-12"/>
      </div>
    </div>
  )
}

export default AskDocument;