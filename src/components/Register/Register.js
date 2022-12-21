import * as authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import NotFound from '../NotFound/NotFound';

const Register = () => {
    const { userLogin } = useAuthContext()
    const navigate = useNavigate()

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        email: '',
        name: '',
        username: '',
        password: '',
        repeatPassword: '',
        imageUrl: '',
    });


    const onSubmit = (e) => {
        e.preventDefault();
        const userData = values

        authService.register(userData)
            .then(result => {
                if(result != undefined) {
                    userLogin(result);
                    navigate('/')
                }
                <NotFound />
            }).catch((err) => {
                navigate('*');


            })

    }

    const samePass = (e) => {
            setErrors(state => ({
                ...state,
                [e.target.name]: values[e.target.name] !== values.password,
            }));
 
    }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < bound,
        }));
    }

    const isFormValid = !Object.values(errors).some(x => x)

    return (
        <div className="form-signin w-100 m-auto text-center">
            <form onSubmit={onSubmit}>
                <img
                    className=" mb-4"
                    src="assets/images/logoNew.png"
                    alt=""
                    width={72}
                    height={57}
                />
                <h1 className="h3 mb-3 fw-normal">Please register</h1>
                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}

                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="name"
                        value={values.name}
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />
                    <label htmlFor="floatingInput">Name</label>
                    {errors.name &&
                        <p className='validation-text'>Name should be more that 3 characters.</p>
                    }

                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="username"
                        value={values.username}
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />
                    <label htmlFor="floatingInput">Username</label>
                    {errors.username &&
                        <p className='validation-text'>Username should be more that 3 characters.</p>
                    }
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">Image/Picture</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 8)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {errors.password &&
                        <p className='validation-text'>Password should be more that 8 characters.</p>
                    }
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        name="repeatPassword"
                        value={values.repeatPassword}
                        onChange={changeHandler}
                        onBlur={(e) => samePass(e)}
                    />
                    <label htmlFor="floatingPassword">Repeat Password</label>
                    {errors.repeatPassword &&
                        <p className='validation-text'>Passwords missmatch.</p>
                    }
                </div>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" defaultValue="remember-me" /> Remember me
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={!isFormValid}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;