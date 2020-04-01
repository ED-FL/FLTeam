import { Message } from "../message";
import { Queue } from "queue-typescript";
import * as angular from "angular";

const ALARMS_ICONS = {
  LAST_ALARM: "alarm",
  NO_ALARMS: "alarm_off",
  ALL_ALARMS: "alarm_add"
};

angular.module("app").component("messages", {
  templateUrl: "./messages.html",
  bindings: {},
  controller: function() {
    this.currentIcon = ALARMS_ICONS.LAST_ALARM;
    this.currentMessages;

    this.$onInit = function() {
      this.currentMessages = new Queue<Message>();
    };

    this.openMenu = function($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    this.showLastMessage = function() {
      this.currentIcon = ALARMS_ICONS.LAST_ALARM;
    };
    this.showAllMessages = function() {
      this.currentIcon = ALARMS_ICONS.ALL_ALARMS;
    };
    this.dontShowMessages = function() {
      this.currentIcon = ALARMS_ICONS.NO_ALARMS;
    };

    this.addMessage = function(message: Message) {
      this.currentMessages.enqueue(message);
    };

    this.removeMessage = function() {
      this.currentMessages.dequeue();
    };
  }
});
