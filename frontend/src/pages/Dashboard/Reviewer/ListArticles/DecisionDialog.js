import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AgreeDialog(props) {
    const {
        handleonclick,
        children,
        className,
        color,
        disabled,
        size,
        variant,
    } = props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const handleOnClickOpen = () => {
        setOpen(true);
    };
    const handleOnClose = () => {
        setOpen(false);
    };
    const handleOnSendPost = () => {
        handleonclick({ message });
        setMessage('');
        setOpen(false);
    };

    const handleOnChange = e => {
        setMessage(e.target.value);
    };

    return (
        <>
            <Button
                onClick={handleOnClickOpen}
                className={className}
                color={color}
                disabled={disabled}
                size={size}
                variant={variant}
            >
                {children}
            </Button>
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={'md'}
                onClose={handleOnClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>
                    GỬI Ý KIẾN PHẢN HỒI
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Nhập phản hồi vào ô bên dưới để gửi đến tác giả.
                    </DialogContentText>
                    <TextField
                        onChange={handleOnChange}
                        margin='dense'
                        multiline
                        rows={12}
                        value={message}
                        id='name'
                        type='email'
                        fullWidth
                        variant='outlined'
                        placeholder='Nhập phản hồi...'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOnClose} color='primary'>
                        Huỷ
                    </Button>
                    <Button onClick={handleOnSendPost} color='primary'>
                        Gửi
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
