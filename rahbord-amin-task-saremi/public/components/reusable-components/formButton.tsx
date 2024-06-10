import React, { ReactNode } from 'react'
import styled from 'styled-components'
const Button=styled.button`
background-color: #007BFF;
color: white;
border: none;
padding: 10px 20px;
cursor: pointer;
font-size: 16px;
border-radius: 5px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
transition: background-color 0.3s ease, box-shadow 0.3s ease; 
&:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
}
`;


interface props{

    onClick?:()=>void,
    type?:"submit"|"reset"|"button",
    children:ReactNode
}
 const FormButton = ({onClick,type="button",children}:props) => {
  return (
  <>
  <Button
  type={type}
  onClick={onClick}>{children}</Button>
  </>
  )
}
export default FormButton
