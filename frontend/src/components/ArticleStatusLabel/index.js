import SyncProblemIcon from '@material-ui/icons/SyncProblem';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DoneIcon from '@material-ui/icons/Done';
import WarningIcon from '@material-ui/icons/Warning';
import { Chip } from '@material-ui/core';

function ArticleStatusLabel({ status }) {
    switch (status?.id) {
        case 0:
            return (
                <Chip
                    variant='outlined'
                    style={{
                        border: '#ea9e10 1px solid',
                        color: '#ea9e10',
                    }}
                    size='small'
                    label='Đợi duyệt'
                    icon={<AutorenewIcon style={{ color: '#ea9e10' }} />}
                />
            );
        case 1:
            return (
                <Chip
                    variant='outlined'
                    style={{
                        border: '#1E90FF 1px solid',
                        color: '#1E90FF',
                    }}
                    size='small'
                    label='Đã duyệt'
                    icon={<AutorenewIcon style={{ color: '#1E90FF' }} />}
                />
            );
        case 2:
            return (
                <Chip
                    variant='outlined'
                    style={{
                        border: '#ea9e10 1px solid',
                        color: '#ea9e10',
                    }}
                    size='small'
                    label='Đang phản biện'
                    icon={<AutorenewIcon style={{ color: '#ea9e10' }} />}
                />
            );
        case 3:
            return (
                <Chip
                    variant='outlined'
                    style={{
                        border: '#1E90FF 1px solid',
                        color: '#1E90FF',
                    }}
                    size='small'
                    label='Chấp nhận'
                    icon={<AutorenewIcon style={{ color: '#1E90FF' }} />}
                />
            );
        case 4:
            return (
                <Chip
                    variant='outlined'
                    style={{
                        border: '#ea9e10 1px solid',
                        color: '#ea9e10',
                    }}
                    size='small'
                    label='Không chấp nhận'
                    icon={<SyncProblemIcon style={{ color: '#ea9e10' }} />}
                />
            );
        case 5:
            return (
                <Chip
                    variant='outlined'
                    style={{
                        border: '#ea9e10 1px solid',
                        color: '#ea9e10',
                    }}
                    size='small'
                    label='Yêu cầu chỉnh sửa'
                    icon={<SyncProblemIcon style={{ color: '#ea9e10' }} />}
                />
            );
        case 6:
            return (
                <Chip
                    variant='outlined'
                    style={{
                        border: '#1E90FF 1px solid',
                        color: '#1E90FF',
                    }}
                    size='small'
                    label='Đã chỉnh sửa'
                    icon={<AutorenewIcon style={{ color: '#1E90FF' }} />}
                />
            );
        case 7:
            return (
                <Chip
                    variant='outlined'
                    style={{
                        border: '#61af61 1px solid',
                        color: '#61af61',
                    }}
                    size='small'
                    label='Chấp nhận đăng'
                    icon={<DoneIcon style={{ color: '#61af61' }} />}
                />
            );
        case 8:
            return (
                <>
                    <Chip
                        variant='outlined'
                        style={{
                            border: '#f44336 1px solid',
                            color: '#f44336',
                        }}
                        size='small'
                        label='Từ chối'
                        icon={<WarningIcon style={{ color: '#f44336' }} />}
                    />
                </>
            );
        default:
            return <></>;
    }
}

export default ArticleStatusLabel;
