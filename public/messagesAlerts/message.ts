import { MESSAGE_TYPE } from "./messageTypeService";

export class Message {
  private content: string;
  private type: MESSAGE_TYPE;

  constructor(content: string, type: MESSAGE_TYPE) {
    this.content = content;
    this.type = type;
  }

  public getContent(): string {
    return this.content;
  }

  public getType(): MESSAGE_TYPE {
    return this.type;
  }
}
