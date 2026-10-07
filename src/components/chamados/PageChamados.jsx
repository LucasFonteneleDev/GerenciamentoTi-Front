import React, { useState, useRef, useEffect } from 'react'
import MessageCard from './messageCard'
import ListaCardChamados from './listaCardChamados'
import TextAreaSend from './textAreaSend'
import Api from '../../services/api';
import { Await } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import loadingIcon from '../../assets/Loading_icon.gif';

export default function pageChamados() {
    const [IdChamadoSelecionado, setChamadoSelecionado] = useState(null);

    const [carregando, setCarregando] = useState(false);

    //lista de mensagens abertas atualmente.
    const [Mensagens, setMensagens] = useState()

    const token = localStorage.getItem("token");
    console.log("token requisitado")
    let decoded = null;
    if (token) {
        decoded = jwtDecode(token);
    }

    async function SelecionarChamado(idChamado) {
        await setChamadoSelecionado(idChamado);
    }

    useEffect(() => {
        if (IdChamadoSelecionado !== null) {
            CarregaMensagensChamado();
        }
    }, [IdChamadoSelecionado]);

    async function CarregaMensagensChamado() {
        setCarregando(true);

        try {
            var data = await Api.get("MensagemChamado/listagem/" + IdChamadoSelecionado);
            setMensagens(data);

        } finally {
            setCarregando(false);
        }
    }

    //usuario que envia (DEMONSTRAÇÃO)
    const [valorSelecionado, setValorSelecionado] = useState("0");
    function handleChange(event) {
        setValorSelecionado(event.target.value);
    }

    //texto da mensagem a ser enviada
    const [Texto, setTexto] = useState("")
    function handleTextoMensagem(event) {
        setTexto(event.target.value)
    }

    const fimMensagensRef = useRef(null);
    useEffect(() => {
        fimMensagensRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [Mensagens]);

    //função ativada ao apertar um botão
    async function Enviar() {
        //não enviar texto vazio
        if (Texto === "" || Texto == null || IdChamadoSelecionado == null) {
            return;
        }

        var mensagem = {
            chamadoId: IdChamadoSelecionado,
            texto: Texto
        }

        await Api.post("MensagemChamado", mensagem).then(data => {
            CarregaMensagensChamado();
        });

        setTexto("");
    }

    return (
        <div>
            <div className="py-5">

                <div className="row">
                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0"
                        style={{ height: "calc(100vh - 170px)" }}
                    >

                        <ListaCardChamados onSelectChamado={SelecionarChamado} />

                    </div>

                    {/* todo: CHECAR MELHOR FORMA DE DEFINIR ALTURA DA LISTA DE CHATS */}
                    {/* todo: PARA MOBILE, ABRIR ABA LATERAL */}
                    <div className="col-md-6 col-lg-7 col-xl-8 d-flex flex-column" style={{ height: 'calc(100vh - 170px)' }}>
                        <div className="flex-grow-1 overflow-auto bg-light rounded">
                            <ul className="list-unstyled m-1" >
                                {
                                    carregando ? (<img
                                        src={loadingIcon}
                                        alt="Carregando..."
                                        style={{ width: "75px" }}
                                    />
                                    ) : (
                                        Mensagens?.map((mensagem) =>
                                            <li className="d-flex mb-4">
                                                <MessageCard
                                                    //todo: na api definir via token quem está logado(??)
                                                    recebendo={mensagem.usuarioChamadoId != decoded.sub}
                                                    texto={mensagem.texto}
                                                    //todo: melhorar a visualização das mensagens
                                                    usuarioNome={mensagem.usuarioChamadoNome}
                                                // foto={Usuarios[mensagem.id_usuario].foto}
                                                />

                                            </li>
                                        )
                                    )
                                }
                            </ul>
                            <div ref={fimMensagensRef} />
                        </div>
                        <div className='mt-1'>
                            <TextAreaSend
                                text={Texto}
                                onClick={Enviar}
                                handleChange={handleTextoMensagem}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
