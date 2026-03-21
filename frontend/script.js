    function generateInvitation() {
      const name = document.getElementById("name").value || "Princess";
      const date = document.getElementById("date").value || "June 18";
      const time = document.getElementById("time").value || "5:00 PM";
      const rsvp = document.getElementById("rsvp").value || "Mom";
      const file = document.getElementById("photo").files[0];

      let imageHTML = `
        <div class="photo-frame">
          <div style="
            width:100%;
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:999px;
            background:linear-gradient(to bottom right, #f9f2ff, #fff7fb);
            font-size:22px;
            color:#a78bc9;
            text-align:center;
            padding:20px;
            box-sizing:border-box;
          ">
            👑<br />Your princess photo here
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
        <div id="invitationCard">
          <div class="castle">🏰 ✨ 👑 ✨ 🏰</div>
          <div class="invite-top">You are invited to a royal celebration</div>
          <div class="invite-title">A Princess Birthday</div>
          <div class="invite-name">${name}</div>

          ${imageHTML}

          <div class="details">
            <div class="detail-line">📅 <strong>${date}</strong></div>
            <div class="detail-line">⏰ <strong>${time}</strong></div>
            <div class="detail-line">💌 RSVP: <strong>${rsvp}</strong></div>
          </div>

          <div class="footer-note">Bibbidi bobbidi birthday ✨</div>
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
