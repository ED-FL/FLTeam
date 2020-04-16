import * as angular from "angular";

export enum ALARM_TYPE {
  LAST,
  NO,
  ALL,
}

const alarms = {
  [ALARM_TYPE.ALL]: {
    icon: "alarm_add",
    numMessages: 7,
    title: "כל ההתרעות",
  },
  [ALARM_TYPE.NO]: {
    icon: "alarm_off",
    numMessages: 0,
    title: "ללא התרעות",
  },
  [ALARM_TYPE.LAST]: {
    icon: "alarm",
    numMessages: 1,
    title: "התראה אחרונה",
  },
};

angular.module("app").service(
  "alartOptionsService",
  class AlartOptionsService {
    public getAlarms() {
      return [ALARM_TYPE.ALL, ALARM_TYPE.LAST, ALARM_TYPE.NO];
    }

    public getAlarmIcon(type: ALARM_TYPE) {
      return alarms[type].icon;
    }

    public getAlarmNumMessages(type: ALARM_TYPE) {
      return alarms[type].numMessages;
    }

    public getAlarmTitle(type: ALARM_TYPE) {
      return alarms[type].title;
    }
  }
);
