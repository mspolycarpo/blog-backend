import { Model, Schema, model } from "mongoose";
import { ValidateEmail } from "../common/validators";
import * as bcrypt from "bcrypt";
import { enviroment } from "../common/enviroment";
export interface User {
  id: string;
  displayName: string;
  email: string;
  password: string;
  image: string;
  matches(password: string): boolean;
}

export interface UserModel extends Model<User> {
  findByEmail(email: string, projection?: string): Promise<User>;
}

const userSchema = new Schema<User, UserModel>({
  id: {
    type: String,
  },
  displayName: {
    type: String,
    required: true,
    minLength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: ValidateEmail,
      message: "email must be a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },
  image: {
    type: String,
    required: true,
  },
});

userSchema.static("findByEmail", function (email: string, projection: string) {
  return this.findOne({ email }, projection);
});

userSchema.methods.matches = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

const hashPassword = async (obj, next) => {
  try {
    const hash = await bcrypt.hash(
      obj.password,
      enviroment.security.saltRounds
    );

    obj.password = hash;

    next();
  } catch (error) {
    next(error);
  }
};

const saveMiddleware = function (next) {
  // Nao utilizar arrow functions pois e' necessario que a funcao dependa do contexto
  const user: User = this;
  try {
    hashPassword(user, next);
  } catch {
    next();
  }
};

userSchema.pre("save", saveMiddleware);

export const User = model<User, UserModel>("User", userSchema);
