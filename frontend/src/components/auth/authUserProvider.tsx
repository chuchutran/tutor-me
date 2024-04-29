import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { auth } from "../../../../backend/firebase";
import { User } from '../../../../backend/types'

// Define the type for your auth data context
type AuthData = {
  user?: User | null;
};

const AuthUserContext = createContext<AuthData>({ user: null });

// Define the function to initialize an empty user
function createEmptyUser(): User {
  return {
    username: '',
    password: '',
    name: {
      first: '',
      last: '',
    },
    email: '',
    availabilities: [],
  };
}

// Your AuthUserProvider component
export default function AuthUserProvider({ children }: { readonly children: ReactNode }) {
  const [user, setUser] = useState<AuthData>({ user: null });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // Since you are creating a new user, initialize with empty properties
        const newUser = createEmptyUser();
        // TODO: Map userAuth to newUser properties as needed here

        setUser({ user: newUser });
      } else {
        setUser({ user: null });
      }
    });

    // Clean up the subscription
    return unsubscribe;
  }, []);

  return (
    <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthUserContext);
  return context;
};
