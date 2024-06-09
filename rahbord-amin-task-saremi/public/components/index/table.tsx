import React from 'react'
import styled from 'styled-components';

const Table=styled.table`
background-color: #F5F5F5;
color: #000000;
padding: 18px;
width: 100%; /* Ensure the table takes up the full width */
display:table;
white-space: nowrap; 
table-layout: fixed; 
min-width:700px;
  th{
    padding: 0.75rem 1.25rem;
    font-weight: 500;white-space: nowrap;
  }
 tr:nth-child(odd) {
    background-color: #F5F5F5; /* Light Gray */
}

tr:nth-child(even) {
    background-color: #E0E0E0; /* Light Gray - Even */
}
  td:first-child{
    border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;

  }
  td:last-child{
    border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
  }
  td,th{
    padding:0.75rem 1.25rem;
   text-align:center;
   white-space: nowrap; 
   
  }
  thead tr {
    background-color: #CCCCCC !important; /* Light Gray for header */
}

`


const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling */
 
`;
 const CustomTable = () => {
  return (
    <div className=' flex items-center h-full justify-center '>
       
            <TableContainer>
        <Table>
            <thead>
                <tr>
                <th>عنوان</th>
                <th colSpan={3}>توضیحات</th>
                <th>وضعیت</th>
                <th colSpan={2}>عملیات</th>
                </tr>
                
            </thead>
            <tbody>
                <tr>
                 <td>عنوان جون</td>
                 <td colSpan={3}>توضیحات جون</td>
                 <td > وضعیت جون</td>
                 <td colSpan={2}>
                  <button>ویرایش</button>
                  <button>حذف</button>
                 </td>
                </tr>
              
            </tbody>
        </Table>
        </TableContainer>
        </div>
  
  )
}
export default CustomTable