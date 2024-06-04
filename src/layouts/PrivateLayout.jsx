import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SideNav } from "../components/SideNav";
import { VerificationModal } from "../components/VerificationModal";

const PrivateLayout = () => {
  const { session } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (session && !session.user.is_verified) {
      setModalOpen(true);
    }
  }, [session]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="hidden md:flex">
          <SideNav />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <VerificationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default PrivateLayout;
