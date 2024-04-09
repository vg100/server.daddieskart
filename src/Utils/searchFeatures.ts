class SearchFeatures {
    query: any;
    queryString: any;

    constructor(query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: "i",
            }
        } : {};

        // console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy: any = { ...this.queryString }

        const removeFields: string[] = ["keyword", "page", "limit",];

        removeFields.forEach(key => delete queryCopy[key]);
    
        let queryString: string = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);


        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    pagination(resultPerPage: number) {
        const currentPage: number = Number(this.queryString.page) || 1;

        const skipProducts: number = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skipProducts);
        return this;
    }
}

export default SearchFeatures;
