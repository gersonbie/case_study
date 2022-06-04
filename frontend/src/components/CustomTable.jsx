import React from "react";
import Lottie from 'react-lottie'
import emptyAnimation from '../assets/lottie/empty.json'
import { resolveNestedAtribute } from "../utils";
import Container from "./Container";
import "./style/table.css";

const CustomTable = ({ header, items = [], menuItems = () => [] }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className="scroll-x">
      <table className="table">
        <thead>
          <tr className="cor">
            {header.map((head) => (
              <th key={head.key}>{head.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <Container key={index} menuItems={menuItems(item)}>
              {header.map((head) => (
                <td key={head.key}>{head.component ? head.component(item) : resolveNestedAtribute(item, head.key)}</td>
              ))}
            </Container>
          ))}
          {items?.length === 0 ? <tr><td colSpan={header.length}>
            <Lottie options={defaultOptions}
              height={300}
              width={300} />
            <p className="text-center mb-4">Nenhum registo encontrado!</p>
          </td></tr> : null}
        </tbody>
      </table>
    </div>
  );
};
export default CustomTable;
