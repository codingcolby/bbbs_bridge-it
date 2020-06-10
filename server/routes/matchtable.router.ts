const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// ----- GET ALL CORRESPONDING MATCH POTENTIALS
router.get("/table", (req: Request, res: Response): void => {
	const queryText = `SELECT * from "profile" 
	JOIN "status" ON "profile"."id" = "status"."big_id";`;

	pool
		.query(queryText)
		.then((response) => {
			//@ts-ignore
			res.send(response.rows);
		})
		.catch((err) => {
			console.warn(err);
			//@ts-ignore
			res.sendStatus(500);
		});
});

export default router;
