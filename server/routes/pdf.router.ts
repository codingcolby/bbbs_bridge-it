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

        const originalString: String = data.text; // hold the original pdf text

        //  let's build out our profile structure
        const profile: Object = {
          profile_type: 1, //  1 = big
          first_name: null,
          last_name: null,
          sex: null,
          dob_or_age: null, // saving DOB
          race: null,
          address: null,
          latitude: null,
          longitude: null,
          ems: null, //  enrollment & matching specialist or case manager
          preference: null,
          interest: null,
          b_employer: null, //  Big specific, null on Little profile
          b_occupation: null, //  Big specific, null on Little profile
          b_marital_status: null, //  Big specific, null on Little profile
          l_parent: null, //  Little specific, null on Big profile
          l_parent_relationship_to_child: null, //  Little specific, null on Big profile
        };

        // time to start splitting, first we're going to need chunks organized by heading
        // regex for text between headings: /(?<=DESCRIPTION OF VOLUNTEER:[\n | \r])(.*[\s\S]*?)(?=EXPERIENCE WITH CHILDREN)/gm
        // that regex gets the Big's description
        // ----------------------------------------------------
        //
        const chunks: Object = {
          personal_info: null, // VOLUNTEER SUMMARY through DESCRIPTION OF VOLUNTEER
          description_of_volunteer_header: "DESCRIPTION OF VOLUNTEER:", // since we'll be using this heading as part of the regex, don't include the newline
          description_of_volunteer: null,
          experience_with_children_header: "EXPERIENCE WITH CHILDREN:",
          experience_with_children: null,
          occupational_information_header: "OCCUPATIONAL INFORMATION:",
          occupational_information: null,
          background_family_relationships_header:
            "BACKGROUND/FAMILY RELATIONSHIPS:",
          background_family_relationships: null,
          home_environment_header: "HOME ENVIRONMENT:",
          home_environment: null,
          cm_assessment_of_home_environment_header:
            "CM ASSESSMENT OF HOME ENVIRONMENT (A minimum of 2-4 sentences required. Please incl. any safety concerns, if there were others present during the HV, VOLS interaction, if any, with others in the home):",
          cm_assessment_of_home_environment: null,
          close_relationships_header: "CLOSE RELATIONSHIPS:",
          close_relationships: null,
          friends_leisure_time_header: "FRIENDS/LEISURE TIME:",
          friends_leisure_time: null,
          personal_well_being_header: "PERSONAL WELL BEING:",
          personal_well_being: null,
          sexuality_header: "SEXUALITY", // no colon on sample
          sexuality: null,
          authorities_header:
            "AUTHORITIES (DUI/DWI, moving violations, accidents, suspensions/revocations, etc.):", // the whole header is needed for regex
          authorities: null,
          match_expectations_and_preferences_header:
            "MATCH EXPECTATIONS & PREFERENCES:",
          match_expectations_and_preferences: null,
          cm_match_recommendation_header:
            "CM MATCH RECOMMENDATION (Please provide detail on what CM considers to be the ideal match situation. A minimum of 1-3 sentences required):",
          cm_match_recommendation: null,
        };
        // 1. Find out the document type. All that matters is Big or Little here.

        const header1 = res.sendStatus(200);
      });
    } catch (err) {
      console.log("err: no files on req.files", err);
    }
  }
);

export default router;
