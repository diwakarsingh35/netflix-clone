import React from "react";
import { useTranslation } from "react-i18next";
import Join from "../join/join";
import '../MoreReasons/MoreReasons.css'
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";

const MoreReasons = () => {
  const { t } = useTranslation();

  const reasons = t("moreReasons.reasons", { returnObjects: true });

  return (
    <div className="more-reasons-section">
     <div className="container">
      <h2 className="reasons-title">{t("moreReasons.title")}</h2>
      <div className="d-flex justify-content-center">
        {reasons.map((reason, index) => (
          <Join
            key={index}
            title={reason.title}
            description={reason.description}
            image={[icon1, icon2, icon3, icon4][index]}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default MoreReasons; 
