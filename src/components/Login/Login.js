import React, { useState } from 'react';
import { loginUser } from '../../api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../UserContext";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher'
const Login = () => {
  const { t } = useTranslation();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      if (response.status === 200) {
        setMessage(`Logged in successfully as: ${response.user.email}`);
        setUser(response.user);
        navigate('/order');
      } else {
        setMessage('Error during login');
      }
    } catch (error) {
      setMessage('Error during login');
      console.error('Error during login:', error);
    }
  };

  return (
    <div 
    className='Login'
    >
      
      <form
        onSubmit={handleSubmit}
        className="login"
      >
        
        <div 
        className="titleContainer"><h2> {t('Login')} <LanguageSwitcher /></h2>
        {/* <img src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://ecotrip.lt/wp-content/uploads/elementor/thumbs/Logotipas-su-apvadu_Eco-trip_spalvotas-pg43zxtkbz4d9rn6cxtg05jboambfqteyb93r8zap4.png" alt="logo" /> */}
        </div>
        <div>
          <label htmlFor="email"> {t('Email')}</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">{t('Password')}</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">{t('Login')}</button>

          
        </div><p>{t('Dont_have_an_account_yet?')} <Link to="/register">{t('Register')}</Link></p>
        {message && <p>{message}</p>}
      </form>
      
      <div
      className='banner'
      >

        
      </div>
    </div>

  );
};

export default Login;
