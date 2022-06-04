import React, { useState } from "react";
import FileIcon from "../../assets/svgs/file";
import FileSVG from "../../assets/svgs/image.svg";
import "../style/fileinput.css";

const FileInput = ({ name, label, placeholder, initial, inputEvent, value, isImage, ...rest }) => {
  const [file, setFile] = useState(null)
  const changeDocument = (event) => {
    const ficheiro = event.target.files[0]
    inputEvent(ficheiro)
    setFile(window.URL.createObjectURL(ficheiro))
  }
  const filename = initial?.substring(initial?.lastIndexOf('/') + 1);
  return (
    <label className="file-input flex">
      {isImage && <img className={file || initial ? '' : 'br-0'} src={file || initial || FileSVG} alt="Logo" />}
      <input name={name} type="file" onChange={changeDocument} placeholder="Digite a Resposta" {...rest} />
      {!isImage && <FileIcon />}
      <div className="flex-col justify-center">
        <span>{placeholder}</span>
        <span>{value || filename}</span>
      </div>
    </label>
  );
};
export default FileInput;
