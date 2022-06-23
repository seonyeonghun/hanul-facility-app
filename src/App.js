import './App.css';
import {useRef, useState} from 'react';
import {signUp, useAuth, logOut} from './Firebase';

function App() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  async function handleSignUp() {
    setLoading(true);
    try {
      await signUp(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert('이미 사용중인 이메일 입니다!')
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logOut();
    } catch {
      alert('Error!')
    }
    setLoading(false)
  }
  return (
    <div className="App">
      <div>currently logged in as : {currentUser?.email}</div>
      <form autoComplete="off">
        <div className="fields">
          <input ref={emailRef} type="email" placeholder="email" />
          <input ref={passwordRef} type="password" placeholder="password" />
        </div>
        <button disabled={loading || currentUser != null} onClick={handleSignUp}>sign up</button>
        <button onClick={handleLogout}>log out</button>
      </form>
    </div>
  );
}

export default App;