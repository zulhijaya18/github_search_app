import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
  language?: string;
  code: string;
}
export const CodeBlock = ({ language, code }: CodeBlockProps) => (
  <SyntaxHighlighter
    style={vscDarkPlus}
    language={language || "text"}
    wrapLines
    wrapLongLines
  >
    {code}
  </SyntaxHighlighter>
);
