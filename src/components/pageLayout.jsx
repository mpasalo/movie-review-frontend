import React, { Component } from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Layout, Menu, Button, Modal } from "antd";
import MovieCard from "./movieCard";
import { filterByReview, getMovies } from "../MovieFunctions";
import { getUser, logOut } from "../UserFunctions";
import SignUpModal from "./signUpModal";
import LogInModal from "./logInModal";

const { Header, Content, Footer } = Layout;

class pageLayout extends Component {
    state = {
        userName: "",
        movies: [],
        sorted: false,
        isAuthenticated: false,
        token: null,
        authModalVisibility: false,
        signUpModalVisiblity: false,
        logInModalVisibility: false,
    };

    componentDidMount() {
        this.getAllMovies();
        const lsToken = localStorage.getItem("token");
        if (lsToken) {
            this.authenticate(lsToken);
            this.getLoggedInUser();
        }
    }

    getAllMovies = () => {
        getMovies().then((data) => {
            this.setState({
                movies: [...data],
            });
        });
    };

    getLoggedInUser = () => {
        getUser().then((response) => {
            this.setState({
                userName: response.name,
            });
        });
    };

    logOutUser = () => {
        logOut();
        this.setState({
            isAuthenticated: false,
            token: null,
        });

        localStorage.clear();
    };

    filterMoviesByReview = () => {
        filterByReview().then((data) => {
            this.setState({
                movies: [...data],
            });
        });
    };

    authenticate = (token) => {
        this.setState({
            isAuthenticated: true,
            token: token,
        });

        localStorage.setItem("token", token);
    };

    compareBy(key) {
        if (this.state.sorted) {
            return function (a, b) {
                if (b[key] < a[key]) return -1;
                if (b[key] > a[key]) return 1;
                return 0;
            };
        } else {
            return function (a, b) {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            };
        }
    }

    sortBy(key) {
        let arrayCopy = [...this.state.movies];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ movies: arrayCopy, sorted: !this.state.sorted });
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["2"]}
                    >
                        <Menu.Item key="1">Home</Menu.Item>
                    </Menu>
                </Header>

                <p>Hello {<b>{this.state.userName}</b>} !</p>

                <Modal
                    title="Join Us"
                    visible={this.state.authModalVisibility}
                    footer={null}
                    onCancel={this.closeAuthModal}
                >
                    <div className="text-center">
                        <Button
                            onClick={this.showSignUpModal}
                            className="btn-primary m-2"
                        >
                            Sign Up
                        </Button>
                        <Button
                            onClick={this.showLogInModal}
                            className="btn-success m-2"
                        >
                            Log In
                        </Button>
                    </div>
                </Modal>
                <SignUpModal
                    signUpModalVisiblity={this.state.signUpModalVisiblity}
                    closeSignUpModal={this.closeSignUpModal}
                />
                <LogInModal
                    getLoggedInUser={this.getLoggedInUser}
                    authenticate={this.authenticate}
                    token={this.state.token}
                    logInModalVisiblity={this.state.logInModalVisiblity}
                    closeLogInModal={this.closeLogInModal}
                />
                <Content style={{ padding: "0 50px" }}>
                    {this.state.isAuthenticated ? (
                        <Button
                            className="m-2 btn-primary"
                            onClick={() => this.logOutUser()}
                        >
                            Logout
                        </Button>
                    ) : null}
                    {this.state.isAuthenticated ? (
                        <Button
                            className="m-2 btn-primary"
                            onClick={() => this.filterMoviesByReview()}
                        >
                            Filter By Review
                        </Button>
                    ) : null}
                    <Button
                        className="m-2 btn-primary"
                        onClick={() => this.sortBy("title")}
                    >
                        Sort By Title Alphabetically
                    </Button>
                    <div className="site-layout-content row text-center">
                        {this.state.movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                auth={this.state.isAuthenticated}
                                showAuthModal={this.showAuthModal}
                            />
                        ))}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Created By Marc Pasalo ©2020
                </Footer>
            </Layout>
        );
    }

    showAuthModal = () => {
        this.setState({
            authModalVisibility: true,
        });
    };

    closeAuthModal = () => {
        this.setState({
            authModalVisibility: false,
        });
    };

    showSignUpModal = () => {
        this.setState({
            authModalVisibility: false,
            signUpModalVisiblity: true,
        });
    };

    closeSignUpModal = () => {
        this.setState({
            signUpModalVisiblity: false,
        });
    };

    showLogInModal = () => {
        this.setState({
            authModalVisibility: false,
            logInModalVisiblity: true,
        });
    };

    closeLogInModal = () => {
        this.setState({
            logInModalVisiblity: false,
        });
    };
}

export default pageLayout;
