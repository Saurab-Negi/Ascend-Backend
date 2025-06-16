import dynamoose from "dynamoose";

const QUESTION_TABLE = process.env.QUESTION_TABLE!;

const questionSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    stKeyName: {
      type: String,
      required: true,
    },
    stKeyId: {
      type: String,
      required: true,
      index: {
        type: "global",
        name: "stKeyIdIndex",
      },
    },
    question: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const questionModel = dynamoose.model(QUESTION_TABLE, questionSchema, {
  create: false,
});

export default questionModel;
