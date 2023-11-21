import axios from 'axios';

export function getGoogleUser(token){
    const response = axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: `Bearer ${token}`}}
    )
    return response.data;
}