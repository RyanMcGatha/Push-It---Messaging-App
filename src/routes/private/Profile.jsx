import React from "react";
import { getUserData } from "./components/Hooks";
import ChatCard from "./components/ChatCard";

const Profile = () => {
  const { userData } = getUserData();
  console.log(userData);

  if (!userData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userData.map((data) => (
        <div key={data.user_id}>
          <h1>{data.full_name}</h1>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
          <p>Phone Number: {data.phone_number}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
