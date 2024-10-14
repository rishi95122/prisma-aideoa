import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
});

export default mongoose.model("ContactUs", contactUsSchema);
