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
        const removeFields = ["keyword", "page", "limit", "color"];
        removeFields.forEach(key => delete queryCopy[key]);
        if (this.queryString.color) {
            queryCopy['productColorVariants.name'] = 'Color';
            queryCopy['productColorVariants.value'] = this.queryString.color;
        }
        Object.keys(queryCopy).forEach(key => {
            queryCopy[key] = { $in: queryCopy[key].split(',') };
        });
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        this.query = this.query.find(JSON.parse(queryString));
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
