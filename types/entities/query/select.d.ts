export default class QuerySelect {
    get select(): Array<string>;
    set select(value: Array<string>);
    private _select;
    constructor(select: Array<string>);
    /**
     *
     */
    toArray(): Array<string>;
}
