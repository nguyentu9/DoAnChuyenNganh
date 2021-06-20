import {
    Avatar,
    Button,
    Chip,
    Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import axios from 'axios';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import fileDownload from 'js-file-download';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import articleApi from '../../api/articleApi';
import convertDate from '../../services/convertDate';
import EditorButtonGroup from './Editor/ArticleManagement/EditorButtonGroup';

const urlMappingUser = {
    'tac-gia': 'author',
    'phan-bien': 'reviewer',
    'bien-tap': 'editor',
};
function ArticleDetail() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    let userURL = location.pathname.split('/')[1];

    const { articleID } = useParams();
    const [article, setArticle] = useState([]);

    const [lastStatus, setLastStatus] = useState([]);

    useEffect(() => {
        async function fetchArticle() {
            try {
                const data = await articleApi.getDetail(
                    articleID,
                    urlMappingUser[userURL]
                );
                if (data === null || data?.status === 404) {
                    history.replace('/404');
                    return;
                } else {
                    setArticle(data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchArticle();
    }, [articleID, history, userURL]);

    const handleDownload = (url, filename) => {
        const path = `${process.env.REACT_APP_API_URL}\\${url}`;
        axios
            .get(path, {
                responseType: 'blob',
            })
            .then(res => {
                fileDownload(res.data, filename);
            });
    };

    const handleGoBack = () => {
        history.goBack();
    };

    const handleClick = async ({ role, statusCode, message, reviewers }) => {
        if (role === 'editor') {
            try {
                const lastStatus = await articleApi.putStatusCode(
                    article._id,
                    role,
                    JSON.stringify({ statusCode, message, reviewers })
                );
                // response object lastStatus is { status: Array }
                if (lastStatus.status > 400) return;
                setLastStatus(lastStatus.status);
            } catch (e) {
                console.log(e);
            }
        }
    };

    return article !== [] ? (
        <>
            <Grid container style={{ marginBottom: '1rem' }}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleGoBack}
                    gutterBottom
                    size='small'
                >
                    Trở về
                </Button>
            </Grid>
            <Grid container direction={'column'} alignItems={'center'}>
                <Typography variant='h5' gutterBottom>
                    CHI TIẾT BÀI BÁO
                </Typography>
                <Grid container item xs={12} className={classes.gridBoder}>
                    <Grid item sx={12} sm={4} className={classes.gridLabel}>
                        <h4>Mã bài báo</h4>
                    </Grid>
                    <Grid item sx={12} sm={8} className={classes.gridBody}>
                        {article._id}
                    </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.gridBoder}>
                    <Grid item sx={6} sm={4} className={classes.gridLabel}>
                        <h4>Tên bài báo</h4>
                    </Grid>
                    <Grid item sx={6} sm={8} className={classes.gridBody}>
                        {article.title}
                    </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.gridBoder}>
                    <Grid item sx={6} sm={4} className={classes.gridLabel}>
                        <h4>Loại bài báo</h4>
                    </Grid>
                    <Grid item sx={6} sm={8} className={classes.gridBody}>
                        {article.type?.map((item, i) => (
                            <Chip
                                key={i}
                                label={item.name}
                                style={{ margin: '3px' }}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.gridBoder}>
                    <Grid item sx={6} sm={4} className={classes.gridLabel}>
                        <h4>Tóm tắt</h4>
                    </Grid>
                    <Grid item sx={6} sm={8} className={classes.gridBody}>
                        {article.brief}
                    </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.gridBoder}>
                    <Grid item sx={6} sm={4} className={classes.gridLabel}>
                        <h4>Từ khoá</h4>
                    </Grid>
                    <Grid item sx={6} sm={8} className={classes.gridBody}>
                        {article.keyWord?.map((item, i) => (
                            <Chip
                                key={i}
                                label={item}
                                style={{ margin: '3px' }}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.gridBoder}>
                    <Grid item sx={6} sm={4} className={classes.gridLabel}>
                        <h4>Tác giả/đồng tác giả</h4>
                    </Grid>
                    <Grid item sx={6} sm={8} className={classes.gridBody}>
                        {article.author?.map((_author, i) => (
                            <div key={i}>{`${i + 1}. ${
                                _author.fullName
                            }   -   email: ${_author.email}   -   đơn vị: ${
                                _author.org
                            }`}</div>
                        ))}
                    </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.gridBoder}>
                    <Grid item sx={12} sm={4} className={classes.gridLabel}>
                        <h4>Danh sách tập tin đính kèm:</h4>
                    </Grid>
                    <Grid
                        container
                        item
                        sx={12}
                        sm={8}
                        className={classes.gridBody}
                        style={{ listStyleType: 'none' }}
                    >
                        {article?.attachments?.map((file, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={file.fileName}
                                    secondary={getFileName(file.filePath)}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge='end'
                                        aria-label='delete'
                                        onClick={() =>
                                            handleDownload(
                                                file.filePath,
                                                getFileName(file.filePath)
                                            )
                                        }
                                    >
                                        <CloudDownloadIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.gridBoder}>
                    <Grid item sx={6} sm={4} className={classes.gridLabel}>
                        <h4>Ngày gửi bài</h4>
                    </Grid>
                    <Grid item sx={6} sm={8} className={classes.gridBody}>
                        {convertDate(article.receivedDate)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction={'row'} justify={'center'}>
                {urlMappingUser[userURL] === 'editor' && (
                    <EditorButtonGroup
                        status={
                            lastStatus.length > 0 ? lastStatus : article.status
                        }
                        handleClick={handleClick}
                    />
                )}
            </Grid>
        </>
    ) : (
        <></>
    );
}

export default ArticleDetail;

function getFileName(path) {
    return path.split('\\')[1];
}

const useStyles = makeStyles(theme => ({
    gridLabel: {
        padding: '.85rem 0',
    },
    gridBody: {
        padding: '.9rem 0',
    },
    gridBoder: {
        borderBottom: '1px solid #0000000c',
    },
    button: {
        margin: '1rem .25rem 0',
    },
}));
