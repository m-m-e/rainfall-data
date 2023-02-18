import { transformData } from '../utils/transform-data';
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

  return <>
    <Table
      data={rainfallData}
      transformedRainfallData={transformedRainfallData}
    />
  </>;
}
