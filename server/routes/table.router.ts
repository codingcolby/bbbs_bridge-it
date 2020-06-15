import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";

const router = express.Router();

// ----- GET ALL CORRESPONDING MATCH POTENTIALS
router.get("/", (req: Request, res: Response): void => {
	// 	/api/table
	const queryText: string = `SELECT "status".*, "profile"."profile_type", CONCAT("profile"."first_name", ' ', "profile"."last_name") as NAME
	FROM "status"
	INNER JOIN "profile" ON ( "status"."big_id" = "profile"."id") 
	WHERE "status"."review" IS NOT NULL AND "status"."match" IS NULL 
	ORDER BY "status"."big_id";`;
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

// ----- UPSERT STATUS
router.post("/", (req: Request, res: Response) => {
	const upsertTableData = req.body;
	const queryText = `INSERT INTO "status" (
		"big_id", 
		"little_id", 
		"match", 
		"review", 
		"comment")
    VALUES
        ($1, $2, $3, $4, $5)
    ON CONFLICT ON CONSTRAINT unique_relationship_key
    DO
    UPDATE SET
		"match" = $3, 
		"review" = $4, 
		"comment" = $5;`;

	pool
		.query(queryText, [
			upsertTableData.big_id,
			upsertTableData.little_id,
			upsertTableData.match,
			upsertTableData.review,
			upsertTableData.comment,
		])
		.then((response) => {
			res.send(response.rows);
		})
		.catch((err) => {
			console.warn(err);
			res.sendStatus(500);
		});
});

export default router;
