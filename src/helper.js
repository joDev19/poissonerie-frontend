const reFormatDate = date => date < 10 ? `0${date}` : date
const formatDate = dateString => `${reFormatDate(new Date(dateString).getDate())}/${reFormatDate(new Date(dateString).getMonth() + 1)}/${new Date(dateString).getFullYear()}`
const formatPrice = price => `${Intl.NumberFormat('fr-FR').format(price)} fcfa`
export { formatDate, reFormatDate, formatPrice };