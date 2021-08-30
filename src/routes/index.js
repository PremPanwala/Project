import { Router } from "express";
import UserRoutes from "./user/user.routes";
const routes = new Router();
const PATH = {
  ROOT: "/",
  USER: "/users",
};
routes.use(PATH.USER, UserRoutes);

export default routes;
