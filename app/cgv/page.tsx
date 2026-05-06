import { LegalPage } from "@/components/LegalPage";

export const metadata = { title: "Conditions Générales de Vente — PadZone" };

export default function CGVPage() {
  return (
    <LegalPage
      title="Conditions Générales de Vente"
      subtitle="Conditions applicables à tout achat effectué sur padzone.fr"
      lastUpdated="2 mai 2026"
    >
      <section>
        <h2>Article 1 — Objet et champ d'application</h2>
        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre PadZone SAS et toute personne effectuant un achat sur le site <strong>padzone.fr</strong>. Toute commande implique l'acceptation sans réserve de ces CGV.
        </p>
      </section>

      <section>
        <h2>Article 2 — Produits</h2>
        <p>
          Les produits proposés à la vente sont des tapis gaming (mouse pads) de différentes tailles et motifs. Les caractéristiques essentielles des produits (dimensions, matière, motif) sont décrites sur chaque fiche produit.
        </p>
        <p>
          PadZone SAS s'efforce d'assurer l'exactitude des photos et descriptions mais ne peut garantir une correspondance parfaite avec les couleurs réelles, celles-ci pouvant varier selon les paramètres de votre écran.
        </p>
      </section>

      <section>
        <h2>Article 3 — Prix</h2>
        <p>
          Les prix sont indiqués en euros TTC (Toutes Taxes Comprises). PadZone SAS se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix applicable à la commande est celui en vigueur au moment de la validation de la commande.
        </p>
        <p>
          <strong>Frais de livraison :</strong> Les frais de livraison sont indiqués lors du processus de commande. La livraison est <strong>gratuite</strong> pour toute commande supérieure à <strong>50€</strong>.
        </p>
      </section>

      <section>
        <h2>Article 4 — Commande</h2>
        <p>
          Pour passer une commande, le client doit : (1) créer un compte ou commander en tant qu'invité, (2) sélectionner les produits et les ajouter au panier, (3) valider le panier et saisir les informations de livraison, (4) choisir le mode de paiement et valider le paiement.
        </p>
        <p>
          La commande n'est définitive qu'après confirmation du paiement. Un email de confirmation est envoyé au client.
        </p>
      </section>

      <section>
        <h2>Article 5 — Paiement</h2>
        <p>
          Le paiement est exigible immédiatement à la commande. Les moyens de paiement acceptés sont : carte bancaire (Visa, Mastercard), PayPal et Apple Pay. Toutes les transactions sont sécurisées par le protocole SSL et notre prestataire de paiement Stripe.
        </p>
        <p>
          PadZone SAS ne conserve aucune donnée bancaire.
        </p>
      </section>

      <section>
        <h2>Article 6 — Livraison</h2>
        <p>
          <strong>Délai de livraison estimé :</strong> 15 à 30 jours ouvrés à compter de la confirmation de commande. PadZone opère en dropshipping international ; les délais peuvent varier selon la destination et les transporteurs. Ces délais sont donnés à titre indicatif.
        </p>
        <p>
          <strong>Zones de livraison :</strong> France métropolitaine, DOM-TOM et Union Européenne. Pour toute livraison hors France, des frais supplémentaires peuvent s'appliquer.
        </p>
        <p>
          En cas de retard de livraison, PadZone SAS informera le client dans les meilleurs délais.
        </p>
      </section>

      <section>
        <h2>Article 7 — Droit de rétractation</h2>
        <p>
          Conformément à l'article L.221-18 du Code de la Consommation, le client dispose d'un délai de <strong>14 jours</strong> à compter de la réception des produits pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
        </p>
        <p>
          Pour exercer ce droit, le client doit notifier sa décision par email à <strong>retours@padzone.fr</strong>. Les produits doivent être retournés dans leur état d'origine, non utilisés et dans leur emballage d'origine.
        </p>
        <p>
          <strong>Note :</strong> PadZone SAS offre un délai de rétractation étendu à <strong>30 jours</strong> pour une meilleure expérience client.
        </p>
      </section>

      <section>
        <h2>Article 8 — Garanties</h2>
        <p>
          Tous les produits vendus sur padzone.fr bénéficient de la garantie légale de conformité (2 ans) et de la garantie contre les vices cachés conformément aux articles L.217-4 et suivants et L.217-12 et suivants du Code de la Consommation, ainsi qu'aux articles 1641 et suivants du Code Civil.
        </p>
      </section>

      <section>
        <h2>Article 9 — Service Après-Vente</h2>
        <p>
          Pour toute question ou réclamation, contactez notre service client :<br />
          Email : <strong>contact@padzone.fr</strong><br />
          Délai de réponse : sous 48h ouvrées.
        </p>
      </section>

      <section>
        <h2>Article 10 — Résolution des litiges</h2>
        <p>
          En cas de litige, le client peut recourir à la médiation via la plateforme européenne de règlement en ligne des litiges : <strong>ec.europa.eu/consumers/odr</strong>. Le médiateur désigné est : [Nom du médiateur].
        </p>
        <p>
          Les présentes CGV sont soumises au droit français.
        </p>
      </section>
    </LegalPage>
  );
}
