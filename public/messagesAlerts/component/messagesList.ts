import { MESSAGE_TYPE } from "../messageTypeService";
import { ALARM_TYPE } from "../alartOptionsService";
import * as angular from "angular";

angular.module("app").component("messagesList", {
  templateUrl: "./messagesList.html",
  bindings: {},
  controller: function (messagesHistoryService, messageTypeService) {
    this.$onInit = function () {
      this.messagesHistory = messagesHistoryService;
      this.messageTypes = messageTypeService;
      this.initLastMessage();
    };

    this.initLastMessage = function () {
      this.lastMessageIcon = messageTypeService.getMessageIcon(
        MESSAGE_TYPE.LOADING
      );
      this.lastMessageContent = "שים לב : ישנם פרטים נוספים בטעינה";
      this.lastMessageStyle = "last-message";
    };

    this.doAction = function (num, type) {
      this.numMessages = num;
      this.currentalarmType = type;
    };

    this.showLastMessage = function () {
      return (
        this.currentalarmType == ALARM_TYPE.LAST &&
        this.messagesHistory.getMessagesByType(MESSAGE_TYPE.LOADING).length > 0
      );
    };
  },
});
