import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect
 } from '../../utils/firebase/firebase.utils';

import SignUp from '../../components/sign-up/sign-up.component';
import SignIn from '../../components/sign-in/sign-in.component';
import './authentication.styles.scss';

const Authentication = () => {

  useEffect(async () => {
    const response = await getRedirectResult(auth);
    if(response) {
      const userDocRef = await createUserDocumentFromAuth(response.user);
    }
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div className="authentication-container">
      <SignIn />
      <SignUp />
    </div>
  )
}

export default Authentication;
