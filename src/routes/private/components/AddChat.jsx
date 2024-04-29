import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiFolderAddLine } from "react-icons/ri";
import { supabase } from "../../../../supabaseConfig";

const AddChat = ({}) => {
  const [loading, setLoading] = useState(false);
  const [chatData, setChatData] = useState({
    chat_name: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChatData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateChat = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
        "X-API-KEY":
          "neurelo_9wKFBp874Z5xFw6ZCfvhXVDJ+LiTxRH5g8EIPHIltF4eJyUkIkPuZa28E/j27n4p7g78sodDoNFVybTx3GuBXAQY2QFUoXUQQff3EYC8Yp9b0HY1CmFBYQQQYKrKXWHzocwrP/W6PeIG+R8mwaPKJ/Q0YH42gsX2Pm2oNj1LpgHkX6CinOF6GPzXyftO88Hm_6WDq3T3BsqUg5xLhWKkSs5N9zZ4PXT+Y+THHalGqfb8=",
      };
      const body = JSON.stringify({
        chat_name: chatData.chat_name,
      });

      const response = await fetch(
        "https://us-east-2.aws.neurelo.com/rest/chats/__one",
        {
          method: "POST",
          headers: headers,
          body: body,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create chat");
      }

      alert("Chat created successfully!");
      setIsOpen(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-eucalyptus-800 text-eucalyptus-200 font-medium px-4 py-4 rounded-xl hover:bg-eucalyptus-900 transition-opacity text-2xl"
      >
        Start New Chat
      </button>
      <ChatModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        loading={loading}
        handleCreateChat={handleCreateChat}
        chatData={chatData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

const ChatModal = ({
  isOpen,
  setIsOpen,
  loading,
  handleCreateChat,
  chatData,
  handleInputChange,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-eucalyptus-800 to-eucalyptus-900 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <RiFolderAddLine className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-2">
                Enter New Chat Details!
              </h3>
              <form
                onSubmit={handleCreateChat}
                className="flex flex-col text-xl gap-2 p-10"
              >
                <input
                  className="rounded-xl p-3 placeholder:text-white focus:outline-red-500"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(15px)",
                    border: "solid 2px white",
                  }}
                  type="text"
                  name="chat_name"
                  value={chatData.chat_name}
                  placeholder="CHAT NAME"
                  required={true}
                  onChange={handleInputChange}
                />
                <div className="flex gap-5 items-center mt-5">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-500 hover:bg-white/10 transition-colors text-white font-semibold w-full p-2 rounded-xl whitespace-nowrap"
                  >
                    Go Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-500 hover:bg-white/10 transition-colors text-white font-semibold w-full p-2 rounded-xl whitespace-nowrap"
                  >
                    {loading ? "Creating ..." : "Create Chat"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddChat;