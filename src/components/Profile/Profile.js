import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../../services/authService';


const Profile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const auth = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        getUser(auth.userWithoutPass._id)
            .then(result => {
                setUser(result);
            }).catch((err) => {
                navigate('*');
            })
    }, [])


    return (
        <div className="publications">
            <div className="row">
                <div className="col-xl-3">
                    <div className=" sidebar flex-shrink-0 p-3 text-bg-dark">
                        <ul className="nav nav-pills flex-column mb-5">
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link active" aria-current="page">
                                    <svg className="bi pe-none me-2" width={16} height={16}>
                                        <use xlinkHref="#home" />
                                    </svg>
                                    Info
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile/publications" className="nav-link  text-white">
                                    <svg className="bi pe-none me-2" width={16} height={16}>
                                        <use xlinkHref="#speedometer2" />
                                    </svg>
                                    Publications
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile/shares" className="nav-link text-white ">
                                    <svg className="bi pe-none me-2" width={16} height={16}>
                                        <use xlinkHref="#table" />
                                    </svg>
                                    Shares
                                </Link>
                            </li>
                        </ul>
                        {/* static banners */}
                        <img src="https://previews.123rf.com/images/seamartini/seamartini1908/seamartini190800168/128446155-fishing-sport-tournament-vector-banners-with-fishing-rods-and-fish-sketches-salmon-on-hook-of-spinni.jpg" className="mb-5" alt="banner" />
                        <img src="https://cdn4.vectorstock.com/i/1000x1000/48/03/hake-and-sardine-fish-fishing-retro-banners-vector-36534803.jpg" className="mb-5" alt="banner" />
                    </div>
                </div>

                <div className="col-md-9 wrapper">
                    <div className="profile-picture m-3">
                        <img src={user.imageUrl} />
                    
                        <div className="user-info">
                            <h2>Profile</h2>
                            <h4>Name: {user.name}</h4>
                            <h4>Username: {user.username}</h4>
                            <h4>Email: {user.email}</h4>
                            {user.publications &&
                                <div>
                                    <h4>Publications: {user.publications.length}</h4>
                                    <h4>Shared: {user.shares.length}</h4>
                                </div>
                            }
                            <div className="add-publication">
                                <Link className="btn btn-primary" to="/create">
                                    Add Publication
                                </Link>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Profile;