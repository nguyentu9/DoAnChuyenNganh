import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { login } from '../redux/auth';


const validationSchema = {
    userName: yup
        .string()
        //.matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'Tên đăng nhập không được chứa ký tự đặc biệt')
        .required('Tên đăng nhập không được rỗng'),
    passWord: yup
        .string()
        //.matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'Mật khẩu không được chứa ký tự đặc biệt')
        //.min(8, 'Mật khẩu phải đủ 8 ký tự trở lên')
        .required('Mật khẩu không được rỗng'),
}


function SignIn() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);


    const formik = useFormik({
        initialValues: {
            userName: '',
            passWord: '',
        },
        validationSchema: yup.object().shape(validationSchema),
        onSubmit: (values) => {
            const { userName, passWord } = values;
            dispatch(login({ userName, passWord }));
        },
    })

    if(token !== null){
        return <Redirect to='/tac-gia' />
        // return history.push('/tac-gia');
    }

    return (
        <Container component="main" maxWidth="xs">
            {/* { token && <Redirect to='/tac-gia' />} */}

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    ĐĂNG NHẬP
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="userName"
                        label="Tài khoản"
                        name="userName"
                        variant="outlined"
                        margin="normal"
                        autoFocus
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        error={formik.touched.userName && Boolean(formik.errors.userName)}
                        helperText={formik.touched.userName && formik.errors.userName}
                    />
                    <TextField
                        fullWidth
                        id="passWord"
                        label="Mật khẩu"
                        name="passWord"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        value={formik.values.passWord}
                        onChange={formik.handleChange}
                        error={formik.touched.passWord && Boolean(formik.errors.passWord)}
                        helperText={formik.touched.passWord && formik.errors.passWord}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Ghi nhớ"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Đăng nhập
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="#" variant="body2">
                                Quên mật khẩu
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                to="/dang-ky"
                                variant="body2"
                                underline="none"
                            >
                                {"Đăng ký"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}



const useStyles = makeStyles({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: '.5rem',
    },
    form: {
        width: '100%',
        marginTop: '.5rem',
    },
    submit: {
        margin: '1.5rem 0px 1rem',
    },
});

export default SignIn;