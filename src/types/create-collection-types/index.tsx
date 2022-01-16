export interface Rarity {
  id: string;
  name: string;
  limit: number;
  value_temporary?: RarityValue;
  [key: string]: any;
}

export interface RarityValue {
  [key: string]: string;
}

export interface MintParam {
  name: string;
  type: string;
  minValue: number;
  maxValue: number;
}

export interface MintEnum {
  name: string;
  type: string;
  enumVariants: string[];
}

export interface MintDesc {
  name: string;
  limit: number;
  icon: string;
}

export interface IntAndStrParam extends MintParam{
  paramId: string;
}
