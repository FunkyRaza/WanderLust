module.exports = (fn) => {
    return (req, rers, next) => {
        fn(req, rers, next).catch(next);
    };
};