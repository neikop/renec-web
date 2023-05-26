type Video = {
  _id: string;
  url: string;
  title: string;
  authorName: string;
  authorUrl: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
  thumbnailUrl: string;
  html: string;
};

type CreateVideoBody = {
  url: string;
  title?: string;
  authorName?: string;
  authorUrl?: string;
  thumbnailHeight?: number;
  thumbnailWidth?: number;
  thumbnailUrl?: string;
  html?: string;
};

type GetVideoInfoParams = {
  format: string;
  url: string;
};
