
import { useState } from "react";

// ── Palette ───────────────────────────────────────────────────
const COLORS = {
  langue:    "#1a5276",
  musique:   "#6c3483",
  fetes:     "#784212",
  portraits: "#1e8449",
  creation:  "#922b21",
  territoire:"#17607a",
  nav2:      "#424949",
  gallica:   "#2c3e50",
  transversal:"#566573",
};

// ── Données ───────────────────────────────────────────────────
// ⚠️ Les sous-espaces sont des PROPOSITIONS basées sur le contenu existant (audit Gabrielle, arborescence Occitanica 2026).
// Ils sont à valider avec le CIRDOC — c'est au client de définir la granularité réelle de chaque espace.
const ESPACES = [
  {
    key: "langue", label: "Langue", color: COLORS.langue,
    badge: null,
    aValider: true,
    sousEspaces: [
      "Troubadours & Poésie médiévale",  // ← Bibliotèca + Enciclopèdia/Documentari
      "Langue & Linguistique",            // ← Lengatèca (ressources langue)
      "Littérature occitane",             // ← Bibliotèca (Mistral, Rochegude, corpus)
      "Recherche & Ressources",           // ← Campus (ressources académiques, agreg)
    ],
  },
  {
    key: "musique", label: "Musique", color: COLORS.musique,
    badge: null,
    aValider: true,
    sousEspaces: [
      "Chants & Voix",                   // ← Fonotèca + PCI Mondes (chants)
      "Instruments",                     // ← PCI Mondes (instruments)
      "Danses",                          // ← PCI Mondes (danses)
      "Artistes & Groupes",             // ← La Basa (créateurs musicaux)
      "Archives sonores",               // ← Fonotèca (Mémoire chantée de l'Aude…)
    ],
  },
  {
    key: "fetes", label: "Fêtes & Traditions", color: COLORS.fetes,
    badge: "⚡ Top analytics",
    aValider: true,
    sousEspaces: [
      "Fêtes & Carnavals",              // ← PCI Mondes Fête + Tematicas Carnaval / Nadal
      "Artisanat & Savoir-faire",       // ← PCI Mondes Artisanat + Cosina tarnesa
      "Sports & Jeux",                  // ← PCI Mondes Sports et jeux
      "Pratiques & Usages",            // ← Mondes catalogue (1 617 entrées PCI)
    ],
  },
  {
    key: "portraits", label: "Portraits", color: COLORS.portraits,
    badge: "⚡ Top analytics",
    aValider: true,
    sousEspaces: [
      "Figures historiques & Troubadours", // ← Enciclopèdia/Actors par période (XIIe–XXe)
      "Écrivains & Poètes",               // ← Enciclopèdia/Actors par métier (écrivains)
      "Artistes & Musiciens",             // ← Enciclopèdia/Actors + La Basa (créateurs)
      "Chercheurs & Collecteurs",         // ← Enciclopèdia/Actors (ethnologues, académiques)
    ],
  },
  {
    key: "creation", label: "La Scène occitane", color: COLORS.creation,
    badge: "Spectacle vivant · Arts · Parutions",
    aValider: false,
    sousEspaces: [
      "Artistes & Créations (La Basa)",  // ← 780 créateurs · 495 créations · 2 012 parutions
      "Festivals & Agenda",              // ← Base festivals (14) + Agenda évènements
      "Actualités (Lo Mag)",             // ← 12 articles d'actualité
      "Pour les professionnels (La Bóstia)", // ← 12 dossiers aide au montage de projet
    ],
  },
];

const TERRITOIRES_N2 = [
  "Gascogne", "Languedoc", "Provence",
  "Pyrénées", "Val d'Aran", "Périgord",
  "Limousin", "Dauphiné", "Vivaro-alpin",
];

const FOOTER_COLS = [
  {
    title: "Espaces",
    items: ["Langue", "Musique", "Fêtes & Traditions", "Portraits", "La Scène occitane"],
  },
  {
    title: "Territoires",
    items: ["Gascogne", "Languedoc", "Provence", "Pyrénées", "Val d'Aran", "Périgord", "Limousin", "Dauphiné", "Vivaro-alpin"],
  },
  {
    title: "Collections",
    items: ["→ Explorer les collections"],
    direct: true,
  },
  {
    title: "Occitanica",
    items: ["À propos", "Contact", "Accessibilité", "Mentions légales", "Politique cookies"],
  },
  {
    title: "Ressources",
    items: ["Agenda → liens externes ↗", "La Maleta ↗", "Campus ↗"],
  },
];

const CIRDOC_SITES = [
  { name: "Occitanica", desc: "Portail culturel" },
  { name: "La Maleta", desc: "Ressources pédagogiques" },
  { name: "Campus", desc: "Formations en ligne" },
  { name: "IEO", desc: "Institut d'estudis occitans" },
];

