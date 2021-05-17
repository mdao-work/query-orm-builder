export default class QueryOrderBy {
    private _column;
    getColumn(): string;
    protected setColumn(value: string): void;
    private _direction;
    getDirection(): string;
    protected setDirection(value: string): void;
    constructor(column: string, direction: string);
    /**
     * @returns
     */
    toArray(): object;
}
