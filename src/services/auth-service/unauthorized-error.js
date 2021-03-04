class UnauthorizedError extends Error {
    constructor () {
        super('You are unauthorized to access this page');
    }
}

export default UnauthorizedError;