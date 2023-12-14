import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserCheck, FaLock, FaEnvelope, FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import './Login.css';
import { AppBar, Toolbar, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6f48eb", // 보라색
    },
  },
});

const RegisterPage = () => {
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handlePasswordCheckChange = (event) => {
      setPasswordCheck(event.target.value);
    };
  

    return (
        <div className="member">
        <ThemeProvider theme={theme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <AppBar position="fixed">
            <Toolbar style={{ justifyContent: "space-between" }}>
              <Link
                to="/diary-calendar"
                style={{ color: "white", textDecoration: "none" }}
              >
                <span className="font-bold">달력</span>
              </Link>
              {/* 로그인 버튼 및 이동 */}
              <Link to="/drink-recommendation" style={{ color: "white", textDecoration: "none" }}>
                <span className="font-bold">오늘의 술 추천</span>
              </Link>
            </Toolbar>
          </AppBar>

        <div className='wrapper'>
            <form action="">
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" placeholder='name' name='name' required />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="text" placeholder='Login Id' name='loginId' required />
                    <FaUserCheck className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' name='loginPw' value={password} onChange={handlePasswordChange} required />
                    <FaLock className='icon' />
                </div>

                <div className="input-box">
                    <input type="password" placeholder='PasswordCheck' name='loginPwchk' value={passwordCheck} onChange={handlePasswordCheckChange} required />
                    {password === passwordCheck ? <FaCheckSquare className='icon' /> : <FaRegCheckSquare className='icon' />}
                </div>                
                <div className="input-box">
                    <input type="text" placeholder='Email' name='email' required />
                    <FaEnvelope className='icon' />
                </div>



                <button type="submit">Register</button>

                <div className="register-link">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
        </div>
        </ThemeProvider>
        </div>
    );
};

export default RegisterPage;