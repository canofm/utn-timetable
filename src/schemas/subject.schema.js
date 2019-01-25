import mongoose from "mongoose";
import mongoErrorHandler from "./mongoErrorHandler";

export const SUBJECT_SCHEMA_VALIDATION_MESSAGE_NAME = "Subject must have a name.";
export const SUBJECT_SCHEMA_VALIDATION_MESSAGE_CODE = "Subject must have a code.";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, SUBJECT_SCHEMA_VALIDATION_MESSAGE_NAME],
    unique: true
  },
  code: {
    type: String,
    required: [true, SUBJECT_SCHEMA_VALIDATION_MESSAGE_CODE],
    unique: true
  }
});

subjectSchema.post("save", mongoErrorHandler);
subjectSchema.post("update", mongoErrorHandler);
subjectSchema.post("findOneAndUpdate", mongoErrorHandler);

export const SubjectModel = mongoose.model("subject", subjectSchema);
