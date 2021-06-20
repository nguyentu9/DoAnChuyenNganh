import {
    Avatar,
    Button,
    Chip,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import CircularProgress from '../../../../components/CircularProgress/CircularProgress';
import authorApi from '../../../../api/authorApi';
import articleApi from '../../../../api/articleApi';
import { useSelector } from 'react-redux';
const validationSchema = {
    title: yup.string().trim().required('Tiêu đề không được rỗng'),
    brief: yup.string().trim().required('Tóm tắt không được rỗng'),
    keyWord: yup.string().trim().required('Từ khoá không được rỗng'),
    type: yup.array().min(1, 'Loại không được rỗng'),
    author: yup.array().min(1, 'Tác giả không được rỗng'),
    fileNames: yup.array().min(1, 'Tập tin chưa được tải lên'),
};

function ArticleSubmissionForm() {
    const [articleTypes, setArticleTypes] = useState([]);
    const [listAuthors, setListAuthors] = useState([]);
    const [progress, setProgress] = useState(0);
    const classes = useStyles();
    const currentUserID = useSelector(state => state.auth._id);
    const fixedAuthor = listAuthors.find(el => el._id === currentUserID);
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
                        setProgress(0);
                    }
                },
            };
            axios
                .post('http://localhost:3001/api/v1/articles', data, config)
                .then(res => {
                    notify();
                    console.log(JSON.stringify(res.data));
                })
                .catch(e => alert(`Send Article Error - ${e}`));
        },
    });

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        touched,
        errors,
        values,
    } = formik;

    useEffect(() => {
        async function fetchArticleTypes() {
            try {
                const data = await articleApi.getType();
                setArticleTypes(data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchArticleTypes();
    }, []);

    useEffect(() => {
        async function fetchAuthor() {
            try {
                const data = await authorApi.getAll();
                setListAuthors(data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchAuthor();
    }, []);

    function removeItem(files, index) {
        return files.length > 1 ? [...files].filter((_, i) => i !== index) : [];
    }
    function handleDelete(index) {
        let { files, fileNames } = values;
        let newFiles = removeItem(files, index);
        let newFileNames = removeItem(fileNames, index);

        setFieldValue('files', [...newFiles]);
        setFieldValue('fileNames', [...newFileNames]);
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
                <Grid item xs={12} sm={12}>
                    <Typography component='h1' variant='h5' align='center'>
                        GỬI BÀI BÁO
                    </Typography>
                </Grid>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        required
                        style={{ marginBottom: '.7rem' }}
                        id='title'
                        name='title'
                        label='Tiêu Đề'
                        variant='outlined'
                        fullWidth
                        multiline
                        value={values.title}
                        onChange={handleChange}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
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
                        value={values.brief}
                        onChange={handleChange}
                        error={touched.brief && Boolean(errors.brief)}
                        helperText={touched.brief && errors.brief}
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
                            value={values.keyWord}
                            onChange={handleChange}
                            error={touched.keyWord && Boolean(errors.keyWord)}
                            helperText={touched.keyWord && errors.keyWord}
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
                        onOpen={handleBlur}
                        onChange={(_, value) => {
                            setFieldValue('type', value);
                            if (values.author.length === 0) {
                                values.author.push(fixedAuthor);
                            }
                        }}
                        filterSelectedOptions
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant='outlined'
                                label='Thể Loại'
                                placeholder='Thể Loại'
                                name='type'
                                error={touched.type && Boolean(errors.type)}
                                helperText={touched.type && errors.type}
                            />
                        )}
                    />

                    <Autocomplete
                        required
                        style={{ marginBottom: '.7rem' }}
                        multiple={true}
                        id='author'
                        value={values.author}
                        limitTags={3}
                        options={listAuthors}
                        getOptionLabel={({ fullName, email, org }) =>
                            `${fullName} - ${email} - ${org}`
                        }
                        onChange={(_, newValue) =>
                            setFieldValue('author', [
                                fixedAuthor,
                                ...newValue.filter(
                                    author => author !== fixedAuthor
                                ),
                            ])
                        }
                        filterSelectedOptions
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((author, index) => (
                                <Chip
                                    label={author.fullName}
                                    {...getTagProps({ index })}
                                    disabled={fixedAuthor._id === author._id}
                                />
                            ))
                        }
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant='outlined'
                                label='Danh Sách Tác Giả'
                                placeholder='Tác giả'
                                name='author'
                                error={touched.author && Boolean(errors.author)}
                                helperText={touched.author && errors.author}
                            />
                        )}
                    />
                    <Grid item xs={12} sm={12} md={6}>
                        <Typography variant='h6'>Danh sách file:</Typography>
                        <List dense={true}>
                            {values.files.map((file, index) => (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={values.fileNames[index]}
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
                                    setFieldValue('fileName', value.title);
                            }}
                            filterSelectedOptions
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant='outlined'
                                    label='Danh Sách File'
                                    name='fileName'
                                    error={
                                        touched.fileNames &&
                                        Boolean(errors.fileNames)
                                    }
                                    helperText={
                                        touched.fileNames && errors.fileNames
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        {values.fileName && (
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
                                        if (!event.target.files[0]) return;
                                        let { files, fileName, fileNames } =
                                            values;
                                        setFieldValue('files', [
                                            ...files,
                                            event.target.files[0],
                                        ]);
                                        setFieldValue('fileNames', [
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

export default ArticleSubmissionForm;

const listFileNames = [
    { id: 0, title: 'Bản thảo bài báo (*)' },
    { id: 1, title: 'Thông tin bổ sung cho bài báo' },
    { id: 2, title: 'Thư gửi Ban Biên Tập' },
    { id: 3, title: 'Thư gửi Phản Biện' },
    { id: 4, title: 'Thư phản hồi Phản Biện' },
];
