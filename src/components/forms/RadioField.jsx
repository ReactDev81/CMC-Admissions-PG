import React from 'react';
import { useController } from 'react-hook-form';

const RadioField = ({ name, control, options, label }) => {

const { field: { onChange, onBlur, value, ref }, fieldState: { error },} = useController({name, control, rules: { required: `${label} is required` },});

    return (
        <div>
            {label && <label className='mb-2'>{label}</label>}
            <div className='flex items-center gap-x-5'>
                {options.map((option) => {
                    const isChecked = value === option.value;
                    return(
                        <label key={option.value} className='mt-4 flex items-center gap-x-1.5 text-base font-normal leading-5 text-black-200 cursor-pointer'>
                        <input
                            className='hidden'
                            type="radio"
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                            onBlur={onBlur}
                            ref={ref}
                        />
                        <span 
                            className={`cursor-pointer inline-block rounded-full relative w-[18px] h-[18px] border border-solid 
                            ${isChecked ? 'border-primary-default' : 'border-black-200'} after:content-[''] after:w-3 after:h-3 after:rounded-full after:absolute 
                            after:top-2/4 after:left-2/4 after:-translate-x-2/4 after:-translate-y-2/4 after:bg-primary-default ${isChecked ? 'after:opacity-100' : 'after:opacity-0'}`}
                        />
                            {option.label}
                    </label>
                    )
                })}
            </div>
            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal">{error.message}</p>}
        </div>
    );
};

export default RadioField;
