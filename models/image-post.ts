export interface ImagePost {
  id: string;
  number: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
}

export interface ImagePostDetail extends ImagePost {
  labels: { color: string; name: string; id: string }[];
  body: string;
  bodyText: string;
}
