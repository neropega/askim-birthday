"use strict";
(() => {
  const notes = [
  {
    "title": "You feel like home",
    "emoji": "🏠",
    "body": "Having you in my arms, cuddling with you and putting my head on your chest always feels like home 😘😘😘🏠🏠🏠 You make me feel soooo calm and fall asleep so easily, like you’ve put a spell on me 😴😴😴✨✨✨"
  },
  {
    "title": "You notice the little things",
    "emoji": "🥰",
    "body": "You notice small things about me that no one else knows about, not even me 🥰🥰🥰 You are always soooo thoughtful, and I can always feel how much you care about my happiness ❤️❤️❤️"
  },
  {
    "title": "Plushy Yigit 🧸",
    "emoji": "🧸",
    "body": "I love how you always keep photos or plushy Yigit around. It’s soooo cute and I love it baby ❤️❤️❤️❤️"
  },
  {
    "title": "Sharing your world with me 📺",
    "emoji": "📺",
    "body": "I love watching Hong Kong series with you, especially Unholy Alliance ❤️❤️❤️ It means soooo much that you love watching them all over again with me and sharing something you enjoy 🥰🥰🥰"
  },
  {
    "title": "Your smile and your heart",
    "emoji": "🤭",
    "body": "You have the cutest smile and the biggest heart in the world. I know because I live there 🤭🤭🤭❤️❤️❤️"
  }
];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const magicLayer = document.querySelector(".magic-layer");

  function sprinkle(origin, symbols = ["✦", "✧", "♡"], count = 16) {
    if (reducedMotion.matches || !magicLayer || !origin) return;
    const r = origin.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");
      particle.className = "magic-particle";
      particle.textContent = symbols[i % symbols.length];
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.setProperty("--x", (Math.random() - .5) * 250 + "px");
      particle.style.setProperty("--y", -(70 + Math.random() * 180) + "px");
      particle.style.setProperty("--size", (13 + Math.random() * 15) + "px");
      particle.style.setProperty("--spin", (Math.random() - .5) * 140 + "deg");
      particle.style.setProperty("--duration", (1200 + Math.random() * 600) + "ms");
      magicLayer.append(particle);
      particle.addEventListener("animationend", () => particle.remove(), { once: true });
      window.setTimeout(() => particle.remove(), 2200);
    }
  }

  document.querySelectorAll(".memory-card").forEach(card => {
    card.addEventListener("click", () => {
      const flipped = card.getAttribute("aria-expanded") !== "true";
      card.classList.toggle("is-flipped", flipped);
      card.setAttribute("aria-expanded", String(flipped));
      card.querySelector(".memory-front").setAttribute("aria-hidden", String(flipped));
      card.querySelector(".memory-back").setAttribute("aria-hidden", String(!flipped));
    });
  });

  let noteIndex = 0;
  let noteTimer;
  const noteCard = document.querySelector(".love-note");
  const nextNoteButton = document.querySelector("#next-note");
  function showNote(index) {
    noteIndex = (index + notes.length) % notes.length;
    window.clearTimeout(noteTimer);
    noteCard.classList.add("is-changing");
    const render = () => {
      const note = notes[noteIndex];
      document.querySelector("#note-title").textContent = note.title;
      document.querySelector("#note-body").textContent = note.body;
      document.querySelector("#note-emoji").textContent = note.emoji;
      document.querySelector("#note-counter").textContent = String(noteIndex + 1).padStart(2, "0") + " / " + String(notes.length).padStart(2, "0");
      document.querySelectorAll(".note-dot").forEach((dot, i) => {
        dot.classList.toggle("is-current", i === noteIndex);
        dot.setAttribute("aria-pressed", String(i === noteIndex));
      });
      noteCard.classList.remove("is-changing");
    };
    if (reducedMotion.matches) render();
    else noteTimer = window.setTimeout(render, 140);
  }
  nextNoteButton.addEventListener("click", () => {
    showNote(noteIndex + 1);
    sprinkle(nextNoteButton, ["♡", "✧"], 7);
  });
  document.querySelectorAll("[data-note]").forEach(button => button.addEventListener("click", () => showNote(Number(button.dataset.note))));

  const gallery = document.querySelector(".gallery-strip");
  document.querySelectorAll("[data-gallery-step]").forEach(button => button.addEventListener("click", () => {
    const first = gallery.querySelector(".gallery-polaroid");
    const gap = parseFloat(getComputedStyle(gallery).gap) || 24;
    gallery.scrollBy({left: Number(button.dataset.galleryStep) * (first.offsetWidth + gap), behavior: reducedMotion.matches ? "auto" : "smooth"});
  }));

  const dialogs = document.querySelectorAll("dialog");
  function openDialog(dialog) {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function closeDialog(dialog) {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }
  dialogs.forEach(dialog => {
    dialog.querySelector("[data-close]").addEventListener("click", () => closeDialog(dialog));
    dialog.addEventListener("click", event => {
      const r = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) closeDialog(dialog);
    });
  });
  document.querySelector(".secret-star").addEventListener("click", event => {
    openDialog(document.querySelector("#secret-dialog"));
    sprinkle(event.currentTarget, ["♡", "✦", "❤️"], 24);
  });
  document.querySelectorAll("[data-lightbox]").forEach(button => button.addEventListener("click", () => {
    const view = document.querySelector("#photo-view");
    view.replaceChildren(button.querySelector(".photo-window").cloneNode(true));
    view.querySelector("img").loading = "eager";
    document.querySelector("#photo-caption").textContent = button.dataset.caption;
    openDialog(document.querySelector("#photo-dialog"));
  }));

  const sleepButton = document.querySelector("#sleep-spell");
  sleepButton.addEventListener("click", () => {
    sleepButton.classList.remove("is-sleepy");
    void sleepButton.offsetWidth;
    sleepButton.classList.add("is-sleepy");
    document.querySelector("#sleep-message").textContent = "Spell successful. Boyfriend is asleep 😴😴😴";
    sprinkle(sleepButton, ["✦", "✧", "✨", "☾"], 26);
  });

  const envelope = document.querySelector("#birthday-envelope");
  envelope.addEventListener("toggle", () => {
    const label = envelope.querySelector(".envelope-instruction");
    label.innerHTML = envelope.open ? 'close your letter <span aria-hidden="true">♡</span>' : 'tap to open your letter <span aria-hidden="true">💌</span>';
    if (envelope.open) {
      sprinkle(envelope.querySelector(".wax-seal"), ["♡", "✦", "❤️"], 18);
    }
  });

  const surprise = document.querySelector("#surprise-details");
  surprise.addEventListener("toggle", () => {
    if (surprise.open) sprinkle(surprise.querySelector("summary"), ["❤️", "✦", "♡"], 26);
  });

  let scrollQueued = false;
  function updateProgress() {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    document.querySelector(".reading-progress span").style.transform = "scaleX(" + (height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0) + ")";
    scrollQueued = false;
  }
  window.addEventListener("scroll", () => {
    if (!scrollQueued) { scrollQueued = true; window.requestAnimationFrame(updateProgress); }
  }, { passive: true });
  window.addEventListener("resize", updateProgress);
  window.addEventListener("load", updateProgress, { once: true });
  updateProgress();
})();
