const reFormatDate = date => date < 10 ? `0${date}` : date
const formatDate = dateString => `${reFormatDate(new Date(dateString).getDate())}/${reFormatDate(new Date(dateString).getMonth() + 1)}/${new Date(dateString).getFullYear()}`

export { formatDate, reFormatDate };