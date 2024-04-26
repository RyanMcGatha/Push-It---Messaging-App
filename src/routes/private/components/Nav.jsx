import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../../supabaseConfig";

const Nav = () => {
  return (
    <nav
      className="h-full bg-blue-200"
      style={{ maxWidth: "15vw", width: "15vw" }}
    >
      <ul className="flex flex-col items-center h-96 justify-around">
        <li>
          <img
            src="https://via.placeholder.com/100"
            alt="avatar"
            className="w-10 h-10 object-cover rounded"
          />
        </li>
        <li>
          <Link to="home">Home</Link>
        </li>

        <li>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
