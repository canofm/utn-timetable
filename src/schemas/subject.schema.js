import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subject must have a name"]
  },
  code: {
    type: String,
    required: [true, "Subject must have a code"]
  }
});

export const SubjectModel = mongoose.model("subject", subjectSchema);
