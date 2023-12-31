import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import Learn from "../../img/learning.jpg"
import Loadertwo from '../../components/loadertwo';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [persist, setPersist] = usePersist();


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername('');
      setPassword('');
      navigate('/dash');
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? 'errmsg' : 'offscreen';

  if (isLoading) return <p className='loader2'><Loadertwo/>Loading...</p>;

  const content = (
    <section className="public">
      <header className='logHeader'>
        <h1 >Contact saver</h1>
      </header>
      <hr></hr>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <div className='log'>

          <form className="form" onSubmit={handleSubmit}>
            <strong>Sign In</strong>

            <label htmlFor="username">Username:</label>
            <input
              className="form__input-log"
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              className="form__input-log"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />

            <button className='button-log'>
              <span class="transition"></span>
              <span class="gradient"></span>
              <span class="label">login</span>
            </button>

            <label htmlFor="persist" className="form__persist">
              <input
                type="checkbox"
                className="form__checkbox"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              Remind me
            </label>

            



            {/* Closing div element for the form */}
          </form>
          <div className='mount'>
            <img src={Learn} className="App-logo" alt="logo" />
          </div>
        </div>
      </main>
      <footer >
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;