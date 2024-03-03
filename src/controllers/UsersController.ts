import { NextFunction, Request, Response } from "express";
import { User, UserInterface } from "../DB/models/Users";
import { UsersService } from "../services/UsersServices";

export const usersCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as UserInterface;

    const userResponse = await UsersService.createUser(body);

    res.status(userResponse.code).json(userResponse);
  } catch (error: any) {
    res.status(500).json({
      message: error || error.message,
      code: 500,
    });
  }
};

export const usersFindPageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const offset = Number(req.params.offset);
    const page = Number(req.params.page);

    const responsePageUsers = await UsersService.getPageUsers(page, offset);

    res.json(responsePageUsers);
  } catch (error: any) {
    res.status(500).json({
      message: error || error.message,
      code: 500,
    });
  }
};

export const userFindOneController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const responseUser = await UsersService.getUserById(id);

    res.status(responseUser.code).json(responseUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = req.body as UserInterface;
    console.log(id, user);
    const usersUpdate = await UsersService.updateUser(id, user);

    res.status(usersUpdate.code).json(usersUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletedUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const responseUserDeleted = await UsersService.deletedUser(id);

    res.status(responseUserDeleted.code).json(responseUserDeleted);
  } catch (error) {
    res.status(500).json(error);
  }
};
