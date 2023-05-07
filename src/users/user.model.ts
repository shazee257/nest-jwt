import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  _id?: string;

  @Prop()
  fullName?: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  // role enum based
  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// fullName: String,   // POC Name for school
// businessName: String,
// mobile: { type: String }, // POC Phone for school
// email: { type: String, unique: true, required: true, lowercase: true }, // POC Email for school
// password: { type: String },
// address: String, // School Address
// location: {
//     type: { type: String, enum: ["Point"] },
//     coordinates: { type: [Number] },
// },
// url: String,
// image: String,
// userCover: String,
// dob: String,

// gender: { type: String, enum: ["male", "female", "other"] },
// role: { type: String, enum: ["donor", "donee", "volunteer", "admin", "school"] },

// isActive: { type: Boolean, default: true },
// isVerified: { type: Boolean, default: true }, // skipping otp screen for frontend
// isSubscriptionActive: { type: Boolean, default: false },
// isHaveFridge: { type: Boolean, default: false },
// fcmToken: String,
