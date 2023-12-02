"use client";
import React from "react";
import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  initializeApp,
} from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseCredentials: FirebaseOptions = {
  apiKey: "AIzaSyDBdPSnVWK4wFnoArhQhMj09P8739RZ2OY",
  authDomain: "react-oct-2023.firebaseapp.com",
  projectId: "react-oct-2023",
  storageBucket: "react-oct-2023.appspot.com",
  messagingSenderId: "146387142775",
  appId: "1:146387142775:web:eb8137386176807cf95e72",
  measurementId: "G-L9747F715X",
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

interface FirebaseContextProps {
  firebaseApp: FirebaseApp | null;
  firebaseAuth: Auth | null;
}

const initFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseCredentials);
    auth = getAuth(app);
  }

  return app;
};

const FirebaseContext = React.createContext<FirebaseContextProps>({
  firebaseApp: initFirebase(),
  firebaseAuth: null,
});

export const FirebaseContextProvider: React.FC<React.PropsWithChildren> =
  React.memo(({ children }) => {
    const [firebaseApp, setFirebaseApp] = React.useState<FirebaseApp | null>(
      app
    );
    const [firebaseAuth, setFirebaseAuth] = React.useState<Auth | null>(auth);

    React.useEffect(() => {
      if (!firebaseApp) {
        setFirebaseApp(initFirebase());
      } else {
        getAnalytics(getApp());
      }
    }, [firebaseApp]);

    React.useEffect(() => {
      if (!firebaseAuth) {
        setFirebaseAuth(getAuth());
      }
    }, [firebaseAuth]);

    const contextValue = React.useMemo(
      () => ({
        firebaseApp,
        firebaseAuth,
      }),
      [firebaseApp, firebaseAuth]
    );
    return (
      <FirebaseContext.Provider value={contextValue}>
        {children}
      </FirebaseContext.Provider>
    );
  });

FirebaseContextProvider.displayName = "FirebaseContextProvider";

export const useFirebaseContext = () =>
  React.useContext<FirebaseContextProps>(FirebaseContext);
