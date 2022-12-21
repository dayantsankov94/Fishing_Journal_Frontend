import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/authService";
import { getAll } from "../../services/publicationService";
import Pagination from "../Pagination/Pagination";
import Publication from "../Publications/Publication/Publication";



const Following = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [publicationsPerPage] = useState(6);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'))
    let following =[];
   

    useEffect(() => {
        getUser(user.userWithoutPass._id)
            .then(result => {
            following = result.following;
            }).catch((err) => {
                navigate('*');
            })
    },[])

    useEffect(() => {
        const fetchPublication = async () => {
            setLoading(true);        
            try {
                const response = await getAll();
                const filtered = response.filter(x => following.includes(x.owner._id))              
                 setPublications(filtered);
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
                <h1 className="page-title">Following</h1>
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

export default Following;