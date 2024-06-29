import { createContext, useState } from "react";
export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const contextValue = {
    loading,
    setLoading,
    email,
    setEmail,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
