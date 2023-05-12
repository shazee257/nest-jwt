import { Schema } from 'mongoose';

export const OtpSchema = new Schema(
  {
    email: { type: String, required: true },
    otp: { type: Number, required: true },
  },
  { timestamps: true },
);

OtpSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.__v;
    return ret;
  },
});

export interface Otp {
  id: string;
  email: string;
  otp: number;
  // createdAt: Date;
  // updatedAt: Date;
}
