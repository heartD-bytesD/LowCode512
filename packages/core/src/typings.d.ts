declare namespace FormMap {
  interface CommonProp {
    label: string;
    modifier?: Function;
  }
  
  interface Input extends CommonProp {
    defVal: string,
    max?: number,
    placeholder?: string,
  }
}