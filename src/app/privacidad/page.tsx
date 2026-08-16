import type { Metadata } from "next";
import { site } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Lumen: qué datos recopilamos y cómo los usamos.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  const fecha = "1 de julio de 2026";
  return (
    <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Privacidad" }]} />
      <article className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="font-display text-4xl text-primary md:text-[48px]">Política de Privacidad</h1>
          <p className="mt-3 font-caption text-caption text-on-surface-variant">Última actualización: {fecha}</p>
        </header>

        <div className="space-y-10 font-body-lg text-body-lg leading-[1.75] text-on-surface">
          <section>
            <h2 className="mb-3 font-display text-2xl text-primary">1. Introducción</h2>
            <p>
              En {site.fullName} (en adelante, «{site.name}») respetamos tu privacidad. Esta política explica de forma clara y sencilla
              qué información tratamos, por qué lo hacemos y qué derechos tienes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-primary">2. Datos que recopilamos</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold text-primary">Datos de uso agregados:</strong> páginas visitadas, tiempo de permanencia y
                tipo de dispositivo, recopilados de forma anónima para mejorar el sitio.
              </li>
              <li>
                <strong className="font-semibold text-primary">Datos que tú nos envías:</strong> si nos escribes por el formulario de
                contacto, el correo de contacto y el contenido de tu mensaje.
              </li>
              <li>
                <strong className="font-semibold text-primary">Preferencias locales:</strong> tu tema (claro/oscuro) y tus versículos
                favoritos se guardan únicamente en tu navegador (localStorage) y no se envían a nuestros servidores.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-primary">3. Cómo usamos los datos</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Mejorar el contenido y la experiencia de lectura.</li>
              <li>Responder a tus consultas.</li>
              <li>Medir el rendimiento del sitio (estadísticas agregadas, nunca individuales).</li>
            </ul>
            <p className="mt-4">
              No vendemos, alquilamos ni compartimos tus datos personales con terceros, salvo que la ley lo exija.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-primary">4. Cookies</h2>
            <p>
              Usamos cookies técnicas imprescindibles para el funcionamiento del sitio. Si en el futuro implementamos analítica o
              publicidad, te lo notificaremos en esta política y te ofreceremos controles claros.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-primary">5. Tus derechos</h2>
            <p>
              Tienes derecho a acceder, rectificar, suprimir y oponerte al tratamiento de tus datos personales. Para ejercer cualquiera
              de estos derechos, escríbenos a{" "}
              <a href={`mailto:${site.email}`} className="text-secondary hover:text-primary">
                {site.email}
              </a>{" "}
              y te responderemos a la mayor brevedad.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-primary">6. Enlaces externos</h2>
            <p>
              Este sitio puede contener enlaces a otros sitios web. No somos responsables de sus políticas de privacidad; te animamos a
              leerlas antes de proporcionarles información.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-primary">7. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política periódicamente. La fecha de la última revisión aparecerá siempre al inicio de esta página.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
