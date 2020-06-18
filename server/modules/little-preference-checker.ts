import escapeStringRegexp from "escape-string-regexp";

/**
 * Returns the Little's preferences. Preferences are text following the head.
 */
export default function littlePreferenceChecker(
  preferenceHeader: string,
  preferenceChunk: string
): string {
  const preferenceHeaderEscaped: string = escapeStringRegexp(preferenceHeader);
  const preferenceRegex = new RegExp(
    `(?<=${preferenceHeaderEscaped}[\\s])(.*)`
  ); // grab the preference line

  let result: RegExpMatchArray | null = preferenceChunk.match(preferenceRegex);
  console.log(`
  -----------------------------
  PREFERENCES
  lineRegex:
  ${preferenceRegex}
  `);

  try {
    if (result) {
      return result![0];
    } else {
      throw "Err: no preference line match";
    }
  } catch (error) {
    return error;
  }
}
