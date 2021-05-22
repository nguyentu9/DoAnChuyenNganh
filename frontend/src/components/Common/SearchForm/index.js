import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';



function SearchForm() {

    const token = useSelector(state => state.auth.token);
    const [openDialog, setOpenDialog] = useState(false);

    function handleSendPost() {
        if (token) {
            return <Redirect to='/tac-gia' />
        }
        setOpenDialog(true);
    }
    function handleOpen() {
        setOpenDialog(true);
        if (token != null) {
            <Redirect to='/tac-gia' />
        }
    }
    function handleClose() {
        setOpenDialog(false);
    }

    return (
        <Paper style={{ padding: '1rem' }} elevation={2}>
            <Grid item>
                <Button
                    onClick={handleOpen}
                    variant="contained"
                    fullWidth
                    size="large"
                    color="primary"
                    style={{ height: '3rem', marginBottom: '1rem', fontSize: '1.2rem' }}>
                    Gửi bài
                </Button>
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Yêu cầu đăng nhập"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Bạn cần phải đăng nhập để tiếp tục !
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" >
                            Huỷ
                        </Button>
                        <Button color="primary" autoFocus>
                            <Link to={token ? '/tac-gia' : '/dang-nhap' } style={{ textDecoration: 'none' }}>Đăng nhập</Link>
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Typography variant="h6" >
                Tìm kiếm
             </Typography>
            <Grid item>
                <FormControl >
                    <TextField id="outlined-basic" label="Tên bài báo" variant="outlined" />
                </FormControl>
                {/* <FormControl required >
                    <InputLabel id="demo-simple-select-outlined">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={10}
                        onChange={''}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl> */}
            </Grid>
        </Paper>
    )
}

export default SearchForm
