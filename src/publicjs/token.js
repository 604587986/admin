import axios from 'axios';

export function token(){
    let token = window.localStorage.getItem('token');
    return axios.get("/Admin/Verify/index?token="+token).then(res => {
        return Promise.resolve(res.data)
    })
}