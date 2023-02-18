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
    <h1 className="title">Rainfall</h1>
    <div className="filter-container">
      <label htmlFor="filterInput">Filter by region: </label>
      <select name="regions" id="filterInput" onChange={e => handleFilter(e)}>
        <option value="">Please choose a region</option>
        {
          Object.keys(transformedRainfallData).map((region: string) => {
            return <option value={region} key={region}>{region}</option>}
          )
        }
      </select>
    </div>

    <Table
      data={rainfallData}
      transformedRainfallData={dataToDisplay}
    />

    <div className="summary-container">
      <p className="summary-title">Summary</p>
      <p>Total rainfall:
        <span className="summary-value"> {summaryData.total}</span>
      </p>
      <p>Average rainfall:
        <span className="summary-value"> {summaryData.average}</span>
      </p>
      <p>Number of consecutive days where rainfall exceeds 10mm:
        <span className="summary-value"> {summaryData.daysOver10mm}</span>
      </p>
    </div>
  </>;
}
