"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react'
interface Data {
    ip: string;
    status: boolean;
    userAgent: string;
    session_id: string;
}
const Page = () => {
    const [data, setData] = useState<Data>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}test`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }



    return (
        <div>
            <div>{data?.session_id}</div>
            <div>{data?.userAgent}</div>
            <div>{data?.ip}</div>

        </div>
    )
}

export default Page