import { transformData } from '../utils/transform-data';
import Table from './table/Table';

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/rainfall');
  const data = await response.json();

  return {
    props: {
      rainfallData: transformData(data)
    }
  };
}

export default function Index({ rainfallData }) {

  return <>
    <Table data={rainfallData}/>
  </>;
}
