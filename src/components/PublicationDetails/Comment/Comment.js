const Comment = ({ comment, onDeleteComment, user}) => {

    let isCommentAuthor = false;
    if(user.userWithoutPass){
        if (user.userWithoutPass._id === comment.owner._id || user.userWithoutPass._id === comment.owner) {
            isCommentAuthor = true
        }
    }
    console.log(isCommentAuthor);
    console.log(comment);
    
    
    return (
        <div className="comment">
            <div className="comment-header row">
                <div className="comment-image">
                    <img src={comment.owner.imageUrl || comment.owner_icon} />
                </div>
                <div className="comment-right-part">
                    <div className="comment-content">
                        <div className="comment-author">{comment.owner.username || comment.owner_username}</div>
                    </div>
                </div>
                {isCommentAuthor &&
                    <button onClick={() => onDeleteComment(comment._id)}>X</button>
                }
            </div>

            <div className="comment-text">{comment.text}</div>

        </div>
    )
}

export default Comment;