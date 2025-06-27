import dynamoose from "dynamoose";

const ST_KEY_ASS_TABLE = process.env.ST_KEY_ASS_TABLE!;

const stKeyAssSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    userId: {
      type: String,
      required: true,
      index: {
        type: "global",
        name: "userIdIndex",
      },
    },
    assessment: {
      type: Array,
      required: true,
      schema: [
        {
          type: Object,
          schema: {
            keyId: { type: String, required: true },
            keyName: { type: String, required: true },
            keyScore: { type: Number, required: true },
            questions: {
              type: Array,
              schema: [
                {
                  type: Object,
                  schema: {
                    questionId: { type: String, required: true },
                    question: { type: String, required: true },
                    answer: { type: Number, required: true },
                  }
                }
              ]
            }
          }
        }
      ]
    },
    totalScore: {
      type: Number,
      required: true,
    },
    isSubmitted: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

const stKeyAssModel = dynamoose.model(ST_KEY_ASS_TABLE, stKeyAssSchema, {
  create: false,
});

export default stKeyAssModel;
