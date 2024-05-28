declare class SearchFeatures {
    query: any;
    queryString: any;
    constructor(query: any, queryString: any);
    search(): this;
    filter(): this;
    populate(populateOptions: any): this;
    sort(): this;
    pagination(resultPerPage: number): this;
}
export default SearchFeatures;
