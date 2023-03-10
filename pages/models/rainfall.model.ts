export interface RainfallByDate {
  date: string,
  data: RegionData[]
};

export interface RegionData {
  regionName: string,
  value: number
};

export interface RainfallData {
  region: DateValue[]
};

export interface DateValue {
  date: string,
  value: number
};

export interface RainfallSummary {
  total: number,
  average: number,
  daysOver10mm: number
};
