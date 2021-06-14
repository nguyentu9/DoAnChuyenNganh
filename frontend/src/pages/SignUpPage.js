import {
    MenuItem,
    TextField,
    Avatar,
    Button,
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const validationSchema = {
    userName: yup
        .string()
        .min(8, 'Tên đăng nhập phải đủ 8 ký tự trở lên')
        .matches(
            /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/,
            'Tên đăng nhập không hợp lệ'
        )
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
    organization: yup
        .string()
        .max(100, 'Tối đa 100 ký tự')
        .required('Đơn vị không được rỗng'),
    address: yup
        .string()
        .max(100, 'Tối đa 100 ký tự')
        .required('Địa chỉ không được rỗng'),
    degree: yup.string().required('Học Hàm Học Vị không được rỗng'),
    major: yup.string().required('Chuyên Ngành không được rỗng'),
};
function notify(msg = 'Tạo tài khoản thành công ! 🎉', isSuccess = true) {
    if (isSuccess) {
        toast.success(msg, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
}
function SignUp() {
    let history = useHistory();
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
            organization: '',
            address: '',
            degree: '',
            major: '',
        },
        validationSchema: yup.object().shape(validationSchema),
        onSubmit: (values, { resetForm }) => {
            // const data = new FormData();
            // for (let [key, value] of Object.entries(values)) {
            //     data.append(key, value);
            // }
            console.log(values);
            // console.log(JSON.stringify(data));
            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/api/v1/auth/signup`,
                    values
                )
                .then(res => {
                    if (res.data.status === 200) {
                        resetForm(formik.initialValues);
                        notify();
                        setTimeout(() => history.push('/dang-nhap'), 3000);
                    }
                })
                .catch(e => alert(`Send Article Error: ${e}`));
        },
    });
    const {
        handleSubmit,
        handleChange,
        setFieldValue,
        touched,
        errors,
        values,
    } = formik;

    useEffect(() => {
        async function fetchMajorList() {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/v1/majors`
            );
            setMajorList(data);
        }
        fetchMajorList();
    }, []);

    useEffect(() => {
        async function fetchDegreeList() {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/v1/degrees`
            );
            setDegreeList(data);
        }
        fetchDegreeList();
    }, []);

    return (
        <Container component='main' maxWidth='md'>
            <div>
                <ToastContainer
                    position='top-right'
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        ĐĂNG KÝ
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    data-testid='userName'
                                    id='userName'
                                    name='userName'
                                    label='Tên đăng nhập (viết không dấu, không khoảng trắng)'
                                    variant='outlined'
                                    margin='dense'
                                    required
                                    fullWidth
                                    autoFocus
                                    value={values.userName}
                                    onChange={handleChange}
                                    error={
                                        touched.userName &&
                                        Boolean(errors.userName)
                                    }
                                    helperText={
                                        touched.userName && errors.userName
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-testid='passWord'
                                    id='passWord'
                                    name='passWord'
                                    label='Mật khẩu'
                                    variant='outlined'
                                    margin='dense'
                                    required
                                    fullWidth
                                    type='password'
                                    value={values.passWord}
                                    onChange={handleChange}
                                    error={
                                        touched.passWord &&
                                        Boolean(errors.passWord)
                                    }
                                    helperText={
                                        touched.passWord && errors.passWord
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-testid='confirmPassword'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    label='Nhập lại mật khẩu'
                                    variant='outlined'
                                    margin='dense'
                                    required
                                    fullWidth
                                    type='password'
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    error={
                                        touched.confirmPassword &&
                                        Boolean(errors.confirmPassword)
                                    }
                                    helperText={
                                        touched.confirmPassword &&
                                        errors.confirmPassword
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    data-testid='fullName'
                                    id='fullName'
                                    name='fullName'
                                    label='Họ tên'
                                    variant='outlined'
                                    margin='dense'
                                    required
                                    fullWidth
                                    autoFocus
                                    value={values.fullName}
                                    onChange={handleChange}
                                    error={
                                        touched.fullName &&
                                        Boolean(errors.fullName)
                                    }
                                    helperText={
                                        touched.fullName && errors.fullName
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-testid='phone'
                                    id='phone'
                                    name='phone'
                                    label='Điện thoại'
                                    variant='outlined'
                                    margin='dense'
                                    type='tel'
                                    required
                                    fullWidth
                                    value={values.phone}
                                    onChange={handleChange}
                                    error={
                                        touched.phone && Boolean(errors.phone)
                                    }
                                    helperText={touched.phone && errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-testid='emailAddr'
                                    id='emailAddr'
                                    name='emailAddr'
                                    label='Email'
                                    variant='outlined'
                                    type='email'
                                    margin='dense'
                                    required
                                    fullWidth
                                    value={values.emailAddr}
                                    onChange={handleChange}
                                    error={
                                        touched.emailAddr &&
                                        Boolean(errors.emailAddr)
                                    }
                                    helperText={
                                        touched.emailAddr && errors.emailAddr
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-testid='major'
                                    select
                                    id='major'
                                    label='Chuyên ngành'
                                    value={values.major || ''}
                                    onChange={handleChange('major').bind(this)}
                                    margin='dense'
                                    variant='outlined'
                                    fullWidth
                                    error={
                                        touched.major && Boolean(errors.major)
                                    }
                                    helperText={touched.major && errors.major}
                                >
                                    <MenuItem value=''>
                                        <em>Không</em>
                                    </MenuItem>
                                    {majorList &&
                                        majorList.map(major => (
                                            <MenuItem
                                                key={major._id}
                                                value={major.majorName}
                                            >
                                                {major.majorName}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-testid='degree'
                                    select
                                    id='degree'
                                    label='Học hàm - Học vị'
                                    value={formik.values.degree || ''}
                                    onChange={formik
                                        .handleChange('degree')
                                        .bind(this)}
                                    margin='dense'
                                    variant='outlined'
                                    fullWidth
                                    error={
                                        formik.touched.degree &&
                                        Boolean(formik.errors.degree)
                                    }
                                    helperText={
                                        formik.touched.degree &&
                                        formik.errors.degree
                                    }
                                >
                                    <MenuItem value=''>
                                        <em>Không</em>
                                    </MenuItem>
                                    {degreeList &&
                                        degreeList.map(degree => (
                                            <MenuItem
                                                key={degree._id}
                                                value={degree.degreeName}
                                            >
                                                {degree.degreeName}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    data-testid='organization'
                                    id='organization'
                                    name='organization'
                                    label='Đơn vị'
                                    margin='dense'
                                    variant='outlined'
                                    type='text'
                                    required
                                    fullWidth
                                    value={formik.values.organization}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.organization &&
                                        Boolean(formik.errors.organization)
                                    }
                                    helperText={
                                        formik.touched.organization &&
                                        formik.errors.organization
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    data-testid='address'
                                    id='address'
                                    name='address'
                                    label='Địa chỉ'
                                    variant='outlined'
                                    type='text'
                                    margin='dense'
                                    required
                                    fullWidth
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.address &&
                                        Boolean(formik.errors.address)
                                    }
                                    helperText={
                                        formik.touched.address &&
                                        formik.errors.address
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            data-testid='submit'
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                        >
                            Đăng Ký
                        </Button>
                        <Grid container justify='flex-end'>
                            <Grid item>
                                <Link
                                    to='/dang-nhap'
                                    variant='body2'
                                    underline='none'
                                >
                                    {'Đăng nhập'}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </Container>
    );
}

export default SignUp;

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
