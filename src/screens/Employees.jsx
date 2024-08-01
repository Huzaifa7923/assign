import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEmployees } from '../hooks/useEmployee';
import api from '../configs/api';
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const Employees = () => {

  const {
    employees,
    fetchEmployees,
    loading,
    page,
    setPage,
    limit,
    setLimit,
    totalEmployees
  } = useEmployees();

  const deleteHandler = async (employeeId) => {
    try {
      await api.delete(`/employee/${employeeId}`, {
        data: {}
      });
      toast.success('Deleted successfully !')
      await fetchEmployees();
    } catch (error) {
      toast.error('retry again ')
      console.error('Error deleting product:', error);
    }
  }

  if (loading) {
    return <Spinner />
  }

  // console.log('totalEmployees'+JSON.stringify(totalEmployees))
  const totalPages = Math.ceil(totalEmployees / limit);

  return (


    <div className="flex mx-16 flex-col">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-bold">Employee List</h1>
        <Link
          to={'/employee/new'}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Add new employee
        </Link>
      </div>

      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-950 dark:border-gray-950 dark:divide-gray-950">
            <div className="py-3 px-4">

              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-950 dark:divide-gray-950">
                  <thead className="bg-gray-50 dark:bg-gray-950">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Id</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>

                  </thead>
                  <tbody className="divide-y divide-gray-950 dark:divide-gray-950">
                    {employees.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-950">
                          No employees found.
                        </td>
                      </tr>
                    ) : (
                      employees.map((employee) => (
                        <tr key={employee._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-950">
                            {employee.Name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-950">
                            {employee._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-950">
                            {employee.Contact.value}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <Link to={`/employee/${employee._id}`} className="text-blue-600 hover:text-blue-800">
                              View
                            </Link>
                            <button
                              type="button"
                              onClick={() => deleteHandler(employee._id)}
                              className="inline-flex items-center ml-3 gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex justify-evenly items-center mt-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      <div className="">
        <label>
          Employees per page:
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="ml-2 p-2 border rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default Employees

