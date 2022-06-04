import React from "react";
import * as Icons from "react-icons/all";

const StatisticCard = ({ value, title, icon }) => {
  const RenderIcon = Icons[icon]
  return (
    <div className="dashboard-analise-card">
      <div className="dashboard-icon">
        <RenderIcon />
      </div>
      <div className="dashboard-detail">
        <h2>{value}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatisticCard;
