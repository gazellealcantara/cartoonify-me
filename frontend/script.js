const THEMES = {
  princess: {
    title: "A Princess Birthday",
    subtitle: "YOU ARE INVITED TO A ROYAL CELEBRATION",
    footerNote: "Bibbidi bobbidi birthday ✨",
    emojis: "✨ 🏰 ✨ 👑 ✨ 🏰 ✨",
    pageSubtitle: "Princess invitation magic ✨",
    titleColor: "#f3c98b",
    subtitleColor: "#f3f4f6",
    nameColor: "#ffffff",
    footerColor: "#fde68a",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.28), rgba(0,0,0,0.10))",
    detailsBg: "rgba(255,255,255,0.90)",
    detailsText: "#5b3f99"
  },

  candy: {
    title: "A Sweet Celebration",
    subtitle: "JOIN US FOR A CANDY-FILLED PARTY",
    footerNote: "Sweet treats and birthday magic 🎁",
    emojis: "🍭 🍬 🍩 🍭 🍬",
    pageSubtitle: "Candyland party magic 🍭",
    titleColor: "#6b4ca3",
    subtitleColor: "#0f5e9c",
    nameColor: "#ff4fa3",
    footerColor: "#6b4ca3",
    overlay: "linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0.08))",
    detailsBg: "rgba(255,255,255,0.88)",
    detailsText: "#5b3f99"
  },

  superhero: {
    title: "A Hero Birthday",
    subtitle: "SUIT UP FOR AN EPIC CELEBRATION",
    footerNote: "Hero time starts now ⚡",
    emojis: "🦸 ⭐ ⚡ 🦸 ⭐",
    pageSubtitle: "Superhero party power ⚡",
    titleColor: "#facc15",
    subtitleColor: "#ffffff",
    nameColor: "#ef4444",
    footerColor: "#fef08a",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.20), rgba(0,0,0,0.05))",
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

  roblox: {
    title: "A Block Party",
    subtitle: "JOIN US FOR A PLAYFUL CELEBRATION",
    footerNote: "Build, play, and celebrate 🎁",
    emojis: "🧱 ⭐ 🎮 ⭐ 🧱",
    pageSubtitle: "Roblox-style party fun 🎮",
    titleColor: "#111827",
    subtitleColor: "#6b7280",
    nameColor: "#2563eb",
    footerColor: "#f59e0b",
    overlay: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    detailsBg: "rgba(255,255,255,0.92)",
    detailsText: "#5b3f99"
  }
};

let cartoonImageUrl = "";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("photo").addEventListener("change", () => {
    cartoonImageUrl = "";
  });
});

