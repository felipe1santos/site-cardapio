/* Formulário de qualificação em etapas → CRM de Ofertas (Supabase) → WhatsApp.
 * Intercepta os links para o WhatsApp de atendimento, faz uma pergunta por vez,
 * grava o lead (com as respostas e a origem) no funil da oferta e abre o WhatsApp.
 * Uso: <script src=".../crm-form.js" data-offer="ID-DA-OFERTA" data-phone="5527999999999" defer></script>
 * data-phone: links wa.me desse número abrem o formulário. Qualquer elemento com data-crm-form também abre.
 * As perguntas vêm do CRM (Configurações › Formulário e rastreio).
 */
(function () {
  var SB_URL = 'https://hjjfhgwbnhxvjnysdgbb.supabase.co';
  var SB_KEY = 'sb_publishable_TkAdBwmO3UrKh2QP08w-rQ_wPudPTsP'; // chave pública (o banco só aceita a função do formulário)
  var CORE = ['name', 'phone', 'email', 'company'];
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

  // ---- perguntas (padrão, substituídas pelas configuradas no CRM)
  var cfg = {
    title: 'Fale com um especialista',
    subtitle: 'Responda rapidinho e a gente continua no WhatsApp.',
    button_text: 'Falar no WhatsApp',
    fields: [
      { key: 'name', label: 'Qual é o seu nome?', enabled: true, required: true },
      { key: 'phone', label: 'Qual o seu WhatsApp?', enabled: true, required: true },
      { key: 'company', label: 'Qual o nome do seu negócio?', enabled: true, required: false },
    ],
  };
  rpc('get_lead_form', { p_offer: OFFER }).then(function (c) { if (c && c.fields && c.fields.length) cfg = c; }).catch(function () {});

  function typeOf(f) { return f.type || (f.key === 'phone' ? 'tel' : f.key === 'email' ? 'email' : 'text'); }

  // ---- estilos
  var css = '' +
    '.crmf-bg{position:fixed;inset:0;z-index:99999;background:rgba(15,23,42,.6);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Inter,system-ui,-apple-system,sans-serif;animation:crmf-fade .18s ease-out;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}' +
    '.crmf{background:#fff;border-radius:20px;width:100%;max-width:460px;box-shadow:0 24px 60px rgba(0,0,0,.3);position:relative;color:#0f172a;overflow:hidden;max-height:calc(100vh - 32px);display:flex;flex-direction:column}' +
    '.crmf-bar{height:5px;background:#eef2f7}.crmf-bar i{display:block;height:100%;background:linear-gradient(90deg,#0084D6,#25D366);transition:width .3s ease}' +
    '.crmf-body{padding:26px 26px 22px;overflow-y:auto}' +
    '.crmf-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}' +
    '.crmf-count{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#94a3b8}' +
    '.crmf-x{width:34px;height:34px;border:0;background:transparent;font-size:26px;line-height:1;color:#94a3b8;cursor:pointer;border-radius:10px}.crmf-x:hover{background:#f1f5f9;color:#475569}' +
    '.crmf-intro{margin:0 0 18px}.crmf-intro b{display:block;font-size:20px;font-weight:800;color:#1d3e73;line-height:1.25;margin-bottom:4px}.crmf-intro span{font-size:14px;color:#64748b}' +
    '.crmf-q{font-size:21px;font-weight:800;line-height:1.3;color:#0f172a;margin:0 0 16px}' +
    '.crmf-q small{font-size:13px;font-weight:500;color:#94a3b8;margin-left:6px}' +
    '.crmf-step{animation:crmf-in .22s ease-out}' +
    '.crmf input,.crmf textarea{width:100%;box-sizing:border-box;border:2px solid #e2e8f0;border-radius:12px;padding:0 16px;font-size:17px;outline:none;font-family:inherit;color:#0f172a;background:#fff}' +
    '.crmf input{height:54px}.crmf textarea{padding:14px 16px;min-height:110px;resize:none}' +
    '.crmf input:focus,.crmf textarea:focus{border-color:#0084D6;box-shadow:0 0 0 4px rgba(0,132,214,.12)}' +
    '.crmf-opts{display:grid;gap:8px}' +
    '.crmf-opt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;min-height:52px;padding:12px 16px;border:2px solid #e2e8f0;border-radius:12px;background:#fff;font-size:16px;font-weight:600;color:#1e293b;cursor:pointer;font-family:inherit;transition:border-color .12s,background .12s}' +
    '.crmf-opt:hover{border-color:#0084D6;background:#f5faff}.crmf-opt.on{border-color:#25D366;background:#effdf4}' +
    '.crmf-opt kbd{flex:none;width:26px;height:26px;border-radius:7px;border:1.5px solid #cbd5e1;display:grid;place-items:center;font:700 12px Inter,system-ui,sans-serif;color:#64748b}' +
    '.crmf-opt.on kbd{background:#25D366;border-color:#25D366;color:#fff}' +
    '.crmf-err{color:#C62828;font-size:13px;font-weight:600;margin-top:10px}' +
    '.crmf-nav{display:flex;align-items:center;gap:10px;margin-top:20px}' +
    '.crmf-back{border:0;background:transparent;color:#64748b;font:600 14px Inter,system-ui,sans-serif;cursor:pointer;padding:10px 4px}.crmf-back:hover{color:#0f172a}' +
    '.crmf-next{margin-left:auto;height:52px;padding:0 26px;border:0;border-radius:12px;background:#1d3e73;color:#fff;font:700 16px Inter,system-ui,sans-serif;cursor:pointer;display:flex;align-items:center;gap:8px}' +
    '.crmf-next:hover{background:#163262}.crmf-next.wa{background:#25D366}.crmf-next.wa:hover{background:#1eba57}.crmf-next:disabled{opacity:.7;cursor:wait}' +
    '.crmf-hint{font-size:12px;color:#94a3b8;margin-top:12px;text-align:right}' +
    '.crmf-foot{font-size:12px;color:#94a3b8;text-align:center;padding:0 26px 18px}' +
    '@keyframes crmf-fade{from{opacity:0}to{opacity:1}}@keyframes crmf-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}' +
    '@media (max-width:480px){.crmf-body{padding:22px 20px 18px}.crmf-q{font-size:19px}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function maskPhone(v) {
    var d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }

  function goWhatsapp(url, fallbackHref) {
    var dest = url || fallbackHref || (PHONE ? 'https://wa.me/' + PHONE : null);
    if (dest) window.location.href = dest; // mesma aba: não é bloqueado como popup no celular
  }

  function open(fallbackHref) {
    var fields = (cfg.fields || []).filter(function (f) { return f.enabled; });
    if (!fields.length) return goWhatsapp(null, fallbackHref);
    var vals = {};
    var step = 0;
    var sending = false;

    var bg = document.createElement('div');
    bg.className = 'crmf-bg';
    bg.innerHTML = '<div class="crmf" role="dialog" aria-modal="true"><div class="crmf-bar"><i></i></div><div class="crmf-body"></div><div class="crmf-foot">🔒 Seus dados ficam só com a nossa equipe.</div></div>';
    document.body.appendChild(bg);
    var body = bg.querySelector('.crmf-body');
    var bar = bg.querySelector('.crmf-bar i');
    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function close() {
      bg.remove();
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) {
      if (e.key === 'Escape') return close();
      var f = fields[step];
      if (f && typeOf(f) === 'choice' && !/INPUT|TEXTAREA/.test((document.activeElement || {}).tagName || '')) {
        var n = parseInt(e.key, 10);
        var opts = (f.options || []).filter(Boolean);
        if (n >= 1 && n <= opts.length) choose(opts[n - 1]);
      }
    }
    document.addEventListener('keydown', onKey);
    bg.addEventListener('mousedown', function (e) { if (e.target === bg) close(); });

    function error(f, v) {
      if (f.required && !v) return 'Responda para continuar 🙂';
      if (f.key === 'phone' && v.replace(/\D/g, '').length < 10) return 'Confira o WhatsApp com DDD.';
      if (typeOf(f) === 'email' && v && !/^\S+@\S+\.\S+$/.test(v)) return 'Confira o e-mail.';
      return '';
    }

    function render() {
      var f = fields[step];
      var last = step === fields.length - 1;
      var t = typeOf(f);
      bar.style.width = Math.round((step / fields.length) * 100) + '%';
      var html = '<div class="crmf-top"><span class="crmf-count">' + (step + 1) + ' de ' + fields.length + '</span>' +
        '<button type="button" class="crmf-x" aria-label="Fechar">&times;</button></div>';
      if (step === 0) html += '<div class="crmf-intro"><b>' + esc(cfg.title) + '</b><span>' + esc(cfg.subtitle) + '</span></div>';
      html += '<form class="crmf-step" novalidate><label class="crmf-q" for="crmf-in">' + esc(f.label) + (f.required ? '' : '<small>(opcional)</small>') + '</label>';
      if (t === 'choice') {
        html += '<div class="crmf-opts">' + (f.options || []).filter(Boolean).map(function (o, i) {
          return '<button type="button" class="crmf-opt' + (vals[f.key] === o ? ' on' : '') + '" data-v="' + esc(o) + '"><kbd>' + (i + 1) + '</kbd>' + esc(o) + '</button>';
        }).join('') + '</div>';
      } else if (t === 'textarea') {
        html += '<textarea id="crmf-in" placeholder="' + esc(f.placeholder || 'Escreva aqui…') + '">' + esc(vals[f.key] || '') + '</textarea>';
      } else {
        var it = t === 'tel' ? 'tel' : t === 'email' ? 'email' : 'text';
        var ph = f.placeholder || (t === 'tel' ? '(27) 99999-9999' : t === 'email' ? 'voce@email.com' : 'Escreva aqui…');
        var ac = f.key === 'name' ? 'name' : f.key === 'phone' ? 'tel-national' : f.key === 'email' ? 'email' : f.key === 'company' ? 'organization' : 'off';
        html += '<input id="crmf-in" type="' + it + '" placeholder="' + esc(ph) + '" autocomplete="' + ac + '"' + (t === 'tel' ? ' inputmode="tel"' : '') + ' value="' + esc(vals[f.key] || '') + '">';
      }
      html += '<div class="crmf-err" hidden></div><div class="crmf-nav">' +
        (step > 0 ? '<button type="button" class="crmf-back">← Voltar</button>' : '') +
        (t === 'choice' && !last ? '' : '<button type="submit" class="crmf-next' + (last ? ' wa' : '') + '">' + (last ? esc(cfg.button_text || 'Falar no WhatsApp') : 'Continuar →') + '</button>') +
        '</div>' + (t !== 'choice' && t !== 'textarea' ? '<div class="crmf-hint">ou aperte Enter ↵</div>' : '') + '</form>';
      body.innerHTML = html;

      body.querySelector('.crmf-x').addEventListener('click', close);
      var back = body.querySelector('.crmf-back');
      if (back) back.addEventListener('click', function () { step--; render(); });
      var input = body.querySelector('#crmf-in');
      if (input) {
        if (t === 'tel') input.addEventListener('input', function () { input.value = maskPhone(input.value); });
        setTimeout(function () { input.focus(); }, 60);
      }
      body.querySelectorAll('.crmf-opt').forEach(function (b) {
        b.addEventListener('click', function () { choose(b.getAttribute('data-v')); });
      });
      body.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); next(); });
    }

    function showErr(msg) {
      var el = body.querySelector('.crmf-err');
      el.textContent = msg;
      el.hidden = !msg;
    }

    function choose(v) {
      vals[fields[step].key] = v;
      body.querySelectorAll('.crmf-opt').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-v') === v); });
      if (step < fields.length - 1) setTimeout(next, 180); // avança sozinho
    }

    function next() {
      var f = fields[step];
      var input = body.querySelector('#crmf-in');
      if (input) vals[f.key] = input.value.trim();
      var msg = error(f, vals[f.key] || '');
      if (msg) return showErr(msg);
      showErr('');
      if (step < fields.length - 1) { step++; return render(); }
      submit();
    }

    function submit() {
      if (sending) return;
      sending = true;
      bar.style.width = '100%';
      var btn = body.querySelector('.crmf-next');
      if (btn) { btn.disabled = true; btn.textContent = 'Abrindo o WhatsApp…'; }
      var data = { answers: [] };
      fields.forEach(function (f) {
        var v = (vals[f.key] || '').trim();
        if (CORE.indexOf(f.key) >= 0) data[f.key] = v;
        else if (v) data.answers.push({ key: f.key, label: f.label, value: v });
      });
      if (window.gtag) try { window.gtag('event', 'generate_lead', { method: 'crm_form' }); } catch (x) { /* sem gtag */ }
      if (window.fbq) try { window.fbq('track', 'Lead'); } catch (x) { /* sem pixel */ }
      rpc('submit_lead_form', { p_offer: OFFER, p_data: data, p_source: source() })
        .then(function (r) { goWhatsapp(r && r.whatsapp_url, fallbackHref); })
        .catch(function () { goWhatsapp(null, fallbackHref); }); // CRM fora do ar: não perde o contato
    }

    render();
  }

  // ---- intercepta os links do WhatsApp de atendimento
  document.addEventListener('click', function (e) {
    var sel = PHONE ? 'a[href*="wa.me/' + PHONE + '"], a[href*="api.whatsapp.com/send?phone=' + PHONE + '"], [data-crm-form]' : '[data-crm-form]';
    var a = e.target.closest && e.target.closest(sel);
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    var href = a.getAttribute('href');
    open(href && href !== '#' ? href : null);
  }, true);

  window.crmOpenForm = function () { open(); };
})();
