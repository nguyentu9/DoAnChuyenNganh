import {
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DoneIcon from '@material-ui/icons/Done';
import WarningIcon from '@material-ui/icons/Warning';
import React from 'react';
import d from '../../data';

function ArticleTable(props) {
    const data = props.data || d;
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
                        {data.map(row => (
                            <TableRow key={row._id} hover>
                                <TableCell align='center'>{n++}</TableCell>
                                <TableCell
                                    component='th'
                                    scope='row'
                                    style={{ minWidth: '200px' }}
                                >
                                    {row.title}
                                </TableCell>
                                <TableCell align='center' width='10%'>
                                    {row.type.map(item => (
                                        <Chip
                                            label={item.name}
                                            style={{ margin: '3px' }}
                                        />
                                    ))}
                                </TableCell>
                                <TableCell align='right' width='10%'>
                                    <Chip
                                        variant='outlined'
                                        style={{
                                            border: '#ea9e10 1px solid',
                                            color: '#ea9e10',
                                        }}
                                        size='small'
                                        label='Đợi duyệt'
                                        icon={
                                            <AutorenewIcon
                                                style={{ color: '#ea9e10' }}
                                            />
                                        }
                                    />
                                    <Chip
                                        variant='outlined'
                                        style={{
                                            border: '#f44336 1px solid',
                                            color: '#f44336',
                                        }}
                                        size='small'
                                        label='Từ chối'
                                        icon={
                                            <WarningIcon
                                                style={{ color: '#f44336' }}
                                            />
                                        }
                                    />
                                    <Chip
                                        variant='outlined'
                                        style={{
                                            border: '#61af61 1px solid',
                                            color: '#61af61',
                                        }}
                                        size='small'
                                        label='Chấp nhận đăng'
                                        icon={
                                            <DoneIcon
                                                style={{ color: '#61af61' }}
                                            />
                                        }
                                    />
                                    {row.status.map(item => item.name + ',')}
                                </TableCell>
                                <TableCell align='right'>
                                    {row.receivedDate}
                                </TableCell>
                                <TableCell align='right'>
                                    {row.receivedDate}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                labelRowsPerPage='Số dòng'
                component='div'
                count={data.length}
                // rowsPerPage={10}
                // page={2}
                // onChangePage={handleChangePage}
                // onChangeRowsPerPage={handleChangeRowsPerPage}
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
