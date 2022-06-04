import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import CustomTable from "../../components/CustomTable";
import Dropdown from "../../components/input/Dropdown";
import TextInput from "../../components/input/TextInput";
import Pagination from "../../components/Pagination";
import { estadosEmpresa, headersEmpresa, pacotesEmpresa, tiposAtendimento } from "../../constants/dictionary";
import { useAuth } from "../../context";
import { APIKit } from "../../services/api";
import { itemPlusTodos } from "../../utils";
import "./empresa.css";

const Empresas = () => {
  const { toast, usuario } = useAuth(useAuth)
  const [empresas, setEmpresas] = useState(null)
  const query = useParams();
  const history = useHistory();
  const [filters, setFilters] = useState({
    nome: '',
    usuarioNome: '',
    tipo: '',
    pacote: '',
    aprovado: '',
    page: 0,
  })
  const setFilter = (key, value) => {
    const data = { ...filters, [key]: value }
    if (key !== 'page') data.page = 0
    setFilters(data)
  }

  const fetchData = () => {
    APIKit.get('/empresas', {
      params: { ...filters }
    }).then(response => setEmpresas(response.data)).catch((err) => toast.error("Erro ao Buscar empresas!"))
  }

  const menuItems = (item) => {
    if (usuario.funcao === 'vendedor')
      return [
        {
          text: "Ver Detalhes",
          onClick: () => {
            history.push(`/empresas/${item.id}`);
          },
        },
        {
          text: "Editar",
          onClick: () => {
            history.push(`/empresas/edit/${item.id}`);
          },
        },
      ]
    return [
      {
        text: "Ver Detalhes",
        onClick: () => {
          history.push(`/empresas/${item.id}`);
        },
      },
      {
        text: "Editar",
        onClick: () => {
          history.push(`/empresas/edit/${item.id}`);
        },
      },
      item.aprovado ?
        {
          text: "Reprovar",
          onClick: () => {
            APIKit.put(`/empresas/reprovar/${item.id}`)
              .then(() => { toast.success(`Contrato com a empresa ${item.nome} reprovado!`) })
              .catch(() => { toast.error(`Erro ao reprovar contrato com ${item.nome}!`) })
              .finally(() => fetchData())
          },
        } : {
          text: "Aprovar",
          onClick: () => {
            APIKit.put(`/empresas/aprovar/${item.id}`)
              .then(() => { toast.success(`Contrato com a empresa ${item.nome} aprovado!`) })
              .catch(() => { toast.error(`Erro ao aprovar contrato com ${item.nome}!`) })
              .finally(() => fetchData())
          },
        }
    ]

  };

  useEffect(() => {
    fetchData()
  }, [filters])

  useEffect(() => {
    setFilters({ ...query })
  }, [])
  return (
    <div className="container">
      <div className="w-full">
        <h2 className="gradient-text">Empresa</h2>
        <p>Lista das empresas cadastradas.</p>
      </div>
      <div className="flex-col w-full">
        <h3 className="mb-1 mt-4 gradient-text">Filtros</h3>
        <div className="grid-col-4 gap-4 w-full">
          <TextInput
            name="startDate"
            label="Data Inicial"
            type="date"
            placeholder="Data Inicial"
            inputEvent={(data) => setFilter('startDate', data)}
          />
          <TextInput
            name="endDate"
            label="Data Final"
            type="date"
            placeholder="Data Final"
            inputEvent={(data) => setFilter('endDate', data)}
          />
          <TextInput
            name="nome"
            label="Nome da empresa"
            type="text"
            placeholder="Nome da empresa"
            inputEvent={(data) => setFilter('nome', data)}
          />
          <TextInput
            name="usuarioNome"
            label="Nome do vendedor"
            type="text"
            placeholder="Nome do vendedor"
            inputEvent={(data) => setFilter('usuarioNome', data)}
          />
          <Dropdown
            name="tipo"
            className="no-shadow"
            items={itemPlusTodos(tiposAtendimento)}
            label="Tipo de Empresa"
            placeholder="Tipo de Empresa"
            inputEvent={(data) => setFilter('tipo', data)}
          />
          <Dropdown
            name="estado"
            items={itemPlusTodos(estadosEmpresa)}
            label="Estado da Empresa"
            placeholder="Estado da Empresa"
            inputEvent={(data) => setFilter('aprovado', data)}
          />
          <Dropdown
            name="pacote"
            className="no-shadow"
            items={itemPlusTodos(pacotesEmpresa)}
            label="Pacote"
            placeholder="Pacote"
            inputEvent={(data) => setFilter('pacote', data)}
          />
        </div>
      </div>
      <CustomTable header={headersEmpresa} items={empresas?.items} menuItems={menuItems} />
      {(empresas && empresas.totalItems) ?
        <Pagination
          totalPages={empresas.totalPages}
          currentPage={empresas.currentPage}
          totalItems={empresas.totalItems}
          changePage={(id) => setFilter('page', id)}
        />
        : null}
    </div>
  );
};
export default Empresas;
