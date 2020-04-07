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
      const errorMessage = new Message("הודעת שגיאה", MESSAGE_TYPE.ERROR);
      this.messagesHistory.addMessage(errorMessage);
    };

    this.addSucsessMessage = function () {
      const sucsessMessage = new Message("הודעת הצלחה", MESSAGE_TYPE.SUCCESS);
      this.messagesHistory.addMessage(sucsessMessage);
    };

    this.addLoadingMessage = function () {
      const loadingMessage = new Message("הודעת טעינה", MESSAGE_TYPE.LOADING);
      this.messagesHistory.addMessage(loadingMessage);
    };
  },
});
