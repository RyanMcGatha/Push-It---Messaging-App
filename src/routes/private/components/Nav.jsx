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
    <nav className="h-screen bg-eucalyptus-900 flex flex-col justify-between  border-r-eucalyptus-400 border-r-[1px]">
      <ul className="flex flex-col h-fit gap-10 text-eucalyptus-200 text-4xl p-4 items-center text-center">
        <li className="text-6xl">
          <h1 className="text-center pt-3 capitalize">Welcome</h1>
          <h1 className="text-center pt-5 capitalize">{fullName}</h1>
        </li>
        <li className="pt-10 underline">
          <Link to="home">View All Chats</Link>
        </li>
        <li className="pt-10 underline">
          <Link to="ones">One on one's</Link>
        </li>
        <li className="pt-10 underline">
          <Link to="groups">Groups</Link>
        </li>
      </ul>
      <ul className="flex flex-col gap-9 mb-5 text-center  text-eucalyptus-200 text-4xl border-t-eucalyptus-400 border-t-[1px] p-6">
        <li>
          <button className="underline" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
