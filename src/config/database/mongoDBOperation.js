export default class SchemaModel {
  constructor(model) {
    this.model = model;
  }

  async createData(data) {
    const dbOperation = await this.model.create(data);
    return dbOperation;
  }

  async isExist(query, option) {
    let isExist = false;
    const adminUser = await this.model.find(query, null, option);
    if (adminUser.length > 0) {
      isExist = true;
    }
    return isExist;
  }

  async findData(query, projection, options) {
    const opArgs = {};
    if (options && options.page && options.limit) {
      opArgs.skip = options.page > 0 ? (options.page - 1) * options.limit : 0;
    }
    options && options.limit ? (opArgs.limit = options.limit) : "";
    options && options.sort ? (opArgs.sort = options.sort) : "";
    const dbOperation = await this.model
      .find(query, projection, options)
      .lean();
    return dbOperation;
  }

  async fetchCount(query) {
    const dbOperation = await this.model.countDocuments(query);
    return dbOperation;
  }

  async findloggedUserdData(query) {
    const dbOperation = await this.model.find(query).populate("user_id");
    return dbOperation;
  }
  async updateData(query, updateJson, opts) {
    const option = {
      new: true, // return updated doc
      runValidators: true, // validate before update
      omitUndefined: true,
      upsert: true,
      opts,
    };
    const dbOperation = await this.model.findOneAndUpdate(
      query,
      updateJson,
      option
    );
    return dbOperation;
  }

  async deleteData(query) {
    const dbOperation = await this.model.findOneAndRemove(query);
    return dbOperation;
  }

  async deleteMultipleData(filter) {
    const dbOperation = await this.model.deleteMany(filter);
    return dbOperation;
  }

  async updateMany(query, updateJson) {
    const option = {
      new: true, // return updated doc
    };
    const dbOperation = await this.model.updateMany(query, updateJson, option);
    return dbOperation;
  }

  async aggregate(pipeline) {
    const dbOperation = await this.model.aggregate(pipeline).exec();
    return dbOperation;
  }
}
