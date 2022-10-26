import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PublicationContext } from '../../context/PublicationContext';
import { getUser } from '../../services/authService';
import { addLike, addShare, createComment, getAllComments, getOne, removePublication, getAllLikes, getAllShares, deleteComment } from '../../services/publicationService';

import Comment from './Comment/Comment';
import './Comments.css';

const PublicationDetails = () => {
    const navigate = useNavigate();
    const { publicationId } = useParams();
    const { selectPublication, deletePublication, addToLikes, addToShares, fetchPublicationDetails, delComment } = useContext(PublicationContext);
    const [comments, setComments] = useState([]);

    const publication = selectPublication(publicationId);
    const { user } = useContext(AuthContext);


    useEffect(() => {
        getAllComments(publicationId)
            .then(result => {
                setComments(result);
            }).catch((err) => {
                navigate('*');
            })
    }, []);

    const onLikeHandler = () => {
        addLike(publicationId, user.token)
            .then(like => {
                addToLikes(publicationId, user.userWithoutPass._id)
            }).catch((err) => {
                navigate('*');
            })
    }
    const onShareHandler = () => {
        addShare(publicationId, user.token)
            .then(share => {
                addToShares(publicationId, user.userWithoutPass._id)
            }).catch((err) => {
                navigate('*');
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const commentText = formData.get('comment');

        const comment = {
            text: commentText
        }

        createComment(publicationId, comment, user.token)
            .then(comment => {
                comment.owner_icon = user.userWithoutPass.imageUrl;
                comment.owner_username = user.userWithoutPass.username;
                setComments([...comments, comment])
            }).catch((err) => {
                navigate('*');
            })
        e.target.reset();
    }

    const onDeleteComment = (commentId) => {
        const id = {
            _id: commentId
        };
        deleteComment(publicationId, id, user.token)
            .then(result => {
                const currentComments = comments.filter(x => x._id !== commentId)
                setComments(currentComments)
            }).catch((err) => {
                navigate('*');
            })
    }

    const onDelete = () => {
        const confirmation = window.confirm('Are you sure you want to delete this publication?');

        if (confirmation) {
            removePublication(publicationId, user.token)
                .then(() => {
                    deletePublication(publicationId);
                    navigate('/publications');
                }).catch((err) => {
                    navigate('*');
                });
        }
    }

    let isOwner = false;

    
    if (user.userWithoutPass && publication.owner) {
        console.log(publication);
        
        if (publication.owner._id !== undefined) {
            if (user.userWithoutPass._id === publication.owner._id) {
                isOwner = true;
            }
        }else {
            if (user.userWithoutPass._id === publication.owner) {
                isOwner = true;
            }
        }
    }

 
    
    


    return (
        <div className="row detailed-publication">
            <div className="col-lg-6 image-div">
                <img
                    className="left"
                    src={publication.imageUrl}
                />
                {isOwner &&
                    <div className="option-buttons">
                        <Link to={`/publications/details/edit/${publication._id}`} className='btn btn-warning'>Edit</Link>
                        <button className='btn btn-danger' onClick={onDelete}>Delete</button>
                    </div>
                }
            </div>
            <div className="col-lg-6 mt-5">
                <div className="fish-info mt-5">


                    {publication.fishType &&
                        <div>
                            <h4>Author: {publication.owner.name}</h4>
                            <h4>Type of Fish: {publication.fishType}</h4>
                            <h4>Weight: {publication.weight} kg</h4>
                            <h4>Place: {publication.place}</h4>
                            <h4>Method: {publication.catchingMethod}</h4>
                            <h4>Likes: {(publication.likes).length}</h4>
                            <h4>Shares: {(publication.shares).length}</h4>
                        </div>
                    }
                </div>
                <div className="comment-box">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Comment's Section:</h3>
                        </div>
                        <div className="col-lg-6">
                            {user.token &&
                                <div className="options">

                                    {(publication && publication.likes && publication.likes.includes(user.userWithoutPass._id))
                                        ? <button className="btn btn-primary disabled" > Liked </button>
                                        : <button className="btn btn-primary" onClick={onLikeHandler}> Like </button>
                                    }

                                    {publication && publication.shares && publication.shares.includes(user.userWithoutPass._id)
                                        ? <button className="btn btn-warning disabled" > Shared </button>
                                        : <button className="btn btn-warning" onClick={onShareHandler}> Share </button>
                                    }
                                </div>
                            }

                        </div>
                    </div>
                    <div className="comments">
                        <div className="comments">
                            {comments.map((comment) => (
                                < Comment key={comment._id} comment={comment} onDeleteComment={onDeleteComment} user={user} />
                            ))}
                        </div>
                    </div>
                    {user.token &&
                        <form onSubmit={onSubmit}>
                            <input type="text" name="comment" placeholder="Leave a comment" />
                            <button type="submit" className="btn btn-success submit-button">
                                Comment
                            </button>
                        </form>
                    }

                </div>
            </div>
        </div>

    )
}

export default PublicationDetails;