import { Message } from "../message";
import { MESSAGE_TYPE } from "../messageTypeService";
import * as angular from "angular";

angular.module("app").component("test", {
  templateUrl: "./test.html",
  bindings: {},
  controller: function (messagesHistoryService) {
    this.$onInit = function () {
      this.messagesHistory = messagesHistoryService;
    };

    this.addErrorMessage = function () {
      const message = new Message("הודעת שגיאה", MESSAGE_TYPE.ERROR);
      this.messagesHistory.addMessage(message);
    };

    this.addSucsessMessage = function () {
      const message = new Message("הודעת הצלחה", MESSAGE_TYPE.SUCCESS);
      this.messagesHistory.addMessage(message);
    };

    this.addLoadingMessage = function () {
      const message = new Message("הודעת טעינה", MESSAGE_TYPE.LOADING);
      this.messagesHistory.addMessage(message);
    };
  },
});
