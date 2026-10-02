import axios from "axios";

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: "https://santa-neutral-isbn-providing.trycloudflare.com/api",
      // baseURL: "http://localhost:5252/api",
      // baseURL: "https://jsonplaceholder.typicode.com",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    function RediriecionaParaLogin() {
      localStorage.removeItem("token");
      window.location.href = "/GerenciamentoTi-Front/";
    }

    // Trata respostas de erro
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {

        const isLoginRequest =
          error.config?.url?.includes("/Login/login");

        if (error.response?.status === 401) {

          if (!isLoginRequest) {
            RediriecionaParaLogin();
          }
          else {
            const mensagem =
              error.response?.data?.message ??
              "Usuário ou senha inválidos.";

            alert(mensagem);
          }
        }
        else if (error.response?.status === 500) {

          alert(
            error.response?.data?.message ??
            "Erro interno do servidor."
          );

          RediriecionaParaLogin();
        }
        else if (!error.response) {

          alert("Não foi possível conectar ao servidor.");

          RediriecionaParaLogin();
        }

        return Promise.reject(error);
      }
    );

  }

  get(url, config = {}) {
    return this.api.get(url, config).then(response => response.data);
  }

  post(url, data, config = {}) {
    return this.api.post(url, data, config).then(response => response.data);
  }

  put(url, data, config = {}) {
    return this.api.put(url, data, config).then(response => response.data);
  }

  delete(url, config = {}) {
    return this.api.delete(url, config).then(response => response.data);
  }
}

export default new Api();