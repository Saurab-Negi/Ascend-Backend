import dynamoose from "dynamoose";

const TEMPLE_TABLE = process.env.TEMPLE_TABLE!;

const templeSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    freq: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    sound: {
      type: Array,
      schema: [String],
      required: true,
    }
  },
  { timestamps: true }
);

const templeModel = dynamoose.model(TEMPLE_TABLE, templeSchema, {
  create: false,
});

export default templeModel;
