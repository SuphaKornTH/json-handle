export class existError extends Error {
    constructor (message) {
        super(message);
        this.name = "ExistError";
    }
}