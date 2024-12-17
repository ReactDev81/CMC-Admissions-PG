import React from 'react';
import { useController } from 'react-hook-form';

const SelectField = ({name, control, label = '', options = [], placeholder = 'Select an option', className = '' }) => {
    const {field, fieldState: { error }} = useController({name, control, rules: { required: `${label} is required` }});
    return (
        <div className={`flex flex-wrap flex-col ${className ? className : ''}`}>
            {label && <label className='select-element mb-2'>{label}</label>}
            <select
                {...field}
                className='block w-full border rounded-md px-4 py-3 text-base font-normal text-black-300 relative'
            >
                <option value="" disabled hidden>
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal">{error.message}</p>}
        </div>
    );
};
export default SelectField;
