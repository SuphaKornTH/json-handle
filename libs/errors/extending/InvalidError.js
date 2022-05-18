export class InvalidError extends Error {
    constructor (message) {
        super(message);
        this.name = "InvalidError";
    }
}