import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./table.scss";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

const TableData = ({ user, deleteUser, checked, selectUser, handleChange }) => {

    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <tr>
                <td>
                    <input type="checkbox" onChange={selectUser} checked={checked} />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <EditIcon sx={{
                        color: "rgb(7, 81, 165)", cursor: "pointer"
                    }} onClick={handleOpen} />
                    <DeleteIcon className="deleteBtn" sx={{ color: "red", cursor: "pointer" }} onClick={() => deleteUser(user.id)} />
                </td>
            </tr>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: isMobile ? "80%" : 400,
                            bgcolor: "background.paper",
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <input
                            className="editUser"
                            name="name"
                            value={user.name}
                            onChange={(e) => handleChange(e, user.id)}
                        />
                        <input
                            className="editUser"
                            name="email"
                            value={user.email}
                            onChange={(e) => handleChange(e, user.id)}
                        />
                        <input
                            className="editUser"
                            name="role"
                            value={user.role}
                            onChange={(e) => handleChange(e, user.id)}
                        />

                        <div className="editButton" onClick={handleClose}>
                            Update
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default TableData