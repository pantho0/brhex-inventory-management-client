import { getCurrentUser } from "@/services/auth";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserContext {
  userId: string;
  fullName: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
}

interface UserProviderProps {
  user: IUserContext | null;
  loading: boolean;
  setUser: (user: IUserContext | null) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserProviderProps | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserContext | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();

    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [loading]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default UserProvider;
