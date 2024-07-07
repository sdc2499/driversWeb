export function setTokenCookie(token) {
    document.cookie = `authToken=${token}; path=/; max-age=3600;`;
}

export function getTokenFromCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; authToken=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
