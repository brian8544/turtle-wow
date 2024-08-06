export class CookieOption {
    constructor(
        public readonly title: string,
        public readonly description: string,
        private hEnabled: boolean,
        public readonly disabled: boolean
    ) {
    }

    public get enabled(): boolean {
        return this.hEnabled;
    }

    public setEnabled(state: boolean): void {
        if (this.disabled) {
            return;
        }
        this.hEnabled = state;
    }

    public toggle() {
        if (this.disabled) {
            return;
        }
        this.hEnabled = !this.hEnabled;
    }
}
