import dynamoose from "dynamoose";

const ST_KEY_TABLE = process.env.ST_KEY_TABLE!;

const stKeySchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const stKeyModel = dynamoose.model(ST_KEY_TABLE, stKeySchema, {
  create: false,
});

export default stKeyModel;