const PAGE_TEMPLATES = [
  {
    label: "Page Espace",
    ex: "ex : Musique",
    color: "#374151",
    items: [
      "Hero + accroche éditoriale",
      "Onglets sous-espaces (scroll mobile)",
      "À la une ×4",
      "⭐ Pépite de collection (1 doc mis en avant)",
      "👤 Portraits liés (si portraits tagués cet espace)",
      "🗓️ Agenda thématique → liens agendas externes ↗",
      "→ Accéder aux documents (Collections)",
    ],
  },
  {
    label: "Home Collections",
    ex: "Fonds patrimoniaux numérisés",
    color: COLORS.gallica,
    items: [
      "Intro éditoriale + Barre de recherche de documents → Gallica (périmètre Occitanica, nouvel onglet)",
      "Lien Recherche avancée → Gallica ↗",
      "Carrousel 1 — Collections thématiques (vignettes → Pages Collection)",
      "Carrousel 2 — Collections par territoire (vignettes → Pages Collection territoire)",
      "Filtres : type de doc, thématique, période",
    ],
  },
  {
    label: "Page Territoire",
    ex: "ex : Gascogne",
    color: COLORS.territoire,
    items: [
      "Intro territoriale + carte",
      "Onglets espaces filtrés",
      "Contenus filtrés",
      "👤 Personnalités locales (portraits tagués territoire)",
      "🗓️ Agenda local → liens agendas territoriaux ↗",
      "📦 Bloc «N documents patrimoniaux» : sélection de vignettes + CTA",
      "  ↳ Option A (simple) → Gallica filtré par territoire, nouvel onglet ↗",
      "  ↳ Option B (médiation) → Page Collection territoire → Gallica ↗",
    ],
  },
  {
    label: "Page Collection (éditoriale)",
    ex: "Réf. BDN Diplomatie",
    color: COLORS.gallica,
    items: [
      "Titre + CTA Voir les titres → Gallica ↗",
      "Texte éditorial + Lire la suite",
      "Sous-sélections thématiques (vignettes → Gallica filtré ↗)",
      "Articles liés — Aller plus loin",
    ],
  },
  {
    label: "Article / Fiche PCI",
    ex: "ex : Carnaval de Limoux",
    color: "#374151",
    items: [
      "Labels éditoriaux + tags espaces",
      "Corps + médias",
      "🗺️ Carte territoire",
      "👤 Portraits liés (si portraits tagués)",
      "Sources → Gallica",
      "Suggestions + Lien La Maleta ↗",
    ],
  },
  {
    label: "Page notice Gallica",
    ex: "(niveau documentaire distinct — hors site)",
    color: "#111827",
    items: ["Interface Gallica / BnF", "Accès document source", "Retour vers Occitanica"],
  },
];

const LABELS = [
  { label: "🟡 Patrimoine documentaire", color: "#d4ac0d" },
  { label: "🟢 Patrimoine vivant (PCI)", color: "#1e8449" },
  { label: "🔵 Création contemporaine", color: "#1a5276" },
  { label: "🗺️ Tag territoire", color: COLORS.territoire },
  { label: "👤 Portrait lié (personnalité taguée avec un espace)", color: "#1e8449" },
  { label: "📚 Ressource éducative (La Maleta)", color: "#512e5f" },
  { label: "🎓 Travaux de recherche (Campus/thèses)", color: "#5d4037" },
];

const LABEL_DETAILS = [
  {
    label: "🟡 Patrimoine documentaire",
    color: "#d4ac0d",
    desc: "Document numérisé accessible via Gallica (périmètre Occitanica). Apparaît dans les articles comme source, dans le bloc Pépite de collection des pages Espace, et dans la section Collections.",
    ex: "Manuscrit, partition, photographie, carte, enregistrement sonore...",
  },
  {
    label: "🟢 Patrimoine vivant (PCI)",
    color: "#1e8449",
    desc: "Pratiques, expressions et savoir-faire transmis de génération en génération : musique, danse, fêtes, récits, artisanat, rituels. Contenu de type Fiche PCI.",
    ex: "Carnaval de Limoux, lou Bouyabes, danse de l'ours à Prats-de-Mollo...",
  },
  {
    label: "🔵 Création contemporaine",
    color: "#1a5276",
    desc: "Contenu issu de La Scène (Lo Mag, La Basa). Taggé avec le ou les espaces thématiques concernés pour apparaître dans leurs flux.",
    ex: "Nouvel album de Nadau → taggé Musique · Article Lo Mag → taggé Langue",
  },
  {
    label: "🗺️ Tag territoire",
    color: COLORS.territoire,
    desc: "Tout contenu localisable géographiquement. Permet l'affichage dans la page Territoire correspondante. Un contenu peut avoir plusieurs tags territoire.",
    ex: "Article sur le carnaval de Limoux → taggé Languedoc + Pyrénées",
  },
  {
    label: "👤 Portrait lié",
    color: "#1e8449",
    desc: "Personnalité (biographie / portrait) taguée avec un ou plusieurs espaces thématiques. Déclenche l'affichage du bloc Portraits liés dans les pages Espace concernées. Le bloc n'apparaît que si des portraits portent ce tag.",
    ex: "Portrait de Frédéric Mistral → taggé Langue · Portrait de Batiste Lissart → taggé Musique + La Scène",
  },
  {
    label: "📚 Ressource éducative (La Maleta)",
    color: "#512e5f",
    desc: "Contenu ou lien renvoyant vers La Maleta (ressources pédagogiques). Affiché en fin d'article comme suggestion. La Maleta reste un site externe.",
    ex: "Fiche PCI sur les instruments → suggestion La Maleta en bas de page",
  },
  {
    label: "🎓 Travaux de recherche (Campus/thèses)",
    color: "#5d4037",
    desc: "Thèse ou travail académique référencé depuis Campus. Intégré comme source dans les articles concernés. Campus est un site externe.",
    ex: "Article sur les troubadours → thèse de doctorat Campus en source",
  },
];

// ── Composants de base ────────────────────────────────────────
const LevelLabel = ({ children }: any) => (
  <div className="text-center font-bold uppercase tracking-widest text-gray-500 border-b border-gray-300 pb-1 mb-2" style={{ fontSize: 10, letterSpacing: 2 }}>
    {children}
  </div>
);

