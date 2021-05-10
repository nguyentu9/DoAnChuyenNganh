import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';



function SearchForm() {

    //const token = useSelector(state => state.auth.token);
    const [openDialog, setOpenDialog] = useState(false);
    const [ token, setToken] = useState('asdf');

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
            { console.log('token', token)}
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
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
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
