import { useContext } from "react";
import { UserIdContext } from "../utils/contexts";

export const useUserIdContext = () => {
  const context = useContext(UserIdContext);
  return context;
};
