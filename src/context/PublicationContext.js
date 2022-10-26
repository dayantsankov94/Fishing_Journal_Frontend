import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";



import * as publicationService from '../services/publicationService';

export const PublicationContext = createContext();

const publicationReducer = (state, action) => {
    switch (action.type) {
        case 'GET_PUBLICATIONS':
            return [...action.payload];
        case 'ADD_PUBLICATION':
            return [...state, action.payload];
        case 'ADD_PUBLICATIONS':
            return [...action.payload];
        case 'REMOVE_PUBLICATION':
            return state.filter(x => x._id !== action.publicationId);
        case 'EDIT_PUBLICATION':
            return state.map(x => x._id === action.publicationId ? action.payload : x);
        case 'ADD_LIKE':
            return state.map(x => x._id === action.publicationId ? { ...x, likes: [...x.likes, action.userId] } : x)
        case 'ADD_SHARE':
            return state.map(x => x._id === action.publicationId ? { ...x, shares: [...x.shares, action.userId] } : x)
        case 'REMOVE_COMMENT':
            return state.map(x => x._id === action.publicationId ? action.result : x)
        default:
            return state;
    }

}

export const PublicationProvider = ({
    children
}) => {
    const [publications, dispatch] = useReducer(publicationReducer, []);
    const navigate = useNavigate();


    useEffect(() => {
        publicationService.getAll()
            .then(result => {
                const action = {
                    type: 'GET_PUBLICATIONS',
                    payload: result
                }
                dispatch(action);
            }).catch((err) => {
                navigate('*');
            })
    }, []);

    const addPublications = (publications) => {
        dispatch({
            type: 'ADD_PUBLICATIONS',
            payload: publications
        });
    }

    const selectPublication = (publicationId) => {     
        return publications.find(x => x._id === publicationId) || {};
    };

    const addPublication = (publication) => {
        dispatch({
            type: 'ADD_PUBLICATION',
            payload: publication
        });
    };

    const addToLikes = (publicationId, userId) => {
        dispatch({
            type: 'ADD_LIKE',
            publicationId,
            userId
        });
    }

    const addToShares = (publicationId, userId) => {
        dispatch({
            type: 'ADD_SHARE',
            publicationId,
            userId
        });
    }


    const getUserPublications = (userId) => {

        return publications.filter(x => x.owner._id === userId) || {};
    }

    const getSharedPublications = (userId) => {

        return publications.filter(x => x.shares.includes(userId));
    }

    const edit = (publicationId, publicationData) => {
        dispatch({
            type: 'EDIT_PUBLICATION',
            payload: publicationData,
            publicationId
        });
    }

    const deletePublication = (publicationId) => {
        dispatch({
            type: 'REMOVE_PUBLICATION',
            publicationId
        });
    }

    const delComment = (publicationId, result) => {
        dispatch({
            type: 'REMOVE_COMMENT',
            payload: result,
            publicationId
        });
    }

    return (
        <PublicationContext.Provider value={{
            publications,
            addPublications,
            selectPublication,
            getUserPublications,
            addPublication,
            getSharedPublications,
            deletePublication,
            edit,
            addToLikes,
            addToShares,
            delComment
        }}>
            {children}
        </PublicationContext.Provider>
    );
}