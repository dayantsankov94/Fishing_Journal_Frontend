import { useContext, useState } from "react";
import { PublicationContext } from "../../context/PublicationContext";
import Publication from "../Publications/Publication/Publication";
import { Link } from 'react-router-dom';
import Pagination from "../Pagination/Pagination";

const UserPublications = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [publicationsPerPage] = useState(6);

    const { getUserPublications } = useContext(PublicationContext);
    const user = JSON.parse(localStorage.getItem('user'))

    const publications = getUserPublications(user.userWithoutPass._id);

    const indexOfLastPublication = currentPage * publicationsPerPage;
    const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
    const currentPublications = publications.slice(indexOfFirstPublication, indexOfLastPublication);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="publications">
            <div className="row">
                <div className="col-xl-3">
                    <div className=" sidebar flex-shrink-0 p-3 text-bg-dark">
                        <ul className="nav nav-pills flex-column mb-5">
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link text-white" aria-current="page">
                                    <svg className="bi pe-none me-2" width={16} height={16}>
                                        <use xlinkHref="#home" />
                                    </svg>
                                    Info
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile/publications" className="nav-link  active">
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
                <div className="col-xl-9">
                    <div className="wrapper publications">
                        <div className="row">
                            {publications.length > 0
                                ? currentPublications.map(x => <Publication key={x._id} publication={x} />)
                                : <h3 className="no-articles">No publications yet</h3>
                            }
                        </div>
                        <Pagination
                            publicationsPerPage={publicationsPerPage}
                            totalPublications={publications.length}
                            paginate={paginate}
                        />
                    </div>
                </div>
            </div>

        </div>

    )
}


export default UserPublications;