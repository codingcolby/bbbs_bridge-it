import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";
import pdf from "pdf-parse";
import * as big_head from "../modules/headers/big.json";
import chunker from "../modules/chunker";

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

        const originalString: string = data.text; // hold the original pdf text

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
        // ----------------------------------------------------
        //
        const chunks: Object = {
          pdf_header: big_head.first_header,
          personal_info: chunker(
            originalString,
            big_head.first_header,
            big_head.description_of_volunteer
          ), // VOLUNTEER SUMMARY through DESCRIPTION OF VOLUNTEER
          description_of_volunteer_header: big_head.description_of_volunteer, // since we'll be using this heading as part of the regex, don't include the newline
          description_of_volunteer: chunker(
            originalString,
            big_head.description_of_volunteer,
            big_head.experience_with_children
          ),
          experience_with_children_header: big_head.experience_with_children,
          experience_with_children: chunker(
            originalString,
            big_head.experience_with_children,
            big_head.occupational_information
          ),
          occupational_information_header: big_head.occupational_information,
          occupational_information: chunker(
            originalString,
            big_head.occupational_information,
            big_head.background_family_relationships
          ),
          background_family_relationships_header:
            big_head.background_family_relationships,
          background_family_relationships: chunker(
            originalString,
            big_head.background_family_relationships,
            big_head.home_environment
          ),
          home_environment_header: big_head.home_environment,
          home_environment: chunker(
            originalString,
            big_head.home_environment,
            big_head.cm_assessment_of_home_environment
          ),
          cm_assessment_of_home_environment_header:
            big_head.cm_assessment_of_home_environment,
          cm_assessment_of_home_environment: chunker(
            originalString,
            big_head.cm_assessment_of_home_environment,
            big_head.close_relationships
          ),
          close_relationships_header: big_head.close_relationships,
          close_relationships: chunker(originalString, big_head.close_relationships, big_head.friends_leisure_time),
          friends_leisure_time_header: big_head.friends_leisure_time,
          friends_leisure_time: chunker(originalString, big_head.friends_leisure_time, big_head.personal_well_being),
          personal_well_being_header: big_head.personal_well_being,
          personal_well_being: chunker(originalString, big_head.personal_well_being, big_head.sexuality),
          sexuality_header: big_head.sexuality,
          sexuality: chunker(originalString, big_head.sexuality, big_head.authorities),
          authorities_header:
            big_head.authorities,
          authorities: chunker(originalString, big_head.authorities, big_head.match_expectations_and_preferences),
          match_expectations_and_preferences_header:
            big_head.match_expectations_and_preferences,
          match_expectations_and_preferences: chunker(originalString, big_head.match_expectations_and_preferences, big_head.cm_match_recommendation),
          cm_match_recommendation_header:
            "CM MATCH RECOMMENDATION (Please provide detail on what CM considers to be the ideal match situation. A minimum of 1-3 sentences required):", ./kjlsad;fljasd;lkfj
          cm_match_recommendation: null,
        };

        const header1 = res.sendStatus(200);
      });
    } catch (err) {
      console.log("err: no files on req.files", err);
    }
  }
);

export default router;
