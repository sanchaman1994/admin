
import "./table.scss";
import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import TableData from "./TableData";



const Table = ({ users, setUser, loading, setLoading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectCheckbox, setSelectCheckbox] = useState([]);
    const rowsInPage = 10;
    // const pages = Math.ceil(users.length / rowsInPage);
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


    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
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
    )
}

export default Table;