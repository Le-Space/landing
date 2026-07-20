<script>
  /**
   * Imprint + Privacy modals, content ported 1:1 from the
   * nico-krause-landing Footer (Le-Space mode). Language follows locale.
   */
  import { locale } from '../i18n.js';
  import { siteConfig } from '../site-config.js';

  let { showImprint = $bindable(false), showPrivacy = $bindable(false) } = $props();

  const close = () => {
    showImprint = false;
    showPrivacy = false;
  };

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) close();
  };

  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }
</script>

<svelte:window onkeydown={onKeydown} />

{#if showImprint || showPrivacy}
  <div class="overlay" onclick={onOverlayClick} role="presentation">
    <div class="modal" role="dialog" aria-modal="true" tabindex="-1">
      <header>
        <h3>
          {#if showImprint}
            {$locale === 'de' ? 'Impressum' : 'Imprint'}
          {:else}
            {$locale === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
          {/if}
        </h3>
        <button class="x" onclick={close} aria-label="Close">×</button>
      </header>

      <div class="body prose">
        {#if showImprint}
          {#if $locale === 'de'}
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>{siteConfig.legal.address[0]}<br>{siteConfig.legal.address[1]}<br>{siteConfig.legal.address[2]}</p>
            <p>Handelsregister: {siteConfig.legal.register}<br>Registergericht: {siteConfig.legal.registerCourt}</p>
            <p><strong>Vertreten durch:</strong><br>{siteConfig.legal.representative}</p>
            <h2>Kontakt</h2>
            <p>Telefon: {siteConfig.legal.phone}<br>Telefax: {siteConfig.legal.fax}<br>E-Mail: {siteConfig.email.info}</p>
            <h2>Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br>{siteConfig.legal.vatId}</p>
            <h2>Redaktionell verantwortlich</h2>
            <p>{siteConfig.legal.representative}<br>{siteConfig.legal.address[1]}<br>{siteConfig.legal.address[2]}</p>
            <h2>EU-Streitschlichtung</h2>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            <h2>Verbraucher­streit­beilegung / Universal­schlichtungs­stelle</h2>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          {:else}
            <h2>Information pursuant to Sect. 5 German Telemedia Act (TMG)</h2>
            <p>{siteConfig.legal.address[0]}<br>{siteConfig.legal.address[1]}<br>{siteConfig.legal.address[2]}</p>
            <p>Commercial Register: {siteConfig.legal.register}<br>Registration court: {siteConfig.legal.registerCourt}</p>
            <p><strong>Represented by:</strong><br>{siteConfig.legal.representative}</p>
            <h2>Contact</h2>
            <p>Phone: {siteConfig.legal.phone}<br>Telefax: {siteConfig.legal.fax}<br>E-mail: {siteConfig.email.info}</p>
            <h2>VAT ID</h2>
            <p>Sales tax identification number according to Sect. 27 a of the Sales Tax Law:<br>{siteConfig.legal.vatId}</p>
            <h2>Person responsible for editorial</h2>
            <p>{siteConfig.legal.representative}<br>{siteConfig.legal.address[1]}<br>{siteConfig.legal.address[2]}</p>
            <h2>EU dispute resolution</h2>
            <p>The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br>Our e-mail address can be found above in the site notice.</p>
            <h2>Dispute resolution proceedings in front of a consumer arbitration board</h2>
            <p>We are not willing or obliged to participate in dispute resolution proceedings in front of a consumer arbitration board.</p>
          {/if}
        {:else if $locale === 'de'}
          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
          <h3>Datenerfassung auf dieser Website</h3>
          <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
          <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.</p>
          <h4>Wie erfassen wir Ihre Daten?</h4>
          <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
          <p>Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>
          <h4>Wofür nutzen wir Ihre Daten?</h4>
          <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>
          <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
          <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
          <p>Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</p>
          <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3>Hinweis zur verantwortlichen Stelle</h3>
          <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
          <p>Le Space UG<br>{siteConfig.legal.address[1]}<br>{siteConfig.legal.address[2]}</p>
          <p>Telefon: {siteConfig.legal.phone}<br>E-Mail: {siteConfig.email.privacy}</p>
          <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
        {:else}
          <h2>1. An overview of data protection</h2>
          <h3>General information</h3>
          <p>The following information will provide you with an easy to navigate overview of what will happen with your personal data when you visit this website. The term "personal data" comprises all data that can be used to personally identify you. For detailed information about the subject matter of data protection, please consult our Data Protection Declaration, which we have included beneath this copy.</p>
          <h3>Data recording on this website</h3>
          <h4>Who is the responsible party for the recording of data on this website (i.e., the "controller")?</h4>
          <p>The data on this website is processed by the operator of the website, whose contact information is available under section "Information about the responsible party (referred to as the "controller" in the GDPR)" in this Privacy Policy.</p>
          <h4>How do we record your data?</h4>
          <p>We collect your data as a result of your sharing of your data with us. This may, for instance be information you enter into our contact form.</p>
          <p>Other data shall be recorded by our IT systems automatically or after you consent to its recording during your website visit. This data comprises primarily technical information (e.g., web browser, operating system, or time the site was accessed). This information is recorded automatically when you access this website.</p>
          <h4>What are the purposes we use your data for?</h4>
          <p>A portion of the information is generated to guarantee the error free provision of the website. Other data may be used to analyze your user patterns.</p>
          <h4>What rights do you have as far as your information is concerned?</h4>
          <p>You have the right to receive information about the source, recipients, and purposes of your archived personal data at any time without having to pay a fee for such disclosures. You also have the right to demand that your data are rectified or eradicated. If you have consented to data processing, you have the option to revoke this consent at any time, which shall affect all future data processing. Moreover, you have the right to demand that the processing of your data be restricted under certain circumstances. Furthermore, you have the right to log a complaint with the competent supervising agency.</p>
          <p>Please do not hesitate to contact us at any time if you have questions about this or any other data protection related issues.</p>
          <h2>2. General information and mandatory information</h2>
          <h3>Information about the responsible party (referred to as the "controller" in the GDPR)</h3>
          <p>The data processing controller on this website is:</p>
          <p>Le Space UG<br>{siteConfig.legal.address[1]}<br>{siteConfig.legal.address[2]}</p>
          <p>Phone: {siteConfig.legal.phone}<br>E-mail: {siteConfig.email.info}</p>
          <p>The controller is the natural person or legal entity that single-handedly or jointly with others makes decisions as to the purposes of and resources for the processing of personal data (e.g., names, e-mail addresses, etc.).</p>
        {/if}
      </div>

      <footer>
        <button class="close" onclick={close}>{$locale === 'de' ? 'Schließen' : 'Close'}</button>
      </footer>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .modal {
    background: var(--ls-bg-2);
    border: 1px solid var(--ls-card-border);
    border-radius: var(--ls-radius);
    width: min(760px, 92vw);
    max-height: 88vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 24px;
    border-bottom: 1px solid var(--ls-card-border);
  }

  header h3 {
    margin: 0;
    font-size: 1.15rem;
  }

  .x {
    background: none;
    border: none;
    color: var(--ls-text-dim);
    font-size: 1.6rem;
    cursor: pointer;
    line-height: 1;
  }

  .body {
    padding: 8px 24px 24px;
    overflow-y: auto;
  }

  .prose h2 {
    font-size: 1.15rem;
    color: var(--ls-red-bright);
    margin: 24px 0 8px;
  }

  .prose h3 {
    font-size: 1rem;
    margin: 18px 0 6px;
  }

  .prose h4 {
    font-size: 0.92rem;
    margin: 14px 0 4px;
    color: var(--ls-text-dim);
  }

  .prose p {
    font-size: 0.9rem;
    color: var(--ls-text-dim);
    margin: 0 0 10px;
  }

  .prose a {
    word-break: break-all;
  }

  footer {
    padding: 14px 24px;
    border-top: 1px solid var(--ls-card-border);
    display: flex;
    justify-content: flex-end;
  }

  .close {
    background: var(--ls-red);
    color: white;
    border: none;
    border-radius: var(--ls-radius-sm);
    padding: 8px 20px;
    font-weight: 600;
    cursor: pointer;
  }

  .close:hover {
    box-shadow: var(--ls-glow-red);
  }
</style>
