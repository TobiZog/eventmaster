export class FilesApiModel {
  name: string
  size: number
  content: string
  url: string
  copyright: CopyRightModel = new CopyRightModel()
}

class CopyRightModel {
  license: string = ""
  creator: string = ""
  url: string = ""
}