const NodeBox = ({ children, color = "#e5e7eb", textColor = "#111827", style = {}, className = "" }: any) => (
  <div
    className={`border rounded text-xs px-2 py-1 ${className}`}
    style={{ background: color, color: textColor, borderColor: color === "#f9fafb" ? "#d1d5db" : color, ...style }}
  >
    {children}
  </div>
);

export const Connector = ({ vertical = false }: any) => (
  <div
    className={vertical ? "border-l-2 border-gray-300 ml-3" : "border-t-2 border-gray-300 flex-1"}
    style={{ minHeight: vertical ? 8 : undefined, minWidth: vertical ? undefined : 8 }}
  />
);

// ── Arborescence principale ────────────────────────────────────
function MainTree() {
  const [activeEspace, setActiveEspace] = useState<string | null>(null);

  return (
    <div className="flex gap-0 items-start">

      {/* ── N0 HOME ── */}
      <div className="flex flex-col items-center" style={{ minWidth: 90 }}>
        <LevelLabel>Accueil</LevelLabel>
        <div className="flex flex-col items-center">
          <NodeBox color="#1f2937" textColor="#fff" style={{ fontWeight: 700, padding: "8px 12px", fontSize: 13 }}>
            HOME
          </NodeBox>
          {/* Ligne vers N1 */}
          <div className="w-0.5 bg-gray-400" style={{ height: 20 }}></div>
        </div>
      </div>

      {/* ── Séparateur ── */}
      <div className="flex items-start pt-7">
        <div className="border-t-2 border-gray-400" style={{ width: 16, marginTop: 10 }}></div>
      </div>

      {/* ── N1 ── */}
      <div style={{ minWidth: 200 }}>
        <LevelLabel>Niveau 1</LevelLabel>
        <div className="flex flex-col gap-1 relative">
          {/* Ligne verticale */}
          <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-400"></div>
          {ESPACES.map(e => (
            <div key={e.key} className="flex items-center gap-0">
              <div className="w-3 border-t-2 border-gray-400"></div>
              <div
                className="flex-1 rounded border-l-4 cursor-pointer select-none transition-all"
                style={{ borderLeftColor: e.color, background: activeEspace === e.key ? e.color + "22" : "#f9fafb", borderTopColor: "#d1d5db", borderRightColor: "#d1d5db", borderBottomColor: "#d1d5db", borderTopWidth: 1, borderRightWidth: 1, borderBottomWidth: 1 }}
                onClick={() => setActiveEspace(activeEspace === e.key ? null : e.key)}
              >
                <div className="px-2 py-1.5">
                  <div className="font-semibold" style={{ fontSize: 11, color: e.color }}>{e.label}</div>
                  {e.badge && <div className="text-gray-400" style={{ fontSize: 9 }}>{e.badge}</div>}
                </div>
              </div>
            </div>
          ))}
          {/* Territoire */}
          <div className="flex items-center gap-0">
            <div className="w-3 border-t-2 border-gray-400"></div>
            <div
              className="flex-1 rounded border-l-4"
              style={{ borderLeftColor: COLORS.territoire, background: "#f0f9fc", borderTopColor: "#d1d5db", borderRightColor: "#d1d5db", borderBottomColor: "#d1d5db", borderTopWidth: 1, borderRightWidth: 1, borderBottomWidth: 1 }}
            >
              <div className="px-2 py-1.5">
                <div className="font-semibold" style={{ fontSize: 11, color: COLORS.territoire }}>Territoires ▾</div>
                <div className="text-gray-400" style={{ fontSize: 9 }}>Dropdown → page territoire</div>
              </div>
            </div>
          </div>

          {/* ── Séparateur Collections ── */}
          <div className="flex items-center gap-1 my-1.5">
            <div className="w-3 border-t-2 border-gray-400"></div>
            <div className="flex-1 border-t border-dashed border-gray-400"></div>
          </div>

          {/* Collections — N1, traitement distinct des Espaces */}
          <div className="flex items-center gap-0">
            <div className="w-3 border-t-2 border-gray-800"></div>
            <div
              className="flex-1 rounded border-2"
              style={{ borderColor: COLORS.gallica, background: "#f0f2f5" }}
            >
              <div className="px-2 py-1.5">
                <div className="font-bold" style={{ fontSize: 11, color: COLORS.gallica }}>Collections</div>
                <div className="text-gray-500" style={{ fontSize: 9 }}>Fonds patrimoniaux numérisés · Accès direct header</div>
                <div className="mt-0.5 flex gap-1 flex-wrap">
                  <span className="rounded px-1 py-0 text-white" style={{ background: COLORS.gallica, fontSize: 8 }}>N1 distinct des Espaces</span>
                  <span className="rounded px-1 py-0 text-white" style={{ background: "#d4ac0d", fontSize: 8 }}>🟡 Patrimoine documentaire</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Séparateur ── */}
      <div className="flex items-start pt-7">
        <div className="border-t-2 border-gray-400" style={{ width: 16, marginTop: 10 }}></div>
      </div>

      {/* ── N2 ── */}
      <div style={{ minWidth: 230 }}>
        <div className="mb-2">
          <div className="text-center font-bold uppercase tracking-widest text-gray-500 border-b border-gray-300 pb-1" style={{ fontSize: 10, letterSpacing: 2 }}>Niveau 2 — Sous-espaces</div>
          <div className="text-center text-gray-400 italic mt-1" style={{ fontSize: 9 }}>Exemples d'intitulés — à définir par le CIRDOC</div>
        </div>
        <div className="flex flex-col gap-1">
          {ESPACES.map(e => (
            <div key={e.key} className="relative">
              <div className="absolute left-0 top-2 bottom-2 w-0.5" style={{ background: e.color + "55" }}></div>
              {e.sousEspaces.map((s, i) => (
                <div key={i} className="flex items-center gap-0 mb-0.5">
                  <div className="w-3 border-t border-gray-300"></div>
                  <div className="flex-1 bg-white border border-gray-200 rounded px-2 py-0.5" style={{ borderLeftColor: e.color + "88", borderLeftWidth: 2 }}>
                    <span className="text-gray-700" style={{ fontSize: 10 }}>{s}</span>
                  </div>
                </div>
              ))}
              <div className="mb-1"></div>
            </div>
          ))}
          {/* Territoires N2 */}
          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-0.5" style={{ background: COLORS.territoire + "55" }}></div>
            <div className="flex items-center gap-0 mb-0.5">
              <div className="w-3 border-t border-gray-300"></div>
              <div className="bg-white border border-gray-200 rounded px-2 py-0.5" style={{ borderLeftColor: COLORS.territoire + "88", borderLeftWidth: 2 }}>
                <span className="text-gray-500" style={{ fontSize: 10 }}>Gascogne · Languedoc · Provence · Pyrénées · Val d'Aran · Périgord · Limousin · Dauphiné · Vivaro-alpin</span>
              </div>
            </div>
          </div>

          {/* Séparateur Collections N2 */}
          <div className="border-t border-dashed border-gray-400 my-1.5"></div>

          {/* Collections N2 */}
          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-0.5" style={{ background: COLORS.gallica + "66" }}></div>

            {/* L0 Index */}
            <div className="flex items-start gap-0 mb-1">
              <div className="w-3 border-t border-gray-300 mt-2"></div>
              <div className="flex-1 border rounded overflow-hidden" style={{ borderColor: COLORS.gallica + "55" }}>
                <div className="px-2 py-1" style={{ background: COLORS.gallica, color: "#fff" }}>
                  <div className="font-bold" style={{ fontSize: 10 }}>Index Collections</div>
                  <div className="opacity-75" style={{ fontSize: 8 }}>Contenu propre de la page Collections</div>
                </div>
                <div className="bg-white px-2 py-1">
                  {[
                    "Intro éditoriale + barre de recherche de documents → Gallica (nouvel onglet)",
                    "Carrousel 1 — Collections thématiques (vignettes cliquables)",
                    "Carrousel 2 — Collections par territoire (vignettes cliquables)",
                    "Filtres : type de doc, thématique, période",
                  ].map((item, j) => (
                    <div key={j} className="text-gray-600 border-b border-gray-100 py-0.5" style={{ fontSize: 9 }}>{j + 1}. {item}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* L-1 Page d'une Collection */}
            <div className="flex items-start gap-0">
              <div className="w-3 border-t border-gray-300 mt-2"></div>
              <div className="flex-1 border rounded overflow-hidden" style={{ borderColor: COLORS.gallica + "55" }}>
                <div className="px-2 py-1" style={{ background: "#2c3e50cc", color: "#fff" }}>
                  <div className="font-bold" style={{ fontSize: 10 }}>Page Collection (éditoriale)</div>
                  <div className="opacity-75" style={{ fontSize: 8 }}>Réf. BDN Diplomatie · Pas de moteur intégré</div>
                </div>
                <div className="bg-white px-2 py-1">
                  {["Titre + CTA Voir les titres → Gallica", "Texte éditorial + Lire la suite", "Sous-sélections (vignettes → Gallica filtré)", "Articles liés — Aller plus loin"].map((item, j) => (
                    <div key={j} className="text-gray-600 border-b border-gray-100 py-0.5" style={{ fontSize: 9 }}>{j + 1}. {item}</div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Séparateur ── */}
      <div className="flex items-start pt-7">
        <div className="border-t-2 border-gray-400" style={{ width: 16, marginTop: 10 }}></div>
      </div>

      {/* ── N3 Templates ── */}
      <div style={{ minWidth: 190 }}>
        <LevelLabel>Niveau 3 — Templates</LevelLabel>
        <div className="flex flex-col gap-2 relative">
          <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-400"></div>
          {PAGE_TEMPLATES.map((p, i) => (
            <div key={i} className="flex items-start gap-0">
              <div className="w-3 border-t-2 border-gray-400" style={{ marginTop: 10 }}></div>
              <div className="flex-1 border rounded overflow-hidden" style={{ borderColor: p.color + "66" }}>
                <div className="px-2 py-1" style={{ background: p.color, color: "#fff" }}>
                  <div className="font-bold" style={{ fontSize: 11 }}>{p.label}</div>
                  <div className="opacity-75" style={{ fontSize: 9 }}>{p.ex}</div>
                </div>
                <div className="bg-white px-2 py-1">
                  {p.items.map((item, j) => (
                    <div key={j} className="text-gray-600 border-b border-gray-100 py-0.5" style={{ fontSize: 9 }}>
                      {j + 1}. {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Recherche & Transversal ────────────────────────────────────
function SearchBar() {
  return (
    <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
      <div className="font-bold text-gray-600 uppercase tracking-widest mb-2" style={{ fontSize: 10 }}>Recherche unifiée (transversale à tous les niveaux)</div>
      <div className="flex gap-2 items-center bg-white border border-gray-300 rounded px-3 py-1.5 mb-2">
        <span className="text-gray-400">🔍</span>
        <span className="text-gray-400 text-xs">Rechercher un contenu, une personnalité, un territoire, un document…</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {["Tout", "Articles & Dossiers", "Documents (Gallica)", "Artistes", "Événements", "Parutions"].map((t, i) => (
          <span key={i} className={`border rounded px-2 py-0.5 text-xs ${i === 0 ? "bg-gray-800 text-white border-gray-800" : "bg-white text-gray-600 border-gray-300"}`}>{t}</span>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {["Espace", "Territoire", "Période", "Format (texte/son/image/vidéo)", "FR / OC"].map((f, i) => (
          <span key={i} className="bg-white border border-gray-200 text-gray-500 rounded px-2 py-0.5 text-xs">Filtre : {f}</span>
        ))}
      </div>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────
function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  return (
    <div>
      <LevelLabel>Header — une seule barre, pas de barre secondaire</LevelLabel>
      <div className="border border-gray-300 rounded overflow-hidden mb-2">
        {/* Barre principale unique */}
        <div className="bg-white px-3 py-2 flex items-center gap-1 border-b border-gray-200">
          <span className="font-bold text-sm text-gray-900 mr-3">Occitanica</span>
          <div className="flex gap-1 flex-1">
            {["Espaces ▾", "Territoires ▾"].map(item => (
              <span
                key={item}
                onClick={() => setOpenDropdown(openDropdown === item ? null : item)}
                className="px-3 py-1 text-xs font-medium cursor-pointer rounded border"
                style={{ background: openDropdown === item ? "#1f2937" : "#f9fafb", color: openDropdown === item ? "#fff" : "#374151", borderColor: openDropdown === item ? "#1f2937" : "#d1d5db" }}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="border border-gray-300 rounded px-3 py-1 font-semibold text-gray-800">Collections</span>
            <span>🔍</span>
            <span className="font-medium">FR | OC</span>
          </div>
        </div>
        {/* Dropdown Espaces */}
        {openDropdown === "Espaces ▾" && (
          <div className="bg-gray-50 border-b border-gray-200 p-3">
            <div className="text-gray-400 text-xs mb-2 italic">Dropdown Espaces — grille visuelle (style Radio France)</div>
            <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
              {ESPACES.map(e => (
                <div key={e.key} className="rounded overflow-hidden border border-gray-200 cursor-pointer">
                  <div className="h-10" style={{ background: e.color }}></div>
                  <div className="bg-white px-2 py-1">
                    <div className="font-semibold text-gray-800" style={{ fontSize: 10 }}>{e.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-gray-400 mt-2" style={{ fontSize: 9 }}>← La home page joue le même rôle : les espaces y sont affichés en tuiles visuelles = état "dropdown naturellement ouverte"</div>
          </div>
        )}
        {/* Dropdown Territoires */}
        {openDropdown === "Territoires ▾" && (
          <div className="bg-gray-50 border-b border-gray-200 p-3">
            <div className="text-gray-400 text-xs mb-2 italic">Dropdown Territoires — liste</div>
            <div className="flex flex-wrap gap-1">
              {TERRITOIRES_N2.map(t => (
                <span key={t} className="border border-gray-300 rounded px-2 py-0.5 bg-white text-gray-600 cursor-pointer" style={{ fontSize: 10 }}>{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="text-gray-400 italic" style={{ fontSize: 9 }}>→ Cliquer sur "Espaces ▾" ou "Territoires ▾" pour voir les dropdowns · Collections est un accès direct et visible au même niveau</div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <div>
      <LevelLabel>Footer — structure Radio France</LevelLabel>
      {/* Bandeau CIRDOC */}
      <div className="rounded-t border border-gray-300 px-4 py-2 flex items-center gap-4 flex-wrap" style={{ background: "#1f2937" }}>
        <span className="text-white font-bold text-xs">Institut occitan de cultura — CIRDOC</span>
        <div className="flex gap-3">
          {CIRDOC_SITES.map((s, i) => (
            <div key={i} className="text-center">
              <div className={`font-semibold text-xs ${i === 0 ? "text-white underline" : "text-gray-300"}`}>{s.name} {i > 0 ? "↗" : ""}</div>
              <div className="text-gray-500" style={{ fontSize: 9 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Corps footer */}
      <div className="border border-t-0 border-gray-300 rounded-b p-3 bg-gray-50">
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
          {FOOTER_COLS.map((col, i) => (
            <div key={i}>
              <div className="font-bold text-gray-700 text-xs uppercase tracking-wider mb-1">{col.title}</div>
              {col.items.map((item, j) => (
                <div key={j} className="text-gray-500 text-xs py-0.5 border-b border-gray-100">{item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Labels éditoriaux ─────────────────────────────────────────
export function EditLabels() {
  return (
    <div className="flex flex-wrap gap-1 items-center">
      <span className="text-gray-500 font-bold text-xs mr-1">Labels éditoriaux :</span>
      {LABELS.map((l, i) => (
        <span key={i} className="rounded-full px-2 py-0.5 text-white text-xs" style={{ background: l.color, fontSize: 10 }}>{l.label}</span>
      ))}
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────
const PRINCIPES = [
  {
    titre: "Collections — N1 à part entière, traitement distinct des Espaces",
    texte: "Collections est un vrai N1 dans l'arborescence mais traité différemment des 5 Espaces thématiques : c'est un accès documentaire direct (fonds patrimoniaux CIRDOC + partenaires numérisés). Sa home est simple : intro éditoriale + barre de recherche (périmètre Occitanica/Gallica, nouvel onglet) + grille des collections. Les Pages Collection sont des pages éditoriales pures (réf. BDN Diplomatie) : pas de moteur intégré. Son poids documentaire (35%) justifie la visibilité dans le header.",
  },
  {
    titre: "Header unifié — home = dropdown ouverte",
    texte: "Une seule barre de navigation. Pas de barre secondaire. Espaces et Territoires ouvrent des dropdowns visuelles. La home joue le rôle de dropdown Espaces naturellement ouverte : les 5 espaces y sont affichés en tuiles dès l'arrivée. Collections est un accès direct visible dans le header (bouton bordé, distinct des dropdowns).",
  },
  {
    titre: "Contenants modulaires — un bloc = une condition",
    texte: "On conçoit des contenants, pas des contenus. Chaque bloc est conditionnel : il s'affiche uniquement si le contenu correspondant existe. Tag territoire → carte. Document lié → Pépite de collection. Personnalité taguée → Portraits liés. Portraits tagués espace → bloc Portraits liés. Aucun bloc vide affiché. Cf. onglet Catégorisation pour le détail du système de tags.",
  },
  {
    titre: "Agenda — liens vers l'externe, jamais hébergé",
    texte: "Pas de module d'agenda géré en back-office. Les pages Territoire affichent un bloc Agenda local avec des liens qualifiés vers les agendas territoriaux référencés par le CIRDOC. Les pages Espace peuvent pointer vers des agendas thématiques externes si existants (festivals, associations). La Scène affiche les événements via La Basa (liens externes).",
  },
  {
    titre: "Galaxie CIRDOC — lier sans uniformiser",
    texte: "Occitanica s'inscrit dans un écosystème de sites CIRDOC (La Maleta, Campus, IEO…). Un bandeau pré-footer identique sur tous les sites crée le lien sans imposer de charte commune. La Maleta et Campus sont des liens externes dans le footer. Les thèses (Campus) s'intègrent via le label Recherche dans les espaces concernés.",
  },
  {
    titre: "La Scène irrigue tous les espaces",
    texte: "La Scène (spectacle vivant, arts, parutions, festivals) est le hub de la création contemporaine. Son contenu est systématiquement taggé avec les espaces thématiques concernés. Un nouvel album apparaît dans Musique, une parution dans Langue. L'ancien et le nouveau se mélangent dans chaque espace — La Scène en est la source vivante.",
  },
];

export default function Sitemap() {
  const [activeTab, setActiveTab] = useState(0);
  const TABS_NAV = ["Arborescence", "Catégorisation & Labels", "Recherche", "Principes de conception"];

  return (
    <div className="bg-white min-h-screen p-4" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* En-tête */}
      <div className="border-b-2 border-gray-800 pb-3 mb-4 flex items-end justify-between">
        <div>
          <div className="text-xl font-bold text-gray-900 tracking-wide">OCCITANICA — Arborescence V3</div>
          <div className="text-gray-400 text-xs mt-0.5">Thomas Iris × UX Assistant · Mai 2026</div>
        </div>
        <div className="text-right text-gray-400 text-xs">
          <div>5 Espaces · Territoires · Collections (N1 distinct) · Header unifié</div>
          <div>Agenda externalisé · Footer Radio France · Galaxie CIRDOC</div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-0 mb-5 border-b-2 border-gray-200">
        {TABS_NAV.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className="px-5 py-2 text-xs font-semibold border-b-2 -mb-0.5 transition-colors"
            style={{
              borderBottomColor: activeTab === i ? "#111827" : "transparent",
              color: activeTab === i ? "#111827" : "#9ca3af",
              background: "transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Onglet 0 : Arborescence ── */}
      {activeTab === 0 && (
        <>
          <div className="overflow-x-auto pb-2 mb-5">
            <div style={{ minWidth: 960 }}>
              <MainTree />
            </div>
          </div>

          <div className="border-t border-gray-200 my-4"></div>
          <div className="mb-4"><Header /></div>

          <div className="border-t border-gray-200 my-4"></div>
          <div className="mb-4"><Footer /></div>

          <div className="border-t border-gray-200 my-4"></div>
          <div className="mb-4"><SearchBar /></div>

        </>
      )}

      {/* ── Onglet 1 : Catégorisation & Labels ── */}
      {activeTab === 1 && (
        <div className="space-y-6">

          {/* Intro */}
          <div className="border border-gray-200 rounded p-3 bg-gray-50">
            <div className="font-bold text-gray-800 text-xs uppercase tracking-widest mb-1">Système de catégorisation — comment le contenu circule</div>
            <div className="text-gray-500 text-xs leading-relaxed">
              Chaque contenu éditorial (article, fiche PCI, portrait, document…) est taggé avec un ou plusieurs labels au moment de sa création. Ces tags déclenchent automatiquement l'affichage du contenu dans les blocs contextuels des pages qui le concernent. Un contenu peut porter plusieurs labels simultanément. Aucun bloc ne s'affiche si aucun contenu tagué n'existe — on conçoit des contenants, pas des contenus figés.
            </div>
          </div>

          {/* Labels détaillés */}
          <div>
            <div className="font-bold text-gray-700 text-xs uppercase tracking-widest mb-3">Labels éditoriaux — détail et exemples</div>
            <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {LABEL_DETAILS.map((l, i) => (
                <div key={i} className="border border-gray-200 rounded overflow-hidden">
                  <div className="px-3 py-2 flex items-center gap-2" style={{ background: l.color + "22", borderBottom: `2px solid ${l.color}` }}>
                    <span className="font-bold text-xs" style={{ color: l.color }}>{l.label}</span>
                  </div>
                  <div className="px-3 py-2 bg-white space-y-1">
                    <div className="text-gray-600 leading-relaxed" style={{ fontSize: 10 }}>{l.desc}</div>
                    <div className="text-gray-400 italic" style={{ fontSize: 9 }}>ex : {l.ex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schéma de circulation */}
          <div>
            <div className="font-bold text-gray-700 text-xs uppercase tracking-widest mb-3">Comment un contenu circule dans le site</div>
            <div className="border border-gray-200 rounded p-3 bg-white">
              <div className="grid gap-2" style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr" }}>
                {/* Colonne 1 — Contenu créé */}
                <div className="border border-gray-200 rounded p-2">
                  <div className="font-bold text-gray-700 text-xs mb-2">Contenu créé</div>
                  {[
                    { t: "Article", ex: "Carnaval de Limoux" },
                    { t: "Fiche PCI", ex: "La Transhumance" },
                    { t: "Portrait", ex: "Frédéric Mistral" },
                  ].map((c, i) => (
                    <div key={i} className="border border-gray-100 rounded px-2 py-1 mb-1 bg-gray-50">
                      <div className="font-semibold text-gray-700" style={{ fontSize: 10 }}>{c.t}</div>
                      <div className="text-gray-400" style={{ fontSize: 9 }}>ex : {c.ex}</div>
                    </div>
                  ))}
                </div>
                {/* Flèche */}
                <div className="flex items-center justify-center text-gray-400 font-bold text-sm">→</div>
                {/* Colonne 2 — Tags appliqués */}
                <div className="border border-gray-200 rounded p-2">
                  <div className="font-bold text-gray-700 text-xs mb-2">Tags appliqués</div>
                  {[
                    ["🟢 PCI", "🗺️ Languedoc", "👤 Portrait lié Fêtes"],
                    ["🟢 PCI", "🗺️ Provence"],
                    ["👤 Portrait", "🗺️ Provence", "tag espace Langue"],
                  ].map((tags, i) => (
                    <div key={i} className="mb-1 flex flex-wrap gap-0.5">
                      {tags.map((tag, j) => (
                        <span key={j} className="border border-gray-300 rounded px-1.5 py-0.5 bg-white text-gray-600" style={{ fontSize: 8 }}>{tag}</span>
                      ))}
                    </div>
                  ))}
                </div>
                {/* Flèche */}
                <div className="flex items-center justify-center text-gray-400 font-bold text-sm">→</div>
                {/* Colonne 3 — Apparaît dans */}
                <div className="border border-gray-200 rounded p-2">
                  <div className="font-bold text-gray-700 text-xs mb-2">Apparaît dans</div>
                  {[
                    "Espace Fêtes & Traditions · Page Territoire Languedoc · Bloc Portraits liés si espace Fêtes",
                    "Espace Fêtes & Traditions · Page Territoire Provence",
                    "Espace Langue · Bloc Portraits liés (Langue) · Page Territoire Provence",
                  ].map((dest, i) => (
                    <div key={i} className="text-gray-500 border-b border-gray-100 py-1" style={{ fontSize: 9 }}>{dest}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Labels visuels rapides */}
          <div>
            <div className="font-bold text-gray-700 text-xs uppercase tracking-widest mb-2">Récapitulatif visuel</div>
            <div className="flex flex-wrap gap-1.5">
              {LABEL_DETAILS.map((l, i) => (
                <span key={i} className="rounded-full px-3 py-1 text-white font-semibold" style={{ background: l.color, fontSize: 10 }}>{l.label}</span>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ── Onglet 2 : Recherche ── */}
      {activeTab === 2 && (
        <div className="space-y-6">

          {/* Décision retenue */}
          <div className="border-2 border-gray-800 rounded p-3 bg-gray-50 flex items-start gap-3">
            <div className="bg-gray-800 text-white rounded px-2 py-1 text-xs font-bold whitespace-nowrap mt-0.5">Option A retenue</div>
            <div className="text-gray-700 text-xs leading-relaxed">
              <span className="font-bold">Deux barres de recherche, deux contextes distincts.</span> La barre du header cherche dans le contenu éditorial du site. La barre de la Home Collections envoie vers Gallica (périmètre Occitanica, nouvel onglet). Pas de recherche unifiée — le contexte de navigation dicte l'intention.
            </div>
          </div>

          {/* Comparatif */}
          <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>

            <div className="border border-gray-300 rounded overflow-hidden">
              <div className="bg-gray-800 px-3 py-2">
                <div className="text-white font-bold text-xs">Barre Header — Contenu éditorial</div>
                <div className="text-gray-400 text-xs">Présente sur toutes les pages</div>
              </div>
              <div className="p-3 space-y-3">
                <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white">
                  <div className="flex-1 px-3 py-2 text-gray-400 text-xs">Rechercher un article, une fiche, un portrait…</div>
                  <div className="bg-gray-100 border-l border-gray-200 px-3 py-2 text-gray-500 text-sm">🔍</div>
                </div>
                {[
                  ["Périmètre", "Contenu éditorial Occitanica"],
                  ["Contenu indexé", "Articles · Fiches PCI · Portraits · Pages Espace/Territoire"],
                  ["Résultats", "Page résultats Occitanica — même onglet"],
                  ["Filtres", "Type · Espace · Territoire"],
                ].map(([k, v], i) => (
                  <div key={i} className="grid gap-1" style={{ gridTemplateColumns: "96px 1fr" }}>
                    <div className="text-gray-400 font-bold" style={{ fontSize: 9 }}>{k}</div>
                    <div className="text-gray-700" style={{ fontSize: 10 }}>{v}</div>
                  </div>
                ))}
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <div className="font-bold text-gray-600 text-xs mb-1">Exemple résultats</div>
                  {["Article — Le carnaval de Limoux", "Portrait — Frédéric Mistral", "Fiche PCI — Géants de Tarascon"].map((r, i) => (
                    <div key={i} className="border-b border-gray-100 py-1 text-gray-600" style={{ fontSize: 9 }}>📄 {r}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-2 rounded overflow-hidden" style={{ borderColor: COLORS.gallica }}>
              <div className="px-3 py-2" style={{ background: COLORS.gallica }}>
                <div className="text-white font-bold text-xs">Barre Collections — Documents Gallica</div>
                <div className="text-gray-300 text-xs">Uniquement sur la Home Collections</div>
              </div>
              <div className="p-3 space-y-3">
                <div className="flex items-center border-2 rounded overflow-hidden bg-white" style={{ borderColor: COLORS.gallica }}>
                  <div className="flex-1 px-3 py-2 text-gray-400 text-xs">Auteur, titre, cote, mot-clé…</div>
                  <div className="px-3 py-2 text-white text-xs font-semibold" style={{ background: COLORS.gallica }}>Rechercher</div>
                </div>
                <div className="text-blue-600 text-xs underline cursor-pointer">+ Recherche avancée → Gallica ↗</div>
                {[
                  ["Périmètre", "Collections Occitanica sur Gallica"],
                  ["Contenu indexé", "Docs numérisés : manuscrits, photos, partitions, archives sonores…"],
                  ["Résultats", "Gallica Marque Blanche — nouvel onglet ↗"],
                  ["Filtres", "Sur Gallica : Type · Période · Langue · Territoire"],
                ].map(([k, v], i) => (
                  <div key={i} className="grid gap-1" style={{ gridTemplateColumns: "96px 1fr" }}>
                    <div className="text-gray-400 font-bold" style={{ fontSize: 9 }}>{k}</div>
                    <div className="text-gray-700" style={{ fontSize: 10 }}>{v}</div>
                  </div>
                ))}
                <div className="rounded p-2" style={{ background: COLORS.gallica + "11", border: `1px solid ${COLORS.gallica}44` }}>
                  <div className="font-bold text-xs mb-1" style={{ color: COLORS.gallica }}>Exemple résultats (sur Gallica)</div>
                  {["Ms. 123 — Canso de Guilhem de Peitieu · XIIe s.", "Photo — Carnaval de Limoux 1932", "Enreg. — Chants gascons (Lomax, 1950)"].map((r, i) => (
                    <div key={i} className="border-b py-1 text-gray-600" style={{ fontSize: 9, borderColor: COLORS.gallica + "33" }}>📜 {r}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pourquoi pas de recherche unifiée */}
          <div>
            <div className="font-bold text-gray-700 text-xs uppercase tracking-widest mb-2">Pourquoi pas de recherche unifiée ?</div>
            <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {[
                { icon: "❌", titre: "Le pattern dropdown échoue", texte: "Demander à l'utilisateur «cherches-tu un document ou du contenu ?» avant même qu'il tape sa requête génère de la friction. Les gens pensent à leur besoin, pas à la nature de la donnée. Réf. Numistral — confusion observée." },
                { icon: "✅", titre: "La navigation dicte l'intention", texte: "Dans les espaces éditoriaux → recherche de contenu. Dans Collections → recherche de documents. Le contexte guide naturellement sans que l'utilisateur ait à choisir." },
                { icon: "✅", titre: "Gallica a déjà son interface", texte: "La GMB Gallica offre facettes, filtres, visionneuse, export. Dupliquer cela dans Occitanica = complexité inutile. Mieux vaut relier proprement que reproduire imparfaitement." },
                { icon: "✅", titre: "Les ponts contextuels compensent", texte: "Depuis un article : Pépite de collection, Sources → Gallica, CTA Accéder aux documents. Depuis une Page Collection : CTA Voir les titres. La recherche n'est pas le seul chemin vers les documents." },
              ].map((r, i) => (
                <div key={i} className="border border-gray-200 rounded p-2">
                  <div className="font-bold text-gray-700 text-xs mb-1">{r.icon} {r.titre}</div>
                  <div className="text-gray-500 leading-relaxed" style={{ fontSize: 10 }}>{r.texte}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ── Onglet 3 : Principes de conception ── */}
      {activeTab === 3 && (
        <div className="space-y-4">
          <div className="border border-gray-200 rounded p-3 bg-gray-50">
            <div className="text-gray-500 text-xs leading-relaxed">
              Ces principes documentent les <span className="font-bold text-gray-700">décisions d'architecture validées</span> au fil des sessions de travail. Ils font référence pour toutes les décisions de conception futures.
            </div>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {PRINCIPES.map((p, i) => (
              <div key={i} className="border border-gray-300 rounded p-3 bg-white">
                <div className="font-bold text-gray-800 text-xs mb-2 pb-1 border-b border-gray-100">— {p.titre}</div>
                <div className="text-gray-600 leading-relaxed" style={{ fontSize: 10 }}>{p.texte}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
