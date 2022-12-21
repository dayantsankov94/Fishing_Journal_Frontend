
const baseUrl = 'https://wild-rose-hen-gear.cyclic.app/publications';

export const getAll = async () => {
    const response = await fetch(baseUrl)
    const result = await response.json();
    return result;
}

export const getOne = async (publicationId) => {
    const response = await fetch(`${baseUrl}/details/${publicationId}`);
    const result = await response.json();
    return result;
}

export const createPublication = async (publicationData) => {
    const token = JSON.parse(localStorage.getItem('user'))

    const response = await fetch(`${baseUrl}/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token.token
        },
        body: JSON.stringify(publicationData)
    });
    const result = response.json();
    return result;
}

export const editPublication = async (publicationId,publicationData) => {
    const token = JSON.parse(localStorage.getItem('user'))
    
    const response = await fetch(`${baseUrl}/details/edit/${publicationId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token.token
        },
        body: JSON.stringify(publicationData)
    });
    const result = response.json();
    
    return result;
}


export const removePublication = async (publicationId,token) => {
    
    const response = await fetch(`${baseUrl}/details/delete/${publicationId}`,{
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'X-Authorization': token
        }  
    });
    const result = await response.json();
    
    return result;
}



export const getAllComments = async (publicationId) => {
    try {
        const response = await fetch(`${baseUrl}/details/${publicationId}/comments`)
        const result = await response.json();
        return result;
    } catch (error) {
        
    }
}
export const getAllLikes = async (publicationId) => {
    const response = await fetch(`${baseUrl}/details/${publicationId}/likes`)
    const result = await response.json();
    return result;
}
export const getAllShares = async (publicationId) => {
    const response = await fetch(`${baseUrl}/details/${publicationId}/shares`)
    const result = await response.json();
    return result;
}

export const createComment = async (publicationId, commentText,token) => {

    const response = await fetch(`${baseUrl}/details/${publicationId}/comment`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(commentText)                       
    });
    const result = response.json();

    return result;
}

export const deleteComment = async (publicationId,commentId,token) => {

    const response = await fetch(`${baseUrl}/details/${publicationId}/comment`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(commentId)                       
    });
    const result = response.json();

    return result;
}

export const addLike = async (publicationId,token) => {
    const response = await fetch(`${baseUrl}/details/${publicationId}/like`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        }                    
    });
    const result = response.json();

    return result;
}

export const addShare = async (publicationId,token) => {
    const response = await fetch(`${baseUrl}/details/${publicationId}/share`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        }                    
    });
    const result = response.json();

    return result;
}