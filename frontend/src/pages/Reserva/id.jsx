
import React, { useCallback, useEffect, useState } from "react";
import {
  FaRegBuilding, FiExternalLink, HiOutlineMail, IoCallSharp
} from "react-icons/all";
import { Link, useParams } from "react-router-dom";
import ApprovedIcon from '../../assets/svgs/approved';
import Logo from "../../assets/svgs/logoAdmin.svg";
import RejectedIcon from '../../assets/svgs/rejected';
import UserIcon from "../../assets/svgs/user";
import WeekDay from "../../components/empresa/WeekDay";
import MonthCalendar from "../../components/input/MonthCalendar";
import ReservaJaCard from "../../components/ReservaJaCard";
import { pacotesEmpresaObject, tiposEmpresaObject } from "../../constants/dictionary";
import { useAuth } from "../../context";
import { APIKit } from "../../services/api";
import './id.css';

const View = () => {
  const { toast } = useAuth(useAuth);
  const [loading, setLoading] = useState(true)
  const [empresa, setEmpresa] = useState(null)
  const [pagamentos, setPagamentos] = useState(null)
  const [faturamento, setFaturamento] = useState(0)
  let { id } = useParams();

  const fetchData = useCallback(
    () => {
      APIKit.get(`/empresas/${id}`)
        .then(response => {
          setEmpresa(response.data)
          APIKit.get(`/movimentos/faturamento/${response.data.id}`).then((response) => setFaturamento(response.data.total))
          APIKit.get('/movimentos/transacoes', {
            params: { tipo: ['pagamento', 'teste'], empresaId: response.data.id }
          })
            .then(response => {
              const sanitizedPayments = response.data.items
                .map(({ tipo, createdAt, }) => ({ tipo, month: new Date(createdAt).getMonth(), }))
                .reduce((prev, current) => ({ ...prev, [current.month]: current.tipo }), {})

              setPagamentos(sanitizedPayments);
            })
            .catch(() => toast.error("Erro ao Buscar transações!"))
            .finally(() => setLoading(true))
        })
        .catch(() => toast.error("Erro ao Buscar empresas!"))
        .finally(() => { })
    },
    [],
  )

  const getExpiration = () => {
    if (empresa?.expiracaoTrial) {
      const trialDate = new Date(empresa.expiracaoTrial);
      const now = new Date();
      if (trialDate > now) return `Mês gratis.`
    }
    if (empresa?.expiracaoPagamento) {
      const billDate = new Date(empresa.expiracaoPagamento);
      const now = new Date();
      if (billDate > now) return `Mensalidade paga.`
      else return 'Pagamento em atraso!'

    }
    return 'Empresa pendente!'
  }

  const confirmAction = (callback, text) => {
    toast((t) => (
      <span className="flex items-center">
        {text}
        <button className="ph-2 pv-1 blue-bg text-white ml-1" onClick={() => { callback(); toast.dismiss(t.id) }}>
          Confirmar
        </button>
      </span>
    ));
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="container">
      <div className="w-full mb-4">
        <h2 className="gradient-text">Detalhes da Empresa {empresa?.nome}</h2>
        <p>Abaixo estão listados detalhes da empresa.</p>
      </div>
      {empresa ? <div className="grid-col-2 gap-4 w-full mb-4">
        <div className="flex-col gap-4">
          <div className="details-card">
            <div className="flex gap-2 items-center">
              <img className="company-img" src={empresa?.logotipo} alt="Logo" />
              <div className="flex-col flex-1">
                <h3 className="flex items-center"><span className="mr-1">{empresa?.nome}</span>{empresa?.aprovado ? <ApprovedIcon /> : <RejectedIcon />}</h3>
                <p className="mb-1 gradient-text">{tiposEmpresaObject[empresa.tipo].label}</p>
                <p>{empresa?.descricao}</p>
              </div>
            </div>
            <Link to={`/empresas/edit/${id}`} className="action-button edit">Editar</Link>
          </div>
          <div className="details-card">
            <div className="flex gap-2 items-center">
              <div className="company-img">
                <UserIcon />
              </div>
              <div className="flex-col flex-1">
                <h3 className="flex items-center"><span className="mr-1">{empresa?.usuario?.nome}</span></h3>
                <p className="mb-1 gradient-text">{empresa?.usuario?.email}</p>
                <p>{empresa?.usuario?.contacto}</p>
              </div>
            </div>
            <span className="seller-badge">Vendedor</span>
          </div>
          <div className="details-card flex-col gap-2">
            <h3>Informação</h3>
            <div className="flex flex-wrap items-center">
              <FaRegBuilding size={18} />
              <span className="ml-2 extended-w-1">Endereço:</span>
              <strong>{empresa?.endereco}</strong>
            </div>
            <a href={`tel:${empresa?.contacto}`} className="flex flex-wrap items-center">
              <IoCallSharp size={18} />
              <span className="ml-2 extended-w-1">Contacto:</span>
              <strong>{empresa?.contacto}</strong>
            </a>
            <a href={`mailto:${empresa?.email}`} className="flex flex-wrap items-center">
              <HiOutlineMail size={18} />
              <span className="ml-2 extended-w-1">Email:</span>
              <strong>{empresa?.email}</strong>
            </a>
            <a target="_blank" href={empresa?.website} className="flex flex-wrap items-center" rel="noreferrer">
              <FiExternalLink size={18} />
              <span className="ml-2 extended-w-1">Website:</span>
              <strong>{empresa?.website}</strong>
            </a>
          </div>
          <div className="details-card flex-col gap-2">
            <h3>Horário comercial</h3>
            <div className="flex-col relative gap-2">
              <div className="line-through" />
              <WeekDay weekday="segunda" time={empresa?.horario_comercial.segunda} />
              <WeekDay weekday="terca" time={empresa?.horario_comercial.terca} />
              <WeekDay weekday="quarta" time={empresa?.horario_comercial.quarta} />
              <WeekDay weekday="quinta" time={empresa?.horario_comercial.quinta} />
              <WeekDay weekday="sexta" time={empresa?.horario_comercial.sexta} />
              <WeekDay weekday="sabado" time={empresa?.horario_comercial.sabado} />
              <WeekDay weekday="domingo" time={empresa?.horario_comercial.domingo} />
            </div>
          </div>
        </div>
        <div className="flex-col gap-4">
          <div className="details-card flex-col items-center">
            <ReservaJaCard faturamento={faturamento} pacote={pacotesEmpresaObject[empresa.pacote].label} expiracao={getExpiration()} />
            <h3 className="extreme-margin-top text-left">Data de criação</h3>
            <p className="text-left">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(empresa?.createdAt))}</p>
            <div className="w-full">
              <MonthCalendar pagamentos={pagamentos} />
            </div>
            <div className="w-full mt-4 flex flex-wrap gap-2">
              <button onClick={() => confirmAction(() => {
                APIKit.put(`/empresas/pagamento/${empresa?.id}`)
                  .then(() => toast.success("Pagamento realizado com sucesso!"))
                  .catch(() => toast.error("Erro ao realizar pagamento!"))
                  .finally(() => fetchData())
              }, 'Confirme o pagamento de +1 mês de mensalidade.')} type="button" className="action-button" >
                <span>Pagar Mensalidades</span>
              </button>
            </div>
          </div>
          <div className="details-card flex-col gap-2">
            <h3>Tempo mínimo de reserva</h3>
            <strong>{empresa?.tempo_minimo}</strong>
          </div>
          <div className="details-card flex-col gap-2">
            <h3>Ficheiro de Serviços e Funcionários</h3>
            <div className="flex">
              <a href={empresa?.documento} className="action-button" download>Baixar</a>
            </div>
          </div>
        </div>
      </div> : null}

    </div>
  );
};
export default View;
