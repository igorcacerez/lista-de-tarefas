import FetchAdapter from "../adapters/request";

export async function buscarFeriados() {
    let url = "https://date.nager.at/api/v3/PublicHolidays"
    let ano = new Date().getFullYear()

    const api = new FetchAdapter(url, {}, false)
    return await api.get("/" + ano + "/BR")
}