import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";

const router = express.Router();

// ----- GET ALL CORRESPONDING MATCH POTENTIALS
router.get("/", (req: Request, res: Response): void => {
  // 	/api/table
  const queryText = `SELECT * from "profile" 
	JOIN "status" ON "profile"."id" = "status"."big_id";`;

  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

export default router;
