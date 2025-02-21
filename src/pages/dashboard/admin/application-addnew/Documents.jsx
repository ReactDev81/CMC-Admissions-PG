import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import FileFeild from "../../../../components/forms/FileFeild";
import Button from "../../../../components/ui/Button";
import OutlineButton from '../../../../components/ui/OutlineButton';

const Documents = ({activeTab, setActiveTab, applicationId}) => {

    const { userData } = useContext(UserContext);

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
    
    const {status, loading, error, fetchData} = useAxios(`/applications/${applicationId}/documents`, 'post', 
        {
            headers: {
                'Authorization': `Bearer ${userData.token}`,
                "Content-Type": "multipart/form-data",
            }
        }
    )

    const onSubmit = async (formData) => {

        const transformedData = Object.keys(formData).reduce((acc, key) => {
            const value = formData[key];
            acc[key] = value instanceof FileList ? value[0] : value;
            return acc;
        }, {});

        const formattedData = {
            ...transformedData,
            step: "documents",
            application_id: applicationId,
        };

        await fetchData({ data: formattedData });
    };
    
    useEffect(() => {
        if(status === 201) {
            setActiveTab(activeTab + 1);
            toast.success(toast.message);
        }
    }, [status])

    return(
        <form className='w-full mt-2.5' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-7 items-end">
                <FileFeild 
                    label="NEET PG-2024 Admit Card"
                    id="neetAdmitCard"
                    {...register("neet_admit_card", {
                        required: "This field is required.",
                        validate: (fileList) => validateFile(fileList, 2048 * 1024),
                    })}
                    error={errors.neet_admit_card?.message}
                />
                <FileFeild 
                    label="NEET UG-2024 Score Card" 
                    id="neetScoreCard"
                    {...register("neet_score_card", {
                        validate: (fileList) => validateFile(fileList, 2048 * 1024),
                    })}
                    error={errors.neet_score_card?.message}
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
            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal" dangerouslySetInnerHTML={{ __html: error }}></p>}
            <div className="flex flex-wrap items-center justify-between mt-8">
                <div>
                    <Button
                        type="button"
                        text="Previous"
                        onclick={() => setActiveTab(activeTab - 1)}
                        classname="[&]:py-2.5 [&]:px-7 [&]:rounded-full border-0 [&]:text-black-300 [&]:bg-primary-100"
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        text={loading ? 'Loading....' : "Save"}
                        classname="[&]:rounded-full self-end [&]:px-10 [&]:py-2.5"
                    />
                    <OutlineButton
                        type="button"
                        text="Next"
                        onclick={() => setActiveTab(activeTab + 1)}
                        className="rounded-full text-primary-default border-primary-default px-8 py-2 ml-2"
                    />
                </div>
            </div>
        </form>
    )
}

export default Documents;