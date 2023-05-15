import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    apple_id: String,
    fullName: String,
    email: String,
    password: String,
    role: { type: String, enum: ['donor', 'donee', 'volunteer', 'admin'] },

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
    isVerified: { type: Boolean, default: false },
    fcmToken: String,

    workingDays: {
      Monday: {
        ON: { type: Boolean, default: false },
        startTime: { type: String, default: '09:00 AM' },
        endTime: { type: String, default: '06:00 PM' },
      },
      Tuesday: {
        ON: { type: Boolean, default: false },
        startTime: { type: String, default: '09:00 AM' },
        endTime: { type: String, default: '06:00 PM' },
      },
      Wednesday: {
        ON: { type: Boolean, default: false },
        startTime: { type: String, default: '09:00 AM' },
        endTime: { type: String, default: '06:00 PM' },
      },
      Thursday: {
        ON: { type: Boolean, default: false },
        startTime: { type: String, default: '09:00 AM' },
        endTime: { type: String, default: '06:00 PM' },
      },
      Friday: {
        ON: { type: Boolean, default: false },
        startTime: { type: String, default: '09:00 AM' },
        endTime: { type: String, default: '06:00 PM' },
      },
      Saturday: {
        ON: { type: Boolean, default: false },
        startTime: { type: String, default: '09:00 AM' },
        endTime: { type: String, default: '06:00 PM' },
      },
      Sunday: {
        ON: { type: Boolean, default: false },
        startTime: { type: String, default: '09:00 AM' },
        endTime: { type: String, default: '06:00 PM' },
      },
    },
    // categoryIds: [{ type: Types.ObjectId, ref: 'category' }],
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

export interface Location {
  type: string;
  coordinates: [number, number];
}

export interface User {
  id: string;
  apple_id: String;
  fullName: string;
  email: string;
  password: string;
  role: string;

  businessName: string;
  mobile: string;
  location: Location;
  url: string;
  image: string;
  userCover: string;
  dob: Date;

  gender: string;
  isActive: boolean;
  isVerified: boolean;
  fcmToken: string;

  workingDays: {
    Monday: {
      ON: boolean;
      startTime: string;
      endTime: string;
    };
    Tuesday: {
      ON: boolean;
      startTime: string;
      endTime: string;
    };
    Wednesday: {
      ON: boolean;
      startTime: string;
      endTime: string;
    };
    Thursday: {
      ON: boolean;
      startTime: string;
      endTime: string;
    };
    Friday: {
      ON: boolean;
      startTime: string;
      endTime: string;
    };
    Saturday: {
      ON: boolean;
      startTime: string;
      endTime: string;
    };
    Sunday: {
      ON: boolean;
      startTime: string;
      endTime: string;
    };
  };
  // categoryIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserObjectJWT {
  id: string;
  fullName: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
