import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";

const router = express.Router();

// ----- GET ALL CORRESPONDING MATCH POTENTIALS
router.get("/", (req: Request, res: Response): void => {
	// 	/api/table
	const queryText = `SELECT * from "status";`;

	// -- THROWS AN ERROR
	// const queryText = `SELECT * from "status"
	// JOIN "status" ON "profile"."id" = "status"."big_id", "profile"."id" = "status"."little_id"
	// ;`;

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
