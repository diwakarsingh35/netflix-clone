import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../components/Banner/Banner.css';

export default function Banner() {
  const { t } = useTranslation();

  return (
    <header className="banner">
      <div className='container'>
        <div className="banner_contents_centered">
          <h1 className="banner_title">{t("banner.title")}</h1>
          <p className="banner_subtitle">{t("banner.subtitle")}</p>
          <p className="banner_text">{t("banner.text")}</p>
          <div className="banner_email_form">
            <input
              type="email"
              placeholder="Email address"
              className="banner_email_input"
            />
            <button className="banner_getStarted_button">
              {t("banner.getStarted")} 
            </button>
          </div>
        </div>
        <div className="banner--fadeBottom" />
        <div className="banner-shape"></div>
      </div>
    </header>
  );
}
