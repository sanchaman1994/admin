
import "./table.scss";
import { useState } from "react";
import { Box, CircularProgress, } from "@mui/material";
import TableData from "./TableData";
import Pagination from "../pagination/Pagination";;


const Table = ({ users, setUser, loading, setLoading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectCheckbox, setSelectCheckbox] = useState([]);
    const [selectAllUser, setSelectAllUser] = useState(false);

    const rowsInPage = 10;
    const pages = Math.ceil(users.length / rowsInPage);
    const startIndex = (currentPage - 1) * rowsInPage;
    const endIndex = startIndex + rowsInPage;
    const rowsToShow = users.slice(startIndex, endIndex);

    const handleChange = (event, userId) => {
        setUser((prevValues) =>
            prevValues.map((user) =>
                user.id === userId
                    ? { ...user, [event.target.name]: event.target.value }
                    : user
            )
        );
    };

    const handleDeleteUser = (userId) => {
        setLoading(true);
        setUser((prevUser) => prevUser.filter((user) => user.id !== userId));
        setLoading(false);
    };

    const handleSelectUser = (userId) => {
        let arr = [];
        if (selectCheckbox.includes(userId)) {
            arr = selectCheckbox.filter((user) => {
                return user !== userId;
            });
        } else {
            arr = [...selectCheckbox, userId];
        }

        setSelectCheckbox(arr);
    };

    const deleteMultiple = () => {
        setLoading(true);
        setSelectAllUser(false);
        for (let i = 0; i < selectCheckbox.length; i++) {
            handleDeleteUser(selectCheckbox[i]);
        }
        setLoading(false);
    };

    const selectAll = () => {
        if (selectCheckbox.length !== 10) {
            setSelectAllUser(true);
            setSelectCheckbox(
                rowsToShow.map((user) => {
                    return user.id;
                })
            );
        } else {
            setSelectAllUser(false);
            setSelectCheckbox([]);
        }
        setLoading(false);
    };


    return (
        <>

            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" onChange={selectAll} /></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <Box position={"absolute"} top={"40vh"} left={"50%"}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            rowsToShow.map((user, index) => (
                                <TableData key={index}
                                    user={user}
                                    deleteUser={handleDeleteUser}
                                    selectUser={() => handleSelectUser(user.id)}
                                    checked={selectCheckbox.includes(user.id)}
                                    handleChange={handleChange} />
                            )))}
                    </tbody>

                </table>

            </div>
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} deleteMultiple={deleteMultiple} />
        </>
    )
}

export default Table;