import { ALARM_TYPE } from "../alarmService";
import * as angular from "angular";

angular.module("app").component("messages", {
  templateUrl: "./messages.html",
  bindings: {},
  controller: function(messagesHistory, alarmsService) {
    this.$onInit = function() {
      this.showAllMessages(ALARM_TYPE.ALL);
    };

    this.openMenu = function($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    this.onAlarmChanged = function(type: ALARM_TYPE) {
      this.currentIcon = this.alarmsService.getAlarmIcon(type);
      this.numMessages = this.alarmsService.getAlarmNumMessages(type);
    };
  }
});
