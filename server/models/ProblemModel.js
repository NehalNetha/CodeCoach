import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: {
    type: mongoose.Schema.Types.Mixed ,
    of: String,
    required: true,
  },
  expected: {
    type: mongoose.Schema.Types.Mixed, 
    required: true,
  },
});

const problemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'], 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  examples: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
    },
  ],
  constraints: [String],
  functionName: {
    type: String,
    required: true,
  },
  starterCode: {
    type: Map,
    of: String, 
  },
  testCases: [testCaseSchema], 
  topic: String,
  
});

const Problems = mongoose.models.Problems || mongoose.model('Problems', problemSchema) ;


export default Problems