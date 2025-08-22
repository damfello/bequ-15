'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  // Función para navegar de vuelta a la landing page principal
  const navigateToHome = () => {
    window.location.href = '/'; // O '/landingpage' si esa es la ruta de tu componente principal
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 selection:bg-blue-600 selection:text-white">
      {/* Barra de Navegación simplificada para estas páginas */}
      <nav className="w-full p-4 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold tracking-tight text-gray-900">BeQu | Medical Regulations AI Assistant</span>
          <div className="space-x-4 md:space-x-6 flex items-center">
            <button onClick={navigateToHome} className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base font-medium hover:bg-blue-700 transition duration-150 shadow">
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal de Política de Privacidad */}
      <main className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">Privacy Policy | BeQu</h1>
        <p className="text-gray-600 text-center mb-8">Last Updated: July 15, 2025</p>

        {/* Sección de contenido con fondo blanco y texto oscuro */}
        <section className="bg-white p-8 rounded-lg shadow-xl mb-8 border border-gray-300">
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to BeQu (the &quot;App&quot;), operated by Best Quality Solutions GmbH, located at Kieselstra&szlig;e 6 D-51371 Leverkusen, Germany (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). This Privacy Policy explains how we collect, use, disclose, and protect your personal data when you use our App.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            We are committed to protecting your privacy and handling your data in an open and transparent manner. As we are located in Europe, we comply with the General Data Protection Regulation (GDPR) (EU) 2016/679.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Important Information and Who We Are</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">Purpose of this Privacy Policy:</span> This Privacy Policy aims to give you information on how BeQu collects and processes your personal data through your use of this App, including any data you may provide when you sign up for our services, make a purchase, or interact with us.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">Controller:</span> Best Quality Solutions GmbH is the data controller responsible for your personal data.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">Contact Details:</span> If you have any questions about this Privacy Policy or our data protection practices, please contact us:
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            Email: mail@bqs-gmbh.com<br />
            Phone: +49 (0)173 699 550 6
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the right to make a complaint at any time to the relevant supervisory authority for data protection issues in your country. We would, however, appreciate the chance to deal with your concerns before you approach the supervisory authority, so please contact us in the first instance.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. The Data Collection</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
            <li><span className="font-medium">Identity Data:</span> includes first name, last name, username or similar identifier, date of birth, and gender.</li>
            <li><span className="font-medium">Contact Data:</span> includes billing address, delivery address, email address, and telephone numbers.</li>
            <li><span className="font-medium">Financial Data:</span> includes payment card details (processed by Stripe, we do not store full card details in our servers).</li>
            <li><span className="font-medium">Transaction Data:</span> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
            <li><span className="font-medium">Technical Data:</span> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this App.</li>
            <li><span className="font-medium">Profile Data:</span> includes your username and password, purchases or orders made by you, your interests, preferences, feedback, and survey responses.</li>
            <li><span className="font-medium">Usage Data:</span> includes information about how you use our App, products, and services.</li>
            <li><span className="font-medium">Marketing and Communications Data:</span> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-2">
            We also collect, use, and share Aggregated Data such as statistical or demographic data for any purpose. Aggregated Data could be derived from your personal data but is not considered personal data in law as this data will not directly or indirectly reveal your identity. For example, we may aggregate your Usage Data to calculate the percentage of users accessing a specific App feature. However, if we combine or connect Aggregated Data with your personal data so that it can directly or indirectly identify you, we treat the combined data as personal data which will be used in accordance with this Privacy Policy.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We do not collect any Special Categories of Personal Data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data). Nor do we collect any information about criminal convictions and offences.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. How is Your Personal Data Collected?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use different methods to collect data from and about you, including through:
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">Direct interactions:</span> You may give us your Identity, Contact, and Financial Data by filling in forms or by corresponding with us by post, phone, email, or otherwise. This includes personal data you provide when you:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
            <li>Apply for our products or services.</li>
            <li>Create an account on our App.</li>
            <li>Subscribe to our service or publications.</li>
            <li>Request marketing to be sent to you.</li>
            <li>Give us feedback or contact us.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">Automated technologies or interactions:</span> As you interact with our App, we will automatically collect Technical Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies, server logs, and other similar technologies.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <span className="font-medium">Third parties or publicly available sources:</span> We may receive personal data about you from various third parties and public sources as set out below:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
            <li>Technical Data from analytics providers such as Google Analytics based outside the EU.</li>
            <li>Financial and Transaction Data from payment service providers such as Stripe based inside/outside the EU (Stripe is certified under the EU-U.S. Data Privacy Framework). For customers within the EU, Stripe Payments Europe (Europe Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Ireland) is responsible.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. How We Use Your Personal Data</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
            <li>Where you have given your consent.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Data Subject Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the following rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
            <li><span className="font-medium">Right to Information:</span> You have the right to request confirmation from us as to whether and what personal data we process from you. Furthermore, you have the right to a copy of this data.</li>
            <li><span className="font-medium">Right to Correction:</span> You have the right to correct inaccurate or incomplete personal data.</li>
            <li><span className="font-medium">Right to Deletion:</span> You have the right to request the deletion of your personal data if it is no longer necessary, you have withdrawn your consent, or the processing is unlawful.</li>
            <li><span className="font-medium">Right to Restriction of Processing:</span> You have the right to request the restriction of the processing of your personal data.</li>
            <li><span className="font-medium">Right to Data Portability:</span> You have the right to receive the personal data concerning you, which you have provided to us, in a structured, commonly used, and machine-readable format.</li>
            <li><span className="font-medium">Right to Object:</span> You have the right to object at any time, for reasons arising from your particular situation, to the processing of your personal data.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            To exercise your rights, you can contact us at the contact details provided above.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Modifications</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to modify or update these Privacy Policy at any time. We will notify you of any material changes by posting the Privacy Policy on the App or by other reasonable means. Your continued use of the App after such changes constitutes your acceptance of the new Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Information</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            If you have any questions about these Terms, please contact us:
          </p>
          <p className="text-gray-700 leading-relaxed">
            Phone: +49 (0)173-6995506<br />
            Email: mail@bqs-gmbh.com<br />
            Fax: +49 (03212) 3927967<br />
            <a href="https://www.bqs-gmbh.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.bqs-gmbh.com</a>
          </p>
        </section>
      </main>

      {/* Footer simplificado */}
      <footer className="w-full max-w-6xl mx-auto mt-12 mb-6 pt-6 border-t border-gray-300 text-center text-gray-600 text-sm">
        <p>Powered by BQS GmbH</p>
        <p>&copy; {new Date().getFullYear()} Best Quality Solutions GmbH. All rights reserved.</p>
      </footer>
    </div>
  );
}