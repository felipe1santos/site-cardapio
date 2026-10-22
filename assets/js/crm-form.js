/* Formulário de captura → CRM de Ofertas (Supabase) → WhatsApp.
 * Intercepta todo link para o WhatsApp de atendimento, pede nome/WhatsApp/negócio,
 * grava o lead no funil da oferta e então abre o WhatsApp.
 * Uso: <script src=".../crm-form.js" data-offer="ID-DA-OFERTA" data-phone="5527999999999" defer></script>
 * data-phone: links wa.me desse número abrem o formulário. Qualquer elemento com data-crm-form também abre.
 */
(function () {
  var SB_URL = 'https://hjjfhgwbnhxvjnysdgbb.supabase.co';
  var SB_KEY = 'sb_publishable_TkAdBwmO3UrKh2QP08w-rQ_wPudPTsP'; // chave pública (o banco só aceita a função do formulário)
  var script = document.currentScript;
  var OFFER = script && script.getAttribute('data-offer');
  var PHONE = (script && script.getAttribute('data-phone')) || '';
  if (!OFFER) return;

  // ---- origem do lead: guarda o primeiro toque (UTM, clique de anúncio, página de entrada)
  var KEY = 'crm_src';
  try {
    var q = new URLSearchParams(location.search);
    var cur = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'].forEach(function (k) {
      if (q.get(k)) cur[k] = q.get(k);
    });
    var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!saved || Object.keys(cur).length) {
      cur.landing = location.href.split('#')[0];
      cur.referrer = document.referrer || '';
      localStorage.setItem(KEY, JSON.stringify(cur));
    }
  } catch (e) { /* navegador sem storage: segue sem origem */ }

  function source() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { /* ignora */ }
    return {
      page: location.hostname + location.pathname,
      landing: s.landing, referrer: s.referrer,
      utmSource: s.utm_source || (s.gclid ? 'google' : s.fbclid ? 'facebook' : undefined),
      utmMedium: s.utm_medium || (s.gclid || s.fbclid ? 'cpc' : undefined),
      utmCampaign: s.utm_campaign, utmContent: s.utm_content, utmTerm: s.utm_term,
      gclid: s.gclid, fbclid: s.fbclid,
    };
  }

  function rpc(fn, body) {
    return fetch(SB_URL + '/rest/v1/rpc/' + fn, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY },
      body: JSON.stringify(body),
    }).then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.message || 'erro'); return j; }); });
  }

  // ---- configuração do formulário vem do CRM (Configurações › Formulário e rastreio)
  var cfg = {
    title: 'Fale com um especialista',
    subtitle: 'Preencha seus dados e continue o atendimento no WhatsApp.',
    button_text: 'Quero falar no WhatsApp',
    fields: [
      { key: 'name', label: 'Nome', enabled: true, required: true },
      { key: 'phone', label: 'WhatsApp', enabled: true, required: true },
      { key: 'company', label: 'Nome do negócio', enabled: true, required: false },
    ],
  };
  rpc('get_lead_form', { p_offer: OFFER }).then(function (c) { if (c && c.fields) cfg = c; }).catch(function () {});

  // ---- estilos
  var css = '' +
    '.crmf-bg{position:fixed;inset:0;z-index:99999;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Inter,system-ui,sans-serif;animation:crmf-in .15s ease-out}' +
    '.crmf{background:#fff;border-radius:16px;width:100%;max-width:400px;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,.25);position:relative;color:#0f172a}' +
    '.crmf h3{margin:0 0 4px;font-size:20px;font-weight:800;color:#1d3e73;line-height:1.25}' +
    '.crmf p{margin:0 0 18px;font-size:14px;color:#64748b;line-height:1.45}' +
    '.crmf label{display:block;font-size:13px;font-weight:600;margin:0 0 5px;color:#334155}' +
    '.crmf input{width:100%;box-sizing:border-box;height:46px;border:1.5px solid #e2e8f0;border-radius:10px;padding:0 14px;font-size:16px;margin:0 0 12px;outline:none;font-family:inherit}' +
    '.crmf input:focus{border-color:#0084D6;box-shadow:0 0 0 3px rgba(0,132,214,.15)}' +
    '.crmf button[type=submit]{width:100%;height:50px;border:0;border-radius:12px;background:#25D366;color:#fff;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:4px;font-family:inherit}' +
    '.crmf button[type=submit]:disabled{opacity:.7;cursor:wait}' +
    '.crmf .crmf-x{position:absolute;top:10px;right:10px;width:34px;height:34px;border:0;background:transparent;font-size:24px;line-height:1;color:#94a3b8;cursor:pointer;border-radius:8px}' +
    '.crmf .crmf-x:hover{background:#f1f5f9}' +
    '.crmf .crmf-err{color:#C62828;font-size:13px;margin:-4px 0 10px}' +
    '.crmf small{display:block;text-align:center;color:#94a3b8;font-size:12px;margin-top:10px}' +
    '@keyframes crmf-in{from{opacity:0}to{opacity:1}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function maskPhone(v) {
    var d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }

  function goWhatsapp(url, fallbackHref) {
    var dest = url || fallbackHref || (PHONE ? 'https://wa.me/' + PHONE : null);
    if (!dest) return;
    window.location.href = dest; // mesma aba: não é bloqueado como popup no celular
  }

  function open(fallbackHref) {
    var fields = (cfg.fields || []).filter(function (f) { return f.enabled; });
    var bg = document.createElement('div');
    bg.className = 'crmf-bg';
    bg.innerHTML =
      '<form class="crmf" novalidate>' +
      '<button type="button" class="crmf-x" aria-label="Fechar">&times;</button>' +
      '<h3>' + esc(cfg.title) + '</h3><p>' + esc(cfg.subtitle) + '</p>' +
      fields.map(function (f) {
        var type = f.key === 'phone' ? 'tel' : f.key === 'email' ? 'email' : 'text';
        var ph = f.key === 'phone' ? '(27) 99999-9999' : '';
        var ac = f.key === 'name' ? 'name' : f.key === 'phone' ? 'tel-national' : f.key === 'email' ? 'email' : 'organization';
        return '<label for="crmf-' + f.key + '">' + esc(f.label) + (f.required ? ' *' : '') + '</label>' +
          '<input id="crmf-' + f.key + '" name="' + f.key + '" type="' + type + '" placeholder="' + ph + '" autocomplete="' + ac + '"' + (f.key === 'phone' ? ' inputmode="tel"' : '') + '>';
      }).join('') +
      '<div class="crmf-err" hidden></div>' +
      '<button type="submit">' + esc(cfg.button_text) + '</button>' +
      '<small>Seus dados ficam só com a nossa equipe.</small>' +
      '</form>';
    document.body.appendChild(bg);
    var form = bg.querySelector('form');
    var err = bg.querySelector('.crmf-err');
    var phone = form.querySelector('[name=phone]');
    if (phone) phone.addEventListener('input', function () { phone.value = maskPhone(phone.value); });
    var first = form.querySelector('input');
    if (first) setTimeout(function () { first.focus(); }, 50);

    function close() { bg.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    bg.addEventListener('mousedown', function (e) { if (e.target === bg) close(); });
    bg.querySelector('.crmf-x').addEventListener('click', close);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {};
      fields.forEach(function (f) { data[f.key] = (form.querySelector('[name=' + f.key + ']').value || '').trim(); });
      var missing = fields.filter(function (f) { return f.required && !data[f.key]; });
      var digits = (data.phone || '').replace(/\D/g, '');
      if (missing.length) { err.textContent = 'Preencha: ' + missing.map(function (f) { return f.label; }).join(', '); err.hidden = false; return; }
      if (digits.length < 10) { err.textContent = 'Confira o WhatsApp com DDD.'; err.hidden = false; return; }
      err.hidden = true;
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      btn.textContent = 'Abrindo o WhatsApp…';
      if (window.gtag) try { window.gtag('event', 'generate_lead', { method: 'crm_form' }); } catch (x) { /* sem gtag */ }
      if (window.fbq) try { window.fbq('track', 'Lead'); } catch (x) { /* sem pixel */ }
      rpc('submit_lead_form', { p_offer: OFFER, p_data: data, p_source: source() })
        .then(function (r) { goWhatsapp(r && r.whatsapp_url, fallbackHref); })
        .catch(function () { goWhatsapp(null, fallbackHref); }); // CRM fora do ar: não perde o contato
    });
  }

  // ---- intercepta os links do WhatsApp de atendimento
  document.addEventListener('click', function (e) {
    var sel = PHONE ? 'a[href*="wa.me/' + PHONE + '"], a[href*="api.whatsapp.com/send?phone=' + PHONE + '"], [data-crm-form]' : '[data-crm-form]';
    var a = e.target.closest && e.target.closest(sel);
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    open(a.getAttribute('href'));
  }, true);

  window.crmOpenForm = function () { open(); };
})();
