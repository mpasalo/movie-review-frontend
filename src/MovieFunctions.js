import axios from "axios";
import { Modal } from "antd";

export const getMovies = () => {
    return axios
        .get(process.env.REACT_APP_URL + "/api/movies", {
            headers: { "Content-Type": "application/json" },
        })
        .then((result) => {
            return result.data;
        });
};

export const addReviewDescription = (movie, description) => {
    return axios
        .post(
            process.env.REACT_APP_URL + `/api/reviews/${movie.id}/description`,
            { description: description }
        )
        .then(function (response) {
            Modal.success({
                content:
                    "Review Description has been updated for " + movie.title,
            });
        });
};

export const getReview = (movieId) => {
    return axios
        .get(process.env.REACT_APP_URL + `/api/reviews/${movieId}`, {
            headers: { "Content-Type": "application/json" },
        })
        .then((result) => {
            return result.data;
        });
};

export const deleteReview = (movie) => {
    return axios
        .delete(process.env.REACT_APP_URL + `/api/reviews/${movie.id}/`)
        .then(function (response) {
            Modal.success({
                content: "Review has been deleted for " + movie.title,
            });
        });
};

export const addReviewRating = (movie, rating) => {
    return axios
        .post(process.env.REACT_APP_URL + `/api/reviews/${movie.id}/rating`, {
            rating: rating,
        })
        .then(function (response) {
            Modal.success({
                content: "Review Rating has been updated for " + movie.title,
            });
        });
};

export const filterByReview = () => {
    return axios
        .get(process.env.REACT_APP_URL + "/api/movies/filter/review", {
            headers: { "Content-Type": "application/json" },
        })
        .then((result) => {
            return result.data;
        });
};
