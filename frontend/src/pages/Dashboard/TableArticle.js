import {
    Chip,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import ArticleStatusLabel from '../../components/ArticleStatusLabel';
import { useHistory, useLocation } from 'react-router-dom';
import convertDate from '../../services/convertDate';
import FaceIcon from '@material-ui/icons/Face';
import ErrorIcon from '@material-ui/icons/Error';
const urlMappingUser = {
    'tac-gia': 'author',
    'phan-bien': 'reviewer',
    'bien-tap': 'editor',
};

function TableArticle({ articles }) {
    const history = useHistory();
    const location = useLocation();
    const [page, setPage] = useState(1);
    let userURL = location.pathname.split('/')[1];
    const handleNavigation = articleID => _ => {
        history.push(`/${userURL}/bai-bao/${articleID}`);
    };
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const classes = useStyles();
    let n = 1;
    return (
        <>
            <Grid container direction={'row'} justify={'center'}>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>STT</TableCell>
                                <TableCell align='center' width='30%'>
                                    Tên bài báo
                                </TableCell>
                                <TableCell align='center' width='10%'>
                                    Loại
                                </TableCell>
                                {/* Showed up when user is editor */}
                                {urlMappingUser[userURL] === 'editor' && (
                                    <>
                                        <TableCell align='center'>
                                            Tác giả
                                        </TableCell>
                                        <TableCell align='center'>
                                            Phản biện
                                        </TableCell>
                                    </>
                                )}
                                <TableCell align='right'>Trạng thái</TableCell>
                                <TableCell align='right'>Ngày gửi</TableCell>
                                <TableCell align='right'>
                                    Ngày cập nhật
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {articles &&
                                articles.map(article => (
                                    <Tooltip
                                        title='Nhấn vào để xem chi tiết'
                                        placement='top'
                                        arrow
                                        interactive
                                        key={article._id}
                                    >
                                        <TableRow
                                            hover
                                            onClick={handleNavigation(
                                                article._id
                                            )}
                                        >
                                            <TableCell align='center'>
                                                {n++}
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                scope='row'
                                                style={{ minWidth: '200px' }}
                                                align='center'
                                            >
                                                {article.title}
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                width='10%'
                                            >
                                                {article.type.map((item, i) => (
                                                    <Chip
                                                        key={i}
                                                        label={item.name}
                                                        size='small'
                                                        style={{
                                                            margin: '3px',
                                                        }}
                                                    />
                                                ))}
                                            </TableCell>
                                            {urlMappingUser[userURL] ===
                                                'editor' && (
                                                <>
                                                    <TableCell align='center'>
                                                        {article.author.map(
                                                            (item, i) => (
                                                                <Chip
                                                                    key={i}
                                                                    icon={
                                                                        <FaceIcon />
                                                                    }
                                                                    label={
                                                                        item.fullName
                                                                    }
                                                                    size='small'
                                                                    style={{
                                                                        margin: '3px',
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        {article.reviewer?.map(
                                                            (item, i) => (
                                                                <Chip
                                                                    key={i}
                                                                    size='small'
                                                                    label={
                                                                        item.fullName
                                                                    }
                                                                    style={{
                                                                        margin: '3px',
                                                                    }}
                                                                    icon={
                                                                        <FaceIcon />
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                        {article.reviewer
                                                            .length === 0 && (
                                                            <Chip
                                                                variant='outlined'
                                                                size='small'
                                                                color='secondary'
                                                                label={
                                                                    'Không có'
                                                                }
                                                                icon={
                                                                    <ErrorIcon />
                                                                }
                                                            />
                                                        )}
                                                    </TableCell>
                                                </>
                                            )}
                                            <TableCell
                                                align='right'
                                                width='10%'
                                            >
                                                <ArticleStatusLabel
                                                    status={
                                                        article.status.slice(
                                                            -1
                                                        )[0]
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell align='right'>
                                                {convertDate(
                                                    article.receivedDate
                                                )}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {convertDate(
                                                    article.receivedDate
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </Tooltip>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <Pagination
                    count={5}
                    page={page}
                    size='large'
                    onChange={handlePageChange}
                    style={{ marginTop: '1rem' }}
                /> */}
            </Grid>
        </>
    );
}
export default TableArticle;

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
