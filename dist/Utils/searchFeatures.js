"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchFeatures {
    constructor(query, queryString) {
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
        this.query = this.query.find(Object.assign({}, keyword));
        return this;
    }
    filter() {
        const queryCopy = Object.assign({}, this.queryString);
        const removeFields = ["keyword", "page", "limit", "color", "size", "sort"];
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
            }
            else if (!isNaN(queryCopy[key])) {
                // If numeric value, convert to number
                queryCopy[key] = parseFloat(queryCopy[key]);
            }
        });
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }
    //example .populate({ path: 'category', select: 'name' });
    populate(populateOptions) {
        this.query = this.query.populate(populateOptions);
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortOptions = {
                price_asc: { price: 1 },
                price_desc: { price: -1 },
                recency_desc: { createdAt: -1 },
                popularity_desc: { popularityScore: -1 },
                name_asc: { name: 1 },
                name_desc: { name: -1 },
                rating_desc: { rating: -1 } // Descending order by rating
                // Add more sorting options as needed
            };
            const sortBy = sortOptions[this.queryString.sort];
            if (sortBy) {
                this.query = this.query.sort(sortBy);
                console.log(this.query, 'hhh');
            }
            else {
                this.query = this.query.sort(this.queryString.sort.split(',').join(' '));
            }
        }
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skipProducts = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skipProducts);
        return this;
    }
}
exports.default = SearchFeatures;
