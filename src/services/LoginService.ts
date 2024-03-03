import { config } from "dotenv";
import { User } from "../DB/models/Users";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

config();

const secret = process.env.secret_token || "hola";

export class LoginService {
  static async loginUser(emailUser: string, password: string) {
    const user = await User.findOne({
      where: { email: emailUser },
      attributes: ["id", "email", "password"],
    });

    if (!user) {
      return {
        data: {},
        code: 404,
        message: "user not found",
      };
    }
    const compared = await compare(password, user.dataValues.password);
    console.log(compared);

    if (!compared) {
      return { data: {}, code: 400, message: "password incorrect" };
    }

    const token = await sign({ id: user.dataValues.id }, secret, {
      expiresIn: "72h",
    });

    return {
      data: { token },
      code: 200,
    };
  }
}
