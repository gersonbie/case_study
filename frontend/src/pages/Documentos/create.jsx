import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';
import FileInput from "../../components/input/FileInput";
import { useAuth } from "../../context";
import { APIKit, uploadFile } from "../../services/api";
import "./create.css";

const CreateDocument = () => {
  const { toast } = useAuth(useAuth);
  const [document, setDocument] = useState(null)
 
  const changeDocument = (file) => {
    setDocument(file)
  }
 
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
    onSubmit: async (values, { resetForm }) => {
      
      try {
        if (document) {
          const toastID = toast.loading('Carregando Documento.');
          const documento = await uploadFile(document)
          values.documento = documento
          toast.dismiss(toastID)
        }
        const toastID = toast.loading('Enviando Dados!');
        APIKit.post('/empresas', values)
          .then(() => { toast.success('Empresa cadastrada com sucesso!'); resetForm() })
          .catch(() => { toast.error('Ocorreu um erro ao cadastrar a empresa!') })
          .finally(() => toast.dismiss(toastID))
      } catch (err) {
        toast.error('Ups, ocorreu um erro ao submeter a empresa!');
      }

    },
  });
  return (
    <div className="container">
      <div className="form-header">
        <h2 className="gradient-text">Actualizar Documentos</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <h3 className="mb-1 gradient-text font-bold">DETALHES DO CLIENTE</h3>
        <p className="mb-4">
          Nesta secção irá preencher informação referentes aos detalhes do
          cliente
        </p>
        <div className="card mb-3">
          <p className="mb-3">Bilhete de Identidades</p>
          <FileInput name="bi" placeholder="Escolha um ficheiro" inputEvent={changeDocument}
            value={document?.name || ''} />
        </div>
        <div className="card mb-3">
          <p className="mb-3">DIRE</p>
          <FileInput name="dire" placeholder="Escolha um ficheiro" inputEvent={changeDocument}
            value={document?.name || ''} />
        </div>
        <div className="card mb-3">
          <p className="mb-3">Passaporte</p>
          <FileInput name="passport" placeholder="Escolha um ficheiro" inputEvent={changeDocument}
            value={document?.name || ''} />
        </div>
        <div className="card mb-3">
          <p className="mb-3">Morada</p>
          <FileInput name="documento" placeholder="Escolha um ficheiro" inputEvent={changeDocument}
            value={document?.name || ''} />
        </div>
        <div className="card mb-3">
          <p className="mb-3">NUIT</p>
          <FileInput name="nuit" placeholder="Escolha um ficheiro" inputEvent={changeDocument}
            value={document?.name || ''} />
        </div>
        <div className="card mb-3">
          <p className="mb-3">Declaração de rendimento</p>
          <FileInput name="Yield" placeholder="Escolha um ficheiro" inputEvent={changeDocument}
            value={document?.name || ''} />
        </div>
        <div className="card mb-3">
          <p className="mb-3">Outros</p>
          <FileInput name="others" placeholder="Escolha um ficheiro" inputEvent={changeDocument}
            value={document?.name || ''} />
        </div>
        <div className="flex">
          <button type="submit" className="action-button" to="/admin">
            <span>Entrar</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateDocument;
