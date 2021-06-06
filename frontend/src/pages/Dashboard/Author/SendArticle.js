import {
    Button,
    Grid,
    TextField,
    Typography,
    Tooltip,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemSecondaryAction,
    IconButton,
    ListItemText,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CircularProgress from '../../../components/CircularProgress/CircularProgress';

const validationSchema = {
    title: yup.string().trim().required('Tiêu đề không được rỗng'),
    brief: yup.string().trim().required('Tóm tắt không được rỗng'),
    keyWord: yup.string().trim().required('Từ khoá không được rỗng'),
    type: yup.array().min(1, 'Loại không được rỗng'),
    author: yup.array().min(1, 'Tác giả không được rỗng'),
    fileNames: yup.array().min(1, 'Tập tin chưa được tải lên'),
};

function SendArticle() {
    const [articleTypes, setArticleTypes] = useState([]);
    const [progress, setProgress] = useState(0);
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            title: '',
            brief: '',
            keyWord: '',
            type: [],
            author: [],
            files: [], // list of selected files
            fileNames: [], // list of selected filenames
            fileName: '', // the name of the currently selected file
        },
        validationSchema: yup.object().shape(validationSchema),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            if (progress !== 0) {
                setSubmitting(false);
                return;
            }
            const data = new FormData();
            for (let [key, value] of Object.entries(values)) {
                if (key === 'files') {
                    value.forEach(file => data.append(key, file));
                    continue;
                }
                if (key === 'author' || key === 'type' || key === 'fileNames') {
                    data.append(key, JSON.stringify(value));
                    continue;
                }
                data.append(key, value);
            }
            const config = {
                onUploadProgress(progressEvent) {
                    var percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percentCompleted);
                    if (percentCompleted === 100) {
                        resetForm(formik.initialValues);
                        notify();
                        setProgress(0);
                    }
                },
            };
            axios
                .post('http://localhost:3001/api/v1/article', data, config)
                .then(res => {
                    console.log(JSON.stringify(res.data));
                })
                .catch(e => alert(`Send Article Error - ${e}`));
        },
    });

    useEffect(() => {
        async function fetchArticleTypes() {
            try {
                const res = await axios.get(
                    'http://localhost:3001/api/v1/articleTypes'
                );
                const { data } = res;
                setArticleTypes(data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchArticleTypes();
    }, []);

    function removeItem(files, index) {
        return files.length > 1 ? [...files].filter((_, i) => i !== index) : [];
    }
    function handleDelete(index) {
        let { files, fileNames } = formik.values;
        let newFiles = removeItem(files, index);
        let newFileNames = removeItem(fileNames, index);

        formik.setFieldValue('files', [...newFiles]);
        formik.setFieldValue('fileNames', [...newFileNames]);
    }

    function notify() {
        toast.success('Gửi thành công ! 🎉', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
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
                    <Typography component='h1' variant='h5' align='center'>
                        GỬI BÀI BÁO
                    </Typography>
                </Grid>

                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        required
                        style={{ marginBottom: '.7rem' }}
                        id='title'
                        name='title'
                        label='Tiêu Đề'
                        variant='outlined'
                        fullWidth
                        multiline
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                    />

                    <TextField
                        required
                        style={{ marginBottom: '.7rem' }}
                        id='brief'
                        name='brief'
                        label='Tóm Tắt'
                        variant='outlined'
                        multiline
                        fullWidth
                        value={formik.values.brief}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.brief && Boolean(formik.errors.brief)
                        }
                        helperText={formik.touched.brief && formik.errors.brief}
                    />

                    <Tooltip
                        arrow
                        enterDelay={500}
                        placement='top-start'
                        title='Nhập Từ Khoá cách nhau bởi dấu phẩy và khoảng trắng'
                    >
                        <TextField
                            style={{ marginBottom: '.7rem' }}
                            id='keyWord'
                            name='keyWord'
                            label='Từ Khoá'
                            variant='outlined'
                            fullWidth
                            value={formik.values.keyWord}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.keyWord &&
                                Boolean(formik.errors.keyWord)
                            }
                            helperText={
                                formik.touched.keyWord && formik.errors.keyWord
                            }
                        />
                    </Tooltip>

                    <Autocomplete
                        required
                        style={{ marginBottom: '.7rem' }}
                        multiple
                        id='type'
                        limitTags={3}
                        options={articleTypes}
                        getOptionLabel={type => type.name}
                        onOpen={formik.handleBlur}
                        onChange={(_, value) =>
                            formik.setFieldValue('type', value)
                        }
                        filterSelectedOptions
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant='outlined'
                                label='Thể Loại'
                                placeholder='Thể Loại'
                                name='type'
                                error={
                                    formik.touched.type &&
                                    Boolean(formik.errors.type)
                                }
                                helperText={
                                    formik.touched.type && formik.errors.type
                                }
                            />
                        )}
                    />

                    <Autocomplete
                        required
                        style={{ marginBottom: '.7rem' }}
                        multiple
                        id='author'
                        limitTags={3}
                        options={listAuthors}
                        getOptionLabel={({ _id, fullName }) =>
                            _id + ' _ ' + fullName
                        }
                        onChange={(_, value) =>
                            formik.setFieldValue('author', value)
                        }
                        filterSelectedOptions
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant='outlined'
                                label='Danh Sách Tác Giả'
                                placeholder='Tác giả'
                                name='author'
                                error={
                                    formik.touched.author &&
                                    Boolean(formik.errors.author)
                                }
                                helperText={
                                    formik.touched.author &&
                                    formik.errors.author
                                }
                            />
                        )}
                    />
                    <Grid item xs={12} sm={12} md={6}>
                        <Typography variant='h6'>Danh sách file:</Typography>

                        <List dense={true}>
                            {formik.values.files.map((file, index) => (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={formik.values.fileNames[index]}
                                        secondary={file.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge='end'
                                            aria-label='delete'
                                            onClick={() => handleDelete(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Autocomplete
                            style={{ marginBottom: '.7rem', width: 310 }}
                            id='fileName'
                            limitTags={1}
                            options={listFileNames}
                            getOptionLabel={filename => filename.title}
                            onChange={(_, value) => {
                                if (value)
                                    formik.setFieldValue(
                                        'fileName',
                                        value.title
                                    );
                            }}
                            filterSelectedOptions
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant='outlined'
                                    label='Danh Sách File'
                                    name='fileName'
                                    error={
                                        formik.touched.fileNames &&
                                        Boolean(formik.errors.fileNames)
                                    }
                                    helperText={
                                        formik.touched.fileNames &&
                                        formik.errors.fileNames
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        {formik.values.fileName && (
                            <label htmlFor='files'>
                                {(progress === 0 || progress === 100
                                    ? false
                                    : true) && (
                                    <CircularProgress value={progress} />
                                )}
                                <input
                                    id='files'
                                    type='file'
                                    multiple
                                    name='files'
                                    style={{ display: 'none' }}
                                    accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                    onChange={event => {
                                        if(!event.target.files[0]) return;
                                        let { files, fileName, fileNames } =
                                            formik.values;
                                        formik.setFieldValue('files', [
                                            ...files,
                                            event.target.files[0],
                                        ]);
                                        formik.setFieldValue('fileNames', [
                                            ...fileNames,
                                            fileName,
                                        ]);
                                    }}
                                />
                                <IconButton color='primary' component='span'>
                                    <CloudUploadOutlinedIcon />
                                </IconButton>
                            </label>
                        )}
                    </Grid>
                    <Button
                        style={{ marginTop: '.7rem' }}
                        type='submit'
                        variant='contained'
                        color='primary'
                    >
                        Gửi
                    </Button>
                </form>
                {/* </Grid> */}
            </Grid>
        </>
    );
}

const useStyles = makeStyles({
    form: {
        width: '100%',
        marginTop: '.5rem',
    },
    submit: {
        margin: '1.5rem 0px 1rem',
    },
});

export default SendArticle;

const listFileNames = [
    { id: 0, title: 'Bản thảo bài báo (*)' },
    { id: 1, title: 'Thông tin bổ sung cho bài báo' },
    { id: 2, title: 'Thư gửi Ban Biên Tập' },
    { id: 3, title: 'Thư gửi Phản Biện' },
    { id: 4, title: 'Thư phản hồi Phản Biện' },
];

const listAuthors = [
    { fullName: 'The Shawshank Redemption', _id: 1994 },
    { fullName: 'The Godfather', _id: 1972 },
    { fullName: 'The Godfather: Part II', _id: 1974 },
    { fullName: 'The Dark Knight', _id: 2008 },
    { fullName: '12 Angry Men', _id: 1957 },
    { fullName: "Schindler's List", _id: 1993 },
    { fullName: 'Pulp Fiction', _id: 1994 },
    { fullName: 'The Lord of the Rings: The Return of the King', _id: 2003 },
    { fullName: 'The Good, the Bad and the Ugly', _id: 1966 },
    { fullName: 'Fight Club', _id: 1999 },
    {
        fullName: 'The Lord of the Rings: The Fellowship of the Ring',
        _id: 2001,
    },
    { fullName: 'Star Wars: Episode V - The Empire Strikes Back', _id: 1980 },
    { fullName: 'Forrest Gump', _id: 1994 },
    { fullName: 'Inception', _id: 2010 },
    { fullName: 'The Lord of the Rings: The Two Towers', _id: 2002 },
    { fullName: "One Flew Over the Cuckoo's Nest", _id: 1975 },
    { fullName: 'Goodfellas', _id: 1990 },
];
