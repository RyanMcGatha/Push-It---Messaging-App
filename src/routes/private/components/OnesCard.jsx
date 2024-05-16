import { FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import ChatSettings from "./ChatSettings";
import { useState } from "react";

const OnesCard = ({
  id,
  title,
  usernames,
  chats,
  onDelete,
  setSelectedChat,
  setSelectedChatData,
  userData,
}) => {
  return (
    <GlassEffectCard
      key={id}
      title={title}
      id={id}
      usernames={usernames}
      chats={chats}
      onDelete={onDelete}
      setSelectedChat={setSelectedChat}
      setSelectedChatData={setSelectedChatData}
      userData={userData}
    />
  );
};

const GlassEffectCard = ({
  id,
  title,
  usernames,
  chats,
  onDelete,
  setSelectedChat,
  setSelectedChatData,
  userData,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative rounded-xl shadow-xl overflow-hidden bg-transparent border border-eucalyptus-400 flex w-full">
      <div
        className="bg-eucalyptus-900/50 group-hover:bg-eucalyptus-900/70 w-full flex justify-between text-center z-10 p-4"
        onClick={() => {
          setSelectedChat(id);
          setSelectedChatData(title, usernames);
        }}
      >
        <div className="flex flex-col items-center">
          <FiMessageCircle className="rounded-full border-2 border-eucalyptus-400 bg-eucalyptus-950 p-2 text-6xl text-eucalyptus-200" />
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className="text-lg md:text-xl font-bold text-eucalyptus-200 capitalize mb-2">
            <span className="text-eucalyptus-400 text-4xl">{title}</span>
          </p>
          <p className="text-lg md:text-xl font-bold text-eucalyptus-200 capitalize mb-2 flex w-full">
            <div className="flex justify-center gap-1 w-full">
              {usernames.map((name, index) => (
                <span key={index} className="text-eucalyptus-400 text-lg">
                  {name}
                  {index < usernames.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </p>
          <p className="z-10 text-eucalyptus-200 text-lg md:text-xl underline hover:text-eucalyptus-400">
            <Link to={`/ones/${id}/${usernames}`}>View Conversation</Link>
          </p>
        </div>
        <div className="flex flex-col items-center">
          <ChatSettings
            id={id}
            onDelete={onDelete}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
      <div className="absolute inset-0 z-0 bg-eucalyptus-900/20 backdrop-blur-sm" />
    </div>
  );
};

export default OnesCard;
