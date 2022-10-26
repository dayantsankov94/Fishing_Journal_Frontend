import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../services/publicationService";
import Pagination from "../Pagination/Pagination";
import Publication from "./Publication/Publication";



const Publications = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [publicationsPerPage] = useState(6);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPublication = async () => {
            setLoading(true);
            try {
                const response = await getAll()
                setPublications(response);
                setLoading(false);
            } catch (error) {
                navigate('*');
            }
        }
        fetchPublication();
    }, []);



    const indexOfLastPublication = currentPage * publicationsPerPage;
    const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
    const currentPublications = publications.slice(indexOfFirstPublication, indexOfLastPublication);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <h1 className="loading">Loading...</h1>
    } else {

        return (
            <div className="container wrapper publications">
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
        )
    }
}

export default Publications;