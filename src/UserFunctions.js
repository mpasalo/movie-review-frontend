import axios from "axios";
import api from "./api";

export const getUser = () => {
    return api()
        .get("/user")
        .then((response) => {
            return response.data;
        });
};

export const addUser = (name, email, password) => {
    return axios
        .post(process.env.REACT_APP_URL + `/api/user/create`, {
            name: name,
            email: email,
            password: password,
        })
        .then(function (response) {
            return response;
        });
};

export const logIn = (email, password) => {
    return api()
        .post("/login", {
            email: email,
            password: password,
            device_name: "browser",
        })
        .then((response) => {
            return response;
        });
};

export const logOut = () => {
    return api()
        .post("/logout")
        .then((response) => {
            window.location.reload();
        });
};
