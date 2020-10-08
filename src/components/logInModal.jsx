import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import { addUser, logIn } from "../UserFunctions";

class logInModal extends Component {
    state = {
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
        addUser(this.state.name, this.state.email, this.state.password);
    };

    logInUser = () => {
        logIn(this.state.email, this.state.password).then((response) => {
            const token = response.data;
            this.props.authenticate(token);
            this.props.closeLogInModal();
            this.props.getLoggedInUser();
            window.location.reload();
        });
    };

    render() {
        return (
            <Modal
                title="Log In"
                visible={this.props.logInModalVisiblity}
                footer={null}
                onCancel={this.props.closeLogInModal}
            >
                <div className="text-center">
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
                    <Button className="btn-warning" onClick={this.logInUser}>
                        Log In
                    </Button>
                </div>
            </Modal>
        );
    }
}

export default logInModal;
