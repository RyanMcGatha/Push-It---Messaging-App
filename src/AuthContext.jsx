import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseConfig";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState("loading");

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>
      {session === "loading" ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
