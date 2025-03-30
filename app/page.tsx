import Link from 'next/link';
import { getArticles } from '@/app/utils/blog';
import { BlogPost } from '@/app/utils/blogDataTypes';

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <main className="container mx-auto px-4 py-8">
      <section className='max-w-4xl mx-auto'>
        <h1 className="text-4xl font-bold mb-8 text-primary">Latest Blog Posts</h1>
        <div className="flex flex-col gap-4 my-4">
          {articles.map((post: BlogPost) => (
            <article key={post.id} className="card card-hover">
              {post.cover_image && (
                <img 
                  src={post.cover_image} 
                  alt={post.title || 'Blog post cover'}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  <Link 
                    href={post.canonical_url || '#'} 
                    target="_blank" 
                    className="text-primary hover:text-accent transition-colors duration-200"
                  >
                    {post.title || 'Untitled Post'}
                  </Link>
                </h2>
                <p className="text-secondary mb-4 line-clamp-2">{post.description || 'No description available'}</p>
                {post.user && (
                  <div className="flex items-center">
                    <img 
                      src={post.user.profile_image || '/default-avatar.png'} 
                      alt={post.user.name || 'User avatar'}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-primary">{post.user.name || 'Anonymous User'}</p>
                      <p className="text-muted text-sm">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'No date'}
                      </p>
                    </div>
                  </div>
                )}
                {post.tag_list && post.tag_list.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tag_list.slice(0, 2).map((tag: string) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 rounded-full text-sm text-muted bg-hover-bg"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tag_list.length > 2 && (
                      <span className="px-2 py-1 rounded-full text-sm text-muted bg-hover-bg">
                        +{post.tag_list.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
