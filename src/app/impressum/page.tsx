'use client';

import React from 'react';

export default function ImprintPage() {
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

      {/* Contenido principal del Imprint */}
      <main className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Impressum </h1>

        {/* Sección de contenido con fondo blanco y texto oscuro */}
        <section className="bg-white p-8 rounded-lg shadow-xl mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Information according to &sect; 5 TMG:</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Best Quality Solutions GmbH<br />
            Kieselstra&szlig;e 6<br />
            D-51371 Leverkusen<br />
            Authorized representative: Frank Wollin
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Phone: +49 (0)173-6995506<br />
            Email: mail@bqs-gmbh.com<br />
            Fax: +49 (03212) 3927967<br />
            <a href="https://www.bqs-gmbh.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.bqs-gmbh.com</a>
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Commercial register entry</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Registration number: HRB 110183<br />
            Register court: Amtsgericht K&ouml;ln<br />
            VAT identification number according to &sect; 27a UStG: DE354235838
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Disclaimer</h2>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">Liability for content</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The content of our pages was created with great care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages according to the general laws pursuant to &sect; 7 para.1 TMG. According to &sect;&sect; 8 to 10 TMG, we are not obligated as a service provider to monitor transmitted or stored external information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general laws remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific legal infringement. Upon becoming aware of such legal infringements, we will remove this content immediately.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">Warranty and disclaimer from BeQu information</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Best Quality Solutions GmbH strives to provide correct and up-to-date information through the Bequ application. However, the information offered by the Bequ chat regarding medical regulations is intended solely for general guidance purposes. No liability or guarantee can be assumed for the timeliness, correctness, and completeness of the information provided, as artificial intelligence can make mistakes and medical regulations are constantly evolving. The information is based on the AI&apos;s current understanding at the time of the consultation. The Bequ application does not replace the advice of a qualified medical or legal professional. A guarantee for achieving a specific result based on the information provided cannot be given, unless this was explicitly promised in writing.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">Liability for links</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our offer contains links to external third-party websites, the content of which we have no influence over. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent content control of the linked pages is not reasonable without concrete indications of a legal violation. Upon becoming aware of legal infringements, we will remove such links immediately.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Copyright</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The content and works created by the site operators on these pages are subject to German copyright law. The duplication, editing, distribution, and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is marked as such. Should you become aware of a copyright infringement, please inform us accordingly. Upon becoming aware of legal infringements, we will remove such content immediately.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Data protection</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The protection of your personal data is very important to us. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy. The use of our website is generally possible without providing personal data. As far as personal data (e.g., name, address, or email addresses) are collected on our pages, this is always done on a voluntary basis as far as possible. These data will not be passed on to third parties without your explicit consent.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contractual information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The information provided on this website regarding Bequ App&apos;s subscription plans and services is not to be understood as binding offers, but rather as an invitation to submit an offer. Contracts for the use of the Bequ App services and subscription plans presented here are only concluded through confirmation by Best Quality Solutions GmbH.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Modifications</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Best Quality Solutions GmbH reserves the right to change, supplement, delete, or temporarily or permanently cease publication of parts of the web pages or the entire offer without prior notice.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Payment service provider</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To process payments on our website, we use the payment service provider Stripe, Inc., 510 Townsend Street, San Francisco, CA 94103, USA. Stripe processes your payment data, such as credit card information, to handle purchases made on our platform. Your data will only be passed on for payment processing with Stripe and only to the extent necessary for this purpose. For more information on Stripe&apos;s privacy policy, please visit:<br />
            <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">stripe.com/de/privacy</a>.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Data protection and security in online payments</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The security of your data during transactions is very important to us. All payment transactions are processed via encrypted connections to ensure the protection and security of your personal information.
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
