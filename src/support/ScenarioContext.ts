export class ScenarioContext {
    private data: Map<string, unknown> = new Map();

    set<T>(key: string, value: T): void {
        this.data.set(key, value);
    }

    get<T>(key: string): T {
        return this.data.get(key) as T;
    }

    has(key: string): boolean {
        return this.data.has(key);
    }

    clear(): void {
        this.data.clear();
    }
}
