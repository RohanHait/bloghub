import { BlogPost } from './blogDataTypes';

export class BlogError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'BlogError';
  }
}

export async function getArticles() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch('https://dev.to/api/articles', {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new BlogError(
        `Failed to fetch articles: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new BlogError('Invalid response format: expected an array');
    }

    return data as BlogPost[];
  } catch (error) {
    if (error instanceof BlogError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new BlogError('Request timeout: Failed to fetch articles');
      }
      if (error.name === 'TypeError') {
        throw new BlogError('Network error: Failed to fetch articles');
      }
      throw new BlogError(`Unexpected error: ${error.message}`);
    }

    throw new BlogError('An unknown error occurred while fetching articles');
  }
}