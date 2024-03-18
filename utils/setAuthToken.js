import axios from 'axios';

const setAuthToken = (token) => {
 if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Hay token', token);
    return true; 
 } else {
    delete axios.defaults.headers.common['Authorization'];
    console.log('No hay token');
    return false; 
 }
};

export default setAuthToken;
