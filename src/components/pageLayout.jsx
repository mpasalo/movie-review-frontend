import React, { Component } from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Layout, Menu, Button, Modal, Spin } from "antd";
import MovieCard from "./movieCard";
import { getMovies } from "../MovieFunctions";
import { getUser, logOut } from "../UserFunctions";
import SignUpModal from "./signUpModal";
import LogInModal from "./logInModal";
import {
    LogoutOutlined,
    UserOutlined,
    LoginOutlined,
    UserAddOutlined,
    SortAscendingOutlined,
    SortDescendingOutlined,
    UndoOutlined,
    LoadingOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

class pageLayout extends Component {
    state = {
        loading: true,
        user: {},
        movies: [],
        sorted: false,
        filtered: false,
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
                filtered: false,
                loading: false,
            });
        });
    };

    getLoggedInUser = () => {
        getUser().then((response) => {
            this.setState({
                user: response,
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

    // filterMoviesByReview = () => {
    //     let filteredMovies = this.state.movies.filter(
    //         (movie) =>
    //             movie.review &&
    //             (movie.review.rating !== 0 || movie.review.description !== null)
    //     );

    //     this.setState({
    //         movies: [...filteredMovies],
    //         filtered: true,
    //     });
    // };

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
        // const menu = (
        //     <Menu>
        //         <Menu.Item key="1" onClick={() => this.filterMoviesByReview()}>
        //             With Reviews
        //         </Menu.Item>
        //     </Menu>
        // );

        return (
            <Layout className="layout" 
                style={{
                    backgroundColor: '#000000'
                }}
            >
                <Header className="fixed-top">
                    <div className="logo" style={{
                            backgroundColor:"#001529",
                            height: "30px",
                            maxWidth: "120px"
                        }} >
                    <img
                        style={{
                            marginTop: "-40px",
                            maxHeight: "70px",
                            maxWidth: "120px"
                        }} 
                        src='/reel.jpg' alt="Reel" 
                    />
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                    >
                        {/* <Menu.Item key="1">Home</Menu.Item> */}
                        {this.state.isAuthenticated ? (
                            <Menu.Item
                                className="float-right"
                                icon={<LogoutOutlined />}
                                onClick={() => this.logOutUser()}
                                key="2"
                            >
                                Logout
                            </Menu.Item>
                        ) : (
                            <Menu.Item
                                className="float-right"
                                icon={<LoginOutlined />}
                                onClick={() => this.showLogInModal()}
                                key="3"
                            >
                                Login
                            </Menu.Item>
                        )}
                        {this.state.isAuthenticated ? (
                            <Menu.Item
                                className="float-right"
                                icon={<UserOutlined />}
                                key="4"
                            >
                                {this.state.user.name}
                            </Menu.Item>
                        ) : (
                            <Menu.Item
                                className="float-right"
                                icon={<UserAddOutlined />}
                                onClick={() => this.showSignUpModal()}
                                key="5"
                            >
                                Sign Up
                            </Menu.Item>
                        )}
                    </Menu>
                </Header>
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
                    getLoggedInUser={this.getLoggedInUser}
                    authenticate={this.authenticate}
                    token={this.state.token}
                    signUpModalVisiblity={this.state.signUpModalVisiblity}
                    closeSignUpModal={this.closeSignUpModal}
                    closeLogInModal={this.closeLogInModal}
                />
                <LogInModal
                    getLoggedInUser={this.getLoggedInUser}
                    authenticate={this.authenticate}
                    token={this.state.token}
                    logInModalVisiblity={this.state.logInModalVisiblity}
                    closeLogInModal={this.closeLogInModal}
                />
                <div className="container">
                    <Content style={{ padding: "0 50px", marginTop: 70 }}>
                        {this.state.isAuthenticated ? (
                            this.state.filtered ? (
                                <Button
                                    type={"danger"}
                                    size={"large"}
                                    className="m-2"
                                    icon={<UndoOutlined />}
                                    onClick={() => this.getAllMovies()}
                                ></Button>
                            ) : (
                                ''
                                // <Dropdown overlay={menu}>
                                //     <Button
                                //         type={"primary"}
                                //         size={"large"}
                                //         icon={<FilterOutlined />}
                                //     >
                                //         <DownOutlined />
                                //     </Button>
                                // </Dropdown>
                            )
                        ) : null}
                        <Button
                            type={"primary"}
                            size={"large"}
                            className="m-2"
                            icon={
                                this.state.sorted ? (
                                    <SortAscendingOutlined />
                                ) : (
                                    <SortDescendingOutlined />
                                )
                            }
                            onClick={() => this.sortBy("title")}
                        ></Button>
                        <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{ fontSize: 24 }}
                                    spin
                                />
                            }
                            spinning={this.state.loading}
                        >
                            <div className="site-layout-content row text-center">
                                {this.state.movies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        reviews={movie.reviews}
                                        auth={this.state.isAuthenticated}
                                        showAuthModal={this.showAuthModal}
                                        userId={this.state.user.id}
                                    />
                                ))}
                            </div>
                        </Spin>{" "}
                    </Content>
                    <Footer style={{ 
                        textAlign: "center",
                        marginLeft: "35px", 
                        maxWidth: "1040px"
                        }}>
                        Created By Marc Pasalo © {this.getYear()}
                    </Footer>
                </div>
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

    getYear = () => {
        return new Date().getFullYear();
    };
}

export default pageLayout;
