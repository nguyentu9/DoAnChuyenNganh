import { Button, Grid, TextField, Typography, Fab, Input } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect,  useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';



const validationSchema = {
    title: yup
        .string()
        .trim()
        .required('Tiêu đề không được rỗng'),
    brief: yup
        .string()
        .trim()
        .required('Tóm tắt không được rỗng'),
    keyWord: yup
        .string()
        .trim()
        .required('Từ khoá không được rỗng'),
    types: yup
        .object().shape({
            type: yup.array().min(0, 'Loại không̣ được rỗng')
        }),
    authors: yup
        .object().shape({
            author: yup.array().min(0, 'Tác giả không̣ được rỗng')
        })
}

function SendArticle() {
    const [articleTypes, setArticleTypes] = useState([]);
    const classes = useStyles();


    const formik = useFormik({
        initialValues: {
            title: '',
            brief: '',
            keyWord: '',
            authors: [],
            authors: [],
            file: null
        },
        validationSchema: yup.object().shape(validationSchema),
        onSubmit: (values) => {
            axios.post('http://localhost:3001/api/v1/article', { ...values })
                .then(res => console.log(JSON.stringify(res.data)))
                .catch(e => alert(`SendArticle.js Error: ${e}`))
        },
    })

    useEffect(() => {
        async function fetchArticleTypes() {
            try {
                const res = await axios.get('http://localhost:3001/api/v1/articleTypes') 
                const { data } = res;
                setArticleTypes(data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchArticleTypes();
    }, []);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Typography component="h1" variant="h5" align="center">
                        GỬI BÀI BÁO
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <form
                        className={classes.form}
                        onSubmit={formik.handleSubmit}
                    >

                        <TextField
                            style={{ marginBottom: ".7rem" }}
                            id="title"
                            name="title"
                            label="Tiêu Đề"
                            variant="outlined"

                            fullWidth
                            multiline
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />


                        <TextField
                            style={{ marginBottom: ".7rem" }}
                            id="brief"
                            name="brief"
                            label="Tóm Tắt"
                            variant="outlined"

                            multiline
                            fullWidth
                            value={formik.values.brief}
                            onChange={formik.handleChange}
                            error={formik.touched.brief && Boolean(formik.errors.brief)}
                            helperText={formik.touched.brief && formik.errors.brief}
                        />


                        <TextField
                            style={{ marginBottom: ".7rem" }}
                            id="keyWord"
                            name="keyWord"
                            label="Từ Khoá"
                            variant="outlined"

                            fullWidth
                            value={formik.values.keyWord}
                            onChange={formik.handleChange}
                            error={formik.touched.keyWord && Boolean(formik.errors.keyWord)}
                            helperText={formik.touched.keyWord && formik.errors.keyWord}
                        />


                        <Autocomplete
                            style={{ marginBottom: ".7rem" }}
                            multiple
                            id="type"
                            limitTags={3}
                            options={articleTypes}
                            getOptionLabel={(type) => type.name}
                            onOpen={formik.handleBlur}
                            onChange={(_, value) => formik.setFieldValue('type', value)}
                            includeInputInList
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Thể Loại"
                                    placeholder="Thể Loại"

                                    name="type"
                                    error={formik.touched.type && Boolean(formik.errors.type)}
                                    helperText={formik.touched.type && formik.errors.type}
                                />
                            )}
                        />


                        <Autocomplete
                            style={{ marginBottom: ".7rem" }}
                            multiple
                            id="authors"
                            limitTags={3}
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            onChange={(_, value) => formik.setFieldValue('authors', value)}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Danh Sách Tác Giả"
                                    placeholder="Tác giả"

                                    name="authors"
                                    error={formik.touched.authors && Boolean(formik.errors.authors)}
                                    helperText={formik.touched.authors && formik.errors.authors}
                                />
                            )}
                        />

                        {/* <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                        <input accept="image/*" id="contained-button-file" multiple authors="file"/>
                    </Button>
                </label> */}

                        <Button
                            authors="submit"
                            variant="contained"
                            color="primary"
                        >
                            Gửi
                        </Button>
                    </form>
                </Grid>
            </Grid>

        </>
    )
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

export default SendArticle




const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 }
]