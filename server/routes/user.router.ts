import { Request, Response } from "express";
import express from "express";
import rejectUnauthenticated from "../modules/authentication-middleware";
import pool from "../modules/pool";
import userStrategy from "../strategies/user.strategy";
import { encryptPassword } from "../modules/encryption";
const router: express.Router = express.Router();

router.get("/", rejectUnauthenticated, (req: Request, res: Response): void => {
  //@ts-ignore
  console.log("USER", req.user);
  //@ts-ignore
  res.send(req.user);
});

router.get("/profiles", (req: Request, res: Response): void => {
  //get all profiles
  const queryText: string = `SELECT * FROM "profile";`;
  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log(`Error getting profiles from database: ${err}`);
      res.sendStatus(500);
    });
});
router.post(
  "/register",
  (req: Request, res: Response, next: express.NextFunction): void => {
    //@ts-ignore
    const email: string | null = <string>req.body.email;
    //@ts-ignore
    const password: string | null = encryptPassword(req.body.password);

    const queryText: string = `INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING id`;
    pool
      .query(queryText, [email, password])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(`Error saving user to database: ${err}`);
        res.sendStatus(500);
      });
  }
);
router.post(
  "/login",
  userStrategy.authenticate("local"),
  (req: Request, res: Response): void => {
    res.sendStatus(200);
  }
);
router.post("/logout", (req: Request, res: Response): void => {
  //@ts-ignore
  req.logout();
  res.sendStatus(200);
});

router.put("/reset", (req: Request, res: Response): void => {
  console.log(req.body);

  const queryText = `UPDATE "user" SET email=$1, password=$2 WHERE id=$3;`;
  //@ts-ignore
  const password: string | null = encryptPassword(req.body.password);

  pool
    .query(queryText, [req.body.email, password, req.body.userid])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("error in RESET user", err);
    });
});
export default router;
