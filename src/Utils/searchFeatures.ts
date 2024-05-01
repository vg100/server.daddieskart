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
    
        const removeFields: string[] = ["keyword", "page", "limit","color","size"];
    
        removeFields.forEach(key => delete queryCopy[key]);
    
        if (this.queryString.color) {
            queryCopy['productVariants.color'] = this.queryString.color;
        }
        if (this.queryString.size) {
            queryCopy['productVariants.size'] = this.queryString.size;
        }
        Object.keys(queryCopy).forEach(key => {
            if (queryCopy[key].includes(',')) {
                // If comma-separated values, convert to array
                queryCopy[key] = { $in: queryCopy[key].split(',') };
            } else if (!isNaN(queryCopy[key])) {
                // If numeric value, convert to number
                queryCopy[key] = parseFloat(queryCopy[key]);
            }
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
