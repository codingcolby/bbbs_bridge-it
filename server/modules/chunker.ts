/**
 * Returns text from between 2 pdf summary headers.
 * @param pdf_text pdf document text (after parsed)
 * @param header_1 header before the chunk of text to select
 * @param header_2 header after the chunk of text to select
 */
export default function chunker(
  pdf_text: string,
  header_1: string,
  header_2: string
) {
  // example regex for text between headings: /(?<=DESCRIPTION OF VOLUNTEER:[\n | \r])(.*[\s\S]*?)(?=EXPERIENCE WITH CHILDREN)/gm
  // that regex gets the Big's description
  const regexp = new RegExp(
    `(?<=${header_1}[\n | \r])(.*[\s\S]*?)(?=${header_2})`,
    "gm"
  );
  return pdf_text.match(regexp)[0]; // match returns array, get the first match & return
}
