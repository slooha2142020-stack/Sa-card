const nameInput = document.getElementById("name");
const sendBtn = document.getElementById("sendBtn");
const error = document.getElementById("error");
const result = document.getElementById("result");
const cardBox = document.querySelector(".card-box");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("downloadBtn");
const backBtn = document.getElementById("backBtn");

let selectedCard = "cards/card1.jpeg";

document.querySelectorAll(".card-option").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".card-option").forEach(x => x.classList.remove("selected"));
    btn.classList.add("selected");
    selectedCard = btn.dataset.card;
  });
});

sendBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (!name) {
    error.textContent = "فضلاً اكتب اسمك أولاً 🌷";
    nameInput.focus();
    return;
  }
  error.textContent = "";

  const img = new Image();
  img.onload = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // مكان الاسم في البطاقة: داخل المستطيل الأبيض أسفل عبارة "وكل عام وأنتم بخير".
    // الإحداثيات محسوبة على الصورة المرفقة (1008 × 1536).
    const x = canvas.width * 0.50;
    const y = canvas.height * 0.667;
    const maxWidth = canvas.width * 0.39;

    let fontSize = Math.round(canvas.width * 0.040);
    ctx.font = `700 ${fontSize}px Tahoma, Arial, sans-serif`;
    ctx.fillStyle = "#174b59";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    while (ctx.measureText(name).width > maxWidth && fontSize > 18) {
      fontSize -= 1;
      ctx.font = `700 ${fontSize}px Tahoma, Arial, sans-serif`;
    }

    ctx.fillText(name, x, y);

    cardBox.classList.add("hidden");
    document.querySelector(".hero").classList.add("hidden");
    result.classList.remove("hidden");
    window.scrollTo({top: 0, behavior: "smooth"});
  };
  img.onerror = () => {
    error.textContent = "تعذر تحميل البطاقة. تأكدي أن ملف البطاقة موجود داخل مجلد cards.";
  };
  img.src = selectedCard;
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `بطاقة-تهنئة-${nameInput.value.trim()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});

backBtn.addEventListener("click", () => {
  result.classList.add("hidden");
  cardBox.classList.remove("hidden");
  document.querySelector(".hero").classList.remove("hidden");
  window.scrollTo({top: 0, behavior: "smooth"});
});
