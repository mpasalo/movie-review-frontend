import axios from "axios";
import { Modal } from "antd";
import api from "./api";

export const getMovies = () => {
    return axios
        .get(process.env.REACT_APP_URL + "/api/movies", {
            headers: { "Content-Type": "application/json" },
        })
        .then((result) => {
            return result.data;
        });
};

export const addReviewDescription = (movie, description, userId) => {
    return api()
        .post(`/reviews/${movie.id}/description`, {
            description: description,
            userId: userId,
        })
        .then(function (response) {
            Modal.success({
                content:
                    "Review Description has been updated for " + movie.title,
            });
        });
};

export const getReview = (movieId) => {
    return api()
        .get(`/reviews/${movieId}`, {
            headers: { "Content-Type": "application/json" },
        })
        .then((result) => {
            return result.data;
        });
};

export const deleteReview = (movie) => {
    return api()
        .delete(`/reviews/${movie.id}`)
        .then(function (response) {
            Modal.success({
                content: "Review has been deleted for " + movie.title,
            });
        });
};

export const addReviewRating = (movie, rating) => {
    return api()
        .post(`/reviews/${movie.id}/rating`, {
            rating: rating,
        })
        .then(function (response) {
            Modal.success({
                content: "Review Rating has been updated for " + movie.title,
            });
        });
};

export const filterByReview = () => {
    return api()
        .get("/movies/filter/review", {
            headers: { "Content-Type": "application/json" },
        })
        .then((result) => {
            return result.data;
        });
};
