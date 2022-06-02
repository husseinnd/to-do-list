
import axios from 'axios';


class Api {

    instance = axios.create({
        baseURL: 'https://api-nodejs-todolist.herokuapp.com/',
        headers: { 
            'content-type': 'application/json'
        }
    });

    setToken (value) {
        localStorage["access_token"] = value;
        this.instance.defaults.headers.common['Authorization'] = value? `Bearer ${localStorage["access_token"]}` : '';
    }

    login = async (data) => {
        return await new Promise((resolve, reject)=>{
            this.instance.post(`user/login`, data).then(response=>{
                alert("loggedin Successfully");
                this.setToken(response.data.token);
                resolve(response);
            }, (errorRes)=>{
                alert(errorRes.response.data);
                reject(errorRes);
            });
        })
        
        
    }

    register = async (data) => {
        return await new Promise((resolve, reject)=>{
            this.instance.post(`user/register`, data).then(response=>{
                alert("Registered Successfully");
                this.setToken(response.data.token);
                resolve(response);
            }, (errorRes)=>{
                alert(errorRes.response.data);
                reject(errorRes);
            });
        });
    }

    logout = async () => {
        return await this.instance.post(`user/logout`).then(response=>{
            alert("loggedout successfully");
            this.setToken("");
        });
    }
}

export default new Api();
