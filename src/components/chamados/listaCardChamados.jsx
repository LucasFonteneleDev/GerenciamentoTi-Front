import { useState, useEffect } from 'react';
import CardChamado from './cardChamado';
import api from '../../services/api';
import ModalCadastro from '../gerais/modalCadastro';
import { schema_cadastro } from '../../schemas/chamadoSchema';
import loadingIcon from '../../assets/Loading_icon.gif';

export default function ListaCardChamados({ onSelectChamado }) {
  const [busca, setBusca] = useState("");
  const [IdChamadoSelecionado, setIdChamadoSelecionado] = useState(0);
  const [CHAMADOS, setChamados] = useState([]);

  const [mostraModalChamado, setMostraModalChamado] = useState(false);

  const [carregando, setCarregando] = useState(false);

  function SetChamado(idchamado) {
    setIdChamadoSelecionado(idchamado);
    onSelectChamado(idchamado);
  }

  useEffect(() => {
    CarregaChamados();
  }, []);

  async function CarregaChamados() {
    setCarregando(true);

    try {
      const data = await api.get("Chamado/listagem");
      setChamados(data);
    } finally {
      setCarregando(false);
    }
  }

  const filtrados = CHAMADOS.filter(chamado => {

    const textoChat = Object.values(chamado).some(valor =>
      valor !== null &&
      valor !== undefined &&
      String(valor).toLowerCase().includes(busca.toLowerCase())
    );

    return textoChat;
  });

  const handleSaveChamado = (objEditado) => { //todo: contextualizar/corrigir esta função
    const nomeController = "Chamado"

    if (objEditado.id == null) {
      api.post(nomeController, objEditado).then(data => {
        CarregaChamados();
      });
    }
    else {
      api.put(`${nomeController}/${objEditado.id}`, objEditado).then(data => {
        CarregaChamados();
      });
    }

    setMostraModalChamado(false);
    // setObjSelecionado(null); //todo: preencher objeto selecionado
  };

  async function excluir(id) {
    await api.delete("Chamado/" + id);
    CarregaChamados();
  }

  async function editar(id) {

    // if(confirma){
    //   await api.delete("Chamado/"+id);
    // }
  }

  return (
    <div className="card h-100">
      <div className="card-body overflow-auto d-flex flex-column">

        {/* Busca */}
        <div className="d-flex pb-2" role="search">
          <input
            onChange={(e) => setBusca(e.target.value)}
            className="form-control"
            type="search"
            placeholder="Busca"
          />

          <div className="badge bg-success fs-5 ms-1" onClick={() => setMostraModalChamado(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </div>

          <span className="badge bg-danger fs-5 ms-1">
            {filtrados.length}
          </span>
        </div>

        {/* Lista com scroll */}
        <div className="flex-grow-1 overflow-auto">
          <ul className="list-unstyled mb-0">

            {carregando ? (
              <div className="text-center">
                <img
                  src={loadingIcon}
                  alt="Carregando..."
                  style={{ width: "75px" }}
                />
              </div>
            ) : (
              filtrados.map((chamado) => (
                <CardChamado
                  chamado={chamado}
                  key={chamado.id}
                  qtdNaoLida={1}
                  onClick={() => {
                    SetChamado(chamado.id);
                  }}
                  selecionado={chamado.id == IdChamadoSelecionado}

                  onExcluir={excluir}
                  onEditar={editar}
                />
              ))
            )}

          </ul>
        </div>

      </div>


      <ModalCadastro
        show={mostraModalChamado}
        titulo={"Chamado / Ocorrência"}
        schema_cadastro={schema_cadastro}
        onClose={() => setMostraModalChamado(false)}
        dadosIniciais={[]}
        classesConteudo="d-flex flex-wrap"
        onSave={handleSaveChamado}
      />
    </div>
  );
}
