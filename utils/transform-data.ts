import { DateValue, RainfallByDate } from "../pages/models/rainfall.model";
import { transformDate } from "./date-utils";

export const transformData = (data: RainfallByDate[]) => {
  let newData = {};
  let midwayArray = [];

  data.forEach((rainfallByDate: RainfallByDate) => {
    rainfallByDate.data.forEach(data => {
      midwayArray.push({ region: data.regionName, date: transformDate(rainfallByDate.date), value: data.value});
    });
  });
  const regions = midwayArray.map(element => element.region);
  const filteredRegions = [];
  regions.forEach(region => {
    !filteredRegions.includes(region) && filteredRegions.push(region);
  });
  filteredRegions.forEach(region => {
    const regionData: DateValue[] = [];
    const foundData = midwayArray.filter(item => item.region === region);
    foundData.forEach(data => {
      const dataToAdd = {
          date: data.date,
          value: data.value
        };
      regionData.push(dataToAdd);
    });
    newData[region] = regionData;
  })
  return newData;
};

export const getSummaryData = (rainfallData) => {
  let total = 0;
  let numberOfDays = 0;
  let over10Count = 0;

  Object.values(rainfallData).forEach((dateList: DateValue[]) => {
    dateList.forEach((date: DateValue) => {
      total += date.value;
      numberOfDays ++;
      date.value > 10 && over10Count++;
    });
  });
  const average = Math.floor(total / numberOfDays);

  return { total, average, daysOver10mm: over10Count };
}