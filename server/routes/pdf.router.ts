import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";
import pdf from "pdf-parse";

const router: express.Router = express.Router();

/**
 * Upload, parse and save new pdf files
 */
router.post(
  "/upload/big",
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

        const originalString = data.text; // hold the original pdf text
        const result = {}; // <-- let's build this out
        // time to start splitting
        // ----------------------------------------------------
        //
        // 1. Find out the document type. All that matters is Big or Little here.

        const header1 = res.sendStatus(200);
      });
    } catch (err) {
      console.log("err: no files on req.files", err);
    }
  }
);

export default router;
