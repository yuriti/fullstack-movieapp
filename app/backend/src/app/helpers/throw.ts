export function throwIf(value: boolean, error: Error): void {
    if (!value) {
        return;
    }

    throw error;
}
