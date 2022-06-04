import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
import BusinessDay from "../../components/input/BusinessDay";
import FileInput from "../../components/input/FileInput";
import RadioButton from "../../components/input/RadioButton";
import TextInput from "../../components/input/TextInput";
import { pacotesEmpresa, tempoMinimoEmpresa, tiposAtendimento } from "../../constants/dictionary";
import { useAuth } from "../../context";
import { APIKit, uploadFile } from "../../services/api";
import "./create.css";

const EditEmpresa = () => {
  const { toast } = useAuth(useAuth);
  const [businessDays, setBusinessDays] = useState(null)
  const [empresa, setEmpresa] = useState(null)
  const [document, setDocument] = useState(null)
  const [image, setImage] = useState()
  let { id } = useParams();
  const setBusinessDay = (name, values) => setBusinessDays({ ...businessDays, [name]: values })
  const changeDocument = (file) => {
    setDocument(file)
  }
  const changeImage = (file) => {
    setImage(file)
  }

  const fetchData = useCallback(
    () => {
      APIKit.get(`/empresas/${id}`)
        .then(response => {
          const empresa = response.data
          setEmpresa(empresa)
          formik.setValues({
            nome: empresa.nome,
            tipo: empresa.tipo,
            pacote: empresa.pacote,
            descricao: empresa.descricao,
            endereco: empresa.endereco,
            email: empresa.email,
            contacto: empresa.contacto,
            website: empresa.website,
            tempo_minimo: empresa.tempo_minimo,
          })
          setBusinessDays(empresa.horario_comercial)
        })
        .catch(() => toast.error("Erro ao Buscar empresas!"))
        .finally(() => { })
    },
    [],
  )
  useEffect(() => {
    fetchData()
  }, [])

  const formik = useFormik({
    initialValues: {
      nome: "",
      tipo: "",
      pacote: "",
      descricao: "",
      endereco: "",
      email: "",
      contacto: "",
      website: "",
      tempo_minimo: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Campo Nome é obrigatório'),
      tipo: Yup.string().required('Campo Tipo de Empresa é obrigatório'),
      pacote: Yup.string().required('Campo Pacote é obrigatório'),
      descricao: Yup.string().required('Campo Descrição é obrigatório'),
      endereco: Yup.string().required('Campo Endereço é obrigatório'),
      contacto: Yup.string().required('Campo Contacto é obrigatório'),
      website: Yup.string(),
      tempo_minimo: Yup.string().required('Campo obrigatório'),
      email: Yup.string().email('Email inválido'),
    }),
    onSubmit: async (values) => {
      values.horario_comercial = businessDays
      try {
        if (document) {
          const toastID = toast.loading('Carregando Documento.');
          const documento = await uploadFile(document)
          values.documento = documento
          toast.dismiss(toastID)
        }
        if (image) {
          const toastID = toast.loading('Carregando Imagem.');
          const logotipo = await uploadFile(image)
          values.logotipo = logotipo
          toast.dismiss(toastID)
        }
        const toastID = toast.loading('Enviando Dados!');
        APIKit.put(`/empresas/${id}`, values)
          .then(() => { toast.success('Empresa atualizada com sucesso!'); })
          .catch(() => { toast.error('Ocorreu um erro ao editar a empresa!') })
          .finally(() => toast.dismiss(toastID))
      } catch (err) {
        toast.error('Ups, ocorreu um erro ao submeter a empresa!');
      }

    },
  });
  if (!empresa) return <></>
  return (
    <div className="container">
      <div className="form-header">
        <h2 className="gradient-text"> Editar dados da Empresa</h2>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (formik.isValid) formik.submitForm()
        else {
          toast.error(`Formulário incompleto!`);
          toast.error(Object.values(formik.errors).join('\n').toString());
        }
      }} className="mb-4">
        <h3 className="mb-1 gradient-text font-bold">DETALHES DA EMPRESA</h3>
        <p className="mb-4">
          Nesta secção irá preencher informação referentes aos detalhes da
          empresa
        </p>
        <TextInput
          className="card mb-3"
          name="nome"
          label="Nome da Empresa"
          disabled
          placeholder="Digite a Resposta"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.nome}
        />
        <div className="card mb-3">
          <p className="mb-2">Tipo de Empresa</p>
          <div className="flex flex-wrap gap-2">
            {tiposAtendimento.map((item) => (<RadioButton key={item.value} disabled name="tipo" label={item.label} selected={formik.values?.tipo} value={item.value}
              onChange={formik.handleChange} />))}
          </div>
        </div>
        <div className="card mb-3">
          <p className="mb-2">Pacote</p>
          <div className="flex flex-wrap gap-2">
            {pacotesEmpresa.map((item) => (<RadioButton key={item.value} name="pacote" selected={formik.values?.pacote} label={item.label} value={item.value}
              onChange={formik.handleChange} />))}
          </div>
        </div>
        <TextInput
          className="card mb-3"
          name="descricao"
          label="Descrição da Empresa"
          placeholder="Digite a Resposta"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.descricao}
        />
        <TextInput
          className="card mb-3"
          name="endereco"
          label="Endereço da Empresa"
          placeholder="Digit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.endereco}
        />
        <TextInput
          className="card mb-3"
          name="contacto"
          label="Contacto da Empresa"
          placeholder="Digit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.contacto}
        />
        <TextInput
          className="card mb-3"
          name="email"
          label="E-mail da Empresa"
          placeholder="Digit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <TextInput
          className="card mb-3"
          name="website"
          label="Website da Empresa (se existir)"
          placeholder="Digit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.website}
        />

        <div className="card p-3 mb-3 flex-col gap-1">
          <p>Horário comercial</p>
          <div className="grid-col-3">
            <div className="gradient-text font-bold">
              <span>Dia da Semana</span>
            </div>
            <div className="gradient-text font-bold">
              <span>Início</span>
            </div>
            <div className="gradient-text font-bold">
              <span>Fim</span>
            </div>
          </div>
          <BusinessDay initial={businessDays} name="segundo" setBusinessDay={setBusinessDay} label="Segunda-feira" />
          <BusinessDay initial={businessDays} name="terca" setBusinessDay={setBusinessDay} label="Terça-feira" />
          <BusinessDay initial={businessDays} name="quarta" setBusinessDay={setBusinessDay} label="Quarta-feira" />
          <BusinessDay initial={businessDays} name="quinta" setBusinessDay={setBusinessDay} label="Quinta-feira" />
          <BusinessDay initial={businessDays} name="sexta" setBusinessDay={setBusinessDay} label="Sexta-feira" />
          <BusinessDay initial={businessDays} name="sabado" setBusinessDay={setBusinessDay} label="Sábado" />
          <BusinessDay initial={businessDays} name="domingo" setBusinessDay={setBusinessDay} label="Domingo" />
        </div>

        <div className="card mb-3">
          <p className="mb-2">Tempo mínimo para reserva</p>
          <div className="flex flex-wrap gap-2">
            {tempoMinimoEmpresa.map((item) => (<RadioButton key={item.value} name="tempo_minimo" selected={formik.values?.tempo_minimo} label={item.label} value={item.value}
              onChange={formik.handleChange} />))}
          </div>
        </div>

        <div className="card mb-3">
          <p className="mb-3">Serviços e Funcionários</p>
          <FileInput initial={empresa.documento} name="documento" placeholder="Escolha um ficheiro" inputEvent={changeDocument}
            value={document?.name || ''} />
        </div>
        <div className="card mb-3">
          <p className="mb-3">Logo da Empresa</p>
          <FileInput initial={empresa.logotipo} name="image" isImage placeholder="Escolha uma imagem" inputEvent={changeImage}
            value={image?.name || ''} />
        </div>
        <div className="flex">
          <button type="submit" className="action-button" to="/admin">
            <span>Salvar</span>
          </button>
        </div>
      </form>
    </div >
  );
};
export default EditEmpresa;
