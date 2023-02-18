import { ChangeEvent, useEffect, useState } from 'react';
import { getSummaryData, transformData } from '../utils/transform-data';
import Table from './table/Table';

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/rainfall');
  const data = await response.json();

  return {
    props: {
      rainfallData: data,
      transformedRainfallData: transformData(data),
    }
  };
}

export default function Index({ rainfallData, transformedRainfallData }) {

  const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    filterOptions(event.target.value);
  };

  const [dataToDisplay, setDataToDisplay] = useState(transformedRainfallData);

  const filterOptions = (value: string) => {
    const optionsToFilter = {...transformedRainfallData};
    value
      ? setDataToDisplay({[value]: optionsToFilter[value]})
      : setDataToDisplay(transformedRainfallData);
  };

  const [summaryData, setSummaryData] = useState(getSummaryData(dataToDisplay));

  useEffect(() => {
    setSummaryData(getSummaryData(dataToDisplay));
  }, [dataToDisplay]);

  return <>
    <label htmlFor="filterInput">Filter by region: </label>
    <select name="regions" id="filterInput" onChange={e => handleFilter(e)}>
      <option value="">Please choose a region</option>
      {
        Object.keys(transformedRainfallData).map((region: string) => {
          return <option value={region} key={region}>{region}</option>}
        )
      }
    </select>

    <Table
      data={rainfallData}
      transformedRainfallData={dataToDisplay}
    />

    <div>
      <p>Summary</p>
      <p>Total rainfall: {summaryData.total}</p>
      <p>Average rainfall: {summaryData.average}</p>
      <p>Number of consecutive days where rainfall exceeds 10mm: {summaryData.daysOver10mm}</p>
    </div>
  </>;
}
