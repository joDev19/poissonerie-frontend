import Cookies from "js-cookie"
const reFormatDate = date => date < 10 ? `0${date}` : date
const formatDate = dateString => `${reFormatDate(new Date(dateString).getDate())}/${reFormatDate(new Date(dateString).getMonth() + 1)}/${new Date(dateString).getFullYear()}`
const formatPrice = price => `${Intl.NumberFormat('fr-FR').format(price)} fcfa`
const checkIfUserIsAdmin = () => {
    return Cookies.get('auth_user_role') == "admin"
}
const checkIfProductIsOver = (produit) => {
    if (produit.category == 'unite') {
        return produit.quantity?.unit == 0;
    } else {
        // 
        return produit.quantity?.kg == 0 || produit.quantity?.box == 0
    }
}
const checkIfProductIsUnderSolde = (produit) => {
    if (produit.category == 'unite') {
        return produit.quantity?.unit < 10;
    } else {
        // 
        return produit.quantity?.kg < 10 || produit.quantity?.box < 10
    }
}
export { formatDate, reFormatDate, formatPrice, checkIfUserIsAdmin, checkIfProductIsOver, checkIfProductIsUnderSolde };