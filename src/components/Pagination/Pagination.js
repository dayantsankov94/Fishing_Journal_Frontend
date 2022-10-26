import { Link } from "react-router-dom";

const Pagination = ({ publicationsPerPage, totalPublications, paginate }) => {
    const pageNumbers = [];

    for (let index = 1; index <= Math.ceil(totalPublications / publicationsPerPage); index++) {
        pageNumbers.push(index);
    }

    return (
        <div className="center">
            <div className="pagination">
                <Link >«</Link>
                {pageNumbers.map(number => (
                    <Link key={number} onClick={() => paginate(number)} >{number}</Link>
                ))}
                <Link >»</Link>
            </div>
        </div>
    )
}

export default Pagination;