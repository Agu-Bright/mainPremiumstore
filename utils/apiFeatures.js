class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query) /**car.find() */,
      (this.queryStr = queryStr) /**req.query */;
  }
  // ==> /api/v1/product?search=mercedes
  // queryStr = {search: "mercedes"}
  search = () => {
    const search = this.queryStr.search
      ? {
          //search the product by name
          name: {
            $regex: this.queryStr.search,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...search });
    return this;
  };

  sort = () => {
    if (this.queryStr.sortBy) {
      const sortBy = this.queryStr.sortBy;
      const order = this.queryStr.order;
      this.query = this.query.sort({ [sortBy]: "desc" });
      return this;
    } else return this;
  };

  //filter by price ==> /api/v1/products?search=Mercedes&price[gte]=20000&category=mercedes&count=-1
  filter = () => {
    //queryStr = {search:"Mercedes", limit: 4, page: 1, category: "Mercedes", price: [gte: 1], price:[lte: 1000], rating: [get: 3] }
    const queryCopy = { ...this.queryStr };

    //removing fields from the array
    const removeField = ["search", "limit", "page", "sortBy"];
    removeField.forEach((field) => delete queryCopy[field]);

    //advance filter form price, rating,location etc
    let queryStr = JSON.stringify(queryCopy); // price: [gte: 1], price:[lte: 1000], rating: [get: 3]
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    const jsonVal = JSON.parse(queryStr);
    if (jsonVal.featured) {
      let obj;
      if (jsonVal.featured === "false") {
        obj = { featured: false };
      } else {
        obj = { featured: true };
      }
      this.query = this.query.find(obj);
      return this;
    } else if (jsonVal.new) {
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      this.query = this.query.find({}).sort({ _id: -1 }).limit(8);
      return this;
    } else this.query = this.query.find(JSON.parse(queryStr)); //find({price: [gte: 20]})
    return this;
  };

  paginate = (resPerpage) => {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerpage * (currentPage - 1);
    this.query = this.query.limit(resPerpage).skip(skip);
    return this;
  };
}

export default ApiFeatures;
