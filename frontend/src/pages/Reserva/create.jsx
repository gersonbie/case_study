import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import RadioButton from "../../components/input/RadioButton";
import TextInput from "../../components/input/TextInput";
import Dropdown from "../../components/input/Dropdown";
import {
  tipoAgencia,
  tiposAtendimento,
  provinciaAtendimento,
} from "../../constants/dictionary";
import { useAuth } from "../../context";
import { APIKit, uploadFile } from "../../services/api";
import "./reserva.css";

const CreateReserva = () => {
  const { toast } = useAuth(useAuth);
  const [startDate, setStartDate] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      nome: "",
      tipo: "",
      provincia: "",
      pacote: "",
      descricao: "",
      endereco: "",
      email: "",
      contacto: "",
      website: "",
      tempo_minimo: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("Campo Nome é obrigatório"),
      tipo: Yup.string().required("Campo Tipo de Empresa é obrigatório"),
      pacote: Yup.string().required("Campo Pacote é obrigatório"),
      descricao: Yup.string().required("Campo Descrição é obrigatório"),
      endereco: Yup.string().required("Campo Endereço é obrigatório"),
      contacto: Yup.string().required("Campo Contacto é obrigatório"),
      website: Yup.string(),
      tempo_minimo: Yup.string().required("Campo obrigatório"),
      email: Yup.string().email("Email inválido"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (document) {
          const toastID = toast.loading("Carregando Documento.");
          const documento = await uploadFile(document);
          values.documento = documento;
          toast.dismiss(toastID);
        }
        const toastID = toast.loading("Enviando Dados!");
        APIKit.post("/empresas", values)
          .then(() => {
            toast.success("Empresa cadastrada com sucesso!");
            resetForm();
          })
          .catch(() => {
            toast.error("Ocorreu um erro ao cadastrar a empresa!");
          })
          .finally(() => toast.dismiss(toastID));
      } catch (err) {
        toast.error("Ups, ocorreu um erro ao submeter a empresa!");
      }
    },
  });
  return (
    <div className="container">
      <div className="form-header">
        <h2 className="gradient-text">Marcação</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <h3 className="mb-1 gradient-text font-bold">AGENDE MARCAÇÃO</h3>
        <p className="mb-4">
          Nesta secção irá preencher informação referentes a marcação do cliente
        </p>
        <div className="choose">
          <Dropdown
            className="mb-3"
            name="provincia"
            items={provinciaAtendimento}
            label="Província"
            placeholder="Selecione a Província"
          />

          <Dropdown
            className="mb-3"
            name="agency"
            items={tipoAgencia}
            label="Agência"
            placeholder="Selecione a Agência"
          />
        </div>
        <div className="card mb-3">
          <p className="mb-2">Tipo de Atendimento</p>
          <div className="flex flex-wrap gap-2">
            {tiposAtendimento.map((item) => (
              <RadioButton
                key={item.value}
                name="tipo"
                selected={formik.values?.tipo}
                label={item.label}
                value={item.value}
                onChange={formik.handleChange}
              />
            ))}
          </div>
        </div>
        <div className="card mb-3">
          <p className="mb-2">Data - Hora </p>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <TextInput
          className="card mb-3"
          name="nome"
          label="Descrição da Marcação"
          placeholder="Digite a Resposta"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nome}
          error={formik.touched.nome && formik.errors.nome}
        />

        <div className="flex">
          <button type="submit" className="action-button" to="/admin">
            <span>Entrar</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateReserva;
