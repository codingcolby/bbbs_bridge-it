import * as big_head from "../constants/headers/pdf.big.json";
import escapeStringRegexp from "escape-string-regexp";

/**
 * Returns just the cm match recommendation text.
 * @param cm_match_recommendation The CM Match recommendation chunk from a Big's pdf.
 */
export default function (cm_match_recommendation: string): string {
  try {
    const oneLine = cm_match_recommendation.replace(/\r?\n|\r/g, ""); // replace newlines w/ spaces
    const regexp = new RegExp(
      `(?<=${escapeStringRegexp(
        big_head.cm_match_recommendation_helper
      )})([\\s\\S]*)`
    );

    const result: RegExpMatchArray | null = oneLine.match(regexp);
    console.log(`
    -------------------------------
    TEXT:
    ${oneLine}

    REGEX:
    ${regexp}

    RESULT:
    ${result}
    `);

    if (!result) throw "Err: no match between headers";
    const resultString = String(result);
    return resultString;
  } catch (error) {
    return error;
  }
}
