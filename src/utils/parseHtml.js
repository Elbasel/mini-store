import parse from "html-react-parser";
import { sanitize } from "dompurify";

export function parseHtml(html) {
  return parse(sanitize(html));
}
