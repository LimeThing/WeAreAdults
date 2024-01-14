export default function formatDate(date: Date) {
    if (date.getMonth() <= 9) {
        if (date.getDay() <= 9) {
            return `${date.getFullYear()}-0${date.getMonth()}-0${date.getDay()}`
        }
        else {
            return `${date.getFullYear()}-0${date.getMonth()}-${date.getDay()}`
        }
    }
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
}