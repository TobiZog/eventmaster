import { BannerStateEnum } from "../enums/bannerStateEnum"

export default class BannerModel {
  show: boolean = false
  bannerState: BannerStateEnum = BannerStateEnum.ERROR
}