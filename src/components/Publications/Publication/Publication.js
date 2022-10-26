import { Link } from 'react-router-dom';

const Publication = ({
    publication
}) => {
    return (

        <div className="col-12 col-sm-6 col-xl-4">
            <div className="text-center single-publication">
                <img
                    className="center"
                    src={publication.imageUrl}
                />
                <p>
                    <Link className="btn btn-primary" to={`/publications/details/${publication._id}`}>
                        View details »
                    </Link>
                </p>
            </div>
        </div>
    )
}
export default Publication;