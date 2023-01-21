export abstract class DTO<T> {
    constructor(partial: T) {
        Object.assign(this, partial);
    }
}
