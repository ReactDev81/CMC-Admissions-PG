import React, { forwardRef } from 'react';

const FileFeild = forwardRef(({ label, id, error, ...rest}, ref) => {
    return (
        <div className="flex flex-col">
            <label className='mb-1.5' htmlFor={id}>
                {label}
            </label>
            <div className="file-field border rounded-md">
                <input
                    ref={ref}
                    {...rest}
                    id={id}
                    type="file"
                    placeholder="Choose File"
                    className="text-black-300 text-base font-normal w-full"
                />
            </div>
            {error && <p className="bg-red-100 py-2.5 px-5 text-red-800 mt-2 rounded-md font-normal">{error}</p>}
        </div>
    );
});
export default FileFeild;