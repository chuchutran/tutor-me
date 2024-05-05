import { signInWithGooglePopup } from "../../../backend/firebase";

const AuthPage = () => {

  return (
    <div id='auth-page'>
      <h1 className="hero">Users can create account or log in here</h1>
      <button onClick={signInWithGooglePopup}>Click on me</button>
    </div>
  );
};

export default AuthPage;
