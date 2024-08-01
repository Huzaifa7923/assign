import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../configs/api';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner'

const EmployeeProfile = () => {

    const { id } = useParams();

    const [profile, setProfile] = useState();

    const getProfile = async () => {
        const response = await api.get(`/employee/${id}`);
        setProfile(response.data);
    }

    useEffect(() => {
        getProfile();
    }, [id]);

    if (!profile)
        return <Spinner />
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white overflow-hidden shadow rounded-lg w-1/3 border ">
                <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-xl leading-6 font-medium text-gray-900">
                        Employee Profile
                    </h3>

                </div>
                {profile && <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-60 sm:px-6">
                            <dt className="text-base font-medium text-gray-500">
                                Name
                            </dt>
                            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.Name}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-60 sm:px-6">
                            <dt className="text-base font-medium text-gray-500">
                                Contact
                            </dt>
                            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.Contact.value}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-60 sm:px-6">
                            <dt className="text-base font-medium text-gray-500">
                                Address
                            </dt>
                            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.Address.area}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-60 sm:px-6">
                            <dt className="text-base font-medium text-gray-500">
                                City
                            </dt>
                            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.Address.city}
                            </dd>
                        </div>

                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-60 sm:px-6">
                            <dt className="text-base font-medium text-gray-500">
                                Zipcode
                            </dt>
                            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.Address.zipcode}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-60 sm:px-6">
                            <dt className="text-base font-medium text-gray-500">
                                Country
                            </dt>
                            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile.Address.country}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:flex sm:justify-center sm:px-6">
                            <div className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-1 items-center justify-center">
                                <Link to={`/`} className="text-blue-500 hover:text-blue-700">
                                    View All Employee
                                </Link>
                            </div>
                        </div>
                    </dl>

                </div>
                }
            </div>
        </div>
    )
}

export default EmployeeProfile