type EventName = 'view_program' | 'click_whatsapp' | 'contact_prepared' | 'diagnostic_start' | 'diagnostic_complete' | 'click_corporate_diagnostic';
type Properties = { program?: string; sector?: string; language?: string; sence?: boolean };
const commercialPages = new Set(['ingles-para-empresas', 'portugues-para-empresas', 'idiomas-para-hoteleria', 'idiomas-para-restaurantes', 'idiomas-para-turismo', 'capacitacion-sence', 'nosotros', 'portugues-para-negocios']);
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

function initializeAnalytics() {
  // Local development, previews and QA must not enter the production reports.
  if (!['elementalstudios.cl', 'www.elementalstudios.cl'].includes(window.location.hostname)) return;
  const id = document.documentElement.dataset.analyticsId || '';
  if (!/^G-[A-Z0-9]+$/.test(id)) return;
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = analyticsWindow.gtag || function (..._args: unknown[]) {
    analyticsWindow.dataLayer!.push(arguments);
  };
  let referrer = '';
  try { const url = new URL(document.referrer); referrer = url.origin + url.pathname; } catch { /* Direct visit. */ }
  analyticsWindow.gtag('js', new Date());
  analyticsWindow.gtag('config', id, {
    page_location: window.location.origin + window.location.pathname,
    page_referrer: referrer,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const load = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.append(script);
  };
  if (document.readyState === 'complete') load();
  else window.addEventListener('load', load, { once: true });
}

/** Integration point: business events contain no participant or contact data. */
export function recordEvent(event: EventName, properties: Properties = {}) {
  const pathname = window.location.pathname;
  const locale = /^\/(en|pt)(?:\/|$)/.exec(pathname)?.[1] || 'es';
  const detail = {
    event, page_path: pathname, locale,
    ...(properties.program && commercialPages.has(properties.program) ? { program: properties.program } : {}),
    ...(['hoteleria', 'turismo', 'restaurantes', 'otra-empresa'].includes(properties.sector || '') ? { sector: properties.sector } : {}),
    ...(['ingles', 'portugues', 'ambos'].includes(properties.language || '') ? { language: properties.language } : {}),
    ...(typeof properties.sence === 'boolean' ? { sence: properties.sence } : {}),
  };
  window.dispatchEvent(new CustomEvent('elemental:measure', { detail }));
  const analyticsWindow = window as AnalyticsWindow;
  if (analyticsWindow.gtag) {
    const { event: eventName, ...parameters } = detail;
    analyticsWindow.gtag('event', eventName, parameters);
  } else if (Array.isArray(analyticsWindow.dataLayer)) analyticsWindow.dataLayer.push(detail);
}

if (typeof window !== 'undefined') {
  initializeAnalytics();
  const slug = window.location.pathname.replace(/^\/(en|pt)(?=\/)/, '').split('/').filter(Boolean)[0];
  if (commercialPages.has(slug)) recordEvent('view_program', { program: slug });
  document.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!link) return;
    if (link.hasAttribute('data-corporate-diagnostic')) recordEvent('click_corporate_diagnostic');
    try {
      if (['wa.link', 'wa.me', 'api.whatsapp.com'].includes(new URL(link.href).hostname)) recordEvent('click_whatsapp');
    } catch { /* Ignore non-URL links. */ }
  });
}
