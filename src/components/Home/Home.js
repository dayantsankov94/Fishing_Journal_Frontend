import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicationContext } from '../../context/PublicationContext';
import * as publicationService from '../../services/publicationService';

import TopPublication from '../TopPublication/TopPublication';

const Home = () => {
    const [publications, setPublications] = useState([]);
    const navigate = useNavigate();
    const { addPublications } = useContext(PublicationContext);

    useEffect(() => {
        publicationService.getAll()
            .then(result => {
                setPublications(result)
            }).catch((err) => {
                navigate('*');
            })
    }, [])


    const sorted = publications.sort((a, b) => {
        return (b.likes).length - (a.likes).length
    }).slice(0, 3)

    return (
        <div>
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to={0}
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    />
                    <button
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to={1}
                        aria-label="Slide 2"
                    />
                    <button
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to={2}
                        aria-label="Slide 3"
                    />
                </div>
                <div className="carousel-inner" style={{ maxHeight: "50vh" }}>
                    <div
                        className="carousel-item  active"
                        style={{ backgroundImage: "url(assets/images/1.jpg)" }}
                    >
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>One easy step to join us.</h1>
                                <p>
                                    <Link className="btn btn-lg btn-primary" to="/register">
                                        Sign up today
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="carousel-item"
                        style={{ backgroundImage: "url(assets/images/6.jpg)" }}
                    >
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>Learn more about us.</h1>
                                <p>
                                    <Link className="btn btn-lg btn-primary" to="/about">
                                        Learn more
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="carousel-item"
                        style={{ backgroundImage: "url(assets/images/4.jpg)" }}
                    >
                        <div className="container">
                            <div className="carousel-caption text-end">
                                <h1>Check our diverse gallery.</h1>
                                <p>
                                    <Link className="btn btn-lg btn-primary" to="/publications">
                                        View Publications
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container top-publications">
                <h1 className="most-liked">Top 3 Publications</h1>
                <div className="row">
                    {sorted.map(x => <TopPublication key={x._id} sorted={x} />)}
                </div>
            </div>
        </div>
    )
}


export default Home;