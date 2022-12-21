import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../../services/authService';
import { addFollowing, removeFollowing } from '../../services/followService';


const ViewProfile = () => {
    const [user, setUser] = useState({});
    const login = JSON.parse(localStorage.getItem('user'))
    const [profile, setProfile] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    let following = false;

    useEffect(() => {     
        if (login !== null) {
            getUser(login.userWithoutPass._id)
                .then(result => {
                    setUser(result);
                }).catch((err) => {
                    navigate('*');
                })
        }
    }, [following])


    useEffect(() => {
        getUser(id)
            .then(result => {
                setProfile(result);
            }).catch((err) => {
                navigate('*');
            })
    }, []);


    const followHandler = () => {
        addFollowing(id)
            .then(result => {
                following = true;
                navigate('/following')
            }).catch((err) => {
                navigate('*');
            })
    }

    const unFollowHandler = () => {
        removeFollowing(id)
            .then(result => {
                following = false;
                navigate('/following')
            }).catch((err) => {
                navigate('*');
            })
    }
    if (user.following) {
        if (user.following.includes(id)) {
            following = true;
        }
    }


    return (
        <div className="publications">
            <div className="row">
                <div className="col-xl-3">
                    <div className=" sidebar flex-shrink-0 p-3 text-bg-dark">
                        <ul className="nav nav-pills flex-column mb-5">
                            <li className="nav-item">
                                <Link to={`/profile/${id}`} className="nav-link active" aria-current="page">
                                    <svg className="bi pe-none me-2" width={16} height={16}>
                                        <use xlinkHref="#home" />
                                    </svg>
                                    Info
                                </Link>
                            </li>
                            <li>
                                <Link to={`/profile/${id}/publications`} className="nav-link  text-white">
                                    <svg className="bi pe-none me-2" width={16} height={16}>
                                        <use xlinkHref="#speedometer2" />
                                    </svg>
                                    Publications
                                </Link>
                            </li>
                            <li>
                                <Link to={`/profile/${id}/shares`} className="nav-link text-white ">
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
                        <img src={profile.imageUrl} />

                        <div className="user-info">
                            <h2>Profile</h2>
                            <h4>Name: {profile.name}</h4>
                            <h4>Username: {profile.username}</h4>
                            <h4>Email: {profile.email}</h4>
                            {profile.publications &&
                                <div>
                                    <h4>Publications: {profile.publications.length}</h4>
                                </div>
                            }
                            {user.following &&


                                <div className="add-following">
                                    {following
                                        ? <button className="btn btn-primary" onClick={unFollowHandler}>
                                            Unfollow
                                        </button>
                                        : <button className="btn btn-primary" onClick={followHandler}>
                                            Follow
                                        </button>
                                    }
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewProfile;