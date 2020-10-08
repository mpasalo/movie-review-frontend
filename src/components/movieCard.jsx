import React, { Component } from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Card, Rate, Modal, Input, Button } from "antd";
import {
    EditOutlined,
    SaveOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import {
    addReviewDescription,
    getReview,
    deleteReview,
    addReviewRating,
} from "../MovieFunctions";

const { TextArea } = Input;

class movieCard extends Component {
    state = {
        rating: "",
        description: "",
        hasDescription: false,
    };

    componentDidMount() {
        const lsToken = localStorage.getItem("token");
        if (lsToken) {
            this.getMovieReview();
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    submitReviewDescription = (e) => {
        e.preventDefault();
        addReviewDescription(
            this.props.movie,
            this.state.description,
            this.props.userId
        ).then(() => {
            this.getMovieReview();
        });
    };

    getMovieReview = () => {
        getReview(this.props.movie.id).then((data) => {
            this.setState({
                rating: data.rating,
                description: data.description,
                hasDescription: data.description ? true : false,
            });
        });
    };

    removeReviewDescription = () => {
        this.setState({
            rating: 0,
            description: "",
        });
        deleteReview(this.props.movie).then(() => {
            this.getMovieReview();
        });
    };

    onChangeRating = (rating) => {
        this.setState({ rating });
        addReviewRating(this.props.movie, rating).then(() => {
            this.getMovieReview();
        });
    };

    render() {
        return (
            (<Button type="primary">Open Modal</Button>),
            (
                <Card
                    style={{
                        width: 300,
                        boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                        margin: 10,
                    }}
                    cover={
                        <img
                            alt="example"
                            src={this.props.movie.image}
                            width={500}
                            height={400}
                        />
                    }
                    actions={[
                        <EditOutlined
                            onClick={() =>
                                this.props.auth
                                    ? this.showDescription(this.props.movie.id)
                                    : this.props.showAuthModal()
                            }
                            className={this.getEditClass()}
                            id={`addButton${this.props.movie.id}`}
                        />,
                    ]}
                >
                    <p>
                        <b>{this.props.movie.title}</b>
                    </p>
                    <div className="text-center">
                        <Rate
                            allowClear
                            name="rating"
                            value={this.state.rating}
                            defaultValue={0}
                            onChange={
                                this.props.auth
                                    ? this.onChangeRating
                                    : this.props.showAuthModal
                            }
                        />
                    </div>
                    <div
                        style={{
                            textAlign: "center",
                        }}
                        className={this.getDescriptionClass()}
                        id={`description${this.props.movie.id}`}
                    >
                        <div className="col">
                            <div className="row-sm">
                                <TextArea
                                    rows={4}
                                    allowClear
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange.bind(this)}
                                />
                            </div>

                            <div className="row-sm">
                                <SaveOutlined
                                    style={{
                                        fontSize: 25,
                                        cursor: "pointer",
                                        padding: 10,
                                        color: "#0000FF",
                                    }}
                                    onClick={this.submitReviewDescription.bind(
                                        this
                                    )}
                                />
                                <CloseCircleOutlined
                                    style={{
                                        fontSize: 25,
                                        cursor: "pointer",
                                        padding: 10,
                                        color: "#FF0000",
                                    }}
                                    onClick={() =>
                                        this.closeDescription(
                                            this.props.movie.id
                                        )
                                    }
                                    className={this.getEditClass()}
                                />
                                <DeleteOutlined
                                    style={{
                                        fontSize: 25,
                                        cursor: "pointer",
                                        padding: 10,
                                        color: "#FF0000",
                                    }}
                                    className={this.getDescriptionClass()}
                                    onClick={() =>
                                        this.removeReviewDescription()
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            )
        );
    }

    showDescription(movieId) {
        document.getElementById(`description${movieId}`).className = "d-flex";
        document.getElementById(`addButton${movieId}`).className = "d-none";
    }

    closeDescription(movieId) {
        document.getElementById(`description${movieId}`).className = "d-none";
        document.getElementById(`addButton${movieId}`).className = "d-inline";
    }

    showSuccessfulDescriptionModal(movieName) {
        Modal.success({
            content: "Review Description has been added for " + movieName,
        });
    }

    getDescriptionClass() {
        let classes = "";
        classes += this.state.hasDescription ? "d-inline" : "d-none";
        return classes;
    }

    getEditClass() {
        let classes = "";
        classes += this.state.hasDescription ? "d-none" : "d-inline";
        return classes;
    }
}

export default movieCard;
