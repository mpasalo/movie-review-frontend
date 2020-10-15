import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import { addUser, logIn } from "../UserFunctions";

class signUpModal extends Component {
    state = {
        name: "",
        email: "",
        password: "",
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    submitUserInfo = (e) => {
        e.preventDefault();
        addUser(this.state.name, this.state.email, this.state.password).then(
            (response) => {
                if (response.data.message) {
                    var arr = [].concat.apply([], [
                        response.data.message.name,
                        response.data.message.email,
                        response.data.message.password,
                    ]);
                    let error_fields = arr.filter(function (e) {
                        if (e) {
                            return e ;
                        } else {
                            return null;
                        }
                    });

                    Modal.error({
                        content: error_fields
                    });
                } else {
                    logIn(this.state.email, this.state.password).then(
                        (response) => {
                            const token = response.data;
                            this.props.authenticate(token);
                            this.props.getLoggedInUser();
                            this.props.closeSignUpModal();
                        }
                    );
                }
            }
        );
    };

    render() {
        return (
            <Modal
                title="Sign Up"
                visible={this.props.signUpModalVisiblity}
                footer={null}
                onCancel={this.props.closeSignUpModal}
            >
                <div className="text-center">
                    <div className="form-group row">
                        <label
                            htmlFor="name"
                            className="col-md-4 col-form-label text-md-right"
                        >
                            Name
                        </label>
                        <div className="col-md-6">
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={this.onChange.bind(this)}
                            ></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            htmlFor="email"
                            className="col-md-4 col-form-label text-md-right"
                        >
                            E-Mail Address
                        </label>
                        <div className="col-md-6">
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange.bind(this)}
                                required
                            ></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            htmlFor="password"
                            className="col-md-4 col-form-label text-md-right"
                        >
                            Password
                        </label>
                        <div className="col-md-6">
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange.bind(this)}
                                required
                            ></input>
                        </div>
                    </div>
                    {/* <div className="form-group row">
                        <label
                            htmlFor="password-confirm"
                            className="col-md-4 col-form-label text-md-right"
                        >
                            Confirm Password
                        </label>
                        <div className="col-md-6">
                            <input
                                id="password-confirm"
                                type="password"
                                className="form-control"
                                name="password_confirmation"
                                onChange={this.onChange.bind(this)}
                                required
                            ></input>
                        </div>
                    </div> */}
                    <Button
                        className="btn-warning"
                        onClick={this.submitUserInfo}
                    >
                        Submit
                    </Button>
                </div>
            </Modal>
        );
    }
}

export default signUpModal;
