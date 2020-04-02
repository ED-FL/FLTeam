import { ALARM_TYPE } from "../alarmService";
import * as angular from "angular";

angular.module("app").component("messages", {
  templateUrl: "./messages.html",
  bindings: {},
  controller: function(messagesHistory, alarmsService) {
    this.$onInit = function() {
      this.enumAlarm = ALARM_TYPE;
      this.showAllMessages(ALARM_TYPE.ALL);
    };

    this.openMenu = function($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    this.showMessages = function(type: ALARM_TYPE) {
      this.currentIcon = this.alarmsService.getAlarmIcon(type);
      this.numMessages = this.alarmsService.getAlarmNumMessages(type);
    };
  }
});
