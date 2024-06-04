import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SideNav } from "../components/SideNav";
import { VerificationModal } from "../components/VerificationModal";
import { useUserData } from "../hooks/useUserData";
import { InvalidTokenModal } from "../components/InvalidTokenModal";

const PrivateLayout = () => {
  const { session } = useAuth();
  const { status } = useUserData();
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [isInvalidTokenModalOpen, setInvalidTokenModalOpen] = useState(false);

  useEffect(() => {
    if (session?.user && !session.user.is_verified) {
      setVerificationModalOpen(true);
    }
  }, [session]);

  useEffect(() => {
    if (status === 403) {
      setInvalidTokenModalOpen(true);
    }
  }, [status]);

  const handleCloseVerificationModal = () => {
    setVerificationModalOpen(false);
  };

  const handleCloseInvalidTokenModal = () => {
    setInvalidTokenModalOpen(false);
    localStorage.removeItem("session");
    window.location.reload();
  };

  if (!session || !session.user) {
    return <div>Loading...</div>;
  }

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
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={handleCloseVerificationModal}
      />
      <InvalidTokenModal
        isOpen={isInvalidTokenModalOpen}
        onClose={handleCloseInvalidTokenModal}
      />
    </>
  );
};

export default PrivateLayout;
