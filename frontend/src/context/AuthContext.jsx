import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
const googleProvider = new GoogleAuthProvider();
//AuthProvider

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //register
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  //Login the user
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  // Google  signUp

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  //logout

  const Logout = () => {
    return signOut(auth);
  };

  //Manage User

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      console.log("User changed:", user);
      if (user) {
        const { email, displayName, photoURL } = user;
        const userData = {
          email,
          userName: displayName,
          photo: photoURL,
        };
      }
    });
    return () => unsubscribe(); // Clean up function when unmounted
  }, []);

  const value = {
    user,
    registerUser,
    loginUser,
    signInWithGoogle,
    Logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
