export interface DriverDependency {
  type: "service" | "component" | "value" | "constant" | "directive";
  name: string;
  mock: any;
}
