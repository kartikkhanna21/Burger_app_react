import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-my-burger-6d18d-default-rtdb.firebaseio.com/'
});

export default instance;