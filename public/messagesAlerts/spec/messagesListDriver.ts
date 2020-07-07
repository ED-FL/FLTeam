import { BaseDriver } from "../../app/testingUtils/BaseDriver";
import { DriverDependency } from "../../app/testingUtils/DriverDependency";
import { DriverContext } from "../../app/testingUtils/DriverContext";

export class MessagesListDriver extends BaseDriver {
  static dependencies: DriverDependency[] = [];

  constructor(driverContext: DriverContext, component?) {
    super(driverContext, MessagesListDriver, component);
  }

  given = {};

  get = {
    controller: () => this.component.children().scope().$ctrl,
    containerClass:() =>,
    alarmContainerClass:() =>,
    alarmContainerTitle:() =>,
  };

  when = {
    created: () => {
      return this.whenReturnVal;
    },
  };

  private whenReturnVal = { and: this.when, get: this.get };
  private givenReaturnVal = { and: this.given, then: this };
}
