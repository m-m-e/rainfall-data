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
