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
      const message = new Message("error message", MESSAGE_TYPE.ERROR);
      this.messagesHistory.addMessage(message);
    };

    this.addSucsessMessage = function () {
      const message = new Message("success message", MESSAGE_TYPE.SUCCESS);
      this.messagesHistory.addMessage(message);
    };

    this.addLoadingMessage = function () {
      const message = new Message("loading message", MESSAGE_TYPE.LOADING);
      this.messagesHistory.addMessage(message);
    };
  },
});
