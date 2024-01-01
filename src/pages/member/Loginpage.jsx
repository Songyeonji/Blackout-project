import React, { useState , useEffect, useContext} from 'react';
import { Link , useHistory} from 'react-router-dom';
import axios from 'axios'; 
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { AppBar, Toolbar, createTheme, ThemeProvider, Snackbar ,Alert } from "@mui/material";
import { AuthContext } from '../../AuthContext';


const theme = createTheme({
  palette: {
    primary: {
      main: "#6f48eb", // 보라색
    },
  },
});


const Loginpage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/usr/member/doLogin', {
        loginId,
        loginPw: password
      }, { withCredentials: true });
      
      if (response.data) {
        const memberName = response.data.name; // 서버 응답에서 사용자 이름 추출
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', true);
        alert(`${memberName}님이 로그인 하셨습니다!`);
        history.push('/mypage');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인 실패');
    }
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
        <form onSubmit={handleLogin}>
                            <h1>Login</h1>
                            <div className="input-box">
                                <input type="text" placeholder='Login Id' value={loginId} onChange={(e) => setLoginId(e.target.value)} required />
                                <FaUser className='icon' />
                            </div>
                            <div className="input-box">
                                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <FaLock className='icon' />
                            </div>

                            <button type="submit">Login</button>

                            <div className="register-link">
                                <p>Don't have an account? <Link to="/register">Register</Link></p>
                            </div>
                        </form>
        </div>
        </div>
        </ThemeProvider>
        </div>
    );
};

export default Loginpage;
