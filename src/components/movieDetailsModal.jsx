import React, { Component } from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";

class movieDetailsModal extends Component {
    render() {
        return (
            <Modal
                title="Movie Details"
                visible={this.props.movieDetailsModalVisiblity}
                footer={null}
                onCancel={this.props.toggleMovieDetailsModal}
            >
                <p>Title: {this.props.movie.title} ({this.props.movie.year})</p>
                <p>Director: {this.props.movie.director}</p>
                <p>About: {this.props.movie.description}</p>

            </Modal>
        );
    }
}

export default movieDetailsModal;
