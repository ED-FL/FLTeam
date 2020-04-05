import { ALARM_TYPE } from "../alarmService";
import * as angular from "angular";

angular.module("app").component("messages", {
  templateUrl: "./messages.html",
  bindings: {},
  controller: function (alarmsService, messagesHistoryService) {
    this.$onInit = function () {
      this.alarms = alarmsService;
      this.messagesHistory = messagesHistoryService;

      this.onAlarmChanged(ALARM_TYPE.ALL);
    };

    this.openMenu = function ($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    this.onAlarmChanged = function (type: ALARM_TYPE) {
      let enumType = type as ALARM_TYPE;
      this.currentIcon = this.alarms.getAlarmIcon(enumType);
      this.numMessages = this.alarms.getAlarmNumMessages(enumType);
    };
  },
});
