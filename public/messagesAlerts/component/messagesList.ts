import { ALARM_TYPE } from "../alartOptionsService";
import * as angular from "angular";

angular.module("app").component("messagesList", {
  templateUrl: "./messagesList.html",
  bindings: {},
  controller: function (alartOptionsService, messagesHistoryService) {
    this.$onInit = function () {
      this.alarms = alartOptionsService;
      this.messagesHistory = messagesHistoryService;

      this.onAlarmChanged(ALARM_TYPE.ALL);
    };

    this.openMenu = function ($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    this.onAlarmChanged = function (type: ALARM_TYPE) {
      this.currentIcon = this.alarms.getAlarmIcon(type);
      this.numMessages = this.alarms.getAlarmNumMessages(type);
      this.currentTitle = this.alarms.getAlarmTitle(type);
    };
  },
});
