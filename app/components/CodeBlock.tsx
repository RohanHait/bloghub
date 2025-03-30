'use client';

import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'plaintext' }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <pre className="relative rounded-lg overflow-hidden">
      <code
        ref={codeRef}
        className={`language-${language} block p-4 overflow-x-auto`}
      >
        {code}
      </code>
    </pre>
  );
} 