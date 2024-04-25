import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseConfig";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState("loading");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    console.log(session);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
