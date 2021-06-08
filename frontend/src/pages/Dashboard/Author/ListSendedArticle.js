import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import data from '../../../data';
import { TablePagination } from '@material-ui/core';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function ListSendedArticle() {
    const classes = useStyles();

    return (
        <>
            {/* <TableContainer component={Paper}>
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
                            <TableRow key={row._id}>
                                <TableCell align='left'>
                                    {row._id.substring(row._id.length - 5)}
                                </TableCell>
                                <TableCell
                                    component='th'
                                    scope='row'
                                    style={{ minWidth: '200px' }}
                                >
                                    {row.title}
                                </TableCell>
                                <TableCell align='center' width='10%'>
                                    {row.type.map(item => (
                                        <Chip label={item.name} />
                                    ))}
                                </TableCell>
                                <TableCell align='right' width='10%'>
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
            /> */}
        </>
    );
}

export default ListSendedArticle;
