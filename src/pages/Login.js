import React, { useState } from 'react';
import axios from "axios";
import '../css/Regcss.css';
import build from '/Users/testuser/Desktop/Saurav/reactjs/task/taskapi/src/pages/build2.jpeg';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const [rememberme, setRememberme] = useState('false');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Please enter email and password');
            return;
        }
        // const storeemail = localStorage.setItem("email",email);
        // const storepassword = localStorage.setItem("password",password);
        // localStorage.setItem("password",password);
        // if (storeemail) {
        //     setEmail(storeemail);
        //     setPassword(storepassword);
        //     setRememberme(true);
        // }
        try {
            const response = await axios.post('http://192.168.1.125:3000/login', {
                email,
                password
            });

            if (response.status === 200) {

                const token = response.data.accessToken;           
                localStorage.setItem("token", token);
                navigate('/posts');

            }
            else {
                throw new Error('Failed to log in');
            }

        } catch (error) {
            setErrorMessage('Invalid email or password');
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <div className='page'>
                <div className='pageone'>
                    <div className='imagecenterlize'>
                        <img className='sideimage' src={build} alt='Side Image' />
                        <div className='center'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae velit sint magni iste, libero laudantium provident ipsam laborum voluptatem temporibus reprehenderit iusto ullam modi repudiandae dolores eligendi aut expedita esse!          </div>
                    </div>
                    <div className='firspart'>
                <p className='loginsg' >don't have Account? <a href='/'><span className='linktologin'>Register here</span></a></p>
                        <div className='innerpart'>
                            <p>Login</p>
                        </div>
                        <form onSubmit={handleLogin}>
                            <label>Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                            />
                            <div>
                             <input type="checkbox" id="rememberme" className="temcondi" value="temcondi"/>
                         <label className='lablechec' htmlFor="rememberme"> Remember Me </label><br/>
                         </div>
                            <button type="submit" className='lrbtn' >Login</button>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;


