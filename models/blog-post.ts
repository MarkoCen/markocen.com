export interface BlogPost {
  id: string;
  number: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface BlogPostDetail extends BlogPost {
  labels: { color: string; name: string; id: string }[];
  body: string;
  bodyText: string;
}
