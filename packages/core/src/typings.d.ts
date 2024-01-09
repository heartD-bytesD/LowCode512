declare namespace Prop {

  interface CommonProp {
    label: string;
    modifier?: Function;
  }

  interface Input extends CommonProp {
    defVal: string,
    max?: number,
    placeholder?: string,
  }

  interface Color extends CommonProp {
    defVal: string,
  }

  interface Font extends CommonProp {
    defVal: Partial<{
      color: string;
      fontSize: number;
      bold: boolean;
      italic: boolean;
      strike: boolean;
    }>,
  }
}