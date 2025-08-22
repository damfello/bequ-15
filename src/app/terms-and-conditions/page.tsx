// pages/page.tsx
'use client';

import React from 'react';

export default function TermsAndConditionsPage() {
  // Función para navegar de vuelta a la landing page principal
  const navigateToHome = () => {
    window.location.href = '/'; // O '/landingpage' si esa es la ruta de tu componente principal
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-950 text-white selection:bg-blue-500 selection:text-white">
      {/* Barra de Navegación simplificada para estas páginas */}
      <nav className="w-full p-4 sticky top-0 z-50 bg-blue-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold tracking-tight">BeQu | Medical Regulations AI Assistant</span>
          <div className="space-x-4 md:space-x-6 flex items-center">
            <button onClick={navigateToHome} className="bg-white text-blue-900 px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base font-medium hover:bg-blue-100 transition duration-150 shadow">
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal de Términos y Condiciones */}
      <main className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-4 text-center">Terms and Conditions | BeQu</h1>
        <p className="text-blue-200 text-center mb-8">Last Updated: July 22, 2025</p>

        {/* Sección de contenido con fondo blanco y texto oscuro */}
        <section className="bg-white p-8 rounded-lg shadow-xl mb-8"> {/* Fondo blanco */}
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to BeQu (the &quot;App&quot;), operated by Best Quality Solutions GmbH, located at Kieselstraße 6 D-51371 Leverkusen, Germany (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the BeQu app and its services.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            By accessing or using the App, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use the App.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2> {/* Título de sección más oscuro */}
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">1.1. Agreement:</span> These Terms constitute a legally binding agreement between you and Best Quality Solutions GmbH.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">1.2. Eligibility:</span> By using the App, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-medium">1.3. Changes to Terms:</span> We reserve the right to modify or update these Terms at any time. We will notify you of any material changes by posting the new Terms on the App or by other reasonable means. Your continued use of the App after such changes constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. User Accounts</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">2.1. Registration:</span> To access certain features of the App, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">2.2. Account Security:</span> You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We will not be liable for any loss or damage arising from your failure to comply with this security obligation.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-medium">2.3. Account Termination:</span> We reserve the right to suspend or terminate your account at our sole discretion, without notice or liability, for any reason, including if you violate these Terms.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Intellectual Property Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">3.1. Our Content:</span> All content, features, and functionality of the App (including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, and software) are the exclusive property of us or its licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">3.2. Your Content:</span> You retain ownership of any content you submit, post, or display on or through the App (&quot;User Content&quot;). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free, transferable, and sublicensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, and display such User Content in connection with the operation of the App.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-medium">3.3. Trademarks:</span> The BeQu name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Best Quality Solutions GmbH or its affiliates or licensors. You must not use such marks without our prior written permission.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. User Conduct</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">4.1. Prohibited Activities:</span> You agree not to use the App for any purpose that is unlawful or prohibited by these Terms. This includes, but is not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
            <li>Violating any applicable laws or regulations.</li>
            <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others.</li>
            <li>Transmitting any worms, viruses, or any code of a destructive nature.</li>
            <li>Engaging in any activity that interferes with or disrupts the App or the servers and networks connected to the App.</li>
            <li>Attempting to gain unauthorized access to any portion of the App, other accounts, computer systems, or networks connected to the App.</li>
            <li>Harassing, abusing, insulting, harming, defaming, slandering, disparaging, intimidating, or discriminating based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">4.2. Content Standards:</span> You are solely responsible for your User Content. You agree that your User Content will not:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
            <li>Be unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another&apos;s privacy, hateful, or racially, ethnically, or otherwise objectionable.</li>
            <li>Contain any unsolicited or unauthorized advertising, promotional materials, &quot;junk mail,&quot; &quot;spam,&quot; &quot;chain letters,&quot; &quot;pyramid schemes,&quot; or any other form of solicitation.</li>
            <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Payment Terms (Stripe)</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">5.1. Payment Processing:</span> We use Stripe for payment processing. By making a purchase through the App, you agree to be bound by Stripe&apos;s Terms of Service and Privacy Policy. We do not store your full payment card details on our servers.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">5.2. Billing:</span> You agree to pay all fees and charges associated with your use of the App&apos;s paid features in accordance with the pricing and payment terms presented to you at the time of purchase.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">5.3. Subscriptions:</span> If you subscribe to a recurring service, you authorize us (via Stripe) to charge your designated payment method on a recurring basis until you cancel your subscription.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">5.4. Refunds:</span> All sales are final unless otherwise stated in a specific refund policy provided at the time of purchase.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-medium">5.5. Price Changes:</span> We reserve the right to change our prices for paid services at any time. We will provide you with reasonable notice of any price changes.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Privacy Policy and GDPR Compliance</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">6.1. Data Protection:</span> Your privacy is very important to us. Our collection, use, and processing of your personal data are governed by our Privacy Policy, which is incorporated into these Terms by reference.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">6.2. GDPR Compliance:</span> As we are located in Europe, we are committed to complying with the General Data Protection Regulation (GDPR). Our Privacy Policy details:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
            <li>The types of personal data we collect.</li>
            <li>The purposes for which we process your personal data.</li>
            <li>The legal basis for processing your personal data.</li>
            <li>How we protect your personal data.</li>
            <li>Your rights as a data subject (e.g., right to access, rectification, erasure, restriction of processing, data portability, objection).</li>
            <li>How to exercise your rights.</li>
            <li>Data retention periods.</li>
            <li>Information about international data transfers (if any).</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-medium">6.3. Review Privacy Policy:</span> Please review our Privacy Policy carefully to understand our practices regarding your personal data.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-medium">6.4. Data Storage and Anonymization:</span> BeQu stores the information users share with it in compliance with GDPR policies, using a data anonymization method that protects each user&apos;s personal information. This information is stored to improve the user experience and offer advanced features, such as displaying each user&apos;s private chat history. The BeQu database is located on local servers in Europe, specifically in Germany.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Disclaimers</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">7.1. &quot;AS IS&quot; Basis:</span> The App is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-medium">7.2. No Guarantee:</span> We do not warrant that the App will be uninterrupted, secure, or error-free, that defects will be corrected, or that the App or the server that makes it available are free of viruses or other harmful components.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-medium">8.1. Exclusion of Damages:</span> To the fullest extent permitted by applicable law, in no event shall Best Quality Solutions GmbH, its affiliates, directors, employees, agents, suppliers, or licensors be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the App; (ii) any conduct or content of any third party on the App; (iii) any content obtained from the App; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Indemnification</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-medium">9.1. Your Responsibility:</span> You agree to defend, indemnify, and hold harmless Best Quality Solutions GmbH and its licensees and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney&apos;s fees), resulting from or arising out of (a) your use and access of the App, by you or any person using your account and password; (b) a breach of these Terms; or (c) User Content posted on the App.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Governing Law and Dispute Resolution</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">10.1. Governing Law:</span> These Terms shall be governed and construed in accordance with the laws of Germany, without regard to its conflict of law provisions.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-medium">10.2. Jurisdiction:</span> Any dispute arising out of or in connection with these Terms, including any question regarding their existence, validity, or termination, shall be referred to and finally resolved by the courts of the city where the company is located.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Miscellaneous</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">11.1. Severability:</span> If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">11.2. Waiver:</span> No waiver of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Best Quality Solutions GmbH to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-medium">11.3. Entire Agreement:</span> These Terms and our Privacy Policy constitute the entire agreement between you and Best Quality Solutions GmbH regarding the App.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">12. Contact Information</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            If you have any questions about these Terms, please contact us:
          </p>
          <p className="text-gray-700 leading-relaxed">
            Phone: +49 (0)173-6995506<br />
            Email: mail@bqs-gmbh.com<br />
            Fax: +49 (03212) 3927967<br />
            <a href="https://www.bqs-gmbh.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.bqs-gmbh.com</a> {/* Enlace azul para contraste */}
          </p>
        </section>
      </main>

      {/* Footer simplificado */}
      <footer className="w-full max-w-6xl mx-auto mt-12 mb-6 pt-6 border-t border-white/20 text-center text-blue-200 text-sm">
        <p>Powered by BQS GmbH</p>
        <p>&copy; {new Date().getFullYear()} Best Quality Solutions GmbH. All rights reserved.</p>
      </footer>
    </div>
  );
}