import {jwtDecode} from "jwt-decode";

export class Token {
    constructor(token) {
        this.token = token;
    }

    decodeToken = () => {
        try {
            return jwtDecode(this.token);
        } catch (error) {
            throw new Error('Erro ao decodificar o token: ' + error);
        }
    };

    isTokenExpired = () => {
        try {
            const decoded = jwtDecode(this.token);
            const currentTime = Date.now() / 1000; // Tempo atual em segundos
            return decoded.exp < currentTime;
        } catch (error) {
            throw new Error('Erro ao verificar a expiração do token: ' + error);
        }
    };
}