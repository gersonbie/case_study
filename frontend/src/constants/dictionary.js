import { dropdownToValueObject, isMonthPaid } from "../utils";

export const tiposAtendimento = [
  { label: "Atendimento Geral", value: "Atendimento Gera" },
  { label: "Deposito ou Cheque", value: "Deposito ou Cheque" },
];

export const tiposEmpresaObject = dropdownToValueObject(tiposAtendimento);

export const tipoAgencia = [
  { label: "XPTO", value: "XPTO" },
  { label: "ABC", value: "ABC" },
  { label: "Exclusivo", value: "Exclusivo" },
];

export const tiposAgenciaObject = dropdownToValueObject(tipoAgencia);

export const provinciaAtendimento = [
  { label: "Maputo Cidade", value: "Maputo Cidade" },
  { label: "Maputo Província ", value: "Maputo Província" },
  { label: "Gaza ", value: "Gaza" },
  { label: "Inhambane ", value: "Inhambane" },
  { label: "Sofala ", value: "Sofala" },
  { label: "Manica", value: "Manica" },
  { label: "Tete", value: "Tete" },
  { label: "Zambézia", value: "Zambézia" },
  { label: "Nampula", value: "Nampula" },
  { label: "Cabo Delgado", value: "Cabo Delgado" },
  { label: "Niassa", value: "Niassa" },
];

export const provinciaObject = dropdownToValueObject(provinciaAtendimento);

export const estadosUsuario = [
  { label: "Ativo", value: 1 },
  { label: "Não Ativo", value: 0 },
];

export const estadosUsuarioObject = dropdownToValueObject(estadosUsuario);

export const funcoesUsuario = [
  { label: "Administrador", value: "admin" },
  { label: "Cliente", value: "client" },
];

export const funcoesUsuarioObject = dropdownToValueObject(funcoesUsuario);

export const todos = {
  label: "Todos",
  value: "",
};

export const headersClient = [
  {
    key: "nome",
    label: "Nome",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "contacto",
    label: "Contacto",
  },
  {
    key: "funcao",
    label: "Função",
    component: (item) => funcoesUsuarioObject[item.funcao].label,
  },
  {
    key: "ativo",
    label: "Estado",
    component: (item) => (
      <div className="flex items-center">
        {item.ativo ? (
          <>
            <div className="small-circle enabled" />{" "}
            {estadosUsuarioObject[item.ativo ? 1 : 0].label}
          </>
        ) : (
          <>
            <div className="small-circle disabled" />{" "}
            {estadosUsuarioObject[item.ativo ? 1 : 0].label}
          </>
        )}
      </div>
    ),
  },
];

