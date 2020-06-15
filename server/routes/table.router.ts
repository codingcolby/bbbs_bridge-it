import { Request, Response, query } from "express";
import express from "express";
import pool from "../modules/pool";

const router = express.Router();

// ----- GET ALL CORRESPONDING MATCH POTENTIALS
router.get("/", (req: Request, res: Response): void => {
  // 	/api/table
  const queryText: string = `SELECT "status"."id", "review_type"."type" as "review", "status"."match", "status"."comment", CONCAT("profile1"."first_name", ' ', "profile1"."last_name") AS "big_name", CONCAT("profile2"."first_name", ' ', "profile2"."last_name") AS "little_name", "status"."big_id", "status"."little_id" FROM "status"
  JOIN "profile" "profile1" ON "profile1"."id" = "big_id"
  JOIN "profile" "profile2" ON "profile2"."id" = "little_id"
  JOIN "review_type" ON "review_type"."id" = "status"."review"
  WHERE ("status"."match" IS NULL AND "status"."review" IS NOT NULL) OR "status"."match" IS TRUE
  ORDER BY "big_id";`;
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

/**
 * Create the initial match relationship.
 * This relationship displays as an entry on the match table page.
 */
router.post("/", (req: Request, res: Response) => {
  /**
   * Req. body expects this data object
   *   {
   *     comment: "the comment on the relationship. Added in the sweetalert on MapListPage",
   *     review: 1, 2 or 3, this number indicates the type of relationship between the individuals,
   * 	   big_id: the big's id,
   * 	   little_id: the little's id,
   *   }
   */
  const { comment, review, big_id, little_id } = req.body;
  const queryData = [big_id, little_id, review, comment]; // the query data
  const queryText = `INSERT INTO "status" (
		"big_id",
		"little_id",
		"review",
		"comment")
    VALUES
		($1, $2, $3, $4)
	ON CONFLICT DO NOTHING;`;

  pool
    .query(queryText, queryData)
    .then((response) => {
      res.sendStatus(201); // send CREATED for relationship created
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

/**
 * update comments & match status
 *
 *   data object:
 *   {
 *     big_id: Number,
 *     little_id: Number,
 *     comment: Text,
 *     match: Boolean
 *   }
 */
router.put("/match", (req: Request, res: Response): void => {
  const { big_id, little_id, comment, match } = req.body;
  const queryData = [big_id, little_id, comment, match];

  const queryText = `UPDATE "status" SET ("match", "comment") = ($4, $3)
	WHERE ("big_id" = $1) AND ("little_id" = $2) RETURNING "id";`;

  pool
    .query(queryText, queryData)
    .then((response) => {
      res.send(response); // send the id
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

export default router;
