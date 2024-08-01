import React, { createContext, useState, useContext } from 'react';

const EmployeeContext=createContext();

export const EmployeeProvider=({children})=>{
  const [employees,setEmployees]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalEmployees,setTotalEmployees]=useState(0);

  return (
    <EmployeeContext.Provider value={{employees,setEmployees,loading,setLoading,page, setPage,
      limit, setLimit,
      totalEmployees, setTotalEmployees}}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployeeContext=()=>useContext(EmployeeContext);