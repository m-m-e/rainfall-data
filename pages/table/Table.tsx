import { useEffect } from "react";

const Table = ({ data }) => {
  useEffect(() => {
    console.log('data', data);
  }, []);
  return (
    <table>
      <caption>Rainfall by region</caption>
      <thead>
        <tr>
          <th scope="col">Region Name</th>
          <th scope="col">Date 1</th>
          <th scope="col">Date 2</th>
          <th scope="col">Date 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Region 1</th>
          <td>date 1 data</td>
          <td>date 2 data</td>
          <td>date 3 data</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table;