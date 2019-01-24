import mongoose from "mongoose";
import {
  DuplicatedEntityException,
  MONGO_EXCEPTION,
  DUPLICATED_KEY_ERROR_CODE
} from "../exceptions";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subject must have a name."],
    unique: true
  },
  code: {
    type: String,
    required: [true, "Subject must have a code."],
    unique: true
  }
});

subjectSchema.post("save", (error, doc, next) => {
  if (error.name === MONGO_EXCEPTION && error.code === DUPLICATED_KEY_ERROR_CODE) {
    next(new DuplicatedEntityException(error.errmsg));
  } else {
    next();
  }
});

export const SubjectModel = mongoose.model("subject", subjectSchema);
