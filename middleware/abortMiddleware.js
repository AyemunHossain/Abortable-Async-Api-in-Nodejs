const abortMiddleware = (defaultTimeout = 5000) => (req, res, next) =>{

    const abortController = new AbortController();
    const {signal} = abortController;
    req.signal = signal;

    setTimeout(() => {
        abortController.abort();
    }, defaultTimeout);

    req.on('close', () => {
        abortController.abort();
    });
    next();
}

module.exports = {abortMiddleware};
