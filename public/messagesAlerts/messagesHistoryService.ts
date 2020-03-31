import { Queue } from "queue-typescript";
import { Message } from "./message";

const size: number = 20;

export class MessagesHistoryService {
  private messages: Queue<Message>;

  constructor() {
    this.messages = new Queue<Message>();
  }

  public addMessage(message: Message): void {
    this.messages.enqueue(message);
  }

  public removeMessage(): Message {
    return this.messages.dequeue();
  }

  public getMessages(): Queue<Message> {
    // use size
    return this.messages;
  }
}
