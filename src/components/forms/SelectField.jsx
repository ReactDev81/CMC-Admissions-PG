import React from 'react';
import { useController } from 'react-hook-form';

const SelectField = ({name, control, label = '', labelclass, options = [], placeholder = 'Select an option',selectclass, className = '', rules = {} }) => {
    const {field, fieldState: { error }} = useController({name, control, rules});
    return (
        <div className={` ${className}`}>
            {label && <label className={`select-element mb-2 text-black-300 ${labelclass}`}>{label}</label>}
            <select
                {...field}
                className={`block w-full border rounded-md px-4 py-3 text-base font-normal text-black-300 relative ${selectclass}`}
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
