"use client";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  // Para google
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import React from "react";
import { useRouter } from "next/navigation";

interface FirebaseAuthContextProps {
  user: User | undefined;
  loadingAuthState: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  registerUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const FirebaseAuthContext = React.createContext<FirebaseAuthContextProps>({
  user: undefined,
  loadingAuthState: true,
  login: async () => {},
  loginWithGoogle: async () => {},
  registerUser: async () => {},
  logout: async () => {},
});

export const FirebaseAuthContextProvider: React.FC<React.PropsWithChildren> =
  React.memo(({ children }) => {
    const [user, setUser] = React.useState<User | undefined>(undefined);
    const [loadingAuthState, setLoadingAuthState] = React.useState(true);

    console.log(loadingAuthState);

    const login = React.useCallback(async (email: string, password: string) => {
      try {
        setLoadingAuthState(true);
        const userCredential = await signInWithEmailAndPassword(
          getAuth(),
          email,
          password
        );

        //
        // userCredential.user.refreshToken;
        setUser(userCredential.user);
      } catch (error) {
        // Sentry => capturar el error
        // LogRocket => capturar el error
        console.error(error);
      } finally {
        setLoadingAuthState(false);
      }
    }, []);

    const registerUser = React.useCallback(
      async (email: string, password: string) => {
        try {
          setLoadingAuthState(true);
          const userCredential = await createUserWithEmailAndPassword(
            getAuth(),
            email,
            password
          );

          //
          // userCredential.user.refreshToken;
          setUser(userCredential.user);
        } catch (error) {
          // Sentry => capturar el error
          // LogRocket => capturar el error
          console.error(error);
        } finally {
          setLoadingAuthState(false);
        }
      },
      []
    );
    const logout = React.useCallback(async () => {}, []);
    const loginWithGoogle = React.useCallback(async () => {}, []);

    React.useEffect(() => {
      const unsubscribe = getAuth().onAuthStateChanged((user: User | null) => {
        setLoadingAuthState(true);

        if (!user) {
          setUser(undefined);
          setLoadingAuthState(false);
          return;
        }

        setUser(user);
        setLoadingAuthState(false);

        // LogRocket.identify(user.uid, {
        //   name: user.displayName ?? "",
        //   email: user.email ?? "",
        // });
      });

      return () => {
        unsubscribe();
      };
    }, []);

    const contextValue: FirebaseAuthContextProps = React.useMemo(
      () => ({
        user,
        loadingAuthState,
        login,
        registerUser,
        logout,
        loginWithGoogle,
      }),
      [loadingAuthState, login, loginWithGoogle, logout, registerUser, user]
    );

    return (
      <FirebaseAuthContext.Provider value={contextValue}>
        {children}
      </FirebaseAuthContext.Provider>
    );
  });

FirebaseAuthContextProvider.displayName = "FirebaseAuthContextProvider";

export const useFirebaseAuthContext = () =>
  React.useContext<FirebaseAuthContextProps>(FirebaseAuthContext);
