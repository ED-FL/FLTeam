import { BaseDriver } from "./BaseDriver";

export class DriverContext {
  // private readonly mockRepository : Dictionery <any> = {};
  // private wasModuleInstantiated : boolean = false;

  constructor(private moduleName: string = "commonModule") {}

  public initModule(driverClass: typeof BaseDriver) {}
}
