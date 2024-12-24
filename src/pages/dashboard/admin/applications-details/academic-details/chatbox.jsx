import { IoCloseSharp } from "react-icons/io5";
import Button from "../../../../components/ui/Button";

const ChatBox = () => {
  return (
    <div className="chat-box max-w-[474px] w-full bg-white-default">
      <header className="w-full border-b">
        <div className="p-5 flex items-center gap-8">
          <IoCloseSharp className="text-black-default h-5 w-5" />
          <h4 className="text-black-default capitalize">add remarks</h4>
        </div>
      </header>
      <main>
        <div className="p-5 border-b">
          <div className="flex dlex-wrap gap-2.5 justify-start w-full mb-4">
            <div>
              <img
                src="src/assets/images/chatbox.png"
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            <div className="px-3 py-2.5 border rounded-md">
              <p className="text-black-300 text-base font-normal mb-1">
                ipsum dolar sit
              </p>
              <p className="text-black-300 text-base font-normal">8:50 am</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-end w-full mb-4">
            <div className="px-3 py-2.5 border rounded-md">
              <p className="text-black-300 text-base font-normal mb-1">
                ipsum dolar sit
              </p>
              <p className=" text-base font-normal text-right text-info-default">
                8:50 am
              </p>
            </div>
          </div>

          <div className="flex dlex-wrap gap-2.5 justify-start w-full mb-4">
            <div>
              <img
                src="src/assets/images/chatbox.png"
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            <div className="px-3 py-2.5 border rounded-md">
              <p className="text-black-300 text-base font-normal mb-1">
                Consectetuorem ipsum
              </p>
              <p className="text-black-300 text-base font-normal">8:50 am</p>
            </div>
          </div>

          <div className="flex dlex-wrap gap-2.5 justify-end w-full mb-4">
            <div className="px-3 py-2.5 border rounded-md">
              <p className="text-black-300 text-base font-normal mb-1">
                dolar sit
              </p>
              <p className="text-base font-normal text-right text-info-default">
                8:50 am
              </p>
            </div>
          </div>

          <div className="flex dlex-wrap gap-2.5 justify-start w-full mb-4">
            <div>
              <img
                src="src/assets/images/chatbox.png"
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            <div className="px-3 py-2.5 border rounded-md">
              <p className="text-black-300 text-base font-normal mb-1">
                ipsum dolor sit?
              </p>
              <p className="text-black-300 text-base font-normal">8:50 am</p>
            </div>
          </div>

          <div className="flex dlex-wrap gap-2.5 justify-end w-full mb-4">
            <div className="px-3 py-2.5 border rounded-md">
              <p className="text-black-300 text-base font-normal mb-1">
                Varius gravida nec ligula urna
              </p>
              <p className="text-base font-normal text-right text-info-default">
                8:50 am
              </p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <textarea
            name="chatbox"
            rows="3"
            className="w-full rounded-lg p-4 border text-black-300 block outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-default mb-4"
            id=""
            placeholder="Add Remark..."
          ></textarea>
          <div className="text-right">
            <Button text="Sent" classname="[&]:rounded-full [&]:px-8 [&]:py-2" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatBox;
