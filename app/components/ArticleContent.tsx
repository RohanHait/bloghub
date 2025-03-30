'use client';

import { useEffect, useRef } from 'react';
import CodeBlock from './CodeBlock';

interface ArticleContentProps {
  html: string;
}

export default function ArticleContent({ html }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all code blocks
    const codeBlocks = contentRef.current.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
      const code = block.getAttribute('data-code') || '';
      const language = block.getAttribute('data-language') || 'plaintext';
      
      // Create a new CodeBlock component
      const codeElement = document.createElement('div');
      codeElement.innerHTML = `<pre><code class="language-${language}">${code}</code></pre>`;
      
      // Replace the placeholder with the actual code block
      block.parentNode?.replaceChild(codeElement.firstChild!, block);
    });
  }, [html]);

  return (
    <div 
      ref={contentRef}
      className="prose prose-lg max-w-none text-primary prose-headings:text-primary prose-p:text-secondary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-primary prose-code:text-accent prose-pre:bg-card-bg prose-pre:border prose-pre:border-card-border"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
} 