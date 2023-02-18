import { useEffect, useState } from "react";
import { transformDate } from "../../utils/date-utils";
import { RainfallByDate } from "../models/rainfall.model";

const Table = ({ data, transformedRainfallData }) => {
  const [dates, setDates] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setDates(data.map((date: RainfallByDate) => transformDate(date.date)));
    const rowData = Object.entries(transformedRainfallData).map((data: [region: string, data: {date: string, value: number}[]], index) => {
      return (
        <tr key={ data[0] + index }>
          <>
            <th scope="row">{data[0]}</th>
            { data[1].map(cellData => <td key={data[0] + cellData.date}>{cellData.value}</td>) }
          </>
        </tr>
      )
    })
    setTableData(rowData);
  }, []);
  return (
    <table>
      <caption>Rainfall by region</caption>
      <thead>
        <tr>
          <th scope="col">Region Name</th>
          {
            dates.map((date, index) => <th scope="col" key={index + '-' + date}>{ date }</th>)
          }
        </tr>
      </thead>
      <tbody>
          { tableData }
      </tbody>
    </table>
  )
}

export default Table;