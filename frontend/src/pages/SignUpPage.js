import { MenuItem, TextField, Avatar, Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link  } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

const validationSchema = {
    userName: yup
        .string()
        .min(8, 'Tên đăng nhập phải đủ 8 ký tự trở lên')
        .matches(/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/, 'Tên đăng nhập không hợp lệ')
        .required('Tên đăng nhập không được rỗng'),
    passWord: yup
        .string()
        .min(8, 'Mật khẩu phải đủ 8 ký tự trở lên')
        .required('Mật khẩu không được rỗng'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('passWord'), null], 'Mật khẩu không khớp')
        .required('Mật khẩu không được rỗng'),
    fullName: yup
        .string()
        .max(50, 'Tối đa 50 ký tự')
        .required('Họ tên không được rỗng'),
    phone: yup
        .string()
        .matches(/\d{10}/g, 'Số điện thoại không hợp lệ')
        .length(10, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại không được rỗng'),
    emailAddr: yup
        .string()
        .email('Email không hợp lệ')
        .required('Email không được rỗng'),
    office: yup
        .string()
        .max(100, 'Tối đa 100 ký tự')
        .required('Đơn vị không được rỗng'),
    address: yup
        .string()
        .max(100, 'Tối đa 100 ký tự')
        .required('Địa chỉ không được rỗng'),
    degree: yup
        .string()
        .required('Học Hàm Học Vị không được rỗng'),
    major: yup
        .string()
        .required('Chuyên Ngành không được rỗng'),

}

function SignUp() {
    const classes = useStyles();
    const [majorList, setMajorList] = useState([]);
    const [degreeList, setDegreeList] = useState([]);



    const formik = useFormik({
        initialValues: {
            userName: '',
            passWord: '',
            confirmPassword: '',
            fullName: '',
            phone: '',
            emailAddr: '',
            office: '',
            address: '',
            degree: '',
        },
        validationSchema: yup.object().shape(validationSchema),
        onSubmit: (values) => {
            alert(JSON.stringify(values));
        },
    })



    useEffect(() => {
        async function fetchMajorList() {
            const { data } = await axios.get('http://localhost:3001/api/v1/majors');
            setMajorList(data);
        }
        fetchMajorList();
    }, []);

    useEffect(() => {
        async function fetchDegreeList() {
            const { data } = await axios.get('http://localhost:3001/api/v1/degrees');
            setDegreeList(data);
        }
        fetchDegreeList();
    }, []);

    return (
        <Container component="main" maxWidth="md">
            <div>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ĐĂNG KÝ
                        </Typography>
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="userName"
                                    name="userName"
                                    label="Tên đăng nhập (viết không dấu, không khoảng trắng)"
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    autoFocus
                                    value={formik.values.userName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                                    helperText={formik.touched.userName && formik.errors.userName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="passWord"
                                    name="passWord"
                                    label="Mật khẩu"
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    type="password"
                                    value={formik.values.passWord}
                                    onChange={formik.handleChange}
                                    error={formik.touched.passWord && Boolean(formik.errors.passWord)}
                                    helperText={formik.touched.passWord && formik.errors.passWord}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Nhập lại mật khẩu"
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    type="password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="fullName"
                                    name="fullName"
                                    label="Họ tên"
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    autoFocus
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="phone"
                                    name="phone"
                                    label="Điện thoại"
                                    variant="outlined"
                                    margin="dense"
                                    type="tel"
                                    required
                                    fullWidth
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="emailAddr"
                                    name="emailAddr"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    margin="dense"
                                    required
                                    fullWidth
                                    value={formik.values.emailAddr}
                                    onChange={formik.handleChange}
                                    error={formik.touched.emailAddr && Boolean(formik.errors.emailAddr)}
                                    helperText={formik.touched.emailAddr && formik.errors.emailAddr}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    id="major"
                                    label="Chuyên ngành"
                                    value={formik.values.major}
                                    onChange={formik.handleChange("major")}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    error={formik.touched.major && Boolean(formik.errors.major)}
                                    helperText={formik.touched.major && formik.errors.major}
                                >
                                    <MenuItem value="">
                                        <em>Không</em>
                                    </MenuItem>
                                    {
                                        majorList && majorList.map((major) => (
                                            <MenuItem key={major._id} value={major.majorName}>{major.majorName}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    id="degree"
                                    label="Học hàm - Học vị"
                                    value={formik.values.degree}
                                    onChange={formik.handleChange("degree")}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    error={formik.touched.degree && Boolean(formik.errors.degree)}
                                    helperText={formik.touched.degree && formik.errors.degree}
                                >
                                    {/* <MenuItem value="">
                                        <em>Không</em>
                                    </MenuItem> */}
                                    {
                                        degreeList && degreeList.map((degree) => (
                                            <MenuItem key={degree._id} value={degree.degreeName}>{degree.degreeName}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="office"
                                    name="office"
                                    label="Đơn vị"
                                    margin="dense"
                                    variant="outlined"
                                    type="text"
                                    required
                                    fullWidth
                                    value={formik.values.office}
                                    onChange={formik.handleChange}
                                    error={formik.touched.office && Boolean(formik.errors.office)}
                                    helperText={formik.touched.office && formik.errors.office}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="address"
                                    name="address"
                                    label="Địa chỉ"
                                    variant="outlined"
                                    type="text"
                                    margin="dense"
                                    required
                                    fullWidth
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Đăng Ký
                            </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link 
                                    to="/dang-nhap" 
                                    variant="body2"
                                    underline="none"
                                >
                                    {"Đăng nhập"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default SignUp


const useStyles = makeStyles({
    formControl: {
        minWidth: '100%',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: '.5rem',
        backgroundColor: '#dc004e',
    },
    form: {
        width: '100%',
        marginTop: '.5rem',
    },
    submit: {
        margin: '1.5rem 0px 1rem',
    },
});

