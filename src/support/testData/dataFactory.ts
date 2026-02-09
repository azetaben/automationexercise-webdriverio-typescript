export function uniqueEmail(prefix = 'ae'): string {
    const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    return `${prefix}.${stamp}@example.test`;
}

export function uniqueName(prefix = 'User'): string {
    const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    return `${prefix}${stamp}`;
}
