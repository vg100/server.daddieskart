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

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy: any = { ...this.queryString };
    
        const removeFields: string[] = ["keyword", "page", "limit","color"];
    
        removeFields.forEach(key => delete queryCopy[key]);
    
        if (this.queryString.color) {
            queryCopy['productVariants.name'] = 'color';
            queryCopy['productVariants.value'] = this.queryString.color;
        }
        if (this.queryString.size) {
            queryCopy['productVariants.name'] = 'size';
            queryCopy['productVariants.value'] = this.queryString.size;
        }

        Object.keys(queryCopy).forEach(key => {
            queryCopy[key] = { $in: queryCopy[key].split(',') };
        });
    
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
