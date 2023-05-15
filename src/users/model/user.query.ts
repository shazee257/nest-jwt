import { Types } from 'mongoose';

export const fetchAllUsers = (userId: string, search: string) => {
  return [
    {
      $match: {
        $and: [
          { _id: { $ne: new Types.ObjectId(userId) } },
          { role: { $ne: 'admin' } },
          {
            $or: [
              { fullName: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
            ],
          },
        ],
      },
    },
  ];
};
