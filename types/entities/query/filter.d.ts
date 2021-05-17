export default class QueryFilter {
    private _field;
    private _operator;
    private _value;
    constructor(field: string, operator: string, value: any);
    get field(): string;
    set field(value: string);
    get operator(): string;
    set operator(value: string);
    get value(): any;
    set value(value: any);
    parserOperator(): string;
    toArray(): Array<any>;
}
