import mongoose from 'mongoose'

import { Token } from 'store'

const tokenSchema = new mongoose.Schema<Token>(
	{
		access_token: String,
		expires_at: Number,
		expires_in: Number,
		refresh_token: String,
	},
	{ _id: false, timestamps: true }
)

export const TokenModel =
	mongoose.models.TokenModel || mongoose.model('Token', tokenSchema, 'tokens')
