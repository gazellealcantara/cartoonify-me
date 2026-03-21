const THEMES = {
  princess: {
    backgroundStyle: "linear-gradient(to bottom, #f7ecff, #ffeef6)",
    title: "A Princess Birthday",
    subtitle: "You are invited to a royal celebration",
    emojis: "✨ 🏰 ✨ 👑 ✨ 🏰 ✨",
    footerNote: "Bibbidi bobbidi birthday ✨",
    accentColor: "#d06aa2",
    pageSubtitle: "Princess invitation magic ✨"
  },

  candy: {
    backgroundStyle: "linear-gradient(to bottom, #fff0f5, #ffe4e1)",
    title: "A Sweet Celebration",
    subtitle: "Join us for a candy-filled party",
    emojis: "🍭 🍬 🍩 🍭 🍬",
    footerNote: "Sweet treats and birthday magic 🍭",
    accentColor: "#ff4fa3",
    pageSubtitle: "Candyland party magic 🍭"
  },
  superhero: {
    backgroundStyle: "linear-gradient(to bottom, #e0f2ff, #ffe8e8)",
    title: "A Hero Birthday",
    subtitle: "Suit up for an epic celebration",
    emojis: "🦸 ⭐ ⚡ 🦸 ⭐",
    footerNote: "Hero time starts now ⚡",
    accentColor: "#3b82f6",
    pageSubtitle: "Superhero party power ⚡"
  }
};

function generateInvitation() {
  const theme = document.getElementById("theme").value;
  const config = THEMES[theme] || THEMES.princess;

  const date = document.getElementById("date").value || "June 18";
  const time = document.getElementById("time").value || "5:00 PM";
  const rsvp = document.getElementById("rsvp").value || "Mom";
  const file = document.getElementById("photo").files[0];
  const name = document.getElementById("name").value || "Princess";
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  document.querySelector(".subtitle").innerText = config.pageSubtitle;

  let imageHTML = `
    <div class="photo-frame">
      <div style="
        width:100%;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius:999px;
        background:${config.backgroundStyle};
        font-size:22px;
        color:#a78bc9;
        text-align:center;
        padding:20px;
        box-sizing:border-box;
      ">
        📷<br />Your photo here
      </div>
    </div>
  `;

  if (file) {
    const url = URL.createObjectURL(file);
    imageHTML = `
      <div class="photo-frame">
        <img src="${url}" alt="Uploaded photo" />
      </div>
    `;
  }

  const output = `
    <div id="invitationCard" style="background: ${config.backgroundStyle};">
      <div class="castle">${config.emojis}</div>
      <div class="invite-top">${config.subtitle}</div>
      <div class="invite-title">${config.title}</div>
      <div class="invite-name" style="color: ${config.accentColor};">${displayName}</div>

      ${imageHTML}

      <div class="details">
        <div class="detail-line">📅 <strong>${date}</strong></div>
        <div class="detail-line">⏰ <strong>${time}</strong></div>
        <div class="detail-line">💌 RSVP: <strong>${rsvp}</strong></div>
      </div>

      <div class="footer-note">${config.footerNote}</div>
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
