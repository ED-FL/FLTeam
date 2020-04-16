import { ALARM_TYPE } from "../alartOptionsService";
import * as angular from "angular";

angular.module("app").component("alarm", {
  templateUrl: "./alarm.html",
  bindings: {
    handleAction: "&",
  },
  controller: class Alarm {
    alarms;
    handleAction;
    currentIcon: string;
    currentTitle: string;

    constructor(alartOptionsService) {
      this.alarms = alartOptionsService;
    }
    $onInit() {
      this.onAlarmChanged(ALARM_TYPE.ALL);
    }

    private openMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    }

    public onAlarmChanged(type: ALARM_TYPE) {
      this.currentIcon = this.alarms.getAlarmIcon(type);
      this.currentTitle = this.alarms.getAlarmTitle(type);
      let numMessages = this.alarms.getAlarmNumMessages(type);
      this.handleAction({ num: numMessages, type: type });
    }
  },
});
