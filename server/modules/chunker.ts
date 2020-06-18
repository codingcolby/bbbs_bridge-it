import escapeStringRegexp from "escape-string-regexp";
/**
 * Returns text from between 2 pdf summary headers.
 * @param pdf_text pdf document text (after parsed)
 * @param header_1 header before the chunk of text to select
 * @param header_2 header after the chunk of text to select
 */
export default function chunker(
  pdf_text: string,
  header_1: string,
  header_2: string,
  altMode: boolean = false
): string {
  // example regex for text between headings: /(?<=DESCRIPTION OF VOLUNTEER:[\n | \r])(.*[\s\S]*?)(?=EXPERIENCE WITH CHILDREN)/gm
  // that regex gets the Big's description
  try {
    const header_1_escaped: string = escapeStringRegexp(header_1);
    const header_2_escaped: string = escapeStringRegexp(header_2);

    let regexp;
    if (altMode) {
      regexp = new RegExp(
        `(?<=${header_1_escaped})(.*[\\s\\S]*?)(?=${header_2_escaped})`,
        "g"
      );
    } else {
      regexp = new RegExp(
        `(?<=${header_1_escaped}[\n \r])(.*[\\s\\S]*?)(?=${header_2_escaped})`,
        "gm"
      );
    }
    const result: RegExpMatchArray | null = pdf_text.match(regexp); // match returns array, get the first match & return

    console.log(`
      -------------------------------
      HEADER 1:
      ${header_1_escaped}

      HEADER 2:
      ${header_2_escaped}

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
