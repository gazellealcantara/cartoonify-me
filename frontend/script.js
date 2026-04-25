let selectedTheme = "classic";
let selectedProducts = [];
let cartoonImageUrl = "";

document.addEventListener("DOMContentLoaded", () => {
  const photoInput = document.getElementById("photo");
  if (photoInput) {
    photoInput.addEventListener("change", () => {
      cartoonImageUrl = "";
    });
  }

  const createBtn = document.getElementById("createBtn");
  if (createBtn) {
    createBtn.addEventListener("click", cartoonifyPhoto);
  }

  const downloadBtn = document.getElementById("downloadInvitationBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadInvitation);
  }

  const downloadCartoonBtn = document.getElementById("downloadCartoonBtn");
  if (downloadCartoonBtn) {
    downloadCartoonBtn.addEventListener("click", downloadCartoon);
  }

  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeResultModal);
  }
});

const THEMES = {
  princess: {
    title: "A Princess Birthday",
    subtitle: "YOU ARE INVITED TO A ROYAL CELEBRATION",
    textShadow: "0 2px 6px rgba(0,0,0,0.6)",
    footerNote: "Bibbidi bobbidi birthday ✨",
    emojis: "✨ 🏰 ✨ 👑 ✨ 🏰 ✨",
    pageSubtitle: "Princess invitation magic 👑",
    titleColor: "#fde68a",
    subtitleColor: "#e5e7eb",
    nameColor: "#ffffff",
    footerColor: "#e7cfa3",
    overlay: "linear-gradient(to bottom, rgba(30,58,138,0.35), rgba(88,28,135,0.20))",
    detailsBg: "rgba(255,255,255,0.94)",
    detailsText: "#5b3f99"
  },

  candyland: {
    title: "A Sweet Celebration",
    subtitle: "JOIN US FOR A CANDY-FILLED PARTY",
    footerNote: "Sweet treats and birthday magic 🎁",
    emojis: "🍭 🍬 🍩 🍭 🍬",
    pageSubtitle: "Candyland party magic 🍭",
    titleColor: "#ffffff",
    textShadow: "0 4px 16px rgba(0,0,0,0.85)",
    subtitleColor: "#ffffff",
    nameColor: "#ff66b2",
    footerColor: "#6b4ca3",
    overlay: "linear-gradient(to bottom, rgba(255,182,193,0.25), rgba(255,240,245,0.12))",
    detailsBg: "rgba(255,255,255,0.88)",
    detailsText: "#5b3f99"
  },

  superhero: {
    title: "A Hero Birthday",
    subtitle: "GET READY FOR A HEROIC CELEBRATION",
    footerNote: "Hero time starts now ⚡",
    emojis: "🦸 ⭐ ⚡ 🦸 ⭐",
    pageSubtitle: "Superhero party power ⚡",
    titleColor: "#facc15",
    subtitleColor: "#ffffff",
    nameColor: "#ffffff",
    footerColor: "#fef08a",
    overlay: `
linear-gradient(to bottom,
  rgba(0,0,0,0.65) 0%,
  rgba(0,0,0,0.35) 25%,
  rgba(0,0,0,0.15) 50%,
  rgba(0,0,0,0.05) 75%,
  rgba(0,0,0,0) 100%
)
`,
    detailsBg: "rgba(255,255,255,0.92)",
    detailsText: "#5b3f99"
  },

  fairyland: {
    title: "A Fairy Birthday",
    subtitle: "YOU ARE INVITED TO A MAGICAL CELEBRATION",
    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
    footerNote: "Whimsy, wonder, and birthday magic ✨",
    emojis: "✨ 🧚 ✨ 🌸 ✨ 🧚 ✨",
    pageSubtitle: "Fairyland birthday magic 🧚",
    titleColor: "#fef3c7",
    subtitleColor: "#e5e7eb",
    nameColor: "#ffffff",
    footerColor: "#fde68a",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.32), rgba(0,0,0,0.18))",
    detailsBg: "rgba(255,255,255,0.94)",
    detailsText: "#5b3f99"
  },

  minecraft: {
    title: "A Blocky Adventure",
    subtitle: "JOIN US FOR A FUN BLOCK PARTY",
    footerNote: "Build, play, and celebrate 🎁",
    emojis: "🧱 ⛏️ 🧱",
    pageSubtitle: "Minecraft-style party fun ⛏️",
    titleColor: "#f9fafb",
    subtitleColor: "#e5e7eb",
    nameColor: "#60a5fa",
    footerColor: "#ca8a04",
    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.15))",
    detailsBg: "rgba(255,255,255,0.96)",
    detailsText: "#1f2937"
  },
  adventure: {
    title: "A Monster Adventure",
    subtitle: "JOIN US FOR A MAGICAL QUEST",
    footerNote: "Adventure awaits ✨",
    emojis: "⚡ 🌟 🐾 ⚡ 🌟",
    pageSubtitle: "Monster adventure begins 🌟",
    titleColor: "#fef08a",
    subtitleColor: "#e5e7eb",
    nameColor: "#ffffff",
    footerColor: "#fde68a",
    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.40), rgba(0,0,0,0.20))",
    detailsBg: "rgba(255,255,255,0.94)",
    detailsText: "#1f2937"
  },
  classic: {
    backgroundStyle: "linear-gradient(to bottom, #f8f8f8, #ffffff)",
    title: "Classic Portrait",
    subtitle: "Clean, natural, and timeless",
    // ADD THESE 👇
    pageSubtitle: "Natural portrait style ✨",
    footerNote: "",
    emojis: "",
    titleColor: "#374151",
    subtitleColor: "#6b7280",
    nameColor: "#111827",
    footerColor: "#6b7280",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.06))",
    detailsBg: "rgba(255,255,255,0.95)",
    detailsText: "#374151",
    textShadow: "none"
  }
};

