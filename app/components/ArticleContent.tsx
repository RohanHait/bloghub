'use client';

import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import './blogContent.css';
interface ArticleContentProps {
  html: string;
}

export default function ArticleContent({ html }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    hljs.highlightAll();
  }, [html]);

  return (
    <div 
      ref={contentRef}
      className="blog-content prose prose-lg max-w-none text-primary prose-headings:text-primary prose-p:text-secondary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-primary prose-code:text-accent prose-pre:bg-card-bg prose-pre:border prose-pre:border-card-border"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
} 