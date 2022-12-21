

const baseUrl = 'https://wild-rose-hen-gear.cyclic.app/users';

export const register = async (userData) => {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(result));
        }

        return result;
    } catch (error) {
        console.error(error);
    }
}



export const login = async (email, password) => {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        localStorage.setItem('user', JSON.stringify(result));
        return result;
    } catch (error) {
        console.error(error);
    }

}

export const logout = async (token) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': token
            }
        });
        // const result = await response.json();
        return response;
    } catch (error) {
        console.error(error)
    }
}

export const getUser = async (userId) => {
    const response = await fetch(`${baseUrl}/${userId}`);
    const result = await response.json();
    return result;                            
}