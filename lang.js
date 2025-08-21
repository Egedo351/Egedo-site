(function(){
  const dict = {
    en: {
      "nav.about": "About Us",
      "nav.health": "Health",
      "nav.holidays": "Travels & Holidays",
      "nav.gastronomy": "Gastronomy",
      "nav.sport": "Sport"
    },
    tr: {
      "nav.about": "Hakkımızda",
      "nav.health": "Sağlık",
      "nav.holidays": "Seyahat & Tatiller",
      "nav.gastronomy": "Gastronomi",
      "nav.sport": "Spor"
    }
  };

  const getLang = () =>
    new URLSearchParams(location.search).get("lang") ||
    localStorage.getItem("egedo_lang") || "en";

  function apply(lang){
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      if (dict[lang] && dict[lang][key] != null) el.textContent = dict[lang][key];
    });
    document.querySelectorAll(".lang-btn").forEach(b=>b.classList.remove("active"));
    const btn = document.querySelector(`[data-lang="${lang}"]`);
    if (btn) btn.classList.add("active");
    localStorage.setItem("egedo_lang", lang);
  }

  window.egedoSetLang = (lang)=>apply(lang);

  document.addEventListener("DOMContentLoaded", ()=>apply(getLang()));
})();
