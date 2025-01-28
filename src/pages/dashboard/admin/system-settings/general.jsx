import React, { useState, useRef } from "react";
import InputField from "../../../../components/forms/Inputfield";
import Button from "../../../../components/ui/Button";
import { RxCross2 } from "react-icons/rx";

const General = ({data}) => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);
  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const handleFileChange = (event, setPreview) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (event) => {
    handleFileChange(event, setLogoPreview);
  };

  const handleFaviconChange = (event) => {
    handleFileChange(event, setFaviconPreview);
  };

  const removeLogo = () => {
    setLogoPreview(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const removeFavicon = () => {
    setFaviconPreview(null);
    if (faviconInputRef.current) {
      faviconInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="notification-settings border rounded-md">
        <div className="p-5 border-b">
          <h2 className="text-black-default mb-2.5">
            General and basic info settings
          </h2>
          <p className="text-black-300 font-normal">
            Lorem ipsum dolor sit amet consectetur adipiscing elit dui, mi
            facilisis malesuada leo sem dictum turpis cursus varius.
          </p>
        </div>
        <div className="flex">
          <div className="drag&droplogo p-5 flex flex-col basis-1/2">
            <div className="mb-5">
              <p className="text-black-default mb-3.5">Change Logo</p>
              <div className="relative">
                <label
                  htmlFor="logo-dropzone"
                  className="flex flex-col items-center justify-center min-h-[140px] border-dashed border-2 border-primary-200 rounded-md p-5 cursor-pointer"
                >
                  <div
                    id="logo-preview"
                    className="w-full h-52 flex items-center justify-center"
                  >
                    {logoPreview ? (
                      <>
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="h-full w-full object-contain z-10"
                        />
                        <div className="absolute inset-0 bg-black-200 flex items-center justify-center text-white text-sm font-semibold rounded-md"></div>
                      </>
                    ) : (
                      <p className="text-xl text-black-300 underline cursor-pointer">
                        Upload Image
                      </p>
                    )}
                  </div>
                  <input
                    type="file"
                    id="logo-dropzone"
                    ref={logoInputRef}
                    className="hidden"
                    onChange={handleLogoChange}
                    accept="image/*"
                  />
                </label>
                {logoPreview && (
                  <button
                    onClick={removeLogo}
                    className="absolute top-4 right-4 p-1 bg-white rounded-full shadow-md bg-white-default z-10"
                  >
                    <RxCross2 className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <p className="text-black-default mb-3.5">Site Favicon</p>
              <div className="relative">
                <label
                  htmlFor="favicon-dropzone"
                  className="flex flex-col items-center justify-center min-h-[140px] border-dashed border-2 border-primary-200 rounded-md p-5 cursor-pointer"
                >
                  <div
                    id="favicon-preview"
                    className="max-w-sm h-52 flex items-center justify-center"
                  >
                    {faviconPreview ? (
                      <>
                        <img
                          src={faviconPreview}
                          alt="Favicon Preview"
                          className="h-full w-full object-contain z-10"
                        />
                        <div className="absolute inset-0 bg-black-200 flex items-center justify-center text-white text-sm font-semibold rounded-md"></div>
                      </>
                    ) : (
                      <p className="text-xl text-black-300 underline cursor-pointer">
                        Upload Image
                      </p>
                    )}
                  </div>
                  <input
                    type="file"
                    id="favicon-dropzone"
                    ref={faviconInputRef}
                    className="hidden"
                    onChange={handleFaviconChange}
                    accept="image/*"
                  />
                </label>
                {faviconPreview && (
                  <button
                    onClick={removeFavicon}
                    className="absolute top-4 right-4 p-1 bg-white rounded-full shadow-md bg-white-default z-10"
                  >
                    <RxCross2 className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="p-5 basis-1/2">
            <InputField
              className="text-black-default mb-5"
              label="Site Title"
              type="text"
              placeholder="cmcludhiana.in"
            />

            <InputField
              className="text-black-default"
              label="Tagline"
              type="text"
              placeholder="Christian Medical College & Hospital, Ludhiana"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2.5 items-center justify-end mt-6 pt-5 border-t">
        <Button
          text="Cancel"
          classname="px-8 py-2.5 [&]:text-black-300 [&]:rounded-full [&]:bg-primary-200 border-0"
        />
        <Button
          text="Save Changes"
          classname="px-8 py-2.5 [&]:rounded-full border-0"
        />
      </div>
    </>
  );
};

export default General;