export default function formatDate(date: Date) {
    console.log(date);
    if ((date.getMonth() + 1) <= 9) {
        if (date.getDate() <= 9) {
            return `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()}`
        }
        else {
            return `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`
        }
    }
    else {
        if (date.getDate() <= 9) {
            return `${date.getFullYear()}-${date.getMonth() + 1}-0${date.getDate()}`
        }
        else {
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }
    } 
}