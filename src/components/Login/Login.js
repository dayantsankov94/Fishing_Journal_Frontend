
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../logoNew.png';



const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email').trim()
        const password = formData.get('password').trim()
        authService.login(email, password)
            .then(result => {           
                userLogin(result);
                navigate('/');
            }).catch((err) => {
                navigate('*');
            })
    }

    return (
        
            <div
                className="form-signin w-100 m-auto text-center"
                
            >
                <form onSubmit={onSubmit}>
                    <img
                        className="mb-4 login-logo"
                        src={logo}
                        alt="Logo"
                        width={72}
                        height={57}
                    />
                    <h1 className="h3 mb-3 fw-normal">Please login</h1>
                    <div className="form-floating">
                        <input
                            type="email"
                            name='email'
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            name='password'
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" defaultValue="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                        Login
                    </button>
                </form>
            </div>
        
    );
}

export default Login;