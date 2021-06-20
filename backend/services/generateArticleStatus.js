export const statusID = {
    PENDING: 0,
    SUBMITTED: 1,
    INREVIEW: 2,
    AGREE: 3,
    DISAGREE: 4,
    REQUIRES_EDITING: 5,
    REVISED: 6,
    PUBLISHED: 7,
    REJECT: 8,
}
export const statusObj = {
    0: () => ({ id: statusID.PENDING, label: 'Đợi duyệt', date: Date.now() }),
    1: () => ({ id: statusID.SUBMITTED, label: 'Đã duyệt', date: Date.now() }),
    2: () => ({
        id: statusID.INREVIEW,
        label: 'Đang phản biện',
        date: Date.now(),
    }),
    3: (idReviewer, message) => ({
        id: statusID.AGREE,
        label: 'Chấp nhận',
        date: Date.now(),
        feedback: { id: idReviewer, msg: message },
    }),
    4: (idReviewer, message) => ({
        id: statusID.DISAGREE,
        label: 'Không chấp nhận',
        date: Date.now(),
        feedback: { id: idReviewer, msg: message },
    }),
    5: (message) => ({
        id: statusID.REQUIRES_EDITING,
        label: 'Yêu cầu chỉnh sửa',
        date: Date.now(),
        feedback: message,
    }),
    6: (idAuthor, message) => ({
        id: statusID.REVISED,
        label: 'Đã chỉnh sửa',
        date: Date.now(),
        feedback: { id: idAuthor, msg: message },
    }),
    7: (message) => ({
        id: statusID.PUBLISHED,
        label: 'Chấp nhận đăng',
        date: Date.now(),
        feedback: message,
    }),
    8: (message) => ({
        id: statusID.REJECT,
        label: 'Từ chối',
        date: Date.now(),
        feedback: message,
    }),
}

export default {
    pending() {
        return { id: statusID.PENDING, label: 'Đợi duyệt', date: Date.now() }
    },
    submitted() {
        return { id: statusID.SUBMITTED, label: 'Đã duyệt', date: Date.now() }
    },
    inReview() {
        return {
            id: statusID.INREVIEW,
            label: 'Đang phản biện',
            date: Date.now(),
        }
    },
    agree(orderOfReviewer, message) {
        return {
            id: statusID.AGREE,
            label: 'Chấp nhận',
            date: Date.now(),
            feedback: { order: orderOfReviewer, msg: message },
        }
    },
    disagree(orderOfReviewer, message) {
        return {
            id: statusID.DISAGREE,
            label: 'Không chấp nhận',
            date: Date.now(),
            feedback: { order: orderOfReviewer, msg: message },
        }
    },
    requiresEditing(message) {
        return {
            id: statusID.REQUIRES_EDITING,
            label: 'Yêu cầu chỉnh sửa',
            date: Date.now(),
            feedback: { order: orderOfReviewer, msg: message },
        }
    },
    revised(orderOfAuthor, message) {
        return {
            id: statusID.REVISED,
            label: 'Đã chỉnh sửa',
            date: Date.now(),
            feedback: { order: orderOfAuthor, msg: message },
        }
    },
    published(message) {
        return {
            id: statusID.PUBLISHED,
            label: 'Chấp nhận đăng',
            date: Date.now(),
            feedback: { msg: message },
        }
    },
    reject() {
        return { id: statusID.REJECT, label: 'Từ chối', date: Date.now() }
    },
}
