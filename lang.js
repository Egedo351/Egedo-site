(function(){
  const dict = {
    en: {
      "nav.about": "About Us",
      "nav.health": "Health",
      "nav.holidays": "Travels & Holidays",
      "nav.gastronomy": "Gastronomy",
      "nav.sport": "Sport",

      "health.title": "Health Tourism",
      "health.lead": "We connect you with trusted clinics and experienced doctors for a smooth, well-organized journey—from travel planning to on-site assistance and follow-up. Our network focuses on quality, safety, and transparent communication."
    },
    tr: {
      "nav.about": "Hakkımızda",
      "nav.health": "Sağlık",
      "nav.holidays": "Seyahat & Tatiller",
      "nav.gastronomy": "Gastronomi",
      "nav.sport": "Spor",

      "health.title": "Sağlık Turizmi",
      "health.lead": "Seyahatin planlanmasından yerinde refakat ve takip süreçlerine kadar, güvenilir klinikler ve deneyimli doktorlarla sorunsuz ve iyi organize edilmiş bir yolculuk sunuyoruz. Ağımız; kalite, güvenlik ve şeffaf iletişime odaklanır."
    }
  };

  const getLang = () =>
    new URLSearchParams(location.search).get("lang") ||
    localStorage.getItem("egedo_lang") || "en";

  function apply(lang){
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      const val = dict[lang] && dict[lang][key];
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll(".lang-btn").forEach(b=>b.classList.remove("active"));
    const btn = document.querySelector(`[data-lang="${lang}"]`);
    if (btn) btn.classList.add("active");
    localStorage.setItem("egedo_lang", lang);
  }

  window.egedoSetLang = (lang)=>apply(lang);
  document.addEventListener("DOMContentLoaded", ()=>apply(getLang()));
})();
