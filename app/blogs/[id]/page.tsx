import { getArticle } from '@/app/utils/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleContent from '@/app/components/ArticleContent';

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { id } = await params;
    const article = await getArticle(parseInt(id));

    // Helper function to get tags array
    const getTags = (tagList: string | string[] | undefined): string[] => {
      if (!tagList) return [];
      if (typeof tagList === 'string') {
        // If it's a comma-separated string, split it
        return tagList.split(',').map(tag => tag.trim()).filter(Boolean);
      }
      return tagList;
    };

    const tags = getTags(article.tag_list);

    return (
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center text-secondary hover:text-primary mb-8 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">{article.title}</h1>
            {article.user && (
              <div className="flex items-center mb-4">
                <img
                  src={article.user.profile_image || '/default-avatar.png'}
                  alt={article.user.name || 'User avatar'}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium text-primary">{article.user.name}</p>
                  <p className="text-muted text-sm">
                    {article.published_at ? new Date(article.published_at).toLocaleDateString() : 'No date'}
                  </p>
                </div>
              </div>
            )}
            {article.cover_image && (
              <img
                src={article.cover_image}
                alt={article.title || 'Article cover'}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm text-muted bg-hover-bg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <ArticleContent html={article.body_html || ''} />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-secondary hover:text-primary transition-colors duration-200">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {article.positive_reactions_count || 0} Likes
                </button>
                <button className="flex items-center text-secondary hover:text-primary transition-colors duration-200">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {article.public_reactions_count || 0} Comments
                </button>
              </div>
              <div className="flex items-center text-secondary">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {article.reading_time_minutes || 5} min read
              </div>
            </div>
          </footer>
        </article>
      </main>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
}
