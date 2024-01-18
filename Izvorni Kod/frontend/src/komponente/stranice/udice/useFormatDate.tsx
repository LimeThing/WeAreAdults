export default function formatDate(date: Date) {
    date = new Date(date);
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

export function formatTime(date: Date) {
    date = new Date(date);
    return `${
        date.getHours() <= 9
          ? "0" + date.getHours()
          : date.getHours()
      }:${
        date.getMinutes() <= 9
          ? "0" + date.getMinutes()
          : date.getMinutes()
      }`
}