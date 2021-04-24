type Flavor = "pink" | "green" | "blue" | "white" | "brown";

type ScoopList = Flavor[];

type ConesState = {
  [coneId: string]: string[];
};

type OrdersState = {
  [coneId: string]: ScoopList;
};
