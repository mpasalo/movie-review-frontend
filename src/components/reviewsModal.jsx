import React, { Component } from "react";
import "antd/dist/antd.css";
import { UserOutlined } from '@ant-design/icons';
import { Modal, Divider, Avatar, Rate } from "antd";

class reviewsModal extends Component {
    render() {
        return (
            <Modal
                title={'All reviews for ' + this.props.movieTitle}
                visible={this.props.reviewsModalVisiblity}
                footer={null}
                onCancel={this.props.toggleReviewsModal}
            >
                {this.props.reviews.map((review) => (
                    <li key={review.id}>
                        <Avatar size="large" icon={<UserOutlined />} />
                        { ' ' + review.user.name + ' on ' } 
                        { new Date(review.user.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }) } <br/>
                        <Rate
                            disabled
                            name="rating"
                            value={review.rating}
                            defaultValue={0}
                        />
                        { ' "'+ review.description + '"' }
                        <Divider />
                    </li>
                  
                ))}
            </Modal>
        );
    }
}

export default reviewsModal;
