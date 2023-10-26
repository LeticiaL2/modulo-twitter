export class FileBuilder {
  FileAccept: string;
  FileName: string;
  Data: any;
  convertBody: (accept: string, data: any) => any;

  constructor(
    FileAccept: string,
    FileName: string,
    Data: any,
    convertBody: (accept: string, data: any) => any,
  ) {
    this.FileAccept = FileAccept;
    this.FileName = FileName;
    this.Data = Data;
    this.convertBody = convertBody;
  }
}
