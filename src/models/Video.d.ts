type Video = {
  id: string;
  name: string;
  url: string;
};

type FetchVideoParams = {
  type: AreaType;
  parentId?: number;
  size?: number;
};

type CreateVideoBody = VideoInfo & {
  url: string;
};

type GetVideoInfoParams = {
  format: string;
  url: string;
};

type VideoInfo = {
  title: string;
  authorName: string;
  authorUrl: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
  thumbnailUrl: string;
  html: string;
};
