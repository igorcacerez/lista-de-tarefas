class FetchAdapter {
    constructor(baseUrl = null, headers = {}, type = "api") {
        this.baseUrl = baseUrl || "http://localhost:8888";
        this.headers = headers;
        this.type = type;

        // Add content type to headers
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/json';
        }
    }

    async request(endpoint, options = {}) {
        // Configurações padrão do request
        const defaultOptions = {
            headers: {...this.headers, ...options.headers},
        };

        // Combina as opções padrão com as opções específicas do request
        const finalOptions = { ...defaultOptions, ...options };

        // Constrói a URL final
        const url = this.type === "api" ? new URL(endpoint, this.baseUrl).href : `${this.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url, finalOptions);
            const data = await response.json();

            if (this.type === "api") {
                if (data.error) throw new Error(data.error || "Erro desconhecido.");

                return data.data;
            }

            return data;

        } catch (error) {
            // Tratamento de erros pode ser mais sofisticado
            console.error("Fetch error: ", error.message);
            throw new Error(error.message);
        }
    }

    setBearerToken(token) {
        this.headers['Authorization'] = `Bearer ${token}`;
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, body, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    put(endpoint, body, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body)
        });

    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }

    login(endpoint, usuario, senha) {

        let basicAuthCode = btoa(`${usuario}:${senha}`);

        return this.request(endpoint, {
            method: 'POST',
            headers: {  'Authorization': `Basic ${basicAuthCode}` }
        });
    }
}

export default FetchAdapter;