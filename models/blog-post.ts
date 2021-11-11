export interface BlogPostDetail {
  id: string;
  number: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  labels: { color: string; name: string; id: string }[];
  body: string;
}

export interface BlogPost {
  id: string;
  number: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}
