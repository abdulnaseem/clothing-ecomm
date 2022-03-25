import { useState } from 'react';

import FormInput from '../form-input/form-input.component';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
  email: '',
  password: '',
}

const SignIn = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  console.log(formFields);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response)
      resetFormFields();
    }
    catch(error) {
      console.log(error);
      switch(error.code) {
        case 'auth/wrong-password':
          alert("incorrect password for email");
          break;
        case 'auth/user-not-found':
          alert("user not found, please sign up");
          break;
        default:
          console.log(error);
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({
      ...formFields,
      [name]: value
    });
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email} />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password} />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">Google Sign In</Button>
        </div>

      </form>
    </div>
  )
}

export default SignIn;
