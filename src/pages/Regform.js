import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../css/Regcss.css';
import build from '/Users/testuser/Desktop/Saurav/reactjs/task/taskapi/src/pages/build2.jpeg';

function Regform() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpass] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [data, setdata] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setemail(storedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const savedata = async () => {
        let reg = { name, email, password };

        if (!name || !email || !password) {
            setErrorMessage('please enter all details');
            return;
        }
        
        if (rememberMe) {
            localStorage.setItem('email', email);
        } else {
            localStorage.removeItem('email');
        }

        try {
            const resp = await axios.post('http://192.168.1.125:3000/register', reg, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (resp.status === 201) {
                setSuccessMessage('Account registered successfully!');
                setname('');
                setemail('');
                setpass('');
            } else {
                throw new Error('Failed to save data');
            }
        } catch (error) {
            setErrorMessage('An error occurred while saving data');
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
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae velit sint magni iste, libero laudantium provident ipsam laborum voluptatem temporibus reprehenderit iusto ullam modi repudiandae dolores eligendi aut expedita esse!
                        </div>
                    </div>

                    <div className='firspart'>
                        <div className='logregheader'>
                            <p className='loginsg'>Already have an account? <a href='/Login'><span className='linktologin'>Sign in</span></a></p>
                        </div>
                        <div className='innerpart'>
                            <p>Registration</p>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); savedata(); }}>
                            <div>
                                <label>Your fullname *</label>
                                <input type='text' className='fname' value={name} onChange={(e) => setname(e.target.value)} placeholder='invictus innocent' /><br />
                            </div>
                            <div>
                                <label>Email address *</label>
                                <input type='email' className='email' value={email} onChange={(e) => setemail(e.target.value)} placeholder='Enter email address' />
                            </div>
                            <div>
                                <label>Create password *</label>
                                <input type='password' className='password' value={password} onChange={(e) => setpass(e.target.value)} placeholder='Enter password' />
                            </div>
                            <div>
                                <input type="checkbox" id="aggrecheck" className="temcondi" value="temcondi" />
                                <label className='lablechec' htmlFor="aggrecheck"> I agree to terms & condition </label><br />
                            </div>
                           
                            <button type='submit' className='lrbtn'>Register Account</button>
                            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Regform;
