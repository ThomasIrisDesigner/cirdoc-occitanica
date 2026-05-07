
import { useState } from "react";

// ── Palette ───────────────────────────────────────────────────────────────────
const DARK   = "#18181b";
const GRAY   = "#71717a";
const LIGHT  = "#f4f4f5";
const BORDER = "#e4e4e7";
const MED    = "#d4d4d8";
const WHITE  = "#ffffff";
const OCC    = "#0d6e6e";
export const OCC_LT = "#e0f2f1";

const EC: Record<string, string> = {
  langue:    "#1a5276",
  musique:   "#6c3483",
  fetes:     "#784212",
  portraits: "#1e8449",
  scene:     "#922b21",
};

// ── Primitives ────────────────────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", color: DARK, textTransform: "uppercase" as const, marginBottom: 7 }}>
    {children}
  </div>
);
const Divider = () => <div style={{ height: 1, background: BORDER, margin: "12px 0 0" }} />;

// ── Phone wrapper ─────────────────────────────────────────────────────────────
const Phone = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flexShrink: 0 }}>
    <div style={{ fontSize: 8.5, fontWeight: 700, color: DARK, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{label}</div>
    <div style={{ position: "relative" as const }}>
      <div style={{
        width: 220, height: 480, background: WHITE, borderRadius: 32,
        border: `6px solid ${DARK}`, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.16)",
      }}>
        <div style={{ position: "absolute" as const, top: 0, left: "50%", transform: "translateX(-50%)", width: 70, height: 16, background: DARK, borderRadius: "0 0 9px 9px", zIndex: 30 }} />
        <div style={{ height: "100%", overflowY: "scroll" as const, paddingTop: 18, scrollbarWidth: "none" as const }}>
          {children}
        </div>
      </div>
      <div style={{ position: "absolute" as const, bottom: 8, left: "50%", transform: "translateX(-50%)", width: 50, height: 3, background: DARK, borderRadius: 2, opacity: 0.5 }} />
    </div>
  </div>
);

// ── Annotation ────────────────────────────────────────────────────────────────
const Annotation = ({ n, title, desc }: { n: string; title: string; desc: string }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
    <div style={{ width: 22, height: 22, borderRadius: "50%", background: DARK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: 8, color: WHITE, fontWeight: 700 }}>{n}</span>
    </div>
    <div>
      <div style={{ fontSize: 9.5, fontWeight: 700, color: DARK, marginBottom: 2 }}>{title}</div>
      <div style={{ fontSize: 8, color: GRAY, lineHeight: 1.5 }}>{desc}</div>
    </div>
  </div>
);

// ── Header mobile ─────────────────────────────────────────────────────────────
const NavHeader = ({ back = false }: { back?: boolean }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 14px", borderBottom: `1px solid ${BORDER}`, background: WHITE }}>
    {back
      ? <span style={{ fontSize: 14, color: OCC }}>←</span>
      : <span style={{ fontSize: 10, fontWeight: 800, color: OCC, letterSpacing: "0.08em" }}>OCCITANICA</span>
    }
    {back && <span style={{ fontSize: 10, fontWeight: 800, color: DARK }}>OCCITANICA</span>}
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <span style={{ fontSize: 11 }}>🔍</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {[0,1,2].map(i => <div key={i} style={{ width: 14, height: 1.5, background: DARK, borderRadius: 1 }} />)}
      </div>
    </div>
  </div>
);



