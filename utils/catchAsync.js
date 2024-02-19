module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}

//a function that wraps another function simply to catch any errors that might occur. Use on all aynchronous functions.