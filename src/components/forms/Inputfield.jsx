import React, { forwardRef } from 'react';

const InputField = forwardRef(({ label, type, placeholder, id, error, className, inputclass, ...rest}, ref) => {
    return (
        <div className={`flex flex-wrap flex-col ${className ? className : ''}`}>
            <label className='mb-2' htmlFor={id}>
                {label}
            </label>
            <input
                ref={ref}
                {...rest}
                className={`border rounded-md text-base font-normal leading-5 px-4 py-3 ${inputclass ? inputclass : ''}`}
                type={type ? type : 'text'}
                id={id}
                placeholder={placeholder}
            />
            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal">{error}</p>}
        </div>
    );
});

export default InputField;