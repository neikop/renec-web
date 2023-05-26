import { client, clientOembed } from './axios';

const fetchVideos = (params: PaginateParams): Promise<PaginateResponse<Video>> => client.get(`/videos`, { params });
const createVideo = (body: CreateVideoBody): Promise<Video> => client.post(`/videos`, body);

const getVideoInfo = (params: GetVideoInfoParams): Promise<Video> => clientOembed.get('/oembed', { params });

const videoService = {
  fetchVideos,
  createVideo,

  getVideoInfo,
};

export default videoService;
