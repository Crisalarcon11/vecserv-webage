// ====== Config (según tu PDF) ======
const COMPANY = {
  name: "VEC Services",
  slogan: "Soluciones inmediatas",
  phonePrimary: "0997799132",
  phoneSecondary: "0991767541",
  email: "vecservice@yahoo.com",
  ruc: "0916570195001",
  address: "M-18, Tarifa, Samborondón"
};

const WHATSAPP_MSG = encodeURIComponent(
  "Hola, quiero una cotización para un proyecto. ¿Podemos coordinar una visita técnica?"
);

function toWaUrl(phoneDigits){
  const digits = String(phoneDigits).replace(/\D/g,"");
  return `https://wa.me/593${digits.startsWith("0") ? digits.slice(1) : digits}?text=${WHATSAPP_MSG}`;
}

function initCommon(){
  // Año footer
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();

  // Menú móvil
  const burger = document.getElementById("burger");
  const mobilePanel = document.getElementById("mobilePanel");
  if(burger && mobilePanel){
    burger.addEventListener("click", () => mobilePanel.classList.toggle("show"));
    mobilePanel.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => mobilePanel.classList.remove("show"));
    });
  }

  // WhatsApp flotante
  const waFloat = document.getElementById("waFloat");
  if(waFloat) waFloat.href = toWaUrl(COMPANY.phonePrimary);
}

function initContactPage(){
  // Inyectar datos
  const phone1 = document.getElementById("phone1");
  const phone2 = document.getElementById("phone2");
  const email = document.getElementById("emailText");
  const ruc = document.getElementById("rucText");
  const addr = document.getElementById("addrText");
  if(phone1) phone1.textContent = COMPANY.phonePrimary;
  if(phone2) phone2.textContent = COMPANY.phoneSecondary;
  if(email) email.textContent = COMPANY.email;
  if(ruc) ruc.textContent = COMPANY.ruc;
  if(addr) addr.textContent = COMPANY.address;

  // Botón WhatsApp
  const waBtn = document.getElementById("waQuoteBtn");
  if(waBtn) waBtn.href = toWaUrl(COMPANY.phonePrimary);

  // Formulario mailto (sin backend)
  const form = document.getElementById("quoteForm");
  const err = document.getElementById("formError");
  const ok = document.getElementById("formSuccess");
  if(!form) return;

  function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(err) err.style.display = "none";
    if(ok) ok.style.display = "none";

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const mail = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    if(!name || !phone || !isEmail(mail)){
      if(err) err.style.display = "block";
      return;
    }

    const subject = encodeURIComponent(`Cotización - ${service}`);
    const body = encodeURIComponent(
`Nombre: ${name}
Teléfono: ${phone}
Correo: ${mail}
Tipo de proyecto: ${service}

Detalles:
${message || "(Sin detalles adicionales)"}

Enviado desde la web de ${COMPANY.name}.`
    );

    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    if(ok) ok.style.display = "block";
    form.reset();
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  initCommon();
  if(document.body.dataset.page === "contacto") initContactPage();
});
