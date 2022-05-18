export class duplicatesError extends Error {
    constructor (message) {
        super(message);
        this.name = "DuplicatesError";
    }
}