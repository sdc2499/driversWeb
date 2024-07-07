import { getTokenFromCookie } from "./componnent/cookies/cookies";

export async function getRequest(url) {
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            headers: { Authorization: getTokenFromCookie() }
        });
        return response
    } catch (error) {
        throw error;
    }
}

export async function postRequest(url, body) {
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getTokenFromCookie()
            },
            body: JSON.stringify(body),
        });

        return response
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function putRequest(url, body) {
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getTokenFromCookie()
            },
            body: JSON.stringify(body),
        });
        return response
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function postFetch(url, body) {
    try {
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(body),
        });

        return response
    } catch (error) {
        console.error('Error:', error);
    }
}