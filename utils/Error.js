class AbortError extends Error {
    constructor(message) {
        super(message);
        this.name = "AbortError";
    }
}

module.exports = {
    AbortError
}