(function(){
  const ul = document.querySelector('.card-list');
  if(!ul) return;
  ul.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mouseenter', ()=> ul.classList.add('paused'));
    card.addEventListener('mouseleave', ()=> ul.classList.remove('paused'));
    // accessibility: pause on keyboard focus
    card.addEventListener('focusin', ()=> ul.classList.add('paused'));
    card.addEventListener('focusout', ()=> ul.classList.remove('paused'));
  });
})();
document.addEventListener('DOMContentLoaded', () => {
  const ul = document.querySelector('.card-list');
  const descriptions = document.querySelectorAll('.card-desc');
  console.log('JS loaded, card-list found?', !!ul, 'descriptions:', descriptions.length);

  if (!ul) {
    console.error('Nessun .card-list trovato. Verifica il selettore e che lo script sia caricato dopo il DOM.');
    return;
  }

  function hideAll() {
    descriptions.forEach(d => {
      d.classList.remove('visible');
      d.setAttribute('aria-hidden', 'true');
    });
  }

 // ...existing code...
ul.addEventListener('click', (e) => {
  // trova la card o il link che è stato cliccato
  const card = e.target.closest('.card');
  const link = e.target.closest('a');

  // cerca data-target prima sulla card, poi sull'a (fallback)
  const id = (card && card.dataset.target) || (link && link.dataset.target);

  if (!id) {
    // nessun target: lascia comportamento di default (es. link normale)
    return;
  }

  // evita che l'hash cambi nella URL quando gestiamo l'apertura via JS
  e.preventDefault();

  const target = document.getElementById(id);
  if (!target) {
    console.warn('Nessun elemento trovato con id:', id);
    return;
  }

  // toggle: mostra solo il box corrispondente
  const already = target.classList.contains('visible');
  descriptions.forEach(d => { d.classList.remove('visible'); d.setAttribute('aria-hidden','true'); });
  if (!already) {
    target.classList.add('visible');
    target.setAttribute('aria-hidden','false');
    target.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
});
// ...existing code...

  // nascondi quando la descrizione è completamente fuori viewport
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (el.classList.contains('visible') && entry.intersectionRatio === 0) {
          el.classList.remove('visible');
          el.setAttribute('aria-hidden', 'true');
          console.log('Descrizione nascosta da IntersectionObserver:', el.id);
        }
      });
    }, { threshold: [0, 0.01] });
    descriptions.forEach(d => io.observe(d));
  } else {
    window.addEventListener('scroll', () => {
      descriptions.forEach(d => {
        if (!d.classList.contains('visible')) return;
        const r = d.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) {
          d.classList.remove('visible');
          d.setAttribute('aria-hidden', 'true');
          console.log('Descrizione nascosta da scroll fallback:', d.id);
        }
      });
    });
  }
});



