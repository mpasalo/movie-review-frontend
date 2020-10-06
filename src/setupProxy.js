const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy("/api/reviews", {
            target: "https://movie-review-backend.herokuapp.com",
            secure: false,
            changeOrigin: true,
        })
    );
};
