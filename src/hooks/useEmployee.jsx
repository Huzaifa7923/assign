// useEmployees.js
import { useEffect } from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import api from '../configs/api';
import { toast } from 'react-toastify';


export const useEmployees = () => {
  const {
    employees, setEmployees,
    setLoading, loading,
    page, setPage,
    limit, setLimit,
    totalEmployees, setTotalEmployees
  } = useEmployeeContext();



  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const offset = (page - 1) * limit;
      const response = await api.get(`/employee?limit=${limit}&offset=${offset}`);
      // console.log(response.data.data)
      setEmployees(response.data.data);
      // console.log(response);
      // console.log(response.data);
      // console.log(response.data.page.total);
      setTotalEmployees(response.data.page.total);
      setLoading(false);
    } catch (error) {
      toast.error('error while fetching')
      console.error('Error fetching Employees:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect')
    fetchEmployees();
  }, [page, limit]);

  return { employees, setEmployees, fetchEmployees, loading, page, setPage, limit, setLimit, totalEmployees };
};