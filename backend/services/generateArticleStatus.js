export const statusID = {
    PENDING: 0,
    SUBMITTED: 1,
    INREVIEW: 2,
    AGREE: 3,
    DISAGREE: 4,
    REVISED: 5,
    PUBLISHED: 6,
    REJECT: 7,
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
