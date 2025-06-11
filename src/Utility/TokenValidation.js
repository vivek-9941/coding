export function isAuthenticated() {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const expiry = decodedPayload.exp;
        const now = Math.floor(Date.now() / 1000);
        return now < expiry;
    } catch (e) {
        return false;
    }
}

// Add this synchronous check for immediate validation
export function checkAuthSync() {
    return isAuthenticated();
}