import InputField from "../../../../components/forms/Inputfield";
import Button from "../../../../components/ui/Button";

const General = () => {
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
              <label
                htmlFor="dropzone"
                className="flex items-center justify-center min-h-[140px] border-dashed border-2 border-primary-200 rounded-md p-5"
              >
                <small className="text-black-300 underline font-normal">
                  drag and drop
                </small>
                <input type="file" id="dropzone" className="hidden" />
              </label>
            </div>

            <div>
              <p className="text-black-default mb-3.5">Site Favicon</p>
              <label
                htmlFor="dropzone"
                className="flex items-center justify-center min-h-[140px] border-dashed border-2 border-primary-200 rounded-md p-5"
              >
                <small className="text-black-300 underline font-normal">
                  drag and drop
                </small>
                <input type="file" id="dropzone" className="hidden" />
              </label>
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
