import escapeStringRegexp from "escape-string-regexp";

/**
 * Returns a Big's preference if the words are on the right side of the checkbox like the "race" preference.
 * @param preferenceHeader The preference header ex "Age:"
 * @param preferenceChunk The MATCH EXPECTATIONS & PREFERENCES chunk
 */
export default function bigPreferenceForwardChecker(
  preferenceHeader: string,
  preferenceChunk: string
): string {
  try {
    const preferenceHeaderEscaped: string = escapeStringRegexp(
      preferenceHeader
    );
    const lineRegex = new RegExp(`(?=${preferenceHeaderEscaped})(.*)`); // grab the preference line
    const forwardRegex = /(?= ☒)(.*)/; // grab the word from the right side of the checkbox

    let result: RegExpMatchArray | null = preferenceChunk.match(lineRegex); // get the line
    console.log(`
    -----------------------------
    PREFERENCES
    lineRegex:
    ${lineRegex}
    `);

    if (result) {
      result = result![0].match(forwardRegex);
      if (!result) throw "Err: nothing on right-hand side of checkbox";
      return result![0].replace("☒", "").trim();
    } else {
      throw "Err: no preference line match";
    }
  } catch (error) {
    return error;
  }
}
