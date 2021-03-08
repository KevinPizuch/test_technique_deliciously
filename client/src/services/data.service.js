import axios from "axios";

const API_URL = "http://localhost:8080/";

const getAllRestaurant = () =>{
    return axios.get(API_URL + "restaurants")
}

const getAllRestaurantName = () =>{
    return axios.get(API_URL + "restaurants/names")
}

const getRestaurantContent = (name) => {
    return axios.get(API_URL + `restaurants/name?name=${name}`)
}

const updateRestaurant = (content) => {
    return axios
    .post(API_URL + "updateRestaurant", content)
    .then((response) => {return response.data;});
}

// eslint-disable-next-line
export default {
    getAllRestaurant,
    getAllRestaurantName,
    getRestaurantContent,
    updateRestaurant
};