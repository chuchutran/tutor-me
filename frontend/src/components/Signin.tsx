import { signInWithGoogle } from '../../../backend/firebase';
import { Button } from '@chakra-ui/react';

const SignInWithGoogleButton = () => {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Handle the successful sign-in case
    } catch (error) {
      // Handle errors here, such as a failed sign-in attempt
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Button onClick={handleSignIn} colorScheme="teal" variant="solid">
      Sign In with Google
    </Button>
  );
};

export default SignInWithGoogleButton;


<Button onClick={signInWithGoogle}>Sign In</Button>;