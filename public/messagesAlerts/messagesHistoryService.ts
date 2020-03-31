import { Message } from "./message";
import * as angular from "angular";

angular.module("app").service(
  "messagesHistory",
  class MessagesHistoryService {
    private messages: Array<Message>;

    constructor() {
      this.messages = new Array<Message>();
    }

    addMessage(message: Message): void {
      this.messages.push(message);
    }

    getTopMessages(count: number): Array<Message> {
      let size = this.messages.length - count;
      return this.messages.slice(Math.max(size, 0));
    }

    getAllMessages(): Array<Message> {
      return this.messages;
    }
  }
);
