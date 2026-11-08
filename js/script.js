/* =========================================================
   ARDHI. — Personal Portfolio
   JavaScript interactions and welcome intro
   ========================================================= */

// Run this small setup immediately so the welcome intro can cover
// the page before it is first painted (script is loaded synchronously).
// Show the welcome intro once per browser profile. If storage is blocked,
    // the intro still appears for the current visit.
    try {
      if (!localStorage.getItem("monoPortfolioWelcomeSeen")) {
        document.documentElement.classList.add("welcome-pending");
        localStorage.setItem("monoPortfolioWelcomeSeen", "1");
      }
    } catch (error) {
      document.documentElement.classList.add("welcome-pending");
    }

// The original app script was placed at the end of body. Since this file
// is loaded from the document head, wait until the HTML has been parsed.
document.addEventListener("DOMContentLoaded", () => {
// =========================================================
    // Update these values with your real identity and links.
    // =========================================================
    const CONTACT_EMAIL = "ardhiandwi654@gmail.com";

    // Add the two real Spotify share links here before publishing.
    // Playlist embeds show the track list; visitors can click a track inside the player to play it.
    const SPOTIFY_PROFILE_URL = "https://open.spotify.com/user/314os3265wnz2cqlbsytkhthknii";
    const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/59evsF9dUnxAdfBAh55IbG";

    function parseSpotifyContentUrl(value) {
      if (!value || !value.trim()) return null;
      try {
        const parsed = new URL(value.trim());
        const allowedHosts = ["open.spotify.com", "spotify.com", "www.spotify.com"];
        if (!allowedHosts.includes(parsed.hostname.toLowerCase())) return null;
        const parts = parsed.pathname.split("/").filter(Boolean);
        if (parts.length < 2) return null;
        const type = parts[0].toLowerCase();
        const id = parts[1];
        const supportedTypes = ["playlist", "album"];
        if (!supportedTypes.includes(type) || !/^[A-Za-z0-9]+$/.test(id)) return null;
        return { type, id, url: `https://open.spotify.com/${type}/${id}` };
      } catch (error) {
        return null;
      }
    }

    function parseSpotifyProfileUrl(value) {
      if (!value || !value.trim()) return null;
      try {
        const parsed = new URL(value.trim());
        const allowedHosts = ["open.spotify.com", "spotify.com", "www.spotify.com"];
        if (!allowedHosts.includes(parsed.hostname.toLowerCase())) return null;
        const isProfilePath = /^\/(user|profile)\/[A-Za-z0-9_-]+\/?$/i.test(parsed.pathname);
        if (!isProfilePath) return null;
        return { url: `https://open.spotify.com${parsed.pathname.replace(/\/$/, "")}` };
      } catch (error) {
        return null;
      }
    }

    // Spotify links are embedded directly in the HTML so the browser loads
    // the official Spotify player without waiting for JavaScript injection.
    const profileCard = document.getElementById("spotifyProfileCard");
    const playlistOpen = document.getElementById("spotifyPlaylistOpen");
    if (profileCard) profileCard.href = SPOTIFY_PROFILE_URL;
    if (playlistOpen) playlistOpen.href = SPOTIFY_PLAYLIST_URL;

    // Mobile navigation: open, close, and keep the accessibility state in sync.
    const menuToggle = document.getElementById("menuToggle");
    const navLinksMenu = document.getElementById("navLinks");
    function setMobileMenu(open) {
      if (!menuToggle || !navLinksMenu) return;
      navLinksMenu.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      menuToggle.textContent = open ? "×" : "☰";
    }
    if (menuToggle && navLinksMenu) {
      menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        setMobileMenu(!isOpen);
      });
      navLinksMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setMobileMenu(false));
      });
      document.addEventListener("keydown", event => {
        if (event.key === "Escape") setMobileMenu(false);
      });
      document.addEventListener("click", event => {
        if (!navLinksMenu.classList.contains("open")) return;
        if (!navLinksMenu.contains(event.target) && !menuToggle.contains(event.target)) {
          setMobileMenu(false);
        }
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth > 680) setMobileMenu(false);
      });
    }

    // Accessible tabs: click + arrow-key navigation.
    const tabButtons = [...document.querySelectorAll(".tab-button")];
    const portfolioContent = document.getElementById("portfolioContent");
    const tabPanels = {
      projects: `<div class="project-grid">
        <article class="project-card"><div class="project-art"><div class="network-art"><svg viewBox="0 0 420 220" fill="none"><path d="M210 35 L95 105 L210 105 L325 105 M95 105 L55 180 M95 105 L150 180 M210 105 L210 180 M325 105 L270 180 M325 105 L365 180" stroke="#aaa" stroke-width="2"/><g fill="#ddd" stroke="#080808" stroke-width="4"><rect x="185" y="12" width="50" height="42" rx="7"/><rect x="70" y="83" width="50" height="42" rx="7"/><rect x="185" y="83" width="50" height="42" rx="7"/><rect x="300" y="83" width="50" height="42" rx="7"/><rect x="35" y="165" width="40" height="34" rx="5"/><rect x="130" y="165" width="40" height="34" rx="5"/><rect x="190" y="165" width="40" height="34" rx="5"/><rect x="250" y="165" width="40" height="34" rx="5"/><rect x="345" y="165" width="40" height="34" rx="5"/></g></svg></div></div><div class="project-info"><div><span class="project-category">NETWORK SIMULATION</span><h3>GNS3 Network Lab</h3><p>Simulasi topologi dan pengujian konektivitas jaringan.</p></div><button class="project-open" data-project="gns3" aria-label="Lihat detail GNS3 Network Lab">↗</button></div></article>
        <article class="project-card"><div class="project-art"><div class="server-art"><div class="server-unit"><i></i><i></i><i></i></div><div class="server-unit"><i></i><i></i><i></i></div><div class="server-unit"><i></i><i></i><i></i></div></div></div><div class="project-info"><div><span class="project-category">NETWORK CONFIGURATION</span><h3>MikroTik Configuration</h3><p>Praktik wireless, interface, dan konektivitas.</p></div><button class="project-open" data-project="mikrotik" aria-label="Lihat detail MikroTik Configuration">↗</button></div></article>
        <article class="project-card"><div class="project-art"><div class="terminal-art"><span></span><span></span><span></span><span></span><span></span></div></div><div class="project-info"><div><span class="project-category">VIRTUALIZATION</span><h3>Proxmox Lab</h3><p>Eksperimen virtual machine dan container.</p></div><button class="project-open" data-project="proxmox" aria-label="Lihat detail Proxmox Lab">↗</button></div></article>
        <article class="project-card"><div class="project-art"><div class="terminal-art"><span></span><span></span><span></span><span></span><span></span></div></div><div class="project-info"><div><span class="project-category">WEB DEVELOPMENT</span><h3>Personal Portfolio</h3><p>Website untuk mendokumentasikan profil dan karya.</p></div><button class="project-open" data-project="web" aria-label="Lihat detail Personal Portfolio">↗</button></div></article>
      </div>`,
      
      achievements: `<div class="simple-list"><div class="simple-list-item"><div><strong>Pencapaian belajar</strong><br><span>Pencapaian belajar saya selama sekolah.</span></div><span>01 ↗</span></div><div class="simple-list-item"><div><strong>Praktik dan eksperimen</strong><br><span>Dokumentasikan hasil lab atau tugas teknis terbaik.</span></div><span>02 ↗</span></div><div class="simple-list-item"><div><strong>kegiatan</strong><br><span>Kegiatan belajar</span></div><span>03 ↗</span></div></div>`,
      stack: `<div class="tech-cloud"><span class="tech-chip">MikroTik</span><span class="tech-chip">GNS3</span><span class="tech-chip">Cisco Packet Tracer</span><span class="tech-chip">VirtualBox</span><span class="tech-chip">Proxmox</span><span class="tech-chip">Linux</span><span class="tech-chip">HTML</span><span class="tech-chip">CSS</span><span class="tech-chip">Git</span></div>`
    };

    let tabSwitchTimer;
    let tabEnterTimer;
    function activateTab(button, moveFocus = false) {
      const key = button.dataset.tab;
      const alreadySelected = button.getAttribute("aria-selected") === "true";
      if (alreadySelected && !portfolioContent.classList.contains("tab-exit")) {
        if (moveFocus) button.focus();
        return;
      }
      tabButtons.forEach(item => {
        const selected = item === button;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      window.clearTimeout(tabSwitchTimer);
      window.clearTimeout(tabEnterTimer);
      portfolioContent.classList.remove("tab-enter");
      portfolioContent.classList.add("tab-exit");
      portfolioContent.setAttribute("aria-busy", "true");
      portfolioContent.setAttribute("aria-labelledby", button.id);
      if (moveFocus) button.focus();
      tabSwitchTimer = window.setTimeout(() => {
        portfolioContent.innerHTML = tabPanels[key];
        portfolioContent.classList.remove("tab-exit");
        portfolioContent.setAttribute("aria-busy", "false");
        // Force a style recalculation so the incoming slide animation restarts.
        void portfolioContent.offsetWidth;
        portfolioContent.classList.add("tab-enter");
        tabEnterTimer = window.setTimeout(() => portfolioContent.classList.remove("tab-enter"), 520);
      }, 140);
    }
    tabButtons.forEach((button, index) => {
      button.addEventListener("click", () => activateTab(button));
      button.addEventListener("keydown", event => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabButtons.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabButtons.length) % tabButtons.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabButtons.length - 1;
        activateTab(tabButtons[next], true);
      });
    });
    tabButtons.forEach((button, index) => button.tabIndex = index === 0 ? 0 : -1);

    // Project detail modal uses event delegation so it works after tab changes.
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDescription = document.getElementById("modalDescription");
    let lastFocusedElement = null;
    let modalCloseTimer;
    function openProject(key) {
      const project = projects[key];
      if (!project) return;
      window.clearTimeout(modalCloseTimer);
      lastFocusedElement = document.activeElement;
      modalTitle.textContent = project.title;
      modalCategory.textContent = project.category;
      modalDescription.textContent = project.description;
      modal.classList.remove("closing");
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      document.getElementById("modalClose").focus();
    }
    function closeModal() {
      if (!modal.classList.contains("open") || modal.classList.contains("closing")) return;
      modal.classList.add("closing");
      modalCloseTimer = window.setTimeout(() => {
        modal.classList.remove("open", "closing");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (lastFocusedElement) lastFocusedElement.focus();
      }, 180);
    }
    portfolioContent.addEventListener("click", event => {
      const button = event.target.closest("[data-project]");
      if (button) openProject(button.dataset.project);
    });
    document.getElementById("modalClose").addEventListener("click", closeModal);
    document.getElementById("modalDone").addEventListener("click", closeModal);
    modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("open")) closeModal(); });

    // Toast feedback + copy email.
    const toast = document.getElementById("toast");
    let toastTimer;
    function showToast(message) {
      toast.textContent = message;
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
    }
    document.getElementById("copyEmail").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        showToast("Alamat email berhasil disalin.");
      } catch (error) {
        showToast("Email: " + CONTACT_EMAIL + " — salin alamat ini secara manual.");
      }
    });

    // Reveal elements on scroll. Respect reduced-motion preferences.
    const revealItems = document.querySelectorAll(
  ".reveal:not(.hero-copy):not(.hero-visual), .section-heading"
);
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealItems.forEach(item => observer.observe(item));
    } else {
      revealItems.forEach(item => item.classList.add("visible"));
    }

    // Update active navigation based on current section.
    const sections = [...document.querySelectorAll("main section[id]")];
    const navAnchors = [...document.querySelectorAll(".nav-links a")];
    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          navAnchors.forEach(anchor => anchor.classList.toggle("active", anchor.getAttribute("href") === "#" + entry.target.id));
        });
      }, { rootMargin: "-35% 0px -55% 0px" });
      sections.forEach(section => sectionObserver.observe(section));
    }
    document.getElementById("year").textContent = new Date().getFullYear();

   
// First-visit welcome animation
const welcomeScreen = document.getElementById("welcomeScreen");

let welcomeTimer;
let welcomeExitTimer;

function dismissWelcome() {
  if (!document.documentElement.classList.contains("welcome-pending")) return;

  window.clearTimeout(welcomeTimer);
  welcomeScreen.classList.add("is-leaving");

  const finishWelcome = () => {
  welcomeScreen.remove();
  document.documentElement.classList.remove("welcome-pending");
  document.body.style.overflow = "";

  // Mulai animasi halaman utama setelah welcome selesai.
  requestAnimationFrame(() => {
    document.documentElement.classList.add("portfolio-enter");
  });
};

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishWelcome();
  } else {
   welcomeExitTimer = window.setTimeout(finishWelcome, 900);
  }
}

if (
  welcomeScreen &&
  document.documentElement.classList.contains("welcome-pending")
) {
  document.body.style.overflow = "hidden";

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const welcomeDuration = prefersReducedMotion
    ? 650
    : isMobile
      ? 4000
      : 3000;

  welcomeTimer = window.setTimeout(dismissWelcome, welcomeDuration);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dismissWelcome();
    }
  });
}

});
