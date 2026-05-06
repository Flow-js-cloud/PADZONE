import { LegalPage } from "@/components/LegalPage";

export const metadata = { title: "Politique de Confidentialité — PadZone" };

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de Confidentialité"
      subtitle="Comment nous collectons, utilisons et protégeons vos données personnelles — conforme RGPD"
      lastUpdated="2 mai 2026"
    >
      <section>
        <h2>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données personnelles collectées sur padzone.fr est <strong>PadZone SAS</strong>, 123 Rue du Gaming, 75001 Paris — contact : dpo@padzone.fr.
        </p>
      </section>

      <section>
        <h2>2. Données collectées</h2>
        <p>Nous collectons les données suivantes :</p>
        <ul>
          <li><span>📧</span> <span><strong>Données d'identification :</strong> nom, prénom, adresse email</span></li>
          <li><span>🏠</span> <span><strong>Données de livraison :</strong> adresse postale, numéro de téléphone</span></li>
          <li><span>🛒</span> <span><strong>Données de commande :</strong> historique des achats, produits consultés</span></li>
          <li><span>🌐</span> <span><strong>Données de navigation :</strong> adresse IP, cookies, pages visitées, durée de visite</span></li>
          <li><span>💬</span> <span><strong>Communications :</strong> messages de service client, avis produits</span></li>
        </ul>
        <p>
          <strong>Données sensibles :</strong> Nous ne collectons aucune donnée sensible (santé, opinions politiques, etc.).
        </p>
      </section>

      <section>
        <h2>3. Finalités et bases légales</h2>
        <h3>Exécution du contrat</h3>
        <p>Traitement des commandes, livraison, facturation, service après-vente.</p>
        <h3>Intérêt légitime</h3>
        <p>Amélioration de nos services, sécurisation du site, prévention de la fraude, statistiques de navigation anonymisées.</p>
        <h3>Consentement</h3>
        <p>Envoi de newsletters et communications marketing (révocable à tout moment).</p>
        <h3>Obligation légale</h3>
        <p>Conservation des factures et données comptables (durée légale de 10 ans).</p>
      </section>

      <section>
        <h2>4. Durée de conservation</h2>
        <ul>
          <li><span>•</span> <span>Données de compte client : jusqu'à la suppression du compte + 3 ans</span></li>
          <li><span>•</span> <span>Données de commande : 10 ans (obligation comptable)</span></li>
          <li><span>•</span> <span>Données de navigation : 13 mois maximum</span></li>
          <li><span>•</span> <span>Données marketing (newsletter) : jusqu'au désabonnement</span></li>
        </ul>
      </section>

      <section>
        <h2>5. Partage des données</h2>
        <p>Vos données peuvent être partagées avec :</p>
        <ul>
          <li><span>🚚</span> <span><strong>Transporteurs :</strong> pour la livraison (La Poste, Colissimo, DHL)</span></li>
          <li><span>💳</span> <span><strong>Prestataire de paiement :</strong> Stripe (conforme PCI-DSS)</span></li>
          <li><span>📊</span> <span><strong>Outils analytiques :</strong> données anonymisées uniquement</span></li>
        </ul>
        <p>
          Nous ne vendons jamais vos données à des tiers. Tout sous-traitant est soumis à des obligations contractuelles strictes conformément au RGPD.
        </p>
      </section>

      <section>
        <h2>6. Vos droits</h2>
        <p>Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants :</p>
        <ul>
          <li><span>✅</span> <span><strong>Droit d'accès :</strong> obtenir une copie de vos données</span></li>
          <li><span>✏️</span> <span><strong>Droit de rectification :</strong> corriger des données inexactes</span></li>
          <li><span>🗑️</span> <span><strong>Droit à l'effacement :</strong> supprimer vos données (droit à l'oubli)</span></li>
          <li><span>⏸️</span> <span><strong>Droit à la limitation :</strong> limiter le traitement de vos données</span></li>
          <li><span>📤</span> <span><strong>Droit à la portabilité :</strong> recevoir vos données dans un format lisible</span></li>
          <li><span>🚫</span> <span><strong>Droit d'opposition :</strong> vous opposer au traitement à des fins marketing</span></li>
        </ul>
        <p>
          Pour exercer vos droits, contactez-nous à <strong>dpo@padzone.fr</strong>. Nous répondrons dans un délai d'un mois.
        </p>
      </section>

      <section>
        <h2>7. Sécurité</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement SSL/TLS, stockage sécurisé, accès restreint aux données, audits réguliers de sécurité.
        </p>
      </section>

      <section>
        <h2>8. Réclamation</h2>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) — www.cnil.fr — 3 Place de Fontenoy, 75007 Paris.
        </p>
      </section>
    </LegalPage>
  );
}
