import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import CustomTable from "../../../components/CustomTable";
import Dropdown from "../../../components/input/Dropdown";
import TextInput from "../../../components/input/TextInput";
import Pagination from "../../../components/Pagination";
import { estadosUsuario, funcoesUsuario, headersClient } from "../../../constants/dictionary";
import { useAuth } from "../../../context";
import { APIKit } from "../../../services/api";
import { itemPlusTodos } from "../../../utils";
import "./estudante.css";
import CreateUser from "./Modal/index";
const Users = () => {
  const { toast } = useAuth(useAuth)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [usuarios, setUsuarios] = useState([])
  const query = useParams();
  const history = useHistory();
  const [filters, setFilters] = useState({
    page: 0,
  })
  const setFilter = (key, value) => {
    const data = { ...filters, [key]: value }
    if (key !== 'page') data.page = 0
    setFilters(data)
  }

  const fetchData = () => {
    APIKit.get('/usuarios', {
      params: { ...filters }
    }).then(response => setUsuarios(response.data)).catch((err) => toast.error("Erro ao Buscar usuários!"))
  }

  useEffect(() => {
    fetchData()
  }, [filters])

  useEffect(() => {
    setFilters({ ...query })
  }, [])

  const menuItems = (item) => [
    {
      text: "Ver Detalhes",
      onClick: () => {
        history.push(`/usuarios/${item.id}`);
      },
    },
    item.ativo ? {
      text: "Desativar",
      onClick: () => {
        APIKit.put(`/usuarios/${item.id}`, { ativo: 0 })
          .then(() => { toast.success(`Usuário ${item.nome} desativado!`) })
          .catch(() => { toast.error(`Erro ao desativar o usuário ${item.nome}!`) })
          .finally(() => fetchData())
      },
    } : {
      text: "Ativar",
      onClick: () => {
        APIKit.put(`/usuarios/${item.id}`, { ativo: 1 })
          .then(() => { toast.success(`Usuário ${item.nome} ativado!`) })
          .catch(() => { toast.error(`Erro ao ativar o usuário ${item.nome}!`) })
          .finally(() => fetchData())
      },
    }
    ,
  ];
  return (
    <div className="container">
      <div className="w-full flex">
        <div className="flex-col flex-1">
          <h2 className="gradient-text">Usuário</h2>
          <p>Veja os usuários correntes.</p>
        </div>
        <div className="flex-col">
          <button className="action-button" onClick={() => setIsModalVisible(true)}>
            Cadastrar Usuário
          </button>
        </div>
      </div>
      <div className="w-full">
        <h3 className="mb-1 mt-4 gradient-text">Filtros</h3>
        <div className="grid-col-4 gap-2">
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
            label="Nome do usuário"
            type="text"
            placeholder="Nome do usuário"
            inputEvent={(data) => setFilter('nome', data)}
          />
          <Dropdown
            name="estado"
            items={itemPlusTodos(estadosUsuario)}
            label="Estado do Usuário"
            placeholder="Estado do Usuário"
            inputEvent={(data) => setFilter('ativo', data)}
          />
          <Dropdown
            name="funcao"
            items={itemPlusTodos(funcoesUsuario)}
            label="Função do Usuário"
            placeholder="Função do Usuário"
            inputEvent={(data) => setFilter('funcao', data)}
          />
        </div>
      </div>
      <CustomTable header={headersClient} items={usuarios?.items} menuItems={menuItems} />
      {(usuarios && usuarios.totalItems) ?
        <Pagination
          totalPages={usuarios.totalPages}
          currentPage={usuarios.currentPage}
          totalItems={usuarios.totalItems}
          changePage={(id) => setFilter('page', id)}
        />
        : null}
      {isModalVisible ? (
        <CreateUser fetchData={fetchData} onClose={() => setIsModalVisible(false)}>
          <h4>fsdfdf</h4>
        </CreateUser>
      ) : null}
    </div>
  );
};
export default Users;
