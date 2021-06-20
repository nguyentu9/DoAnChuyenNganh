import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function PublishArticleDialog(props) {
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
    const handleOnClickOpen = () => {
        setOpen(true);
    };
    const handleOnClose = () => {
        setOpen(false);
    };
    const handleOnSendPost = () => {
        handleonclick();
        setOpen(false);
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
                onClose={handleOnClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>
                    XUẤT BẢN BÀI BÁO
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xuất bản ?
                    </DialogContentText>
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
