import dynamoose from "dynamoose";

const PROMPT_TABLE = process.env.PROMPT_TABLE!;

const promptSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    prompt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const promptModel = dynamoose.model(PROMPT_TABLE, promptSchema, {
  create: false,
});

export default promptModel;
