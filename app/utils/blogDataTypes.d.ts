export interface BlogPost {
    id: number;
    type_of?: string;
    title?: string;
    description?: string;
    user?: {
      name?: string;
      username?: string;
      twitter_username?: string | null;
      github_username?: string | null;
      website_url?: string | null;
      profile_image?: string;
      profile_image_90?: string;
    };
    cover_image?: string | null;
    readable_publish_date?: string;
    social_image?: string | null;
    tag_list?: string[];
    tags?: string;
    slug?: string;
    path?: string;
    canonical_url?: string;
    positive_reactions_count?: number;
    public_reactions_count?: number;
    created_at?: string;
    edited_at?: string | null;
    crossposted_at?: string | null;
    published_at?: string;
    last_comment_at?: string;
    published_timestamp?: string;
    reading_time_minutes?: number;
  }
  