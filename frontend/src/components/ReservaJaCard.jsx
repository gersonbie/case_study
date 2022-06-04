import React from "react";
import CardStyle from "../assets/svgs/cardstyle";
import { formatMoney } from "../utils";

const ReservaJaCard = ({ pacote, expiracao, faturamento }) => {
  return (
    <div className="reservaja-card">
      <div className="card-container">
        <div className="flex-col text-right">
          <span className="font-bold uppercase">{pacote}</span>
          <span className="">{expiracao}</span>
        </div>
        <div className="flex-col card-bill">
          <span className="uppercase font-semibold">Total faturado</span>
          <span className="font-bold uppercase">{formatMoney(faturamento)}</span>
        </div>
      </div>
      <CardStyle />
    </div>
  );
};

export default ReservaJaCard;
