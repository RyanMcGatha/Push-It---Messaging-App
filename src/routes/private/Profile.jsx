import { userData } from "three/examples/jsm/nodes/Nodes.js";
import { getUserData, headers } from "./components/Hooks";
import { useEffect, useState } from "react";

const Profile = () => {
  const { username, full_name } = getUserData();
  const [user_data, setUser_data] = useState([]);
  console.log(user_data);

  useEffect(() => {
    const fetchUser = async () => {
      const filterParams = encodeURIComponent(
        JSON.stringify({
          username,
          full_name,
        })
      );

      const url = `https://us-east-2.aws.neurelo.com/rest/user_profiles?filter=${filterParams}`;

      try {
        const response = await fetch(url, { method: "GET", headers });
        if (!response.ok) throw new Error("Failed to fetch messages");

        const result = await response.json();
        setUser_data();
      } catch (error) {
        console.error("Fetch messages error:", error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user_data.map((user) => (
        <>
          <p>Full Name: {user.full_name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ))}
    </div>
  );
};

export default Profile;
