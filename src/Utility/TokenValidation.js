export const isAuthenticated = () =>{
    const token  = localStorage.getItem("token");
    if(!token){
        return false;
    }
    const payloadBase64 = token.split('.')[1];
    const decodePayload=  JSON.parse(atob(payloadBase64));
    const expiry = decodePayload.exp;
    const now = Math.floor(Date.now() / 1000);
    return now < expiry;
}