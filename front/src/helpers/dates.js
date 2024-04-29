export const convertDate = (date) => {
    const data = new Date(date);
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
}