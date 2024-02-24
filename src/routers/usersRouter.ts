import { Router } from "express";
import {
  deletedUserController,
  updateUserController,
  userFindOneController,
  usersCreateController,
  usersFindPageController,
} from "../controllers/UsersController";

const usersRouter = Router();

usersRouter.post("/create", usersCreateController);
usersRouter.get("/page/:page/offset/:offset", usersFindPageController);
usersRouter.get("/one/:id", userFindOneController);
usersRouter.patch("/update/:id", updateUserController);
usersRouter.delete("/delete/:id", deletedUserController);

export { usersRouter };
