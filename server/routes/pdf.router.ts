import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";
import pdf from "pdf-parse";
import * as big_pdf_head from "../constants/headers/pdf.big.json";
import * as big_profile_head from "../constants/headers/profile.big.json";
import * as big_preferences_head from "../constants/headers/preferences.big.json";
import chunker from "../modules/chunker";
import Profile from "../modules/profile.interface";
import BigPreferences from "../modules/big.preferences.interface";
import bigPreferenceChecker from "../modules/big-preference-checker";
import bigPreferenceForwardChecker from "../modules/big-preference-forward-checker";
import axios from "axios";

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
        const profile: Profile = {
          profile_type: 1, //  1 = big
          first_name: null,
          last_name: null,
          sex: null,
          dob_or_age: null, // saving DOB for big
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
        const chunks = {
          pdf_header: big_pdf_head.first_header,
          personal_info: chunker(
            originalString,
            big_pdf_head.first_header,
            big_pdf_head.description_of_volunteer
          ),
          description_of_volunteer_header:
            big_pdf_head.description_of_volunteer,
          description_of_volunteer: chunker(
            originalString,
            big_pdf_head.description_of_volunteer,
            big_pdf_head.experience_with_children
          ),
          experience_with_children_header:
            big_pdf_head.experience_with_children,
          experience_with_children: chunker(
            originalString,
            big_pdf_head.experience_with_children,
            big_pdf_head.occupational_information
          ),
          occupational_information_header:
            big_pdf_head.occupational_information,
          occupational_information: chunker(
            originalString,
            big_pdf_head.occupational_information,
            big_pdf_head.background_family_relationships
          ),
          background_family_relationships_header:
            big_pdf_head.background_family_relationships,
          background_family_relationships: chunker(
            originalString,
            big_pdf_head.background_family_relationships,
            big_pdf_head.home_environment
          ),
          home_environment_header: big_pdf_head.home_environment,
          home_environment: chunker(
            originalString,
            big_pdf_head.home_environment,
            big_pdf_head.cm_assessment_of_home_environment
          ),
          cm_assessment_of_home_environment_header:
            big_pdf_head.cm_assessment_of_home_environment,
          cm_assessment_of_home_environment: chunker(
            originalString,
            big_pdf_head.cm_assessment_of_home_environment,
            big_pdf_head.close_relationships
          ),
          close_relationships_header: big_pdf_head.close_relationships,
          close_relationships: chunker(
            originalString,
            big_pdf_head.close_relationships,
            big_pdf_head.friends_leisure_time
          ),
          friends_leisure_time_header: big_pdf_head.friends_leisure_time,
          friends_leisure_time: chunker(
            originalString,
            big_pdf_head.friends_leisure_time,
            big_pdf_head.personal_well_being
          ),
          personal_well_being_header: big_pdf_head.personal_well_being,
          personal_well_being: chunker(
            originalString,
            big_pdf_head.personal_well_being,
            big_pdf_head.sexuality
          ),
          sexuality_header: big_pdf_head.sexuality,
          sexuality: chunker(
            originalString,
            big_pdf_head.sexuality,
            big_pdf_head.authorities
          ),
          authorities_header: big_pdf_head.authorities,
          authorities: chunker(
            originalString,
            big_pdf_head.authorities,
            big_pdf_head.match_expectations_and_preferences
          ),
          match_expectations_and_preferences_header:
            big_pdf_head.match_expectations_and_preferences,
          match_expectations_and_preferences: chunker(
            originalString,
            big_pdf_head.match_expectations_and_preferences,
            big_pdf_head.cm_match_recommendation
          ),
          cm_match_recommendation_header: big_pdf_head.cm_match_recommendation,
          cm_match_recommendation: chunker(
            originalString,
            big_pdf_head.cm_match_recommendation,
            big_pdf_head.last_header
          ),
        };

        // console.log(chunks);

        //
        // now the pdf is in chunks, we'll display headers on the client-side. Time to start building the profile object out
        //

        //
        // 1. Get the name
        [profile.first_name, profile.last_name] = chunker(
          chunks.personal_info,
          big_profile_head.name_pre,
          big_profile_head.name_post
        )
          .trim()
          .split(" "); // trim the space from full name and split into array

        //
        // 2. Get the sex
        profile.sex =
          chunker(
            chunks.personal_info,
            big_profile_head.sex_pre,
            big_profile_head.sex_post
          ).trim() === "Male"
            ? 2
            : 1;

        //
        // 3. Get the dob_or_age (this is a Big. We need age)
        profile.dob_or_age = chunker(
          chunks.personal_info,
          big_profile_head.age_pre,
          big_profile_head.age_post
        ).trim();

        //
        // 4. Get the race
        profile.race = chunker(
          chunks.personal_info,
          big_profile_head.race_pre,
          big_profile_head.race_post
        ).trim();

        //
        // 5. Get the address
        profile.address =
          chunker(
            chunks.personal_info,
            big_profile_head.address_pre,
            big_profile_head.address_post
          ).trim() === "49 X X Forest Avenue Kansas City, MO 64110"
            ? // if the dummy pdf is loaded, give a real address for geocoding
              "4037 Forest Avenue Kansas City MO 64110"
            : chunker(
                chunks.personal_info,
                big_profile_head.address_pre,
                big_profile_head.address_post
              ).trim();

        //
        // 6. Get the ems / cm
        profile.ems = chunker(
          chunks.personal_info,
          big_profile_head.ems_pre,
          big_profile_head.ems_post
        ).trim();

        //
        // 7. Get the Big's employer
        profile.b_employer = chunker(
          chunks.personal_info,
          big_profile_head.employer_pre,
          big_profile_head.employer_post
        ).trim();

        //
        // 8. Get the Big's occupation
        profile.b_occupation = chunker(
          chunks.personal_info,
          big_profile_head.occupation_pre,
          big_profile_head.occupation_post
        ).trim();

        //
        // 9. Get the Big's marital status
        profile.b_marital_status = chunker(
          chunks.personal_info,
          big_profile_head.marital_status_pre,
          big_profile_head.marital_status_post
        ).trim();

        //
        // Now let's get the Big's Preferences
        const preferences: BigPreferences = {
          age: bigPreferenceChecker(
            big_preferences_head.age,
            chunks.match_expectations_and_preferences
          ).trim(),
          race:
            bigPreferenceChecker(
              big_preferences_head.race,
              chunks.match_expectations_and_preferences
            ) !== "Open"
              ? bigPreferenceForwardChecker(
                  big_preferences_head.race,
                  chunks.match_expectations_and_preferences
                ).trim()
              : "Open",
          religion: bigPreferenceChecker(
            big_preferences_head.religion,
            chunks.match_expectations_and_preferences
          ).trim(),
          speak_english: bigPreferenceChecker(
            big_preferences_head.speak_english,
            chunks.match_expectations_and_preferences
          ).trim(),
          lvl_of_problems: bigPreferenceChecker(
            big_preferences_head.lvl_of_problems,
            chunks.match_expectations_and_preferences
          ).trim(),
          max_distance_miles: Number(
            chunker(
              chunks.match_expectations_and_preferences,
              big_preferences_head.max_distance_miles,
              big_preferences_head.max_distance_miles_end
            ).trim()
          ),
        };

        // set the preferences on the profile object
        profile.preference = preferences;

        //
        // get the lat & lng from google, and the interests from twin word
        //@ts-ignore
        const key = encodeURIComponent(process.env.API_GMAP);
        const address = encodeURIComponent(profile.address);
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${address}`
          )
          .then((response) => {
            console.log(response.data);
            profile.latitude = response.data.results![0].geometry.location.lat;
            profile.longitude = response.data.results![0].geometry.location.lng;
            console.log(profile);

            // profile is built, save it to db
            const queryText = `INSERT INTO "profile" ("profile_type", "first_name", "last_name", "sex", "dob_or_age", "race", "address", "latitude", "longitude", "ems", "summary", "preference", "interest", "l_parent", "l_parent_relationship_to_child", "b_employer", "b_occupation", "b_marital_status")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id;`;
            const queryData = [
              profile.profile_type,
              profile.first_name,
              profile.last_name,
              profile.sex,
              profile.dob_or_age,
              profile.race,
              profile.address,
              profile.latitude,
              profile.longitude,
              profile.ems,
              chunks,
              profile.preference,
              profile.interest,
              profile.l_parent,
              profile.l_parent_relationship_to_child,
              profile.b_employer,
              profile.b_marital_status,
              profile.b_occupation,
            ];
            pool
              .query(queryText, queryData)
              .then((response) => {
                console.log(response.rows);
                try {
                  res.send(response.rows[0]);
                } catch (error) {
                  throw "Err: no id returned from insert";
                }
              })
              .catch((err) => {
                console.log("Err in INSERT big");

                console.log(err);
                res.sendStatus(500);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (err) {
      console.log("err: no files on req.files", err);
    }
  }
);

export default router;
