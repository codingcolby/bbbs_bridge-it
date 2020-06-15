import escapeStringRegexp from "escape-string-regexp";

/**
 * Returns the Big's preference from a checkbox line on summary.
 * @param preferenceHeader The preference header ex "Age:"
 * @param preferenceChunk The MATCH EXPECTATIONS & PREFERENCES chunk
 */
export default function bigPreferenceChecker(
  preferenceHeader: string,
  preferenceChunk: string
): string {
  try {
    const preferenceHeaderEscaped: string = escapeStringRegexp(
      preferenceHeader
    );
    const lineRegex = new RegExp(`(?=${preferenceHeaderEscaped})(.*)`); // grab the preference line
    const colonStopRegex = /(?<=:)(.*?)( ☒)/; // find the checked preference, get the words before it up to the header's ":"
    const emptyBoxRegex = /(?<=☐)(.*?)( ☒)/; // remove any other preference options by stopping at the next "☐"

    let result: RegExpMatchArray | null = preferenceChunk.match(lineRegex);
    console.log(`
    -----------------------------
    PREFERENCES
    lineRegex:
    ${lineRegex}
    `);

    if (result) {
      result = result![0].match(colonStopRegex);
    } else {
      throw "Err: no preference line match";
    }

    if (result) {
      const checkedBackwardResult = result![0].match(emptyBoxRegex);
      if (checkedBackwardResult) {
        return checkedBackwardResult![0].replace("☒", "").trim(); // this match is not the first one
      } else {
        return result![0].replace("☒", "").trim(); // this match would be the first option
      }
    } else {
      throw "Err: no checked box in preference";
    }
  } catch (error) {
    return error;
  }
}
