import Button from "../../components/ui/Button";
import FileFeild from "../../components/forms/FileFeild";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/UseAxios";
const Document = () => {

  const validateFile = (fileList, maxFileSize = 2048 * 1024) => {
    if (!fileList?.[0]) return true;
    const validMimeTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!validMimeTypes.includes(fileList[0].type)) {
        return "Invalid file type. Only JPEG, PNG, or PDF are allowed.";
    }
    if (fileList[0].size > maxFileSize) {
        return `File size exceeds ${maxFileSize / 1024}KB.`;
    }
    return true;
  };

  const {register, handleSubmit, formState: { errors }} = useForm();

  // const {data, error} = useAxios()

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className='w-full mt-2.5' onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-7 items-end">
        <FileFeild 
          label="NEET PG-2024 Admit Card"
          id="neetAdmitCard"
          {...register("neet_pg_2024_admit_card", {
              required: "This field is required.",
              validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.neet_pg_2024_admit_card?.message}
        />
        <FileFeild 
          label="NEET UG-2024 Score Card" 
          id="neetScoreCard"
          {...register("neet_pg_2024_score_card", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.neet_pg_2024_score_card?.message}
        />
        <FileFeild 
          label="Matriculation (10th Class Certificate)"
          id="matriculationCertificate"
          {...register("matriculation_certificate", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.matriculation_certificate?.message} 
        />
        <FileFeild 
          label="Baptism Certificate"
          id="baptismCertificate"
          {...register("baptism_certificate", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.baptism_certificate?.message}
        />
        <FileFeild 
          label="Church Membership Certificate" 
          id="chruchMembership"
          {...register("church_membership_certificate", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.church_membership_certificate?.message}
        />
        <FileFeild 
          label="Domicile/Residence Certificate"
          id="domicileResidenceCertificate"
          {...register("pg_letter_service_commitment", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.pg_letter_service_commitment?.message} 
        />
        <FileFeild 
          label="PG Letter of Service Commitment (Sponsorship Letter)"
          id="pgLetterOfService"
          {...register("ug_service_obligation_completion_service_certificate", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.ug_service_obligation_completion_service_certificate?.message} 
        />
        <FileFeild 
          label="UG Service Obligation Completion/Service Cerficate"
          id="UGService"
          {...register("domicile_residence_certificate", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.domicile_residence_certificate?.message} 
        />
        <FileFeild 
          label="Aadhar Card"
          id="adharCard"
          {...register("aadhar_card", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.aadhar_card?.message} 
        />
        <FileFeild 
          label="Affidavit of Service (as per Format B)"
          id="affidavitService"
          {...register("affidavit_service", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.affidavit_service?.message} 
        />
        <FileFeild 
          label="PG Diploma"
          id="pgDiploma"
          {...register("pg_diploma", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.pg_diploma?.message} 
        />
        <FileFeild 
          label="Profile Pic"
          id="profilePic"
          {...register("profile_pic", {
            validate: (fileList) => validateFile(fileList, 1024 * 1024),
          })}
          error={errors.profile_pic?.message} 
        />
        <FileFeild 
          label="Signature Pic"
          id="signaturePic"
          {...register("signature_pic", {
            validate: (fileList) => validateFile(fileList, 1024 * 1024),
          })}
          error={errors.signature_pic?.message} 
        />
        <FileFeild 
          label="MBBS First Prof marksheet"
          id="firstMarksheet"
          {...register("mbbs_first_prof_marksheet", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.mbbs_first_prof_marksheet?.message} 
        />
        <FileFeild 
          label="MBBS Second Prof marksheet"
          id="secondMarksheet"
          {...register("mbbs_second_prof_marksheet", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.mbbs_second_prof_marksheet?.message} 
        />
        <FileFeild 
          label="MBBS Third Prof marksheet"
          id="thirdMarksheet"
          {...register("mbbs_third_prof_marksheet", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.mbbs_third_prof_marksheet?.message} 
        />
        <FileFeild 
          label="MBBS Final Prof marksheet"
          id="finalMarksheet"
          {...register("mbbs_final_prof_marksheet", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.mbbs_final_prof_marksheet?.message} 
        />
        <FileFeild 
          label="Certificate as per Format A (if applicable)"
          id="certificatePerFormat"
          {...register("certificate_per_format_a", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.certificate_per_format_a?.message} 
        />
        <FileFeild 
          label="Internship Completion Certificate"
          id="internshipCompletionCertificatte"
          {...register("internship_completion_certificatte", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.internship_completion_certificatte?.message} 
        />
        <FileFeild 
          label="Online Document Verification"
          id="onlineDocumentVerification"
          {...register("online_document_verification", {
            validate: (fileList) => validateFile(fileList, 2048 * 1024),
          })}
          error={errors.online_document_verification?.message}
        />
      </div>
      <div className="text-right mt-8">
        <Button text="Next" classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5" />
      </div>
    </form>
  );
};
export default Document;