import { MESSAGE_TYPE } from "./messageTypeService";
import { Guid } from "guid-typescript";

export class Message {
  private content: string;
  private type: MESSAGE_TYPE;
  private seriesId: string;
  private isFirstInSeries: boolean;

  constructor(content: string, type: MESSAGE_TYPE, seriesId?: string) {
    this.content = content;
    this.type = type;

    if (seriesId) {
      this.seriesId = seriesId;
      this.isFirstInSeries = false;
    } else {
      this.seriesId = Guid.create().toString();
      this.isFirstInSeries = true;
    }
  }

  public getContent(): string {
    return this.content;
  }

  public getType(): MESSAGE_TYPE {
    return this.type;
  }

  public getSeriesId(): string {
    return this.seriesId;
  }

  public isFirstMessage() {
    return this.isFirstInSeries;
  }
}