function generateInvitation() {
  const theme = document.getElementById("theme").value;
  const config = THEMES[theme] || THEMES.princess;

  const date = document.getElementById("date").value || "June 18";
  const time = document.getElementById("time").value || "17:00";
  const rsvp = document.getElementById("rsvp").value || "Mom";
  const file = document.getElementById("photo").files[0];
  const name = document.getElementById("name").value || "Princess";
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  document.querySelector(".subtitle").innerText = config.pageSubtitle || "";

  let bgImage = "";
  let characterImage = "";

  if (cartoonImageUrl) {
    bgImage = cartoonImageUrl;
    characterImage = cartoonImageUrl;
  } else if (file) {
    const url = URL.createObjectURL(file);
    bgImage = url;
    characterImage = url;
  }

  const cardStyle = `
    position: relative;
    width: 100%;
    max-width: 760px;
    min-height: 1100px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 32px;
  
    background-image: ${bgImage ? `${config.overlay}, url('${bgImage}')` : config.overlay};
    background-size: cover;
    background-position: center 20%;
    background-repeat: no-repeat;
  
    box-shadow: 0 18px 50px rgba(0,0,0,0.12);
    padding: 48px 28px 34px;
    box-sizing: border-box;
  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
  `;

  const subtitleStyle = `
    text-align: center;
    color: ${config.subtitleColor};
    text-shadow: ${config.textShadow || "none"};
    font-size: 12px;
    letter-spacing: 2px;
  `;

  const titleStyle = `
    text-align: center;
    color: ${config.titleColor};
    text-shadow: ${config.textShadow || "none"};
    font-size: 36px;
    font-weight: 700;
  
    margin-top: 8px;
    margin-bottom: 8px;
  `;

  const nameStyle = `
    text-align: center;
    color: ${config.nameColor};
    text-shadow: ${config.textShadow || "0 2px 6px rgba(0,0,0,0.6)"};
    font-size: 26px;
    font-weight: 700;
    margin-top: 4px;
  `;

  const characterStyle = `
    margin-top: 34px;
    width: 100%;
    display: flex;
    justify-content: center;
  `;

  const characterImgStyle = `
    max-width: 78%;
    max-height: 520px;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 10px 28px rgba(0,0,0,0.14));
  `;

  const placeholderStyle = `
    width: 78%;
    max-width: 520px;
    min-height: 420px;
    border-radius: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    background: rgba(255,255,255,0.18);
    border: 2px dashed rgba(255,255,255,0.35);
    color: rgba(255,255,255,0.9);
    font-size: 24px;
    font-weight: 600;
    text-shadow: 0 2px 10px rgba(0,0,0,0.25);
    backdrop-filter: blur(4px);
  `;

  const detailsStyle = `
    position: absolute;
    left: 50%;
    bottom: 32px;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    max-width: 640px;
  
    border-radius: 32px;
    background: ${config.detailsBg};
    color: ${config.detailsText};
  
    box-shadow: 0 10px 28px rgba(0,0,0,0.10);
    padding: 24px;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
    background: rgba(255,255,255,0.88);
  
    text-align: center;
  `;

  const footerStyle = `
    position: absolute;
    bottom: 36px;
    width: 100%;
    text-align: center;
    color: ${config.footerColor};
    font-style: italic;
    font-size: 16px;
    opacity: 0.95;
    text-shadow: 0 2px 6px rgba(0,0,0,0.5);
  `;

  const detailsLineStyle = `
    font-size: 24px;
    font-weight: 700;
    line-height: 1.9;
  `;

  const characterHTML = "";

  const output = `
  <div id="invitationCard" style="
    ${cardStyle};
    position: relative;
    overflow: hidden;
    padding-bottom: 160px;
  ">

    <div style="
      font-size:38px;
      line-height:1;
      text-align:center;
      margin-bottom: 8px;
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

    <!-- DETAILS (anchored bottom) -->
    <div style="${detailsStyle}">
      <div style="${detailsLineStyle}">📅 ${date}</div>
      <div style="${detailsLineStyle}">⏰ ${time}</div>
      <div style="${detailsLineStyle}">💌 RSVP: ${rsvp}</div>
    </div>

    <!-- FOOTER (anchored bottom-most) -->
    <div style="${footerStyle}">
      ${config.footerNote}
    </div>

  </div>
`;

  document.getElementById("output").innerHTML = output;
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
      }).then(canvas => {
        const link = document.createElement("a");
        link.download = "princess-invitation.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }

window.cartoonifyPhoto = async function () {  
  const file = document.getElementById("photo").files[0];
  const theme = document.getElementById("theme").value;

  if (!file) {
    alert("Please choose a photo first.");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);
  formData.append("theme", theme);

  document.getElementById("cartoonPreview").innerHTML = "<p>Cartoonifying...</p>";

  try {
    const response = await fetch("http://localhost:3000/cartoonify", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Cartoonify failed.");
    }

    if (!data.imageBase64) {
      throw new Error("No cartoon image returned.");
    }

    cartoonImageUrl = `data:${data.mimeType || "image/png"};base64,${data.imageBase64}`;

    document.getElementById("cartoonPreview").innerHTML = `
      <img src="${cartoonImageUrl}" alt="Cartoon preview" style="max-width:280px; border-radius:20px;" />
    `;

    // 👇 AUTO-UPDATE INVITATION
    generateInvitation();

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
