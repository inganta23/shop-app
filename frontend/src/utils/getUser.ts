import axios from 'axios';

const getUser = async () => {
    try {
        const { data } = await axios.get('/api/user/me');
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error: any) {
        return null;
    }
};

export default getUser;
