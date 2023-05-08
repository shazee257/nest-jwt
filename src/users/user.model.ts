import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    fullName: String,
    email: String,
    password: String,
    role: String,

    businessName: String,
    mobile: String,
    location: {
      type: { type: String, enum: ['Point'] },
      coordinates: [Number, Number],
    },
    url: String,
    image: String,
    userCover: String,
    dob: Date,

    gender: { type: String, enum: ['male', 'female', 'other'] },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: true },
    fcmToken: String,
  },
  { timestamps: true },
);

// create index for location field
UserSchema.index({ location: '2dsphere' });

// hide password field from user object by default
UserSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;

  businessName: string;
  mobile: string;
  location: {
    type: string;
    // coordinates is an array of numbers
    coordinates: [number, number];
  };
  url: string;
  image: string;
  userCover: string;
  dob: Date;

  gender: string;
  isActive: boolean;
  isVerified: boolean;
  fcmToken: string;
}
