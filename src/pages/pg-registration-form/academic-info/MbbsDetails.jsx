import InputField from "../../../components/forms/Inputfield"

const MbbsDetails = ({ register, errors }) => {
    return (
        <>
            <h2 className="text-black-default leading-5 capitalize mb-8">
                MBBS
            </h2>
            <div className="grid grid-cols-2 gap-7">
                <InputField 
                    label="Name collage"
                    {...register('mbbs_college_name', {required: true})} 
                    error={errors.mbbs_college_name?.type === 'required' ? 'Collage Name is Required' : undefined}
                />
                <InputField 
                    label="Name of University" 
                    {...register('mbbs_name_university', {required: true})} 
                    error={errors.mbbs_name_university?.type === 'required' ? 'University Name is Required' : undefined}
                />
                <InputField 
                    label="Date of Passing" 
                    type="date"
                    {...register('mbbs_data_passing_date', {required: true})} 
                    error={errors.mbbs_data_passing_date?.type === 'required' ? 'Passing Date is Required' : undefined}
                />
                <InputField 
                    label="Intership Completion Date" 
                    type="date" 
                    {...register('mbbs_internship_completion_date', {required: true})} 
                    error={errors.mbbs_internship_completion_date?.type === 'required' ? 'Intership Completion Date is Required' : undefined}
                />
            </div>

            <div className="grid items-center grid-cols-5 gap-5 mt-8">

                <label>Examination</label>
                <label>Max. Marks</label>
                <label>Marks Obtained</label>
                <label>% Gained</label>
                <label>No. Of Attempts</label>

                <div className="label">
                    <label>First Year</label>
                </div>
                <InputField
                    placeholder="First Max. Marks"
                    type="number"
                    {...register('mbbs_max_marks_first', {required: true})} 
                    error={errors.mbbs_max_marks_first?.type === 'required' ? 'First Examination Marks is Required' : undefined}
                />
                <InputField
                    placeholder="First Marks Obtained"
                    type="number"
                    {...register('mbbs_marks_obtained_first', {required: true})} 
                    error={errors.mbbs_max_marks_second?.type === 'required' ? 'First Marks Obtained is Required' : undefined}
                />
                <InputField
                    placeholder="First Gained"
                    type="number"
                    {...register('mbbs_percent_gained_first', {required: true})} 
                    error={errors.mbbs_percent_gained_first?.type === 'required' ? 'First % Gained is Required' : undefined}
                />
                <InputField
                    placeholder="First No. Of Attempts"
                    type="number"
                    {...register('mbbs_no_of_attempts_first', {required: true})} 
                    error={errors.mbbs_no_of_attempts_first?.type === 'required' ? 'First No. Of Attempts Date is Required' : undefined}
                />

                <div className="label">
                    <label>Second Year</label>
                </div>
                <InputField
                    placeholder="Second Max. Marks"
                    type="number"
                    {...register('mbbs_max_marks_second', {required: true})} 
                    error={errors.mbbs_max_marks_second?.type === 'required' ? 'Second Examination Marks is Required' : undefined}
                />
                <InputField
                    placeholder="Second Marks Obtained"
                    type="number"
                    {...register('mbbs_marks_obtained_second', {required: true})} 
                    error={errors.mbbs_marks_obtained_second?.type === 'required' ? 'Second Marks Obtained is Required' : undefined}
                />
                <InputField
                    placeholder="Second Gained"
                    type="number"
                    {...register('mbbs_percent_gained_second', {required: true})} 
                    error={errors.mbbs_percent_gained_second?.type === 'required' ? 'Second % Gained is Required' : undefined}
                />
                <InputField
                    placeholder="Second No. Of Attempts"
                    type="number"
                    {...register('mbbs_no_of_attempts_second', {required: true})} 
                    error={errors.mbbs_no_of_attempts_second?.type === 'required' ? 'Second No. Of Attempts Date is Required' : undefined}
                />

                <div className="label">
                    <label>Third Year</label>
                </div>
                <InputField
                    placeholder="Third Max. Marks"
                    type="number"
                    {...register('mbbs_max_marks_third', {required: true})} 
                    error={errors.mbbs_max_marks_third?.type === 'required' ? 'Third Examination Marks is Required' : undefined}
                />
                <InputField
                    placeholder="Third Marks Obtained"
                    type="number"
                    {...register('mbbs_marks_obtained_third', {required: true})} 
                    error={errors.mbbs_marks_obtained_third?.type === 'required' ? 'Third Marks Obtained is Required' : undefined}
                />
                <InputField
                    placeholder="Third Gained"
                    type="number"
                    {...register('mbbs_percent_gained_third', {required: true})} 
                    error={errors.mbbs_percent_gained_third?.type === 'required' ? 'Third % Gained is Required' : undefined}
                />
                <InputField
                    placeholder="Third No. Of Attempts"
                    type="number"
                    {...register('mbbs_no_of_attempts_third', {required: true})} 
                    error={errors.mbbs_no_of_attempts_third?.type === 'required' ? 'Third No. Of Attempts Date is Required' : undefined}
                />

                <div className="label">
                    <label>Final Year</label>
                </div>
                <InputField
                    placeholder="Final Max. Marks"
                    type="number"
                    {...register('mbbs_max_marks_final', {required: true})} 
                    error={errors.mbbs_max_marks_final?.type === 'required' ? 'Final Examination Marks is Required' : undefined}
                />
                <InputField
                    placeholder="Final Marks Obtained"
                    type="number"
                    {...register('mbbs_marks_obtained_final', {required: true})} 
                    error={errors.mbbs_marks_obtained_final?.type === 'required' ? 'Final Marks Obtained is Required' : undefined}
                />
                <InputField
                    placeholder="Final Gained"
                    type="number"
                    {...register('mbbs_percent_gained_final', {required: true})} 
                    error={errors.mbbs_percent_gained_final?.type === 'required' ? 'Final % Gained is Required' : undefined}
                />
                <InputField
                    placeholder="Final No. Of Attempts"
                    type="number"
                    {...register('mbbs_no_of_attempts_final', {required: true})} 
                    error={errors.mbbs_no_of_attempts_final?.type === 'required' ? 'Final No. Of Attempts Date is Required' : undefined}
                />

                <div>
                    <label>Total:</label>
                </div>
                <InputField
                    placeholder="Total Max. Marks"
                    type="number"
                    {...register('mbbs_max_marks_total', {required: true})} 
                    error={errors.mbbs_max_marks_total?.type === 'required' ? 'Total Max. Marks is Required' : undefined}
                />
                <InputField
                    placeholder="Total Marks Obtained"
                    type="number"
                    {...register('mbbs_marks_obtained_total', {required: true})} 
                    error={errors.mbbs_marks_obtained_total?.type === 'required' ? 'Total Marks Obtained is Required' : undefined}
                />
                <InputField
                    placeholder="Total Gained"
                    type="number"
                    {...register('mbbs_percent_gained_total', {required: true})} 
                    error={errors.mbbs_percent_gained_total?.type === 'required' ? 'Total % Gained is Required' : undefined}
                />
                <InputField
                    placeholder="Total No. Of Attempts"
                    type="number"
                    {...register('mbbs_no_of_attempts_total', {required: true})} 
                    error={errors.mbbs_no_of_attempts_total?.type === 'required' ? 'Total No. Of Attempts is Required' : undefined}
                />
            </div>
        </>
    )
}

export default MbbsDetails;