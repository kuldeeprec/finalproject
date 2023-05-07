import { React, useEffect, useState } from "react";
// import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import { toast } from "react-toastify";

const Comment = (props) => {

    const [comment, setComment] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetch_comment = async () => {
        const response = await fetch(
            `http://localhost:5000/api/file/fetchcomment`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: props.id })
            }
        );
        const json = await response.json();
        setComment(json);
        console.log(json, "comment_data");
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        fetch_comment();
    }, []);
    return (
        <div>
            <div><p style={{ fontWeight: "bold" }}>{comment[0]?.comment_by} - </p> <p>{comment[0]?.comment}</p></div>
            <Button style={{ color: "black", fontWeight: "bold" }} onClick={handleOpen}>Show Comments...</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Comments -
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {comment.length == 0 && <p>No Comments...</p>}
                        {comment.map((item, index) => (
                            <div><p style={{ fontWeight: "bold" }}>{item.comment_by} - </p> <p>{item.comment}</p></div>
                        ))}
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Comment

