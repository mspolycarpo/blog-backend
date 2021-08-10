import * as mongoose from "mongoose";

export interface User extends mongoose.Document {
  id: number;
  displayName: string;
  email: string;
  password: string;
  image: string;
}

// export interface UserModel extends mongoose.Model<User> {}

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
    validate: {
      validator: function (s) {
        return s && s.length >= 8;
      },
      message: "length must be at least 8 characters long",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model<User>("User", userSchema);

/*
{
  "id": "401465483996",
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com", // tem quer ser único
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
*/
