import React, { Component } from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import MovieCard from "./movieCard";
import { filterByReview, getMovies } from "../MovieFunctions";

const { Header, Content, Footer } = Layout;

class pageLayout extends Component {
    state = {
        movies: [],
        sorted: false,
    };

    componentDidMount() {
        this.getAllMovies();
    }

    getAllMovies = () => {
        getMovies().then((data) => {
            this.setState({
                movies: [...data],
            });
        });
    };

    filterMoviesByReview = () => {
        filterByReview().then((data) => {
            this.setState({
                movies: [...data],
            });
        });
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
                <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <Button
                        className="m-2 btn-primary"
                        onClick={() => this.filterMoviesByReview()}
                    >
                        Filter By Review
                    </Button>
                    <Button
                        className="m-2 btn-primary"
                        onClick={() => this.sortBy("title")}
                    >
                        Sort By Title Alphabetically
                    </Button>
                    <div className="site-layout-content row text-center">
                        {this.state.movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Created By Marc Pasalo ©2020
                </Footer>
            </Layout>
        );
    }
}

export default pageLayout;
