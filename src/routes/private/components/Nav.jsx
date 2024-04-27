import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../../supabaseConfig";
import { useState, useEffect } from "react";

const Nav = () => {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setFullName(user.user_metadata.full_name);
      setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <nav
      className="h-full bg-eucalyptus-900 flex flex-col justify-between  border-r-eucalyptus-400 border-r-[1px]"
      style={{ maxWidth: "15vw", width: "15vw" }}
    >
      <ul className="flex flex-col h-fit gap-10 text-eucalyptus-300 text-3xl p-4">
        <li>
          <img
            src="https://via.placeholder.com/100"
            alt="avatar"
            className="w-full h-52 object-cover rounded-xl"
          />
          <a>
            <h1 className="text-center pt-3">{fullName}</h1>
          </a>
        </li>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="ones">One on one's</Link>
        </li>
        <li>
          <Link to="groups">Groups</Link>
        </li>
      </ul>
      <ul className="flex flex-col  h-fit gap-9 mb-3 text-eucalyptus-200 text-3xl border-t-eucalyptus-400 border-t-[1px] p-4">
        <li>
          <Link to="setting">Settings</Link>
        </li>
        <li>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
