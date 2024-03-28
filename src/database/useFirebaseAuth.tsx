import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut as firebaseSignout, User } from 'firebase/auth';
import { app } from './db';
import { FirebaseError } from 'firebase/app';

const auth = getAuth(app);
console.log({ auth });
const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  const createUser = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const createUserError = error as FirebaseError;
      if (createUserError.code === 'auth/email-already-in-use') {
        setError('Creating account failed, please try again.');
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError('Authentication failed, please try again.');
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignout(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return { user, createUser, loading, signIn, signOut, error };
};

export default useFirebaseAuth;