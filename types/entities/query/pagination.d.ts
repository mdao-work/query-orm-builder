export default class QueryPagination {
    private _page;
    getPage(): number;
    setPage(value: number): void;
    private _perPage;
    getPerPage(): number;
    setPerPage(value: number): void;
    constructor(page: number, perPage: number);
    toArray(): object;
}