let data={
  italian:{
    titoloEducazione: "EDUCAZIONE",
    titoloCompetenze: "COMPETENZE",
    titoloProgetti: "PROGETTI",
    titoloCertificati: "CERTIFICATI",
    titoloDocumenti: "DOCUMENTI",
    titoloSuDiMe: "SU DI ME",
    educazione: `<h3>ITI FRANCESCO SEVERI Padova</h3>
    <i>2022 - attuale</i><br>
    <p>L'ITI Severi di Padova &egrave; un istituto tecnico che forma studenti nei settori dell'Informatica, della Meccanica e dell'Elettronica.
    Alla fine del percorso di studi, gli studenti acquisiscono competenze quali:
    <ul>
        <li>Capacit&agrave; di analisi e pensiero critico nella risoluzione di problemi, elaborando soluzioni appropriate in termini di implementazione di algoritmi su computer;</li>
        <li>Sviluppo di applicazioni per reti locali e servizi remoti.</li>
    </ul>
    </p>`,
    competenze: `<h3>COMPETENZE TECNICHE</h3>
    <ul>
        <li>Uso di linguaggi di programmazione quali <u>Java, JavaScript, Python, C, C++, HTML</u></li>
        <li>Calcoli numerici</li>
        <li>Uso fluente di pi&ugrave; lingue quali Italiano, Inglese, Cinese</li>
    </ul>
    <h3>ABILIT&Agrave; INTERPERSONALI</h3>
    <ul>
        <li>Lavoro di Squadra;</li>
        <li>Adattabilit&agrave;;</li>
        <li>Gestione del tempo;</li>
    </ul>
    </p>`,
    progetti: `<strong>PROGETTI PARTECIPATI:</strong><ul>
      <li>MOVE</li>
      <li>INFORMATICA X GIOCO</li>
              </ul>`,
    certificati: `<strong>CERTIFICATI RICEVUTI:</strong><ul>
      <li>Certificato di sicurezza(2024);</li>
      <li>Certificato di PCTO del progetto "Informatica X Gioco"(2025);</li>
      <li>Certificato LINGUA INGLESE B2(in corso);</li>
    </ul>`,
    documenti: `<strong>CLICCA SUI BOTTONI PER SCARICARE I DOCUMENTI</strong>
    <div class="contenitore">
    <button class="linkButton"><a href="document/ChenFedericoXin_CV_Italiano.pdf"target="_blank" rel="noopener noreferrer" style="--clr:#00ccff;--i:1">Il mio CV</a></button>
    <button class="linkButton"><a href="document/Resume.pdf"target="_blank" rel="noopener noreferrer">Il mio Resume</a></button>
    </div>`,
    su_di_me: `<p>Ciao sono Chen Federico Xin, uno studente appassionato di informatica e tecnologia. Sono molto felice di vederti sul mio sito web e vorrei condividere la mia storia.
    Fin da giovane, sono stato affascinato dal modo in cui i computer funzionano e da come possono essere utilizzati per risolvere problemi complessi.
    Attualmente frequento l'ITI Severi di Padova, dove sto approfondendo le mie conoscenze in programmazione, reti e sviluppo software.
    Per ulteriori informazioni è possibile contattarmi tramite la mail <u>chenxin20080501@gmail.com</u> oppure tramite altri contatti forniti nel CV</p>`
  },

  english:{
    titoloEducazione: "EDUCATION",
    titoloCompetenze: "SKILLS",
    titoloProgetti: "PROJECTS",
    titoloCertificati: "CERTIFICATES",
    titoloDocumenti: "DOCUMENTS",
    titoloSuDiMe: "ABOUT ME",
    educazione: `<h3>ITI FRANCESCO SEVERI of Padua</h3>
    <i>2022 - current</i><br>
    <p>The ITI Severi in Padua is a technical institute located in Padua that trains students in the fields of Information Technology, Mechanics, and Electronics.
    The istitute, at the end of the program, provides students skills such as:
    <ul>
        <li>Analytical skills and critical thinking in problem-solving, developing appropriate solutions in terms of algorithm implementation on computers;</li>
        <li>Development of applications for local networks and remote services.</li>
    </ul>
    </p>`,
    competenze: `<h3>TECHNICAL SKILLS</h3>
    <ul>
        <li>Proficient in programming languages such as <u>Java, JavaScript, Python, C, C++, HTML</u></li>
        <li>Calculating numbers</li>
        <li>Speak fluently multiple languages including Italian, English, Chinese</li>
    </ul>
    <h3>INTERPERSONAL SKILLS</h3>
    <ul>
        <li>Teamwork;</li>
        <li>Adaptability;</li>
        <li>Time-management;</li>
    </ul>
    </p>`,
    progetti: `<strong>PROJECTS PARTECIPATED:</strong><ul>
      <li>MOVE</li>
      <li>INFORMATICA X GIOCO</li>
    </ul>`,
    certificati: `<strong>CERTIFICATIONS RECEIVED:</strong><ul>
      <li>Security certificate(2024);</li>
      <li>Certificate of the project "Informatica X Gioco"(2025);</li>
      <li>Foreign language certificate B2"(current);</li>
    </ul>`,
    documenti: `<strong>CLICK ON THE BOTTON TO DOWNLOAD THE DOCUMENT</strong>
    <div class="contenitore">
    <button class="linkButton"><a href="document/ChenFedericoXin_CV_English.pdf" target="_blank" rel="noopener noreferrer">My CV</a></button>
    <button class="linkButton"><a href="document/Resume.pdf" target="_blank" rel="noopener noreferrer">My Resume</a></button>
    </div>`,
    su_di_me: `<p>Hi I am Chen Federico Xin, a student passionate about computer science and technology. I am very glad to see you on my website and I would like to share my story.
    Since I was a child, I have been fascinated by how computers work and how they can be used to solve problems.
    I am currently attending the ITI Francesco Severi located in Padua, where I am expanding my knowledge in programming, networks, and software development.
    For other information, you can contact me through the email <u>chenxin20080501@gmail.com</u> or through other contacts provided in my CV</p>`
  }
}
function cambiaLingua(lang) {
  console.log(`Cambiando lingua a: ${lang}`);

  // Aggiorna tutti gli elementi con classi tipo .titoloEducazione, .titoloCompetenze, ecc.
  for (let key in data[lang]) {
    const el = document.querySelector(`.${key}`);
    if (el) {
      const span = el.querySelector("span");
      if (span) {
        span.textContent = data[lang][key];
      }
    }
  }

  // Aggiorna i titoli nei <h2> e nei link <a>
  const titoloElements = document.querySelectorAll('[class^="titolo"]');
  titoloElements.forEach(el => {
    const span = el.querySelector("span");
    const className = el.className;
    if (span && data[lang][className]) {
      span.textContent = data[lang][className];
    }
  });

  // Aggiorna le descrizioni nei <p> usando data-key
  const descrizioni = document.querySelectorAll('p[data-key]');
  descrizioni.forEach(p => {
    const key = p.dataset.key;
    if (key && data[lang][key]) {
      p.innerHTML = data[lang][key];
    }
  });

}


let currentLang = 'italian'; // lingua iniziale

document.getElementById('language-toggle').addEventListener('click', () => {
  // Alterna tra italiano e inglese
  currentLang = currentLang === 'italian' ? 'english' : 'italian';

  // Cambia il testo del bottone
  document.getElementById('language-toggle').textContent = currentLang === 'italian' ? 'ITA' : 'ENG';

  // Applica la lingua
  cambiaLingua(currentLang);
});

cambiaLingua('italian');