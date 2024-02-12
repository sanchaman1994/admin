import React, { useEffect, useState } from 'react'
import Search from '../search/Search'
import Table from "../table/Table";
import Pagination from "../pagination/Pagination";
import axios from 'axios';
import "./dashboard.css";


const Dashboard = () => {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchUsers = async () => {
        const data = await axios.get(
            "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setUser(data.data);
        setLoading(false);
        return data.data;
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='Dashboard'>
            <Search users={users} setUser={setUser} setLoading={setLoading} fetchUsers={fetchUsers} />
            <Table users={users} setUser={setUser} loading={loading} setLoading={setLoading} />
            <Pagination />
        </div>
    )
}

export default Dashboard