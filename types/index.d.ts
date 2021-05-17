import QueryPagination from './entities/query/pagination';
import QuerySelect from './entities/query/select';
export default class QueryClient {
    protected _order: any;
    protected _filter: any;
    protected _select: QuerySelect | null;
    protected _pagination: QueryPagination | null;
    constructor();
    /**
     * @param key
     * @param operation
     * @param value
     */
    where(key: string, operation: string, value: any): this;
    /**
     * @param key
     * @param value
     */
    whereIn(key: string, ...value: any[]): this;
    /**
     * @param key
     * @param value
     */
    whereBetween(key: string, value: string | number): this;
    /**
     *
     * @param key
     * @param value
     */
    orderBy(key: string, value?: any): this;
    /**
     * @param select
     */
    select(select: Array<string>): this;
    /**
     * @param perPage
     * @param page
     */
    page(perPage: number, page?: number): this;
    toObject(): Object;
    /**
     * @return string
     */
    toUriQueryString(): string;
}