function generateFileName(prefix, theme) {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${randomString}-${theme}-${prefix}.png`;
}

function openResultModal() {
  const modal = document.getElementById("resultModal");
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeResultModal() {
  const modal = document.getElementById("resultModal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

function downloadCartoon() {
  if (!cartoonImageUrl) {
    alert("Please create the invitation first.");
    return;
  }

  const theme = document.getElementById("theme").value || "cartoon";

  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 6);

  const fileName = `cartoon-${theme}-${timestamp}-${random}.png`;

  const link = document.createElement("a");
  link.href = cartoonImageUrl;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function generateInvitation() {
  const theme = document.getElementById("theme").value;
  const config = THEMES[theme] || THEMES.princess;

  // console.log("theme:", theme);
  // console.log("config title:", config.title);

  const rawDate = document.getElementById("date").value;
  let formattedDate = "June 1, 2026";

  if (rawDate) {
    const dateObj = new Date(rawDate);
    formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  const rawTime = document.getElementById("time").value;
  let formattedTime = "5:00 PM";

  if (rawTime) {
    const [hours, minutes] = rawTime.split(":");
    const date = new Date();
    date.setHours(hours, minutes);

    formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    });
  }

  const location = document.getElementById("location").value || "Clubhouse";
  const rsvp = document.getElementById("rsvp").value || "Mom - 9999999999";
  const photoInput = document.getElementById("photo");
  const file = photoInput && photoInput.files ? photoInput.files[0] : null;
  const name = document.getElementById("name").value || "Princess";
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  const subtitleEl = document.querySelector(".subtitle");
  if (subtitleEl) {
    subtitleEl.innerText = config.pageSubtitle || "";
  }

  let bgImage = "";

  if (cartoonImageUrl) {
    bgImage = cartoonImageUrl;
  } else if (file) {
    bgImage = URL.createObjectURL(file);
  }

  const hasOverlay = bgImage && config.overlay && config.overlay !== "none";
  const cardBackground = bgImage
    ? (hasOverlay ? `${config.overlay}, url('${bgImage}')` : `url('${bgImage}')`)
    : (config.backgroundStyle || config.overlay || "none");
  const backgroundBlendMode = hasOverlay ? "multiply" : "normal";

  const cardStyle = `
    position: relative;
    width: 100%;
    max-width: 760px;
    min-height: 1100px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 32px;

    background: ${cardBackground};
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-blend-mode: ${backgroundBlendMode};

    box-shadow: 0 18px 50px rgba(0,0,0,0.12);
    padding: 72px 28px 160px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
  `;

  const GRADIENTS = {
    superhero: "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.18))",
    princess: "linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.15))",
    fairyland: "linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(255,255,255,0.10))",
    candyland: "linear-gradient(to bottom, rgba(255,182,193,0.45), rgba(255,240,245,0.20))",
    adventure: "linear-gradient(to bottom, rgba(34,197,94,0.35), rgba(59,130,246,0.18))"
  };

  const headerStyle = `
    width: calc(100% - 48px);
    max-width: 620px;
    margin: 0 auto 24px;
    padding: 18px 20px 20px;
    border-radius: 24px;
    background: ${GRADIENTS[theme] || "linear-gradient(to bottom, rgba(0,0,0,0.30), rgba(0,0,0,0.12))"};
    backdrop-filter: blur(4px);
    box-sizing: border-box;
  `;

  const subtitleStyle = `
    text-align: center;
    color: ${config.subtitleColor};
    text-shadow: ${config.textShadow || "none"};
    font-size: 12px;
    letter-spacing: 2px;
    margin-bottom: 10px;
    opacity: 0.9;
  `;

  const titleStyle = `
    text-align: center;
    color: ${config.titleColor};
    text-shadow: 0 3px 12px rgba(0,0,0,0.8);
    font-size: 36px;
    font-weight: 700;
    margin: 6px 0 14px;
    line-height: 1.1;
  `;

  const nameStyle = `
    text-align: center;
    color: ${config.nameColor};
    text-shadow: 0 2px 6px rgba(0,0,0,0.6);
    font-size: 26px;
    font-weight: 700;
  `;

  const detailsStyle = `
    position: absolute;
    left: 50%;
    bottom: 32px;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    max-width: 640px;

    border-radius: 28px;
    background: ${config.detailsBg};
    color: ${config.detailsText};

    box-shadow: 0 10px 28px rgba(0,0,0,0.10);
    padding: 20px;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
    text-align: center;
  `;

  const detailsLineStyle = `
    font-size: 24px;
    font-weight: 700;
    line-height: 1.65;
  `;

  const footerStyle = `
    position: absolute;
    bottom: 12px;
    width: 100%;
    text-align: center;
    color: ${config.footerColor};
    font-style: italic;
    font-size: 14px;
    opacity: 0.85;
    text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  `;

  const output = `
    <div id="invitationCard" style="${cardStyle}">
      <div style="${headerStyle}">
        <div style="
          font-size: 38px;
          line-height: 1;
          text-align: center;
          margin-bottom: 12px;
        ">
          ${config.emojis}
        </div>

        <div style="${subtitleStyle}">
          ${config.subtitle}
        </div>

        <div style="${titleStyle}">
          ${config.title}
        </div>

        <div style="${nameStyle}">
          ${displayName}
        </div>
      </div>

      <div style="${detailsStyle}">
        <div style="${detailsLineStyle}">📅 ${formattedDate}</div>
        <div style="${detailsLineStyle}">⏰ ${formattedTime}</div>
        <div style="${detailsLineStyle}">📍 ${location}</div>
        <div style="${detailsLineStyle}">💌 RSVP: ${rsvp}</div>
      </div>

      <div style="${footerStyle}">
        ${config.footerNote}
      </div>
    </div>
  `;

  const outputEl = document.getElementById("output");
  if (outputEl) {
    outputEl.innerHTML = output;
  }

  openResultModal();
}

function downloadInvitation() {
  const card = document.getElementById("invitationCard");

  if (!card) {
    alert("Please generate the invitation first.");
    return;
  }

  html2canvas(card, {
    backgroundColor: null,
    scale: 2
  }).then((canvas) => {
    const link = document.createElement("a");
    const theme = document.getElementById("theme").value || "invitation";
    link.download = generateFileName("invitation", theme);
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

window.cartoonifyPhoto = async function () {
  const photoInput = document.getElementById("photo");

  if (!photoInput || !photoInput.files || !photoInput.files[0]) {
    alert("Please choose a photo first.");
    return;
  }

  const file = photoInput.files[0];
  const theme = document.getElementById("theme").value;

  const formData = new FormData();
  formData.append("photo", file);
  formData.append("theme", theme);

  const preview = document.getElementById("cartoonPreview");
  if (preview) {
    preview.innerHTML = "<p>Creating your cartoon invitation...</p>";
  }

  try {
    const response = await fetch("http://localhost:3000/cartoonify", {
      method: "POST",
      body: formData
    });

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Backend returned non-JSON response: ${text.slice(0, 120)}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Cartoonify failed.");
    }

    if (!data.imageBase64) {
      throw new Error("No cartoon image returned.");
    }

    cartoonImageUrl = `data:${data.mimeType || "image/png"};base64,${data.imageBase64}`;

    if (preview) {
      preview.innerHTML = "";

      const img = document.createElement("img");
      img.src = cartoonImageUrl;
      img.alt = "Cartoon preview";
      img.style.maxWidth = "280px";
      img.style.borderRadius = "20px";

      preview.appendChild(img);
    }

    generateInvitation();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// =============================
// STEP 1: PRODUCT SELECTION
// =============================

document.addEventListener("DOMContentLoaded", () => {
  const productOptions = document.querySelectorAll('#step-1 .option');
  const nextStep1 = document.getElementById('nextStep1');

  productOptions.forEach(option => {
    option.addEventListener('click', () => {
      const value = option.dataset.value;

      // 🚨 guard (prevents undefined bug)
      if (!value) return;

      if (option.classList.contains('selected')) {
        // REMOVE
        option.classList.remove('selected');
        selectedProducts = selectedProducts.filter(v => v !== value);
      } else {
        // ADD
        option.classList.add('selected');
        selectedProducts.push(value);
      }

      // enable Next only if at least one selected
      if (nextStep1) {
        nextStep1.disabled = selectedProducts.length === 0;
      }

      console.log("Products:", selectedProducts);
    });
  });
});

// =============================
// MODAL OPEN (FIX)
// =============================
function openModal() {
  const modal = document.getElementById('flowModal');
  if (modal) {
    modal.classList.remove('hidden');
  }

  // optional: show step 1 if you're using steps
  const step1 = document.getElementById('step-1');
  if (step1) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    step1.style.display = 'block';
  }
}

// =============================
// STEP 1 → STEP 2 NAVIGATION
// =============================
const nextStep1 = document.getElementById('nextStep1');

if (nextStep1) {
  nextStep1.addEventListener('click', () => {
    // hide step 1
    const step1 = document.getElementById('step-1');
    if (step1) step1.style.display = 'none';

    // show step 2
    const step2 = document.getElementById('step-2');
    if (step2) step2.style.display = 'block';
  });
}

// =============================
// STEP 2: THEME SELECTION
// =============================

document.addEventListener("DOMContentLoaded", () => {
  const themeOptions = document.querySelectorAll('#step-2 .option');
  const themeNextBtn = document.getElementById('themeNextBtn');

  themeOptions.forEach(option => {
    option.addEventListener('click', () => {

      // clear previous selection (single select)
      themeOptions.forEach(o => o.classList.remove('selected'));

      // select current
      option.classList.add('selected');

      const theme = option.dataset.theme;

      // 🚨 guard (prevents undefined)
      if (!theme) return;

      selectedTheme = theme;

      // enable next
      if (themeNextBtn) {
        themeNextBtn.disabled = false;
      }

      console.log("Theme:", selectedTheme);
    });
  });
});

const track = document.querySelector('.card-grid.options');

document.querySelector('.arrow.left').addEventListener('click', () => {
  track.scrollBy({ left: -200, behavior: 'smooth' });
});

document.querySelector('.arrow.right').addEventListener('click', () => {
  track.scrollBy({ left: 200, behavior: 'smooth' });
});