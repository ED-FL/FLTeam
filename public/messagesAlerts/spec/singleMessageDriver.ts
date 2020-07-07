import { BaseDriver } from "../../app/testingUtils/BaseDriver";
import { DriverDependency } from "../../app/testingUtils/DriverDependency";
import { DriverContext } from "../../app/testingUtils/DriverContext";

export class SingleMessageDriver extends BaseDriver {
  static dependencies: DriverDependency[] = [];

  private visibility: string;
  private content: string;
  private icon: string;

  constructor(driverContext: DriverContext, component?) {
    super(driverContext, SingleMessageDriver, component);
  }

  given = {
    visibility: (visibility: string) => {
      this.visibility = visibility;
      return this.givenReaturnVal;
    },
    content: (content: string) => {
      this.content = content;
      return this.givenReaturnVal;
    },
    icon: (icon: string) => {
      this.icon = icon;
      return this.givenReaturnVal;
    },
  };

  get = {
    controller: () => this.component.children().scope().$ctrl,
    messageIcon:() = > ,
    messageContent:() = > ,
    messageClass:() = > 
  };

  when = {
    created: () => {
      return this.whenReturnVal;
    },
  };

  private whenReturnVal = { and: this.when, get: this.get };
  private givenReaturnVal = { and: this.given, then: this };
}
