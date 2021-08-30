import { Schema, model } from "mongoose";
const mongoose = require("mongoose");
import SchemaModel from "../config/database/mongoDBOperation";
const schema = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  dob: {
    type: Date,
  },
  org_id: {
    type: String,
  },
};

let schemaOption = {
  timestamps: true,
  versionKey: false,
};

let modelName = "User";
let userSchema = Schema(schema, schemaOption);

let userModel = model(modelName, userSchema);
let User = new SchemaModel(userModel);

export default User;
