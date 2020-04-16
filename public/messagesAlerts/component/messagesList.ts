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
      this.lastMessageStyle = "last-message";
    };

    this.doAction = function (num, type) {
      this.numMessages = num;
      this.currentalarmType = type;
    };

    this.showOnlyAlarm = function () {
      return this.currentalarmType == ALARM_TYPE.NO;
    };

    this.showLastMessage = function () {
      if (this.currentalarmType == ALARM_TYPE.LAST) {
        let numHiddenLoading = this.messagesHistory.getHiddenLoadingMessages()
          .length;

        this.lastMessageContent =
          "ישנם " + numHiddenLoading + " פריטים נוספים בטעינה";

        return numHiddenLoading > 0;
      }
      return false;
    };
  },
});
