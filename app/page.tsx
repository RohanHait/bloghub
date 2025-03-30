import Link from 'next/link';
import { getArticles } from '@/app/utils/blog';
import { BlogPost } from '@/app/utils/blogDataTypes';

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {articles.map((post: BlogPost) => (
          <article key={post.id} className="border rounded-lg overflow-hidden shadow-lg">
            {post.cover_image && (
              <img 
                src={post.cover_image} 
                alt={post.title || 'Blog post cover'}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                <Link 
                  href={post.canonical_url || '#'} 
                  target="_blank" 
                  className="hover:text-blue-600"
                >
                  {post.title || 'Untitled Post'}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.description || 'No description available'}</p>
              {post.user && (
                <div className="flex items-center">
                  <img 
                    src={post.user.profile_image || '/default-avatar.png'} 
                    alt={post.user.name || 'User avatar'}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{post.user.name || 'Anonymous User'}</p>
                    <p className="text-gray-500 text-sm">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'No date'}
                    </p>
                  </div>
                </div>
              )}
              {post.tag_list && post.tag_list.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tag_list.map((tag: string) => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
