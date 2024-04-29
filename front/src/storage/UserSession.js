export class UserSession {
    static setUserData(userData) {
        sessionStorage.setItem('user', JSON.stringify(userData));
    }

    static getUserData() {
        const data = sessionStorage.getItem('user');
        return data ? JSON.parse(data) : null;
    }

    static clearUserData() {
        sessionStorage.removeItem('user');
    }
}