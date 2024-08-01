import React, { useState } from 'react'
import api from '../configs/api'
import { useNavigate } from 'react-router-dom'
import { useEmployees } from '../hooks/useEmployee'
import { toast } from 'react-toastify'

const AddEmployee = () => {

    const navigate = useNavigate();

    const { fetchEmployees } = useEmployees();

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState({
        area: "",
        city: "",
        country: "",
        zipcode: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const formHandler = async (e) => {
        e.preventDefault();
        try {
            const isEmail = contact.includes('@') && contact.endsWith('.com');
            const isPhone = /^[0-9]*$/.test(contact);

            if (!name || !contact || !address || (!isEmail && !isPhone)) {
                toast.error('Please fill all the details with given format! ')
            } else {


                const employee = {
                    Name: name,
                    Address: {
                        area: address.area,
                        city: address.city,
                        country: address.city,
                        zipcode: address.zipcode
                    },
                    Contact: {
                        isEmail,
                        isPhone: !isEmail,
                        value: contact,
                    }
                }

                // console.log(JSON.stringify(employee));

                await api.post('/employee', employee);
                toast.success('Employee added')
                navigate('/');
                await fetchEmployees();
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#07074D]">Enter details of employee</h2>
                <form onSubmit={formHandler}>
                    <div className="mb-5">
                        <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                            Full Name
                        </label>
                        <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} placeholder="Full Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                            Contact Details
                        </label>
                        <input type="text" name="phone" value={contact} id="contact" onChange={(e) => setContact(e.target.value)} placeholder="Enter your phone number or email"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>


                    <div className="mb-5 pt-3">
                        <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                            Address
                        </label>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <input type="text" name="area" value={address.area} onChange={handleChange} id="area" placeholder="Enter area"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <input type="text" name="city" id="city" value={address.city} onChange={handleChange} placeholder="Enter city"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <input type="text" name="country" id="country" value={address.country} onChange={handleChange} placeholder="Enter country"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <input type="text" name="zipcode" id="" value={address.zipcode} onChange={handleChange} placeholder="Zip Code"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type='submit'
                            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee