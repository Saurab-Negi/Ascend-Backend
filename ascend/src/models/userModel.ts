import dynamoose from "dynamoose";

const USER_KEY_TABLE = process.env.USER_KEY_TABLE!;

const userSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = dynamoose.model(USER_KEY_TABLE, userSchema, {
  create: false,
});

export default userModel;
