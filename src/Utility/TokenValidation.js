export const isAuthenticated = () =>{
    const token  = localStorage.getItem("token");
    if(!token){
        return false;
    }
    const payloadBase64
}