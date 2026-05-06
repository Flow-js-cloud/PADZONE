import { LegalPage } from "@/components/LegalPage";

export const metadata = { title: "Politique de Cookies — PadZone" };

export default function CookiesPage() {
  return (
    <LegalPage
      title="Politique de Cookies"
      subtitle="Informations sur les cookies utilisés sur padzone.fr"
      lastUpdated="2 mai 2026"
    >
      <section>
        <h2>Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lors de votre visite sur un site web. Il permet de mémoriser des informations sur votre navigation et vos préférences.
        </p>
      </section>

      <section>
        <h2>Cookies utilisés sur padzone.fr</h2>

        <h3>Cookies strictement nécessaires (toujours actifs)</h3>
        <p>Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés :</p>
        <ul>
          <li><span>🛒</span> <span><strong>pz-cart</strong> — Sauvegarde le contenu de votre panier (durée : session)</span></li>
          <li><span>👤</span> <span><strong>pz-user</strong> — Maintient votre session de connexion (durée : 30 jours)</span></li>
          <li><span>🎬</span> <span><strong>pz-intro</strong> — Mémorise que vous avez vu l'intro (durée : session)</span></li>
          <li><span>🔒</span> <span><strong>csrf_token</strong> — Protection contre les attaques CSRF (durée : session)</span></li>
        </ul>

        <h3>Cookies de performance et analytiques</h3>
        <p>Utilisés pour comprendre comment vous naviguez sur le site (données anonymisées) :</p>
        <ul>
          <li><span>📊</span> <span><strong>_ga, _ga_*</strong> — Google Analytics : mesure d'audience anonyme (durée : 13 mois)</span></li>
          <li><span>📊</span> <span><strong>_vercel_analytics</strong> — Analytics Vercel : performances techniques (durée : session)</span></li>
        </ul>

        <h3>Cookies de fonctionnalité</h3>
        <p>Améliorent votre expérience utilisateur :</p>
        <ul>
          <li><span>⚙️</span> <span><strong>pz-preferences</strong> — Mémorise vos préférences d'affichage (durée : 1 an)</span></li>
          <li><span>🌍</span> <span><strong>pz-lang</strong> — Langue préférée (durée : 1 an)</span></li>
        </ul>

        <h3>Cookies marketing et publicitaires</h3>
        <p>Utilisés pour vous montrer des publicités pertinentes (uniquement avec votre consentement) :</p>
        <ul>
          <li><span>📢</span> <span><strong>_fbp</strong> — Meta Pixel : suivi des conversions Facebook Ads (durée : 90 jours)</span></li>
          <li><span>📢</span> <span><strong>_tt_</strong> — TikTok Pixel : suivi des conversions (durée : 13 mois)</span></li>
        </ul>
      </section>

      <section>
        <h2>Gestion de vos préférences</h2>
        <p>
          Conformément à la réglementation en vigueur (RGPD et directive ePrivacy), vous pouvez à tout moment modifier vos préférences en matière de cookies via notre bandeau de consentement, accessible en cliquant sur le lien "Gérer mes cookies" en bas de chaque page.
        </p>
        <p>
          Vous pouvez également désactiver les cookies directement dans les paramètres de votre navigateur :
        </p>
        <ul>
          <li><span>🌐</span> <span><strong>Chrome :</strong> Paramètres &gt; Confidentialité et sécurité &gt; Cookies</span></li>
          <li><span>🦊</span> <span><strong>Firefox :</strong> Options &gt; Vie privée et sécurité</span></li>
          <li><span>🧭</span> <span><strong>Safari :</strong> Préférences &gt; Confidentialité</span></li>
          <li><span>🔷</span> <span><strong>Edge :</strong> Paramètres &gt; Cookies et autorisations de sites</span></li>
        </ul>
        <p>
          <strong>Attention :</strong> la désactivation de certains cookies peut altérer votre expérience sur le site (panier, connexion).
        </p>
      </section>

      <section>
        <h2>Durée de validité du consentement</h2>
        <p>
          Votre consentement aux cookies est valable pour une durée de <strong>6 mois</strong>. À l'expiration de ce délai, votre consentement vous sera de nouveau demandé.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question relative à notre utilisation des cookies, contactez-nous à <strong>dpo@padzone.fr</strong>.
        </p>
      </section>
    </LegalPage>
  );
}
