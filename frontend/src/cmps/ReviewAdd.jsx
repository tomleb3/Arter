import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import AddIcon from '@material-ui/icons/Add'
import SendIcon from '@material-ui/icons/Send'
import { Button } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

function getModalStyle() {
    return {
        top: `${50}%`,
        left: `${50}%`,
        transform: `translate(-${50}%, -${50}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export function ReviewAdd({ onAdd }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [ratingValue, setValue] = React.useState(5);
    const textAreaRef = React.createRef()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="flex j-between">
                <h3>Add Review</h3>
                <Rating
                    name="rating"
                    value={ratingValue}
                    onChange={(event, newValue) => {
                        if (newValue) setValue(newValue)
                    }} />
            </div>
            <p>Let your voice be heard</p>
            <textarea autoFocus ref={textAreaRef}></textarea>
            <div className="btns-container right">
                <Button onClick={handleClose}>Close</Button>
                <Button variant="contained" style={{backgroundColor: '#13acca'}} onClick={() => onAdd(textAreaRef.current.value, ratingValue)} endIcon={<SendIcon></SendIcon>}>Post</Button>
            </div>
        </div>
    );

    return (
        <div>
            <AddIcon className="pointer" onClick={handleOpen} />
            <Modal
                className="review-add-modal"
                open={open}
                onClose={handleClose}>
                {body}
            </Modal>
        </div>
    );
}