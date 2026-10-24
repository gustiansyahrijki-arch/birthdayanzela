import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { birthdayContent } from './content';

type Note = (typeof birthdayContent.openWhen)[number];
type Creature = 'turtle' | 'jellyfish' | 'fish';

const navItems = [
  { label: 'The letter', href: '#birthday' },
  { label: 'Little notes', href: '#notes' },
  { label: 'Ocean moment', href: '#ocean' },
  { label: 'Next chapter', href: '#wishes' }
];

function App() {
  const [entered, setEntered] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [activeFact, setActiveFact] = useState<Creature | null>(null);
  const [burst, setBurst] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!selectedNote || !dialogRef.current) return;
    const dialog = dialogRef.current;
    dialog.showModal();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dialog.open) {
        event.preventDefault();
        dialog.close();
        setSelectedNote(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (dialog.open) dialog.close();
    };
  }, [selectedNote]);

  useEffect(() => {
    if (burst === 0) return;
    const timeoutId = window.setTimeout(() => setBurst(0), 1500);
    return () => window.clearTimeout(timeoutId);
  }, [burst]);

  const diveIn = () => {
    setEntered(true);
    window.setTimeout(() => {
      document.getElementById('birthday')?.scrollIntoView({ behavior: 'smooth' });
    }, 180);
  };

  const closeMenu = () => setMenuOpen(false);
  const openNote = (note: Note) => setSelectedNote(note);

  const particleStyles = Array.from({ length: 16 }, (_, index) => {
    const angle = (index / 16) * Math.PI * 2;
    return {
      '--particle-x': `${Math.cos(angle) * (38 + (index % 3) * 12)}px`,
      '--particle-y': `${Math.sin(angle) * (38 + (index % 3) * 12)}px`,
      '--particle-delay': `${(index % 5) * 18}ms`
    } as CSSProperties;
  });

  return (
    <>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      {!entered && (
        <section className="entrance" aria-label="Welcome to a little ocean of wishes">
          <div className="entrance-grain" aria-hidden="true" />
          <div className="ray ray-one" aria-hidden="true" />
          <div className="ray ray-two" aria-hidden="true" />
          <div className="entrance-bubbles" aria-hidden="true">
            <i /><i /><i /><i /><i /><i />
          </div>
          <div className="entrance-content">
            <p className="eyebrow entrance-eyebrow"><span className="eyebrow-dot" /> A LITTLE OCEAN OF WISHES</p>
            <p className="entrance-date">OCTOBER 27, 2026</p>
            <h1>For Anzela,<br /><em>on her special day.</em></h1>
            <p className="entrance-copy">A tiny corner of the ocean, made just for you.</p>
            <button className="dive-button" onClick={diveIn}>
              <span>Let's dive in</span><span className="button-arrow" aria-hidden="true">↓</span>
            </button>
          </div>
          <div className="entrance-bottom"><span>SCROLL AT YOUR OWN PACE</span><span className="bottom-line" /></div>
        </section>
      )}

      <div className={`site-shell ${entered ? 'site-ready' : 'site-waiting'}`}>
        <header className="topbar">
          <a className="wordmark" href="#top" onClick={closeMenu} aria-label="A Little Ocean of Wishes, back to top">
            <span className="wordmark-mark" aria-hidden="true">≈</span>
            <span>A little ocean <small>of wishes</small></span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span />
          </button>
          <nav id="site-navigation" className={`site-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
            <a className="nav-greeting" href="#ending" onClick={closeMenu}>A birthday wish <span aria-hidden="true">↗</span></a>
          </nav>
        </header>

        <main id="top">
          <section className="letter-section section-wrap" id="birthday">
            <div className="section-heading reveal">
              <p className="eyebrow"><span className="eyebrow-dot" /> A NOTE FOR YOU</p>
              <h2>Hey, Anzela.<br /><em>Happy Birthday!</em></h2>
              <p className="section-intro">A small note for the start of another trip around the sun.</p>
            </div>
            <article className="letter-card reveal">
              <div className="letter-topline"><span>OCTOBER 27, 2026</span><span className="letter-stamp" aria-hidden="true">✳</span></div>
              <div className="letter-body">
                {birthdayContent.letter.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <p className="letter-signoff">Wishing you a beautiful year ahead.</p>
              </div>
              <div className="letter-decoration" aria-hidden="true">
                <svg viewBox="0 0 130 90" role="presentation">
                  <path d="M12 70c14-12 27-14 42-7 13 6 26 4 37-8 8-8 16-10 27-8" />
                  <path d="M20 80c15-9 27-8 40-1 14 7 27 5 39-5 7-6 13-8 20-7" />
                  <circle cx="85" cy="21" r="3" /><circle cx="102" cy="30" r="2" /><circle cx="72" cy="32" r="1.8" />
                </svg>
              </div>
            </article>
          </section>

          <section className="notes-section section-wrap" id="notes">
            <div className="section-heading section-heading-row reveal">
              <div>
                <p className="eyebrow"><span className="eyebrow-dot" /> NOTES FOR LATER</p>
                <h2>Open whenever<br /><em>you need.</em></h2>
              </div>
              <p className="section-intro">No occasion needed. Just a few kind words, ready when you are.</p>
            </div>
            <div className="note-grid">
              {birthdayContent.openWhen.map((note, index) => (
                <button className={`note-card note-card-${index + 1} reveal`} key={note.title} onClick={() => openNote(note)}>
                  <span className="note-number">0{index + 1}</span>
                  <span className="note-symbol" aria-hidden="true">{['◒', '✳', '○', '≈'][index]}</span>
                  <span className="note-card-title">{note.title}</span>
                  <span className="note-card-subtitle">{note.short}</span>
                  <span className="note-open">OPEN NOTE <span aria-hidden="true">↗</span></span>
                </button>
              ))}
            </div>
          </section>

          <section className="ocean-section" id="ocean">
            <div className="ocean-inner section-wrap">
              <div className="section-heading reveal">
                <p className="eyebrow"><span className="eyebrow-dot" /> FIELD NOTE / 01</p>
                <h2>A little ocean<br /><em>to wander through.</em></h2>
                <p className="section-intro">Tap a friend below and take a tiny pause in their world.</p>
              </div>
              <div className="ocean-scene reveal">
                <div className="scene-light scene-light-left" aria-hidden="true" />
                <div className="scene-light scene-light-right" aria-hidden="true" />
                <div className="scene-bubbles" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
                <div className="scene-horizon" aria-hidden="true" />
                <div className="depth-mark" aria-hidden="true"><span>0 m</span><i /><span>12 m</span><i /><span>24 m</span></div>
                <div className="scene-creatures">
                  <button className={`creature creature-turtle ${activeFact === 'turtle' ? 'creature-active' : ''}`} onClick={() => setActiveFact('turtle')} aria-label="Discover a fact about sea turtles">
                    <svg viewBox="0 0 150 100" role="img" aria-label="Illustration of a sea turtle">
                      <ellipse cx="73" cy="51" rx="37" ry="27" fill="#79c7a7" />
                      <path d="M45 45c-14-22-28-24-32-15 3 13 12 22 28 28M48 64c-12 18-24 21-28 13 2-11 11-18 26-22M95 42c15-19 27-20 31-11-3 11-13 18-27 22M96 64c14 16 24 17 28 9-3-10-11-16-27-20" fill="#91d7b7" />
                      <path d="M45 51c4-18 15-26 29-25 16 1 27 12 30 29-7 17-20 24-36 22-13-2-21-11-23-26Z" fill="#176f70" stroke="#a2e3c8" strokeWidth="2" />
                      <path d="m58 37 15 8 15-9M51 51l16 2 2 19m14-27-1 27 15-14" fill="none" stroke="#5ca995" strokeWidth="2" />
                      <circle cx="117" cy="44" r="2.5" fill="#08283a" />
                    </svg>
                    <span className="creature-label">sea turtle</span>
                  </button>
                  <button className={`creature creature-jelly ${activeFact === 'jellyfish' ? 'creature-active' : ''}`} onClick={() => setActiveFact('jellyfish')} aria-label="Discover a fact about jellyfish">
                    <svg viewBox="0 0 100 120" role="img" aria-label="Illustration of a jellyfish">
                      <path d="M18 54c0-24 14-40 32-40s32 16 32 40c-13 13-51 13-64 0Z" fill="#88d9d0" fillOpacity=".9" />
                      <path d="M20 53c7 7 12 7 17 0 5 8 11 8 16 0 5 8 11 8 16 0 5 7 10 7 13 0" fill="none" stroke="#d4fff2" strokeWidth="4" />
                      <path d="M34 60c-5 15 5 15 0 31m15-29c-5 17 5 17 0 35m16-35c-5 14 5 17 1 30" fill="none" stroke="#78d1d2" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="40" cy="39" r="2" fill="#123c51" /><circle cx="60" cy="39" r="2" fill="#123c51" />
                    </svg>
                    <span className="creature-label">jellyfish</span>
                  </button>
                  <button className={`creature creature-fish ${activeFact === 'fish' ? 'creature-active' : ''}`} onClick={() => setActiveFact('fish')} aria-label="Discover a fact about clownfish">
                    <svg viewBox="0 0 150 100" role="img" aria-label="Illustration of a clownfish">
                      <path d="M23 50c15-20 39-28 64-19 12 4 22 11 31 19-9 9-19 16-31 19-25 9-49 1-64-19Z" fill="#e89b62" stroke="#f3d4a5" strokeWidth="2" />
                      <path d="M24 49 8 35v30l16-14M56 29c-7 13-7 29 0 42m35-39c-7 12-7 24 0 36" fill="none" stroke="#f4e7c7" strokeWidth="6" />
                      <path d="M55 29c-7 13-7 29 0 42m36-39c-7 12-7 24 0 36" fill="none" stroke="#27636b" strokeWidth="1.5" />
                      <path d="M77 29c4-10 12-14 18-13-1 8-4 13-9 17m-10 38c4 10 12 14 18 13-1-8-4-13-9-17" fill="#d78152" stroke="#f3d4a5" strokeWidth="1.5" />
                      <circle cx="106" cy="46" r="2.4" fill="#123b49" />
                    </svg>
                    <span className="creature-label">clownfish</span>
                  </button>
                </div>
                <div className="sea-grass" aria-hidden="true"><i /><i /><i /><i /><i /></div>
                {activeFact && (
                  <div className="fact-bubble" role="status" aria-live="polite">
                    <button type="button" aria-label="Close ocean fact" onClick={() => setActiveFact(null)}>×</button>
                    <span className="fact-label">A SMALL OCEAN FACT</span>
                    <p>{birthdayContent.oceanFacts[activeFact]}</p>
                  </div>
                )}
                {burst > 0 && <>
                  <div className="particle-burst" key={burst} aria-hidden="true">{particleStyles.map((style, index) => <i key={index} style={style} />)}</div>
                  <span className="glow-feedback" role="status" aria-live="polite">A little glow, just for you.</span>
                </>}
                <button className="glow-button" onClick={() => setBurst((current) => current + 1)}>
                  <span className="glow-icon" aria-hidden="true">✳</span> Release a little glow
                </button>
                <span className="scene-caption">a quiet place to pause</span>
              </div>
            </div>
          </section>

          <section className="wishes-section section-wrap" id="wishes">
            <div className="section-heading wishes-heading reveal">
              <p className="eyebrow"><span className="eyebrow-dot" /> FOR THE YEAR AHEAD</p>
              <h2>May your next tide<br /><em>be kinder.</em></h2>
              <p className="section-intro">A few hopes for the things already taking shape.</p>
            </div>
            <div className="wish-grid">
              {birthdayContent.wishes.map((wish, index) => (
                <article className={`wish-card reveal wish-card-${index + 1}`} key={wish.title}>
                  <span className="wish-index">0{index + 1}</span>
                  <h3>{wish.title}</h3>
                  <p>{wish.message}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ending-section" id="ending">
            <div className="ending-stars" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className="ending-horizon" aria-hidden="true"><span /></div>
            <div className="ending-content section-wrap reveal">
              <h2>One more thing,<br /><em>Anzela...</em></h2>
              <p className="ending-message">{birthdayContent.closing}</p>
              <p className="closing-greeting">Happy Birthday, Anzela <span aria-hidden="true">🌊</span></p>
              <a className="back-to-beginning" href="#top">Back to the beginning <span aria-hidden="true">↑</span></a>
            </div>
            <footer>
              <span>MADE WITH CARE, JUST FOR YOUR BIRTHDAY.</span>
              <span>{birthdayContent.date}</span>
              <span className="maker-credit">Made with love Rijki</span>
            </footer>
          </section>
        </main>
      </div>

      {showTop && entered && <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" title="Back to top">↑</button>}

      <dialog
        className="message-dialog"
        ref={dialogRef}
        aria-labelledby="dialog-title"
        onCancel={() => setSelectedNote(null)}
        onClose={() => setSelectedNote(null)}
        onClick={(event) => { if (event.target === event.currentTarget) setSelectedNote(null); }}
      >
        {selectedNote && (
          <div className="dialog-content">
            <button className="dialog-close" type="button" aria-label="Close note" autoFocus onClick={() => setSelectedNote(null)}>×</button>
            <p className="eyebrow"><span className="eyebrow-dot" /> A NOTE FOR LATER</p>
            <h2 id="dialog-title">{selectedNote.title}<em>.</em></h2>
            <p>{selectedNote.message}</p>
            <span className="dialog-wave" aria-hidden="true">≈ ≈ ≈</span>
          </div>
        )}
      </dialog>
    </>
  );
}

export default App;
