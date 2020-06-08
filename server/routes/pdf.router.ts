import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";
import pdf from "pdf-parse";

const router: express.Router = express.Router();

/**
 * Upload, parse and save new pdf files
 */
router.post(
  "/upload",
  (req: Request, res: Response, next: express.NextFunction): void => {
    // check for file
    try {
      // @ts-ignore
      let dataBuffer = req.files.file.data;

      pdf(dataBuffer).then(function (data) {
        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata);
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text);
      });

      res.sendStatus(201);
    } catch (err) {
      console.log("err: no files on req.files", err);
    }
  }
);

export default router;
