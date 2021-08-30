import { Schema, model } from "mongoose";
const mongoose = require("mongoose");
import SchemaModel from "../config/database/mongoDBOperation";
const schema = {
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  logged_in_date_time: {
    type: Date,
  },
};

let schemaOption = {
  timestamps: false,
  versionKey: false,
};

let modelName = "login_log";
let login_logSchema = Schema(schema, schemaOption);

let login_logModel = model(modelName, login_logSchema);
let login_log = new SchemaModel(login_logModel);

export default login_log;
