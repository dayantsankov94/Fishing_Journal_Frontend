import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false)

    const clickHandler = () => {
        setClicked(!clicked)
    }

    // proba
    return (
        <header className="p-3 text-bg-dark sticky">
            <div className="container-fluid">
                <div className="row">
                    <div
                        className="d-flex flex-wrap "
                        id="header"
                    >
                        <div className='logo'>
                            <img
                                className="mb-4"
                                src="/assets/images/logoNew.png"
                                alt=""
                                width={72}
                                height={57}
                            />
                            <span className="title">Fishing Journal</span>
                        </div>

                        <div className='navbar-links' >

                            <ul id='navbar-ul' className={clicked
                                ? "nav active col-8 col-lg-auto mt-3 "
                                : "nav col-8 col-lg-auto mt-3 "
                            }>

                                <li>
                                    <Link to="/" className="nav-link px-2 text-white">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/publications" className="nav-link px-2 text-white">
                                        Publications
                                    </Link>
                                </li>
                                {user.token &&
                                    <>
                                        <li>
                                            <Link to="/profile" className="nav-link px-2 text-white">
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/create" className="nav-link px-2 text-white">
                                                Create Publication
                                            </Link>
                                        </li>
                                    </>
                                }


                                <li>
                                    <Link to="/about" className="nav-link px-2 text-white">
                                        About
                                    </Link>
                                </li>

                                {user.token
                                    ? <li><Link to='/logout' className="btn text-white">Logout</Link></li>

                                    : <> <li><Link to='/login' className="btn text-white">Login </Link></li>
                                        <li><Link to='/register' className="btn btn-warning">Sign-up</Link></li>
                                    </>
                                }

                            </ul>
                        </div>

                        <div id='mobile'>
                            {clicked
                                ? <i className='fas fa-times mt-4' onClick={clickHandler} type='btn'></i>
                                : <i className='fas fa-bars mt-4' onClick={clickHandler} type='btn' ></i>
                            }


                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;