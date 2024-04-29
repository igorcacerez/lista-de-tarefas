import Swal from "sweetalert2";

export const AlertError = (message) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    })
}

export const AlertSuccess = (message) => {
    Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: message,
    })
}

export const AlertDetails = (titulo, html, ) => {
    Swal.fire({
        title: titulo,
        html: html
    })
}