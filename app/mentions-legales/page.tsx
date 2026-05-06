import { LegalPage } from "@/components/LegalPage";

export const metadata = { title: "Mentions Légales — PadZone" };

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions Légales"
      subtitle="Informations légales obligatoires conformément à la loi pour la confiance dans l'économie numérique (LCEN)"
      lastUpdated="2 mai 2026"
    >
      <section>
        <h2>1. Éditeur du site</h2>
        <p>
          Le site <strong>padzone.fr</strong> est édité par la société <strong>PadZone SAS</strong>, société par actions simplifiée au capital de 10 000€, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro <strong>XXX XXX XXX</strong>.
        </p>
        <p>
          <strong>Siège social :</strong> 123 Rue du Gaming, 75001 Paris, France<br />
          <strong>Email :</strong> contact@padzone.fr<br />
          <strong>Téléphone :</strong> +33 (0)1 XX XX XX XX<br />
          <strong>N° TVA intracommunautaire :</strong> FR XX XXX XXX XXX
        </p>
      </section>

      <section>
        <h2>2. Directeur de la publication</h2>
        <p>Le directeur de la publication est <strong>[Nom du dirigeant]</strong>, en qualité de Président de PadZone SAS.</p>
      </section>

      <section>
        <h2>3. Hébergement</h2>
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>, dont le siège social est situé au 340 Pine Street, Suite 701, San Francisco, California 94104, États-Unis. Site : vercel.com
        </p>
      </section>

      <section>
        <h2>4. Propriété intellectuelle</h2>
        <p>
          L'ensemble des éléments constituant le site padzone.fr (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses) sont la propriété exclusive de PadZone SAS ou font l'objet d'une autorisation d'utilisation.
        </p>
        <p>
          Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l'accord exprès par écrit de PadZone SAS.
        </p>
      </section>

      <section>
        <h2>5. Données personnelles</h2>
        <p>
          Pour toute information sur le traitement de vos données personnelles, veuillez consulter notre <strong>Politique de Confidentialité</strong>. Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données.
        </p>
        <p>
          <strong>Délégué à la Protection des Données (DPD) :</strong> dpo@padzone.fr
        </p>
        <p>
          Vous pouvez également adresser une réclamation à la CNIL (Commission Nationale de l'Informatique et des Libertés) : <strong>www.cnil.fr</strong>
        </p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          Le site padzone.fr utilise des cookies pour améliorer votre expérience de navigation. Consultez notre <strong>Politique de Cookies</strong> pour en savoir plus.
        </p>
      </section>

      <section>
        <h2>7. Droit applicable</h2>
        <p>
          Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux compétents sont ceux du ressort du siège social de PadZone SAS.
        </p>
      </section>
    </LegalPage>
  );
}
