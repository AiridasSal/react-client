import React, { useState } from "react";
import { registerUser } from "../../api";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher'

const Register = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setpostCode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ name, email, password, address, phoneNumber, postCode });
      setMessage("User registered successfully");
      navigate('/login');
    } catch (error) {
      setMessage("Error during registration");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div
     className="Login">
      <form
        onSubmit={handleSubmit}
        className="login"
      >
        
        <div 
        className="titleContainer">
        <h2>{t('Register')} <LanguageSwitcher /></h2>
        {/* <img src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://ecotrip.lt/wp-content/uploads/elementor/thumbs/Logotipas-su-apvadu_Eco-trip_spalvotas-pg43zxtkbz4d9rn6cxtg05jboambfqteyb93r8zap4.png" alt="logo" /> */}
        </div>
        <div>
          <label htmlFor="name">{t('Name')}</label>
          <input
            id="name"
            type="text"
            placeholder={t('Name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">{t('Email')}</label>
          <input
            id="email"
            type="email"
            placeholder={t('Email')}
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
            placeholder={t('Password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">{t('Address')}</label>
          <input
            id="address"
            type="text"
            placeholder={t('Address')}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postCode">{t('Post_Code')}</label>
          <input
            id="postCode"
            type="text"
            placeholder={t('Post_Code')}
            value={postCode}
            onChange={(e) => setpostCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mobileNumber">{t('Phone_Number')}</label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder={t('Phone_Number')}
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">{t('Register')}</button>
        </div>
        <p>{t('Already_have_an_account?')} <Link to="/login">{t('Login')}</Link></p>
        {message && <p>{message}</p>}
      </form>
      
    
      <div>
        
      </div>
    </div>

  );
};

export default Register;
