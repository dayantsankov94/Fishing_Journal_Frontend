const baseUrl = 'https://wild-rose-hen-gear.cyclic.app/following';

export const addFollowing = async (followingId) => {
    const token = JSON.parse(localStorage.getItem('user'))
    const response = await fetch(`${baseUrl}/add/${followingId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token.token
        },                    
    });
    const result = response.json();

    return result;
}

export const removeFollowing = async (followingId) => {
    const token = JSON.parse(localStorage.getItem('user'))
    const response = await fetch(`${baseUrl}/remove/${followingId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token.token
        },                      
    });
    const result = response.json();

    return result;
}