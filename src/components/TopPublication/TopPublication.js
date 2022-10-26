import { Link } from 'react-router-dom';

const TopPublication = ({ sorted }) => {
    return (
        <div className="col-12 col-sm-6 col-xl-4">
            <div style={{ textAlign: "center" }} className="top-publication">
                <img
                    className="center"
                    src={sorted.imageUrl}
                />
                <h4>Type of Fish: {sorted.fishType}</h4>
                <h4>Weight: {sorted.weight} kg</h4>
                <h4>Likes: {(sorted.likes).length}</h4>
                <p>
                    <Link className="btn btn-primary" to={`/publications/details/${sorted._id}`}>
                        View details »
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default TopPublication;