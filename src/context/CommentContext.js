import { createContext, useEffect, useReducer } from "react";
import { getAllComments } from "../services/publicationService";

export const CommentContext = createContext();

const commentReducer = (state, action) => {
    switch (action.type) {
        case 'GET_COMMENTS':
            return
        default:
            return state;
    }
}

export const CommentProvider = ({
    children
}) => {
    const [comments,dispatch] = useReducer(commentReducer,[]);

    const GetCommentsFromPublication = (publicationId) => {

        useEffect(() => {
            getAllComments(publicationId)
            .then(result => {
                dispatch({
                    type: 'GET_COMMENTS',
                    payload: result
                });
            })
        }, []);

    }

    return ( 
        <CommentContext.Provider value={{
            comments,
            GetCommentsFromPublication,
        
        }}>
            {children}
        </CommentContext.Provider>
    )

}