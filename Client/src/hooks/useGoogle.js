import { signInWithPopup } from "firebase/auth";
import { signGoogle } from "../Redux/authenticationSlice";
import { auth, googleProvider } from "../firebase";
export const useGoogle = (dispatch) => {
  

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Do something with 'result' if needed, like dispatching an action
      // For example:
      console.log(result.user)
      const {displayName,email,photoURL}=result.user
      dispatch(signGoogle({name:displayName,email:email,photoUrl:photoURL}));

    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
  };

  return {
    handleGoogleSignIn, // Return the function to be used in the component
  };
};
