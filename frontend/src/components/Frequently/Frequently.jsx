import React from "react";
import Accordion from "../Section/Accordion";
import { useTranslation } from "react-i18next";
import "../Frequently/Frequently.css";

function Frequently() {
  const { t } = useTranslation();
  const data = t("faq.items", { returnObjects: true });

  return (
    <div className="accordion-wrapper">
      <div className="container">
        <h2>{t("faq.title")}</h2>
        {data.map((item, index) => (
          <Accordion 
            key={index} 
            title={item.title} 
            content={item.content} 
          />
        ))}
      </div>
    </div>
  );
}

export default Frequently;
  