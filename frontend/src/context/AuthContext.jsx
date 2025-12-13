import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const saved = localStorage.getItem("user");
  //   if (saved) setUser(JSON.parse(saved));
  // }, []);

  const [user, setUser] = useState(undefined); // undefined = loading state

useEffect(() => {
  const saved = localStorage.getItem("user");
  if (saved) setUser(JSON.parse(saved));
  else setUser(null); // explicitly set to null when no user
}, []);


  const loginUser = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
