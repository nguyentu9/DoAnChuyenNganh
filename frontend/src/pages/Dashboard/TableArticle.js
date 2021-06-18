import {
    Chip,
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
import { useHistory } from 'react-router-dom';

function convertDate(date) {
    let dt = new Date(date);
    return `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt
        .getHours()
        .toString()
        .padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;
}

function ArticleTable({ articles }) {
    const [page, setPage] = useState(1);
    const history = useHistory();
    const handleNavigation = articleID => _ => {
        history.push(`/tac-gia/bai-bao/${articleID}`);
    };
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const classes = useStyles();
    let n = 1;
    return (
        <>
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
                            <TableCell align='right'>Trạng thái</TableCell>
                            <TableCell align='right'>Ngày gửi</TableCell>
                            <TableCell align='right'>Ngày cập nhật</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles.map(article => (
                            <Tooltip
                                title='Nhấn vào để xem chi tiết'
                                placement='top'
                                arrow
                                interactive
                            >
                                <TableRow
                                    key={article._id}
                                    hover
                                    onClick={handleNavigation(article._id)}
                                >
                                    <TableCell align='center'>{n++}</TableCell>
                                    <TableCell
                                        component='th'
                                        scope='row'
                                        style={{ minWidth: '200px' }}
                                    >
                                        {article.title}
                                    </TableCell>
                                    <TableCell align='center' width='10%'>
                                        {article.type.map((item, i) => (
                                            <Chip
                                                key={i}
                                                label={item.name}
                                                style={{ margin: '3px' }}
                                            />
                                        ))}
                                    </TableCell>
                                    <TableCell align='right' width='10%'>
                                        <ArticleStatusLabel
                                            status={article.status[0]}
                                        />
                                    </TableCell>
                                    <TableCell align='right'>
                                        {convertDate(article.receivedDate)}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {convertDate(article.receivedDate)}
                                    </TableCell>
                                </TableRow>
                            </Tooltip>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={5}
                page={page}
                size='large'
                onChange={handlePageChange}
                style={{ marginTop: '1rem' }}
            />
        </>
    );
}
export default ArticleTable;
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
