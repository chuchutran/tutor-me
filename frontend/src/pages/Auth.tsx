import SignInWithGoogleButton from '../components/Signin'

const AuthPage = () => {
  return (
    <div id='auth-page'>
      <h1 className="hero">Users can create an account or log in here</h1>
      <SignInWithGoogleButton /> This will render the sign-in button
    </div>
  );
};

export default AuthPage;
