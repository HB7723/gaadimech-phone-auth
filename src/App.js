import EmailPasswordAuth from "./EmailPasswordAuth";

import GoogleSignIn from "./GoogleSignIn";

import SignIn from "./PhoneAuth";

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>

      {/* <EmailPasswordAuth />
      <GoogleSignIn /> */}
      <SignIn />
    </div>
  );
}

export default App;
