import { Link } from "react-router-dom";

export default function Navbar() {

  //todo: mover para útil login
  function onLogoff(){
    localStorage.removeItem("token");

    //todo: referente a "RedirecionaParaLogin" na api.jsx
    window.location.href = "/GerenciamentoTi-Front/";
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/empresas">Empresas</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/funcionarios">Funcionários</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/usuarios">Usuários</Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Equipamentos
                </a>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/equipamentos"
                    >
                      Cadastro de Equipamentos
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/tipo-equipamentos"
                    >
                      Tipo Equipamento
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Usuário / Logout */}
            {/* Dropdown de opções */}
            <div className="dropdown me-2">
              <button
                type="button"
                className="btn p-1 border-0 fs-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                👤
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={() => onLogoff()}>
                    ← Sair
                  </button>
                </li>

                {/* <li>
                  <button className="dropdown-item" onClick={() => {
                    const confirma = confirm(`Deseja mesmo Excluir o chamado com o assunto: "${chamado.assunto}" ?`);

                    if (confirma) {
                      onExcluir(chamado.id)
                    }
                  }}>
                    🗑 Excluir
                  </button>
                </li> */}
              </ul>
            </div>

          </div>
        </div>
      </nav>

      <div style={{ backgroundColor: "#00f9aa", height: "7px" }} />
    </>
  );
}
