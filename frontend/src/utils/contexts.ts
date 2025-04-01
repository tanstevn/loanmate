import { createContext } from "react";

interface UserIdContextType {
  userId: string;
  setUserId: (userId: string) => void;
}

export const UserIdContext = createContext<UserIdContextType | undefined>(
  undefined
);
