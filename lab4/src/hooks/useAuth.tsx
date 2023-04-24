import { useContext } from "react";
import AuthContext, { AuthContextType } from "../context/authContext";

const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

export default useAuth;