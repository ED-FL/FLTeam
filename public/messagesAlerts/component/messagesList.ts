import { MESSAGE_TYPE } from "../messageTypeService";
import * as angular from "angular";

angular.module("app").component("messagesList", {
  templateUrl: "./messagesList.html",
  bindings: {},
  controller: function (messagesHistoryService) {
    this.$onInit = function () {
      this.messagesHistory = messagesHistoryService;
    };

    this.doAction = function (num) {
      this.numMessages = num;
    };

    this.hasLoading = function () {
      return (
        this.messagesHistory.getMessagesByType(MESSAGE_TYPE.LOADING).length > 0
      );
    };
  },
});