// ── Écran 1 — Home ────────────────────────────────────────────────────────────
const HomePhone = () => {
  const espaces = [
    { label: "Langue",         color: EC.langue,    accroche: "Mots, paroles, littérature" },
    { label: "Musique",        color: EC.musique,   accroche: "Sons, rythmes, traditions"  },
    { label: "Fêtes & Trad.", color: EC.fetes,     accroche: "Rites, célébrations, PCI"   },
    { label: "Portraits",      color: EC.portraits, accroche: "Figures, histoires, visages"},
    { label: "La Scène",       color: EC.scene,     accroche: "Artistes, scènes, créations"},
  ];
  return (
    <>
      <NavHeader />

      {/* ① À la une — style "Aujourd'hui" Radio France */}
      <div style={{ padding: "12px 14px 0" }}>
        <SectionLabel>À la une</SectionLabel>
        {/* Card principale full-bleed */}
        <div style={{ position: "relative" as const, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ height: 155, background: "#2c2c2c", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 8, color: "#666", fontStyle: "italic" }}>Photo archive</span>
          </div>
          <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.82))", padding: "28px 10px 10px" }}>
            <div style={{ fontSize: 6.5, color: "#ccc", fontWeight: 600, marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>PCI · Fêtes</div>
            <div style={{ height: 7, background: "rgba(255,255,255,0.85)", borderRadius: 2, width: "88%", marginBottom: 3 }} />
            <div style={{ height: 6, background: "rgba(255,255,255,0.6)", borderRadius: 2, width: "65%" }} />
          </div>
        </div>
        {/* Dots navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 7, marginBottom: 4 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: i === 1 ? 14 : 5, height: 5, borderRadius: 3, background: i === 1 ? DARK : MED }} />)}
        </div>
      </div>

      <Divider />

      {/* ② À découvrir dans les espaces */}
      <div style={{ padding: "12px 0 0" }}>
        <div style={{ padding: "0 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <SectionLabel>Les espaces à découvrir</SectionLabel>
          <div style={{ display: "flex", gap: 4, marginBottom: 7 }}>
            {["←", "→"].map((a, i) => (
              <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", border: `1px solid ${BORDER}`, background: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: DARK }}>{a}</div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 7, padding: "0 14px", overflowX: "auto" as const, scrollbarWidth: "none" as const, paddingBottom: 6 }}>
          {espaces.map((e, i) => (
            <div key={i} style={{ flexShrink: 0, width: 78, height: 98, borderRadius: 8, overflow: "hidden", position: "relative" as const }}>
              {/* Image ambiance — deviendra le visuel d'entête de l'espace */}
              <div style={{ width: "100%", height: "100%", background: "#2c2c2c" }} />
              {/* Gradient overlay + nom + accroche en superposition */}
              <div style={{ position: "absolute" as const, inset: 0, background: `linear-gradient(transparent 30%, ${e.color}f0)`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 6px 7px" }}>
                <span style={{ fontSize: 7.5, color: WHITE, fontWeight: 700, lineHeight: 1.2, marginBottom: 2 }}>{e.label}</span>
                <span style={{ fontSize: 5.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.3 }}>{e.accroche}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ③ Territoires — strip pills scrollable, bloc de respiration */}
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: LIGHT, padding: "10px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: GRAY, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Territoires</div>
          <div style={{ display: "flex", gap: 4 }}>
            {["←", "→"].map((a, i) => (
              <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", border: `1px solid ${BORDER}`, background: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: DARK }}>{a}</div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto" as const, scrollbarWidth: "none" as const }}>
          {["Gascogne","Languedoc","Provence","Pyrénées","Limousin","Périgord","Dauphiné","Val d'Aran"].map((t, i) => (
            <div key={i} style={{ flexShrink: 0, padding: "4px 10px", borderRadius: 99, border: `1px solid ${BORDER}`, background: WHITE, fontSize: 8, color: DARK, fontWeight: 500, whiteSpace: "nowrap" as const }}>{t}</div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ④ Cultura viva — hero + liste articles NatGeo style */}
      <div style={{ padding: "12px 14px 0" }}>
        <SectionLabel>Cultura viva !</SectionLabel>
        {/* Hero article */}
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden", marginBottom: 8 }}>
          <div style={{ height: 80, background: "#2c2c2c" }} />
          <div style={{ padding: "7px 9px 9px" }}>
            <div style={{ fontSize: 6, color: EC.scene, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, marginBottom: 4 }}>La Scène · Lo Mag</div>
            <div style={{ height: 7, background: MED, borderRadius: 2, width: "92%", marginBottom: 3 }} />
            <div style={{ height: 6, background: MED, borderRadius: 2, width: "75%", marginBottom: 3 }} />
            <div style={{ height: 5, background: LIGHT, borderRadius: 2, width: "55%" }} />
          </div>
        </div>
        {/* Liste articles */}
        {[
          { tag: "Fêtes",    color: EC.fetes    },
          { tag: "Musique",  color: EC.musique  },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", borderTop: `1px solid ${BORDER}`, paddingTop: 7, paddingBottom: 7 }}>
            <div style={{ width: 46, height: 46, borderRadius: 5, background: "#2c2c2c", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 6, color: a.color, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, marginBottom: 3 }}>{a.tag}</div>
              <div style={{ height: 5, background: MED, borderRadius: 2, width: "90%", marginBottom: 2 }} />
              <div style={{ height: 4, background: LIGHT, borderRadius: 2, width: "70%" }} />
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ⑤ Collections — bloc illustratif unique */}
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${BORDER}`, position: "relative" as const }}>
          {/* Image placeholder — sera une composition éditoriale */}
          <div style={{ height: 110, background: "#2c2c2c" }} />
          {/* CTA en overlay centré sur l'image */}
          <div style={{ position: "absolute" as const, inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ padding: "5px 18px", background: WHITE, borderRadius: 99, fontSize: 8, fontWeight: 700, color: DARK }}>Explorer les collections</div>
          </div>
        </div>
      </div>

      {/* ⑥ Footer V3 */}
      <div style={{ background: LIGHT, borderTop: `1px solid ${BORDER}`, padding: "12px 14px 20px" }}>
        {/* Logo + institution */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: OCC, letterSpacing: "0.06em" }}>OCCITANICA</div>
          <div style={{ fontSize: 6.5, color: GRAY, marginTop: 1 }}>Institut occitan de cultura — CIRDOC</div>
        </div>
        {/* Accordéons */}
        {/* 1. Espaces */}
        <div style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0" }}>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: DARK, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Espaces</span>
            <span style={{ fontSize: 9, color: GRAY }}>∧</span>
          </div>
          <div style={{ paddingBottom: 8, display: "flex", flexDirection: "column", gap: 5 }}>
            {["Langue", "Musique", "Fêtes & Traditions", "Portraits", "La Scène occitane"].map((item, i) => (
              <span key={i} style={{ fontSize: 8, color: GRAY }}>{item}</span>
            ))}
          </div>
        </div>
        {/* 2. Territoires */}
        <div style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0" }}>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: DARK, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Territoires</span>
            <span style={{ fontSize: 9, color: GRAY }}>∨</span>
          </div>
        </div>
        {/* 3. Collections — lien direct */}
        <div style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0" }}>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: DARK, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Collections</span>
            <span style={{ fontSize: 9, color: OCC }}>→</span>
          </div>
        </div>
        {/* 4. Occitanica */}
        <div style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0" }}>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: DARK, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Occitanica</span>
            <span style={{ fontSize: 9, color: GRAY }}>∨</span>
          </div>
        </div>
        {/* 5. Ressources */}
        <div style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0" }}>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: DARK, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Ressources</span>
            <span style={{ fontSize: 9, color: GRAY }}>∨</span>
          </div>
        </div>
        {/* Partenaires + réseaux */}
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ fontSize: 7, color: GRAY }}>La Maleta ↗ &nbsp;·&nbsp; Campus ↗ &nbsp;·&nbsp; IEO ↗</div>
          <div style={{ fontSize: 7, color: GRAY }}>Seguissètz-nos · Instagram · Facebook · YouTube</div>
        </div>
      </div>
    </>
  );
};

// ── Écran 2 — Navigation ──────────────────────────────────────────────────────
const NavPhone = () => {
  const [espacesOpen, setEspacesOpen] = useState(true);
  const [territoiresOpen, setTerritoiresOpen] = useState(false);

  const espaces = [
    { label: "Langue",             color: EC.langue    },
    { label: "Musique",            color: EC.musique   },
    { label: "Fêtes & Traditions", color: EC.fetes     },
    { label: "Portraits",          color: EC.portraits },
    { label: "La Scène occitane",  color: EC.scene     },
  ];
  const territoires = ["Gascogne", "Languedoc", "Provence", "Pyrénées", "Limousin", "Périgord", "Dauphiné", "Val d'Aran", "Vivaro-alpin"];
  return (
    <>
      {/* Header — fond clair, ✕ fermer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 14px", background: WHITE, borderBottom: `1px solid ${BORDER}` }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: OCC, letterSpacing: "0.08em" }}>OCCITANICA</span>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 11 }}>🔍</span>
          <span style={{ color: DARK, fontSize: 14, fontWeight: 300 }}>✕</span>
        </div>
      </div>

      <div style={{ background: WHITE }}>

        {/* ▼ ESPACES — accordéon interactif */}
        <div style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div
            onClick={() => setEspacesOpen(!espacesOpen)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px 8px", cursor: "pointer" }}
          >
            <span style={{ fontSize: 7.5, fontWeight: 700, color: GRAY, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Espaces</span>
            <span style={{ fontSize: 9, color: GRAY, transition: "transform 0.2s" }}>{espacesOpen ? "∧" : "∨"}</span>
          </div>
          {espacesOpen && (
            <>
              {espaces.map((e, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderTop: `1px solid ${BORDER}` }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: e.color, flexShrink: 0 }} />
                  <span style={{ color: DARK, fontSize: 10, fontWeight: 600 }}>{e.label}</span>
                  <span style={{ color: MED, fontSize: 9, marginLeft: "auto" }}>›</span>
                </div>
              ))}
              <div style={{ height: 6 }} />
            </>
          )}
        </div>

        {/* ▶ TERRITOIRES — accordéon interactif */}
        <div style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div
            onClick={() => setTerritoiresOpen(!territoiresOpen)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", cursor: "pointer" }}
          >
            <span style={{ color: DARK, fontSize: 10, fontWeight: 600 }}>Territoires</span>
            <span style={{ fontSize: 9, color: GRAY }}>{territoiresOpen ? "∧" : "∨"}</span>
          </div>
          {territoiresOpen && (
            <div style={{ padding: "0 14px 10px", display: "flex", flexDirection: "column", gap: 0 }}>
              {territoires.map((t, i) => (
                <div key={i} style={{ padding: "7px 0", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: DARK, fontSize: 10 }}>{t}</span>
                  <span style={{ color: MED, fontSize: 9 }}>›</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COLLECTIONS — lien direct */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderBottom: `1px solid ${BORDER}` }}>
          <span style={{ color: DARK, fontSize: 10, fontWeight: 600 }}>Collections</span>
          <span style={{ fontSize: 10, color: OCC }}>→</span>
        </div>

      </div>
    </>
  );
};

// ── Écran 3 — Page Espace (tous les espaces, sélecteur interactif) ───────────
const ESPACES_DATA = [
  {
    label: "Langue", color: EC.langue, accroche: "Mots, paroles, littérature",
    heroTag: "Article · Langue",
    sections: [
      { title: "Comprendre l'occitan",    type: "Article",   typeColor: EC.langue,    items: 3 },
      { title: "Textes & littérature",    type: "Archive",   typeColor: "#2c3e50",    items: 3 },
      { title: "Ressources pédagogiques", type: "Ressource", typeColor: GRAY,         items: 2 },
    ],
    hasAgenda: false, hasAZ: false,
    voirAussi: [{ label: "Portraits", color: EC.portraits }, { label: "Musique", color: EC.musique }],
  },
  {
    label: "Musique", color: EC.musique, accroche: "Sons, rythmes, traditions",
    heroTag: "Article · Musique",
    sections: [
      { title: "Archives sonores",        type: "Archive",  typeColor: "#2c3e50",     items: 3 },
      { title: "Portraits de musiciens",  type: "Portrait", typeColor: EC.portraits,  items: 3 },
      { title: "Instruments & danses",    type: "PCI",      typeColor: EC.fetes,      items: 3 },
    ],
    hasAgenda: true, hasAZ: false,
    voirAussi: [{ label: "Portraits", color: EC.portraits }, { label: "Fêtes & Trad.", color: EC.fetes }],
  },
  {
    label: "Fêtes & Trad.", color: EC.fetes, accroche: "Rites, célébrations, PCI",
    heroTag: "PCI · Fêtes",
    sections: [
      { title: "Fêtes et célébrations",    type: "PCI",   typeColor: EC.fetes, items: 3 },
      { title: "Savoir-faire & artisanat", type: "PCI",   typeColor: EC.fetes, items: 3 },
      { title: "Sur votre territoire",     type: "Vidéo", typeColor: OCC,      items: 2 },
    ],
    hasAgenda: true, hasAZ: false,
    voirAussi: [{ label: "Musique", color: EC.musique }, { label: "Langue", color: EC.langue }],
  },
  {
    label: "Portraits", color: EC.portraits, accroche: "Figures, histoires, visages",
    heroTag: "Portrait",
    sections: [
      { title: "Figures historiques",     type: "Portrait", typeColor: EC.portraits, items: 3 },
      { title: "Créateurs d'aujourd'hui", type: "Portrait", typeColor: EC.portraits, items: 3 },
    ],
    hasAgenda: false, hasAZ: true,
    voirAussi: [{ label: "La Scène", color: EC.scene }, { label: "Musique", color: EC.musique }],
  },
  {
    label: "La Scène", color: EC.scene, accroche: "Artistes, scènes, créations",
    heroTag: "Article · Lo Mag",
    sections: [
      { title: "À l'affiche",    type: "Article",  typeColor: EC.scene,     items: 3 },
      { title: "Artistes",       type: "Portrait", typeColor: EC.portraits, items: 3 },
      { title: "Lu dans Lo Mag", type: "Article",  typeColor: EC.scene,     items: 2 },
    ],
    hasAgenda: true, hasAZ: false,
    voirAussi: [{ label: "Portraits", color: EC.portraits }, { label: "Musique", color: EC.musique }],
  },
];

const EspaceSection = () => {
  const [sel, setSel] = useState(1);
  const e = ESPACES_DATA[sel];
  const agendaItems = [
    { date: "14 juin", lieu: "Auch", title: "Festival occitan" },
    { date: "21 juin", lieu: "Foix", title: "Fête de la musique — scène oc" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 10, flexShrink: 0 }}>
      <div style={{ fontSize: 8.5, fontWeight: 700, color: DARK, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>PAGE ESPACE — {e.label.toUpperCase()}</div>

      {/* Sélecteur 5 espaces */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const, justifyContent: "center", maxWidth: 260 }}>
        {ESPACES_DATA.map((esp, i) => (
          <div key={i} onClick={() => setSel(i)} style={{
            padding: "4px 10px", borderRadius: 99, cursor: "pointer",
            background: sel === i ? esp.color : WHITE,
            color: sel === i ? WHITE : DARK,
            border: `1.5px solid ${sel === i ? esp.color : BORDER}`,
            fontSize: 9, fontWeight: sel === i ? 700 : 400,
          }}>{esp.label}</div>
        ))}
      </div>

      {/* Phone mock */}
      <div style={{ position: "relative" as const }}>
        <div style={{ width: 220, height: 480, background: WHITE, borderRadius: 32, border: `6px solid ${DARK}`, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.16)" }}>
          <div style={{ position: "absolute" as const, top: 0, left: "50%", transform: "translateX(-50%)", width: 70, height: 16, background: DARK, borderRadius: "0 0 9px 9px", zIndex: 30 }} />
          <div style={{ height: "100%", overflowY: "scroll" as const, paddingTop: 18, scrollbarWidth: "none" as const }}>

            <NavHeader back={true} />

            {/* En-tête espace */}
            <div style={{ position: "relative" as const, height: 90, flexShrink: 0 }}>
              <div style={{ width: "100%", height: "100%", background: "#2c2c2c" }} />
              <div style={{ position: "absolute" as const, inset: 0, background: `linear-gradient(transparent 30%, ${e.color}f0)`, display: "flex", flexDirection: "column" as const, justifyContent: "flex-end", padding: "0 14px 12px" }}>
                <div style={{ fontSize: 14, color: WHITE, fontWeight: 800 }}>{e.label}</div>
                <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.75)", marginTop: 3 }}>{e.accroche}</div>
              </div>
            </div>

            {/* À la une */}
            <div style={{ padding: "12px 14px 0" }}>
              <SectionLabel>À la une</SectionLabel>
              <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden" }}>
                <div style={{ height: 75, background: "#2c2c2c" }} />
                <div style={{ padding: "7px 9px 9px" }}>
                  <div style={{ fontSize: 6, color: e.color, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.07em", marginBottom: 4 }}>{e.heroTag}</div>
                  <div style={{ height: 7, background: MED, borderRadius: 2, width: "92%", marginBottom: 3 }} />
                  <div style={{ height: 6, background: MED, borderRadius: 2, width: "78%", marginBottom: 3 }} />
                  <div style={{ height: 5, background: LIGHT, borderRadius: 2, width: "55%" }} />
                </div>
              </div>
            </div>

            {/* Sections thématiques */}
            {e.sections.map((section, si) => (
              <div key={`${sel}-${si}`}>
                <Divider />
                <div style={{ padding: "10px 14px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <SectionLabel>{section.title}</SectionLabel>
                    <div style={{ display: "flex", gap: 4, marginBottom: 7 }}>
                      {["←","→"].map((a, i) => (
                        <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: DARK }}>{a}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 7, overflowX: "auto" as const, scrollbarWidth: "none" as const, paddingBottom: 6 }}>
                    {Array.from({ length: section.items }).map((_, i) => (
                      <div key={i} style={{ flexShrink: 0, width: 100, border: `1px solid ${BORDER}`, borderRadius: 6, overflow: "hidden" }}>
                        <div style={{ height: 58, background: "#2c2c2c", position: "relative" as const }}>
                          <span style={{ position: "absolute" as const, top: 5, left: 5, fontSize: 5.5, color: section.typeColor, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, background: "rgba(255,255,255,0.9)", padding: "1px 4px", borderRadius: 3 }}>{section.type}</span>
                        </div>
                        <div style={{ padding: "4px 6px 6px" }}>
                          <div style={{ height: 5, background: MED, borderRadius: 2, width: "85%", marginBottom: 2 }} />
                          <div style={{ height: 4, background: LIGHT, borderRadius: 2, width: "60%" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Module A-Z — Portraits uniquement */}
            {e.hasAZ && (
              <>
                <Divider />
                <div style={{ padding: "10px 14px 8px" }}>
                  <SectionLabel>Index A-Z</SectionLabel>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const }}>
                    {"ABCDEFGIJLMNOPRSTV".split("").map((l, i) => (
                      <div key={i} style={{ width: 16, height: 16, borderRadius: 3, background: LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: DARK }}>{l}</div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Module Agenda — variable */}
            {e.hasAgenda && (
              <>
                <Divider />
                <div style={{ padding: "10px 14px 4px" }}>
                  <SectionLabel>Agenda</SectionLabel>
                  {agendaItems.map((ev, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", borderTop: i > 0 ? `1px solid ${BORDER}` : "none", paddingTop: i > 0 ? 7 : 0, paddingBottom: 7 }}>
                      <div style={{ width: 30, flexShrink: 0, textAlign: "center" as const }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: e.color, lineHeight: 1 }}>{ev.date.split(" ")[0]}</div>
                        <div style={{ fontSize: 5.5, color: GRAY, textTransform: "uppercase" as const }}>{ev.date.split(" ")[1]}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 7.5, fontWeight: 600, color: DARK, marginBottom: 2 }}>{ev.title}</div>
                        <div style={{ fontSize: 6.5, color: GRAY }}>{ev.lieu}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ paddingBottom: 6, textAlign: "center" as const }}>
                    <span style={{ fontSize: 8, color: e.color, fontWeight: 600 }}>Voir tout l'agenda →</span>
                  </div>
                </div>
              </>
            )}

            {/* Accès Collections */}
            <Divider />
            <div style={{ padding: "10px 14px 12px" }}>
              <div style={{ borderRadius: 8, overflow: "hidden", position: "relative" as const }}>
                <div style={{ height: 55, background: "#2c2c2c" }} />
                <div style={{ position: "absolute" as const, inset: 0, background: `${e.color}cc`, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 5 }}>
                  <div style={{ fontSize: 6.5, color: WHITE, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.09em" }}>Archives {e.label}</div>
                  <div style={{ padding: "3px 14px", background: WHITE, borderRadius: 99, fontSize: 7.5, fontWeight: 700, color: DARK }}>Explorer les collections</div>
                </div>
              </div>
            </div>

            {/* Voir aussi */}
            <Divider />
            <div style={{ padding: "10px 14px 14px" }}>
              <SectionLabel>Voir aussi</SectionLabel>
              <div style={{ display: "flex", gap: 6 }}>
                {e.voirAussi.map((va, i) => (
                  <div key={i} style={{ flex: 1, padding: "7px 8px", border: `1px solid ${BORDER}`, borderRadius: 7, display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: va.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 8, fontWeight: 600, color: DARK }}>{va.label}</span>
                    <span style={{ fontSize: 8, color: MED, marginLeft: "auto" }}>›</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        <div style={{ position: "absolute" as const, bottom: 8, left: "50%", transform: "translateX(-50%)", width: 50, height: 3, background: DARK, borderRadius: 2, opacity: 0.5 }} />
      </div>
    </div>
  );
};

// ── Écran 4 — Page Territoire (4 territoires, sélecteur interactif) ──────────
const TERRITOIRES_DATA = [
  {
    label: "Gascogne", region: "Sud-Ouest occitan", docsCount: "1 240",
    sections: [
      { title: "Musique",            type: "Archive",  typeColor: EC.musique,   items: 3 },
      { title: "Fêtes & Traditions", type: "PCI",      typeColor: EC.fetes,     items: 3 },
      { title: "Personnalités",      type: "Portrait", typeColor: EC.portraits, items: 3, avatars: true },
    ],
    hasAgenda: true,
    agendaItems: [
      { date: "08 août", lieu: "Dax",    title: "Fêtes de Dax" },
      { date: "15 août", lieu: "Mont-de-Marsan", title: "Festival des Landes" },
    ],
  },
  {
    label: "Languedoc", region: "Cœur de l'Occitanie", docsCount: "2 180",
    sections: [
      { title: "Langue",             type: "Article",  typeColor: EC.langue,    items: 3 },
      { title: "Fêtes & Traditions", type: "PCI",      typeColor: EC.fetes,     items: 3 },
      { title: "La Scène",           type: "Article",  typeColor: EC.scene,     items: 2 },
      { title: "Personnalités",      type: "Portrait", typeColor: EC.portraits, items: 3, avatars: true },
    ],
    hasAgenda: true,
    agendaItems: [
      { date: "12 juil.", lieu: "Montpellier", title: "Canto lo Vent" },
      { date: "3 août",   lieu: "Béziers",     title: "Festival occitan" },
    ],
  },
  {
    label: "Pyrénées", region: "Occitan & gascon pyrénéen", docsCount: "890",
    sections: [
      { title: "Musique",            type: "Archive",  typeColor: EC.musique, items: 3 },
      { title: "Fêtes & Traditions", type: "PCI",      typeColor: EC.fetes,   items: 3 },
      { title: "Personnalités",      type: "Portrait", typeColor: EC.portraits, items: 2, avatars: true },
    ],
    hasAgenda: false,
    agendaItems: [],
  },
  {
    label: "Provence", region: "Occitan provençal", docsCount: "760",
    sections: [
      { title: "Langue",             type: "Article",  typeColor: EC.langue,    items: 3 },
      { title: "Portraits",          type: "Portrait", typeColor: EC.portraits, items: 3 },
      { title: "La Scène",           type: "Article",  typeColor: EC.scene,     items: 2 },
      { title: "Personnalités",      type: "Portrait", typeColor: EC.portraits, items: 3, avatars: true },
    ],
    hasAgenda: true,
    agendaItems: [
      { date: "5 juil.", lieu: "Aix-en-Provence", title: "Fèsto Vierginenco" },
    ],
  },
];

const TerritoireSection = () => {
  const [sel, setSel] = useState(0);
  const t = TERRITOIRES_DATA[sel];

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 10, flexShrink: 0 }}>
      <div style={{ fontSize: 8.5, fontWeight: 700, color: DARK, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>PAGE TERRITOIRE — {t.label.toUpperCase()}</div>

      {/* Sélecteur 4 territoires */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const, justifyContent: "center", maxWidth: 260 }}>
        {TERRITOIRES_DATA.map((terr, i) => (
          <div key={i} onClick={() => setSel(i)} style={{
            padding: "4px 10px", borderRadius: 99, cursor: "pointer",
            background: sel === i ? OCC : WHITE,
            color: sel === i ? WHITE : DARK,
            border: `1.5px solid ${sel === i ? OCC : BORDER}`,
            fontSize: 9, fontWeight: sel === i ? 700 : 400,
          }}>{terr.label}</div>
        ))}
      </div>

      {/* Phone mock */}
      <div style={{ position: "relative" as const }}>
        <div style={{ width: 220, height: 480, background: WHITE, borderRadius: 32, border: `6px solid ${DARK}`, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.16)" }}>
          <div style={{ position: "absolute" as const, top: 0, left: "50%", transform: "translateX(-50%)", width: 70, height: 16, background: DARK, borderRadius: "0 0 9px 9px", zIndex: 30 }} />
          <div style={{ height: "100%", overflowY: "scroll" as const, paddingTop: 18, scrollbarWidth: "none" as const }}>

            <NavHeader back={true} />

            {/* En-tête territoire */}
            <div style={{ background: OCC, padding: "10px 14px 10px" }}>
              <div style={{ color: WHITE, fontWeight: 800, fontSize: 13 }}>{t.label}</div>
              <div style={{ color: WHITE, opacity: 0.7, fontSize: 7.5, marginTop: 1 }}>{t.region}</div>
            </div>

            {/* Mini carte OSM */}
            <div style={{ margin: "8px 14px 0", height: 50, background: "#dce8e8", border: `1px solid ${BORDER}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 7.5, color: GRAY, fontStyle: "italic" }}>Carte OSM — {t.label}</span>
            </div>

            {/* Sections thématiques — même structure que pages Espace */}
            {t.sections.map((section, si) => (
              <div key={`${sel}-${si}`}>
                <Divider />
                <div style={{ padding: "10px 14px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <SectionLabel>{section.title}</SectionLabel>
                    <div style={{ display: "flex", gap: 4, marginBottom: 7 }}>
                      {["←","→"].map((a, i) => (
                        <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: DARK }}>{a}</div>
                      ))}
                    </div>
                  </div>
                  {/* Avatars pour Personnalités */}
                  {(section as any).avatars ? (
                    <div style={{ display: "flex", gap: 10, overflowX: "auto" as const, scrollbarWidth: "none" as const, paddingBottom: 6 }}>
                      {Array.from({ length: section.items }).map((_, i) => (
                        <div key={i} style={{ flexShrink: 0, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4 }}>
                          <div style={{ width: 38, height: 38, borderRadius: "50%", background: LIGHT, border: `1px solid ${BORDER}` }} />
                          <div style={{ height: 5, background: MED, borderRadius: 2, width: 36 }} />
                          <div style={{ height: 4, background: LIGHT, borderRadius: 2, width: 26 }} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Cards slider standard */
                    <div style={{ display: "flex", gap: 7, overflowX: "auto" as const, scrollbarWidth: "none" as const, paddingBottom: 6 }}>
                      {Array.from({ length: section.items }).map((_, i) => (
                        <div key={i} style={{ flexShrink: 0, width: 100, border: `1px solid ${BORDER}`, borderRadius: 6, overflow: "hidden" }}>
                          <div style={{ height: 58, background: "#2c2c2c", position: "relative" as const }}>
                            <span style={{ position: "absolute" as const, top: 5, left: 5, fontSize: 5.5, color: section.typeColor, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, background: "rgba(255,255,255,0.9)", padding: "1px 4px", borderRadius: 3 }}>{section.type}</span>
                          </div>
                          <div style={{ padding: "4px 6px 6px" }}>
                            <div style={{ height: 5, background: MED, borderRadius: 2, width: "85%", marginBottom: 2 }} />
                            <div style={{ height: 4, background: LIGHT, borderRadius: 2, width: "60%" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Module Agenda — variable */}
            {t.hasAgenda && (
              <>
                <Divider />
                <div style={{ padding: "10px 14px 4px" }}>
                  <SectionLabel>Agenda</SectionLabel>
                  {t.agendaItems.map((ev, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", borderTop: i > 0 ? `1px solid ${BORDER}` : "none", paddingTop: i > 0 ? 7 : 0, paddingBottom: 7 }}>
                      <div style={{ width: 30, flexShrink: 0, textAlign: "center" as const }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: OCC, lineHeight: 1 }}>{ev.date.split(" ")[0]}</div>
                        <div style={{ fontSize: 5.5, color: GRAY, textTransform: "uppercase" as const }}>{ev.date.split(" ")[1]}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 7.5, fontWeight: 600, color: DARK, marginBottom: 2 }}>{ev.title}</div>
                        <div style={{ fontSize: 6.5, color: GRAY }}>{ev.lieu}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ paddingBottom: 6, textAlign: "center" as const }}>
                    <span style={{ fontSize: 8, color: OCC, fontWeight: 600 }}>Voir tout l'agenda →</span>
                  </div>
                </div>
              </>
            )}

            {/* Accès Collections Gallica — aligné avec les pages Espace */}
            <Divider />
            <div style={{ padding: "10px 14px 14px" }}>
              <div style={{ borderRadius: 8, overflow: "hidden", position: "relative" as const }}>
                <div style={{ height: 55, background: "#2c2c2c" }} />
                <div style={{ position: "absolute" as const, inset: 0, background: `${OCC}cc`, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 5 }}>
                  <div style={{ fontSize: 6.5, color: WHITE, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.09em" }}>{t.docsCount} documents · Gallica</div>
                  <div style={{ padding: "3px 14px", background: WHITE, borderRadius: 99, fontSize: 7.5, fontWeight: 700, color: DARK }}>Consulter les archives ↗</div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div style={{ position: "absolute" as const, bottom: 8, left: "50%", transform: "translateX(-50%)", width: 50, height: 3, background: DARK, borderRadius: 2, opacity: 0.5 }} />
      </div>
    </div>
  );
};

// ── Écran 5 — Home Collections ───────────────────────────────────────────────
const CollectionsPhone = () => {
  const thematiques = [
    { label: "Langue",         color: EC.langue,    count: "3 241 docs" },
    { label: "Musique",        color: EC.musique,   count: "1 876 docs" },
    { label: "Fêtes & Trad.", color: EC.fetes,     count: "987 docs"   },
    { label: "Portraits",      color: EC.portraits, count: "2 134 docs" },
    { label: "La Scène",       color: EC.scene,     count: "612 docs"   },
  ];
  const territoires = [
    { label: "Gascogne",   count: "1 243 docs" },
    { label: "Languedoc",  count: "2 476 docs" },
    { label: "Provence",   count: "894 docs"   },
    { label: "Pyrénées",   count: "612 docs"   },
    { label: "Limousin",   count: "438 docs"   },
  ];
  const types = [
    { label: "Bibliothèque",      icon: "📄", count: "4 821 docs", color: "#2c3e50" },
    { label: "Archives sonores",  icon: "🎵", count: "3 247 docs", color: "#1a5276" },
    { label: "Vidéothèque",       icon: "▶",  count: "1 893 docs", color: "#4a235a" },
    { label: "Iconothèque",       icon: "🖼",  count: "2 104 docs", color: "#784212" },
    { label: "Ressources langue", icon: "Aa", count: "892 docs",   color: "#1e8449" },
    { label: "Expositions",       icon: "✦",  count: "3 expos",    color: "#922b21" },
  ];
  const periodes = [
    { label: "Moyen Âge",       span: "10e–15e s.", count: "800 docs",   shade: "#1c2833" },
    { label: "Époque moderne",  span: "16e–18e s.", count: "1 240 docs", shade: "#2e4057" },
    { label: "19e siècle",      span: "1800–1900",  count: "2 340 docs", shade: "#1a4a4a" },
    { label: "20e siècle",      span: "1900–2000",  count: "3 870 docs", shade: "#2d4a1e" },
    { label: "Contemporain",    span: "2000 →",     count: "1 450 docs", shade: "#4a1942" },
  ];
  const SliderRow = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <Divider />
      <div style={{ padding: "10px 14px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <SectionLabel>{title}</SectionLabel>
          <div style={{ display: "flex", gap: 4, marginBottom: 7 }}>
            {["←","→"].map((a, i) => (
              <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: DARK }}>{a}</div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 7, overflowX: "auto" as const, scrollbarWidth: "none" as const, paddingBottom: 6 }}>
          {children}
        </div>
      </div>
    </div>
  );
  return (
    <>
      <NavHeader />
      {/* Titre page */}
      <div style={{ padding: "10px 14px 8px" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: DARK, letterSpacing: "-0.01em" }}>Collections</div>
        <div style={{ fontSize: 7.5, color: GRAY, marginTop: 2 }}>Documents numérisés · Archives · Fonds patrimoniaux</div>
      </div>

      {/* Barre de recherche → Gallica */}
      <div style={{ padding: "0 14px 10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1.5px solid ${OCC}`, borderRadius: 8, padding: "6px 10px" }}>
          <span style={{ fontSize: 11, color: OCC }}>🔍</span>
          <span style={{ fontSize: 8, color: GRAY, flex: 1 }}>Rechercher dans les collections…</span>
          <div style={{ padding: "2px 8px", background: OCC, color: WHITE, borderRadius: 4, fontSize: 7, fontWeight: 700 }}>Gallica ↗</div>
        </div>
      </div>

      {/* ① Par thématique */}
      <SliderRow title="Par thématique">
        {thematiques.map((c, i) => (
          <div key={i} style={{ flexShrink: 0, width: 90, borderRadius: 8, overflow: "hidden", border: `1px solid ${BORDER}` }}>
            <div style={{ position: "relative" as const, height: 58 }}>
              <div style={{ width: "100%", height: "100%", background: "#2c2c2c" }} />
              <div style={{ position: "absolute" as const, inset: 0, background: `linear-gradient(transparent 25%, ${c.color}e8)`, display: "flex", flexDirection: "column" as const, justifyContent: "flex-end", padding: "0 6px 6px" }}>
                <span style={{ fontSize: 7, color: WHITE, fontWeight: 700, lineHeight: 1.2 }}>{c.label}</span>
              </div>
            </div>
            <div style={{ padding: "3px 6px 5px" }}>
              <span style={{ fontSize: 6, color: GRAY }}>{c.count}</span>
            </div>
          </div>
        ))}
      </SliderRow>

      {/* ② Par territoire */}
      <SliderRow title="Par territoire">
        {territoires.map((t, i) => (
          <div key={i} style={{ flexShrink: 0, width: 90, borderRadius: 8, overflow: "hidden", border: `1px solid ${BORDER}` }}>
            <div style={{ position: "relative" as const, height: 58 }}>
              <div style={{ width: "100%", height: "100%", background: "#dce8e8" }} />
              <div style={{ position: "absolute" as const, inset: 0, background: `linear-gradient(transparent 25%, ${OCC}e8)`, display: "flex", flexDirection: "column" as const, justifyContent: "flex-end", padding: "0 6px 6px" }}>
                <span style={{ fontSize: 7, color: WHITE, fontWeight: 700 }}>{t.label}</span>
              </div>
            </div>
            <div style={{ padding: "3px 6px 5px" }}>
              <span style={{ fontSize: 6, color: GRAY }}>{t.count}</span>
            </div>
          </div>
        ))}
      </SliderRow>

      {/* ③ Par type de document */}
      <SliderRow title="Par type de document">
        {types.map((tp, i) => (
          <div key={i} style={{ flexShrink: 0, width: 90, borderRadius: 8, overflow: "hidden", border: `1px solid ${BORDER}` }}>
            <div style={{ height: 58, background: tp.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 20 }}>{tp.icon}</span>
            </div>
            <div style={{ padding: "4px 6px 5px" }}>
              <div style={{ fontSize: 7, fontWeight: 600, color: DARK, marginBottom: 1, lineHeight: 1.2 }}>{tp.label}</div>
              <span style={{ fontSize: 6, color: GRAY }}>{tp.count}</span>
            </div>
          </div>
        ))}
      </SliderRow>

      {/* ④ Par période */}
      <SliderRow title="Par période">
        {periodes.map((p, i) => (
          <div key={i} style={{ flexShrink: 0, width: 90, borderRadius: 8, overflow: "hidden", border: `1px solid ${BORDER}` }}>
            <div style={{ height: 58, background: p.shade, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 2, padding: "0 6px" }}>
              <span style={{ fontSize: 8, color: WHITE, fontWeight: 800, textAlign: "center" as const, lineHeight: 1.2 }}>{p.label}</span>
              <span style={{ fontSize: 6, color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em" }}>{p.span}</span>
            </div>
            <div style={{ padding: "3px 6px 5px" }}>
              <span style={{ fontSize: 6, color: GRAY }}>{p.count}</span>
            </div>
          </div>
        ))}
      </SliderRow>

      <div style={{ height: 14 }} />
    </>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────
const TABS = [
  {
    label: "Home mobile",
    screenLabel: "HOME — SCROLL COMPLET",
    phone: <HomePhone />,
    annotations: [
      { n: "1", title: "Header", desc: "Logo OCCITANICA + 🔍 + hamburger → menu overlay." },
      { n: "2", title: "À la une", desc: "Carousel éditorial style «Aujourd'hui» Radio France — 1 carte visible, image plein cadre, gradient sombre, tag + titre en overlay. Dots de navigation. On tape la carte pour accéder au contenu." },
      { n: "3", title: "À découvrir dans les espaces", desc: "5 portails espace en scroll horizontal · image ambiance plein cadre (ce visuel devient l'entête de la page espace) + gradient couleur + nom + accroche courte en zone blanche. Evergreen — mise à jour trimestrielle au mieux. Cohérence Home → page Espace assurée par le visuel." },
      { n: "4", title: "Territoires — strip pills", desc: "Bloc de respiration sur fond clair · 8 pills noms de territoires en scroll horizontal natif · indicateur › aria-hidden. Evergreen, statique. Accessibilité : role='navigation', aria-label='Explorer par territoire', focus visible clavier sur chaque pill (WCAG AA)." },
      { n: "5", title: "Cultura viva", desc: "1 article héros plein cadre + liste 2 articles (vignette + tag espace + titre), style NatGeo. Contenus issus de plusieurs espaces (La Scène, Fêtes, Musique…) — l'intitulé 'Cultura viva' porte la promesse de vivant sans enfermer dans un seul espace. Héros : mise à jour mensuelle. Liste : evergreen ou mensuelle." },
      { n: "6", title: "Collections — bloc illustratif", desc: "Image de composition pleine largeur + CTA 'Explorer les collections' centré · evergreen. Bloc statique cohérent avec le reste du wireframe : une image, un bouton, une destination. Pertinent pour les utilisateurs patrimoniaux (≈30% de la cible)." },
      { n: "7", title: "Footer — sitemap à mettre à jour", desc: "5 entrées : Espaces (Langue, Musique, Fêtes, Portraits, La Scène — sans Territoires) · Territoires (zone dédiée, accordéon avec liste des territoires) · Collections (lien direct →, pas d'accordéon) · Occitanica (À propos, Contact, Accessibilité, Mentions légales, Politique cookies) · Ressources (Agenda ↗, La Maleta ↗, Campus ↗). ⚠️ Sitemap V3 à mettre à jour : Territoires sort des Espaces, Collections devient une entrée de navigation principale." },
    ],
  },
  {
    label: "Navigation mobile",
    screenLabel: "NAVIGATION MOBILE",
    phone: <NavPhone />,
    annotations: [
      { n: "1", title: "Header menu ouvert", desc: "Fond sombre · logo + 🔍 + ✕ pour fermer. Le menu prend tout l'écran." },
      { n: "2", title: "Espaces — barre couleur + sous-titre", desc: "Chaque espace identifié par sa couleur (barre gauche), son nom en gras et un sous-titre rappelant les contenus. La couleur remplace l'icône — plus sobre." },
      { n: "3", title: "Territoires — accordéon inline", desc: "⚠️ Question de conception : il n'existe pas de page liste des territoires. Le clic sur «Territoires» ouvre un accordéon inline qui expose les territoires directement dans le menu. Alternative : supprimer l'entrée du menu et n'exposer les territoires que depuis la Home." },
      { n: "4", title: "Collections", desc: "Entrée distincte, plus discrète. Mène vers la Home Collections." },
      { n: "5", title: "Pas de barre de recherche dans le menu", desc: "La recherche est dans le header (icône 🔍) sur toutes les pages. Inutile de la redoubler dans le menu. La recherche Gallica est uniquement dans la page Collections." },
    ],
  },
  {
    label: "Page Espace",
    screenLabel: "PAGE ESPACE TYPE — MUSIQUE",
    phone: <EspaceSection />,
    noPhoneWrapper: true,
    annotations: [
      { n: "1", title: "En-tête espace", desc: "Même visuel ambiance que la carte Home — continuité visuelle garantie. Plus grand (90px) pour asseoir l'identité de l'espace. Le nom + l'accroche restent en overlay sur le gradient couleur de l'espace." },
      { n: "2", title: "À la une — héros éditorial", desc: "1 contenu fort mis en avant : article, expo numérique, portrait ou fiche PCI selon l'espace. Mis à jour mensuellement. Tag type de contenu coloré (Article · Portrait · PCI · Expo · Archive) pour aider le visiteur à comprendre ce qu'il va trouver avant de cliquer." },
      { n: "3", title: "Sections thématiques — style Arte", desc: "Chaque section = 1 titre éditorial + scroll horizontal de cards. Les titres sont propres à l'espace (Archives sonores · Portraits de musiciens · Instruments & danses). Les cards sont universelles : image + badge type + titre. Les flèches ← → signalent le scroll. Aucune section vide ne s'affiche : si le contenu manque, la section est masquée." },
      { n: "4", title: "Module Agenda — variable", desc: "Présent uniquement pour Musique, Fêtes & Traditions et La Scène. Absent pour Langue et Portraits. Liste compact : badge date + titre + lieu + CTA 'Voir tout l'agenda →'. Module plug-and-play : s'insère ou se retire sans toucher à la structure de la page." },
      { n: "5", title: "Accès Collections filtré", desc: "Bloc CTA : image de fond + overlay couleur espace + 'Explorer les collections'. Le CTA mène vers Collections pré-filtré sur l'espace. Cohérence visuelle avec le bloc Collections de la Home. Evergreen." },
      { n: "6", title: "Voir aussi — transversal", desc: "2 liens vers des espaces connexes (Portraits et Fêtes pour Musique). Favorise la découverte inter-espaces et évite les silos. Le dot coloré rappelle l'identité chromatique de chaque espace." },
    ],
  },
  {
    label: "Page Territoire",
    screenLabel: "PAGE TERRITOIRE",
    phone: <TerritoireSection />,
    noPhoneWrapper: true,
    annotations: [
      { n: "1", title: "En-tête OCC — commun à tous les territoires", desc: "Fond OCC (vert Occitanica) identique pour les 4 territoires — les différencie clairement des Espaces qui ont chacun leur couleur. Nom + région en sous-titre. Le choix OCC marque que le territoire est une vue transversale sur le corpus, pas un espace thématique." },
      { n: "2", title: "Mini carte OSM", desc: "Aperçu géographique du territoire — non interactif à ce stade. Différenciateur fort et immédiat de la page territoire vs. page espace." },
      { n: "3", title: "Sections thématiques — même structure que les Espaces", desc: "Chaque espace représenté sur le territoire = 1 section nommée avec slider horizontal et flèches ← →. Cohérence totale avec les pages Espace. Si un espace n'a pas de contenu pour ce territoire, sa section n'apparaît pas — pas de section vide." },
      { n: "4", title: "Personnalités — slider d'avatars", desc: "Section dédiée avec le même pattern slider que les autres sections. Alimente par Enciclopèdia > Actors et La Maleta > Retraches, filtrés par tag territoire." },
      { n: "5", title: "Module Agenda — variable", desc: "Présent si le territoire a des événements tagués (Gascogne, Languedoc, Provence). Absent sinon (Pyrénées au lancement). Même composant que sur les pages Espace — cohérence totale." },
      { n: "6", title: "Bloc Collections Gallica — aligné avec les Espaces", desc: "Même pattern visuel que le bloc Collections des pages Espace : overlay couleur OCC + nombre de documents + CTA bouton blanc 'Consulter les archives ↗'. Le chiffre de documents (ex. 1 240) est une promesse quantitative forte pour les utilisateurs documentaires." },
    ],
  },
  {
    label: "Home Collections",
    screenLabel: "HOME COLLECTIONS — ABOVE FOLD",
    phone: <CollectionsPhone />,
    annotations: [
      { n: "1", title: "Header", desc: "Logo + 🔍 + hamburger — même header que les autres pages." },
      { n: "2", title: "Titre + chapeau", desc: "«Collections» en grand + sous-titre rappelant la nature du contenu (documents numérisés, archives, fonds)." },
      { n: "3", title: "Barre de recherche → Gallica", desc: "Entrée principale de la page. Le CTA «Gallica ↗» ouvre la recherche full-text dans l'interface Gallica (nouvel onglet). C'est l'action principale de Collections." },
      { n: "4", title: "Par thématique — même cards que les Espaces", desc: "Slider horizontal avec flèches ← → · cards image + gradient couleur espace + label + compteur de documents. Même pattern que les portails Espaces sur la Home — cohérence totale. Entrée naturelle pour Marius." },
      { n: "5", title: "Par territoire — même cards que la Home", desc: "Slider horizontal avec flèches ← → · cards image OSM + gradient OCC + nom territoire + compteur. Même pattern que les pills territoire de la Home, enrichi du compteur documentaire. Permet à Marius de voir ce qui concerne sa région." },
      { n: "6", title: "Par type de document — troisième axe", desc: "Slider horizontal · cards fond coloré + icône + nom du type + compteur. Types : Bibliothèque · Archives sonores · Vidéothèque · Iconothèque · Ressources langue · Expositions. Entrée principale pour Anaïs — elle sait qu'elle cherche des 'archives sonores', pas un espace thématique." },
      { n: "7", title: "Par période — quatrième axe", desc: "Slider horizontal · cards fond sombre avec nom + fourchette de dates + compteur. Périodes : Moyen Âge · Époque moderne · 19e s. · 20e s. · Contemporain. Axe chronologique indispensable pour une collection patrimoniale — Anaïs peut cibler directement les fonds du 19e siècle sans naviguer par espace ou type. Complète les 4 entrées naturelles dans une archive : thématique / territoire / type / période." },
    ],
  },
];

export default function OccitanicaWireframes() {
  const [tab, setTab] = useState(0);
  const t = TABS[tab];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: LIGHT, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Title */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "14px 24px 0" }}>
        <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" as const, textAlign: "center", color: DARK }}>WIREFRAMES MOBILE</div>
        <div style={{ fontSize: 10, color: GRAY, textAlign: "center", marginTop: 2, marginBottom: 12 }}>Occitanica · Refonte 2026 · Mobile first · Thomas Iris × UX Assistant</div>
        {/* Tabs */}
        <div style={{ display: "flex" }}>
          {TABS.map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              style={{
                padding: "8px 20px",
                fontSize: 12,
                fontWeight: tab === i ? 700 : 400,
                color: tab === i ? OCC : GRAY,
                borderBottom: `2px solid ${tab === i ? OCC : "transparent"}`,
                background: "transparent",
                border: "none",
                borderBottomStyle: "solid",
                borderBottomWidth: 2,
                borderBottomColor: tab === i ? OCC : "transparent",
                cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "28px 32px", display: "flex", gap: 40, alignItems: "flex-start", overflow: "auto" }}>
        {/* Phone */}
        {(t as any).noPhoneWrapper ? t.phone : (
          <Phone label={t.screenLabel}>
            {t.phone}
          </Phone>
        )}
        {/* Annotations */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          {t.annotations.map((a, i) => (
            <Annotation key={i} n={a.n} title={a.title} desc={a.desc} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${BORDER}`, background: WHITE, padding: "8px 24px", textAlign: "center", fontSize: 9, color: GRAY }}>
        Wireframe basse fidélité · v1 · Mobile first · Les interactions finales dépendent des contraintes CMS/Drupal
      </div>
    </div>
  );
}
