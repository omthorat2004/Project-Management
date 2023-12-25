import React from 'react';
import { useDispatch } from 'react-redux';
import { useGoogle } from '../../hooks/useGoogle'; // Assuming the hook is in a file called useGoogle.js

const GoogleSignInComponent = () => {
    const dispatch = useDispatch()
  const { handleGoogleSignIn } = useGoogle(dispatch); // Using the custom hook

  const handleClick = () => {
    // This function might be triggered by a button click or any other user interaction
    handleGoogleSignIn(); // Call the function from the hook to initiate the Google sign-in process
  };

  return (
    <div className="d-grid gap-2 mb-3 mb-lg-4">
      <button type="button" className="btn btn-primary btn-lg" onClick={handleClick}>Sign In with Google</button>
    </div>
  );
};

export default GoogleSignInComponent;
