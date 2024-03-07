import { hashSync } from "bcryptjs";
import { User, UserInterface } from "../DB/models/Users";
import { LoginService } from "./LoginService";

export class UsersService {
  static async createUser(UserBody: UserInterface) {
    const newPass = UserBody.password;
    const hash = hashSync(UserBody.password, 10);

    UserBody.password = hash;
    console.log(UserBody);
    const newUser = await User.create(UserBody);

    if (!newUser) {
      return {
        data: false,
        message: "not created",
        code: 500,
      };
    }

    const tokenResponse = await LoginService.loginUser(UserBody.email, newPass);

    return {
      data: tokenResponse.data,
      message: "created",
      code: 201,
    };
  }

  static async getPageUsers(page: number, offset: number) {
    const users = await User.findAll({
      offset: offset * page,
      limit: offset,
      where: {
        isDeleted: false,
      },
    });

    if (users.length === 0) {
      return {
        data: [],
        message: "not finded",
        code: 404,
      };
    }

    return {
      data: users,
      message: "find Users",
      code: 200,
    };
  }

  static async getUserById(id: string) {
    const user = await User.findByPk(id);

    if (!user || user.dataValues.isDeleted) {
      return {
        data: {},
        message: "not found user",
        code: 404,
      };
    }

    return {
      data: user,
      message: "find user",
      code: 200,
    };
  }

  static async updateUser(id: string, userBody: UserInterface) {
    const updateUser = await User.update(userBody, { where: { id } });

    if (updateUser[0] === 0) {
      return {
        data: {},
        message: "user not updated",
        code: 400,
      };
    }

    return {
      data: updateUser,
      message: "user updated",
      code: 200,
    };
  }

  static async deletedUser(id: string) {
    const userToDelete = await User.update(
      { isDeleted: true },
      { where: { id } }
    );
    if (userToDelete[0] === 0) {
      return {
        data: {},
        message: "not found user",
        code: 404,
      };
    }

    return {
      data: userToDelete,
      message: "user deleted",
      code: 200,
    };
  }
}
