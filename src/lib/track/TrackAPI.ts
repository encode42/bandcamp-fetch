import BaseAPIWithImageSupport, { BaseAPIWithImageSupportParams } from '../common/BaseAPIWithImageSupport.js';
import { ImageFormat } from '../types/Image.js';
import Track from '../types/Track.js';
import Limiter from '../utils/Limiter.js';
import TrackInfoParser from './TrackInfoParser.js';

interface GetInfoBase {
  albumImageFormat?: string | number | ImageFormat;
  artistImageFormat?: string | number | ImageFormat;
  includeRawData?: boolean;
}

interface GetInfoTrackUrl extends GetInfoBase {
  trackUrl: string;
}

interface GetInfoUrl extends GetInfoBase {
  url: string;
}

export type TrackAPIGetInfoParams = GetInfoTrackUrl | GetInfoUrl;

export default class TrackAPI extends BaseAPIWithImageSupport {
  async getInfo(params: TrackAPIGetInfoParams): Promise<Track> {
    const imageConstants = await this.imageAPI.getConstants();
    const trackUrl = 'trackUrl' in params ? params.trackUrl : params.url;
    const opts = {
      trackUrl,
      imageBaseUrl: imageConstants.baseUrl,
      albumImageFormat: await this.imageAPI.getFormat(params.albumImageFormat, 9),
      artistImageFormat: await this.imageAPI.getFormat(params.artistImageFormat, 21),
      includeRawData: params.includeRawData !== undefined ? params.includeRawData : false
    };
    const html = await this.fetch(trackUrl);
    return TrackInfoParser.parseInfo(html, opts);
  }
}

export class LimiterTrackAPI extends TrackAPI {

  #limiter: Limiter;

  constructor(params: BaseAPIWithImageSupportParams & { limiter: Limiter }) {
    super(params);
    this.#limiter = params.limiter;
  }
  async getInfo(params: TrackAPIGetInfoParams): Promise<Track> {
    return this.#limiter.schedule(() => super.getInfo(params));
  }
}
