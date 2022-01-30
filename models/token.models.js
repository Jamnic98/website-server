import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema(
  {
    access_token: String,
    refresh_token: String,
    expires_at: Number,
    expires_in: Number
  },
  { _id: false }
);

const Token = mongoose.model('Token', tokenSchema, 'tokens');

export default Token;
