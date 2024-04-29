import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiFolderAddLine } from "react-icons/ri";
import { supabase } from "../../../../supabaseConfig";

const AddChat = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const signUpResult = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (signUpResult.error) {
        throw new Error(signUpResult.error.message);
      }

      const profileUpdateResult = await supabase
        .from("profiles")
        .update({
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name,
          role: userData.role,
        })
        .eq("email", userData.email);

      if (profileUpdateResult.error) {
        throw new Error(profileUpdateResult.error.message);
      }

      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-eucalyptus-800 text-eucalyptus-200 font-medium px-4 py-4 rounded-xl hover:bg-eucalyptus-900 transition-opacity text-2xl"
      >
        Start new chat
      </button>
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        loading={loading}
        handleAddUser={handleAddUser}
        userData={userData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
  loading,
  handleAddUser,
  userData,
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
                Enter new chat details!
              </h3>
              <form
                onSubmit={handleAddUser}
                className="flex flex-col text-xl gap-2 p-10 "
              >
                {Object.entries(userData).map(([key, value]) => (
                  <input
                    key={key}
                    className="rounded-xl p-3 placeholder:text-white focus:outline-red-500"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(15px)",
                      border: "solid 2px white",
                    }}
                    type={key === "email" ? "email" : "text"}
                    name={key}
                    value={value}
                    placeholder={key.replace("_", " ").toUpperCase()}
                    required={true}
                    onChange={handleInputChange}
                  />
                ))}
                <select
                  className="rounded-xl p-3 placeholder:text-white focus:outline-red-500"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(15px)",
                    border: "solid 2px white",
                  }}
                  value={userData.role}
                  onChange={handleInputChange}
                  name="role"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="authenticated user">Authenticated User</option>
                  <option value="user">User</option>
                </select>
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
                    {loading ? "Loading ..." : "Add User"}
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
