import mongoose from "mongoose";
import {
  DuplicatedEntityException,
  MONGO_EXCEPTION,
  DUPLICATED_KEY_ERROR_CODE,
  SCHEMA_VALIDATOR_EXCEPTION,
  SchemaValidationException
} from "../exceptions";

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

subjectSchema.post("save", (error, doc, next) => {
  switch (error.name) {
    case SCHEMA_VALIDATOR_EXCEPTION:
      next(new SchemaValidationException(error.message));
      break;
    case MONGO_EXCEPTION:
      if (error.code === DUPLICATED_KEY_ERROR_CODE) {
        next(new DuplicatedEntityException(error.errmsg));
      }
      next(error);
      break;
    default:
      next(error);
      break;
  }
});

export const SubjectModel = mongoose.model("subject", subjectSchema);
