import { ALARM_TYPE } from "../alartOptionsService";
import * as angular from "angular";

angular.module("app").component("alarm", {
  templateUrl: "./alarm.html",
  bindings: {
    handleAction: "&",
  },
  controller: function (alartOptionsService) {
    this.$onInit = function () {
      this.alarms = alartOptionsService;
      this.onAlarmChanged(ALARM_TYPE.ALL);
    };

    this.openMenu = function ($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    this.onAlarmChanged = function (type: ALARM_TYPE) {
      this.currentIcon = this.alarms.getAlarmIcon(type);
      this.currentTitle = this.alarms.getAlarmTitle(type);
      let numMessages = this.alarms.getAlarmNumMessages(type);
      this.handleAction({ num: numMessages });
    };
  },
});
