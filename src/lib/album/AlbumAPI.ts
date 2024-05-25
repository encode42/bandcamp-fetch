import Album from '../types/Album.js';
import { ImageFormat } from '../types/Image.js';
import AlbumInfoParser from './AlbumInfoParser.js';
import Limiter from '../utils/Limiter.js';
import BaseAPIWithImageSupport, { BaseAPIWithImageSupportParams } from '../common/BaseAPIWithImageSupport.js';

interface GetInfoBase {
  albumImageFormat?: string | number | ImageFormat;
  artistImageFormat?: string | number | ImageFormat;
  includeRawData?: boolean;
}

interface GetInfoAlbumUrl extends GetInfoBase {
  albumUrl: string;
}

interface GetInfoUrl extends GetInfoBase {
  url: string;
}

type AlbumAPIGetInfoParams = GetInfoAlbumUrl | GetInfoUrl;

export default class AlbumAPI extends BaseAPIWithImageSupport {

  async getInfo(params: AlbumAPIGetInfoParams): Promise<Album> {
    const imageConstants = await this.imageAPI.getConstants();
    const opts = {
      imageBaseUrl: imageConstants.baseUrl,
      albumImageFormat: await this.imageAPI.getFormat(params.albumImageFormat, 9),
      artistImageFormat: await this.imageAPI.getFormat(params.artistImageFormat, 21),
      includeRawData: params.includeRawData !== undefined ? params.includeRawData : false
    };
    const html = await this.fetch('albumUrl' in params ? params.albumUrl : params.url);
    return AlbumInfoParser.parseInfo(html, opts);
  }
}

export class LimiterAlbumAPI extends AlbumAPI {

  #limiter: Limiter;

  constructor(params: BaseAPIWithImageSupportParams & { limiter: Limiter }) {
    super(params);
    this.#limiter = params.limiter;
  }

  async getInfo(params: AlbumAPIGetInfoParams): Promise<Album> {
    return this.#limiter.schedule(() => super.getInfo(params));
  }
}
