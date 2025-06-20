import dynamoose from "dynamoose";

const PLAN_TABLE = process.env.PLAN_TABLE!;

const planSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    planType: {
      type: String,
      required: true,
    },
    planPrice: {
      type: Number,
      required: true,
    },
    planDuration: {
      type: Number,
      required: true,
    },
    planDescription: {
      type: Array,
      schema: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const planModel = dynamoose.model(PLAN_TABLE, planSchema, {
  create: false,
});

export default planModel;
