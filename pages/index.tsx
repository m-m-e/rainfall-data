import { useEffect, useState } from 'react';
import Table from './table/Table';
import { RainfallByDate, DateValue } from "./models/rainfall.model";

const transformDate = (dateString: string): string => {
  const date = new Date(dateString).toLocaleDateString();
  return date;
}

const transformData = (data: RainfallByDate[]) => {
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
}

export default function Index() {
  const [rainfallData, setRainfallData] = useState([]);
  const [transformedData, setTransformedData] = useState({});

  const fetchData = async () => {
    const response = await fetch('/api/rainfall');
    const data = await response.json();
    setRainfallData(data);
  };

  useEffect(() => {
    fetchData().then(
      () => {
        const data = transformData(rainfallData)
        setTransformedData(data);
    }
    );

  }, []);

  return <>
    {
      <Table data={transformedData}/>
    }
  </>;
}
