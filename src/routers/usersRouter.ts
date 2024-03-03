import { Router } from "express";
import {
  deletedUserController,
  updateUserController,
  userFindOneController,
  usersCreateController,
  usersFindPageController,
} from "../controllers/UsersController";
import { autAdmin, autUser } from "../middleware/aut";

const usersRouter = Router();

usersRouter.post("/create", usersCreateController);
usersRouter.get(
  "/page/:page/offset/:offset",
  autAdmin,
  usersFindPageController
);
usersRouter.get("/one/:id", autUser, userFindOneController);
usersRouter.patch("/update/:id", autUser, updateUserController);
usersRouter.delete("/delete/:id", autUser, deletedUserController);

export { usersRouter };
