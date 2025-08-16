import React from "react";
import "../Footer/Footer.css";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <button className="signup-btn">{t("footer.finishSignUp")}</button>
      </div>

      <div className="footer-contact">
        {t("footer.questions")}{" "}
        <a href="tel:000-800-919-1743">000-800-919-1743</a>
      </div>

      <div className="footer-links">
        <ul>
          <li><a href="#">{t("footer.links.faq")}</a></li>
          <li><a href="#">{t("footer.links.investorRelations")}</a></li>
          <li><a href="#">{t("footer.links.privacy")}</a></li>
          <li><a href="#">{t("footer.links.speedTest")}</a></li>
        </ul>
        <ul>
          <li><a href="#">{t("footer.links.helpCentre")}</a></li>
          <li><a href="#">{t("footer.links.jobs")}</a></li>
          <li><a href="#">{t("footer.links.cookiePreferences")}</a></li>
          <li><a href="#">{t("footer.links.legalNotices")}</a></li>
        </ul>
        <ul>
          <li><a href="#">{t("footer.links.account")}</a></li>
          <li><a href="#">{t("footer.links.waysToWatch")}</a></li>
          <li><a href="#">{t("footer.links.corporateInfo")}</a></li>
          <li><a href="#">{t("footer.links.onlyOnNetflix")}</a></li>
        </ul>
        <ul>
          <li><a href="#">{t("footer.links.mediaCentre")}</a></li>
          <li><a href="#">{t("footer.links.termsOfUse")}</a></li>
          <li><a href="#">{t("footer.links.contactUs")}</a></li>
        </ul>
      </div>

      <div className="footer-bottom">
        <select className="language-select" onChange={changeLanguage}>
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
        <p>{t("footer.netflixIndia")}</p>
      </div>
    </footer>
  );
}

export default Footer;
