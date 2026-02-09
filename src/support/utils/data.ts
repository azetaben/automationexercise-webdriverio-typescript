export function uniqueEmail(prefix = "qa"): string {
    const ts = Date.now();
    return `${prefix}.${ts}@example.test`;
}

export function uniqueName(prefix = "QA User"): string {
    const ts = Date.now().toString().slice(-6);
    return `${prefix} ${ts}`;
}
