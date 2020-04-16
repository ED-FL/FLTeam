import { Message } from "./message";
import { MESSAGE_TYPE } from "./messageTypeService";
import * as angular from "angular";

angular.module("app").service(
  "messagesHistoryService",
  class MessagesHistoryService {
    private messages: Array<Message>;

    constructor() {
      this.messages = new Array<Message>();
    }

    addMessage(message: Message): void {
      if (!message.isFirstMessage()) {
        this.removeIrrelevantMessages(message.getSeriesId());
      }
      this.messages.push(message);
    }

    removeIrrelevantMessages(seriesId: string): void {
      this.messages = this.messages.filter(
        (message) => message.getSeriesId() !== seriesId
      );
    }

    getTopMessages(count: number): Array<Message> {
      let size = this.messages.length - count;
      let topMessages = this.messages.slice(Math.max(size, 0));
      return topMessages.reverse();
    }

    getAllMessages(): Array<Message> {
      return this.messages;
    }

    getMessagesByType(type: MESSAGE_TYPE): Array<Message> {
      return this.messages.filter((message) => message.getType() === type);
    }

    getHiddenLoadingMessages(numShown?: number) {
      let lastElement = numShown ? this.messages.length - numShown : -1;
      let hiddenMessages = this.messages.slice(0, lastElement);
      return hiddenMessages.filter(
        (message) => message.getType() === MESSAGE_TYPE.LOADING
      );
    }
  }
);
