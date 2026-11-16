// Khu Học Di Trú Síp · Học tiếng Hy Lạp. Bài học và tiến độ do trang nạp vào window.HOC (xem src/pages/hoc/tieng-hy-lap.astro).
const HOC = window.HOC, STAGES = HOC.stages, DAYS = HOC.days;
const $ = (s) => document.querySelector(s);
const KEY = 'hoc_hy_lap_v1:' + HOC.uid;
const SKILLS = { listen: 'Nghe', read: 'Đọc', write: 'Viết', speak: 'Nói' };
const BOX_DAYS = [0, 1, 3, 7, 14, 30, 60];
const today = () => new Date().toLocaleDateString('sv');
const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toLocaleDateString('sv'); };

let S = load();
function load() {
  let s = {};
  try { s = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  const r = HOC.remote;
  if (r && r.data && (r.data._t || 0) >= (s._t || 0)) s = r.data;
  return Object.assign({ done: {}, srs: {}, skills: {}, tests: {}, days: [], voice: '', rate: 0.85 }, s);
}
let pushT = 0;
function save() { S._t = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} clearTimeout(pushT); pushT = setTimeout(() => HOC.push(S), 2500); }

// ---- chuẩn hóa chữ
const stripAcc = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
const norm = (s) => s.toLowerCase().replace(/ς/g, 'σ').replace(/[.,;!?·«»"'…:()]/g, ' ').replace(/\s+/g, ' ').trim();
function judge(input, answers) {
  const a = norm(input);
  if (!a) return 0;
  if (answers.some((x) => norm(x) === a)) return 2;
  if (answers.some((x) => stripAcc(norm(x)) === stripAcc(a))) return 1;
  return 0;
}
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (arr, n) => shuffle(arr).slice(0, n);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---- dữ liệu
const V = (s) => { const p = s.split('|'); return { el: p[0], vi: p[1], tr: p[2] || '', alt: p[3] ? p[3].split('/') : [] }; };
const D = (s) => { const p = s.split('|'); return { el: p[0], vi: p[1] }; };
const dayById = (id) => DAYS.find((d) => d.id === id);
const vocabOf = (d) => (d.vocab || []).map(V);
const dialogOf = (d) => (d.dialog || []).map(D);

// ---- giọng đọc: ưu tiên file audio/<mã>.mp3 (giọng thu sẵn), không có thì dùng giọng Hy Lạp của máy
let voices = [], audioMiss = 3;
function refreshVoices() { voices = (window.speechSynthesis ? speechSynthesis.getVoices() : []).filter((v) => /^el/i.test(v.lang)); }
if (window.speechSynthesis) { refreshVoices(); speechSynthesis.onvoiceschanged = refreshVoices; }
function audioKey(t) { let h = 2166136261; const s = norm(t); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(16).padStart(8, '0'); }
function tts(t) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(t);
  u.lang = 'el-GR'; u.rate = S.rate || 0.85;
  const v = voices.find((x) => x.name === S.voice) || voices[0];
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}
function say(t) {
  if (audioMiss < 3) {
    const a = new Audio('audio/' + audioKey(t) + '.mp3');
    a.onerror = () => { audioMiss++; tts(t); };
    a.play().then(() => { audioMiss = 0; }).catch(() => {});
  } else tts(t);
}

// ---- điểm kỹ năng
function score(skill, ok) {
  const k = S.skills[skill] || (S.skills[skill] = [0, 0]);
  k[1]++; if (ok) k[0]++;
  if (run) { const r = run.res[skill] || (run.res[skill] = [0, 0]); r[1]++; if (ok) r[0]++; }
  save();
}
const pct = (a) => (a && a[1] ? Math.round((a[0] / a[1]) * 100) : null);

// ---- SRS
function srsAdd(v) { if (!S.srs[v.el]) S.srs[v.el] = { vi: v.vi, box: 0, due: today() }; }
function srsDue() { const t = today(); return Object.keys(S.srs).filter((k) => S.srs[k].due <= t); }
function srsMark(el, ok) { const c = S.srs[el]; c.box = ok ? Math.min(c.box + 1, BOX_DAYS.length - 1) : 0; c.due = addDays(ok ? BOX_DAYS[c.box] : 0); save(); }

// ---- tạo câu hỏi
function poolVi(d) {
  const i = DAYS.indexOf(d);
  let p = [];
  for (let j = i; j >= 0 && p.length < 30; j--) if (!DAYS[j].test) p = p.concat(vocabOf(DAYS[j]), dialogOf(DAYS[j]));
  return p;
}
function mcMeaning(item, pool, skill, audio) {
  const wrong = pick([...new Set(pool.filter((x) => x.vi !== item.vi && x.el !== item.el).map((x) => x.vi))], 3);
  const opts = shuffle([item.vi].concat(wrong));
  return { kind: 'mc', skill, prompt: audio ? 'Nghe và chọn nghĩa đúng' : 'Nghĩa của từ này là gì?', el: audio ? null : item.el, audio: item.el, auto: !!audio, opts, a: opts.indexOf(item.vi), tr: item.tr };
}
function mcCustom(e, skill) {
  const opts = shuffle(e[2]); return { kind: 'mc', skill, prompt: e[1], opts, a: opts.indexOf(e[2][e[3]]) };
}
function cultureQs(d) {
  return d.culture.qs.map((q) => { const opts = shuffle(q[1]); return { kind: 'mc', skill: 'read', prompt: 'Văn hóa Síp · câu hỏi kiểu đề thi', el: q[0], audio: q[0], opts, a: opts.indexOf(q[1][q[2]]), big: false }; });
}
function writeQs(d, n) {
  let w = (d.write || []).map((s) => { const p = s.split('|'); return { vi: p[0], a: p[1].split('/') }; });
  if (!w.length) w = vocabOf(d).map((v) => ({ vi: v.vi, a: [v.el].concat(v.alt) }));
  return pick(w, n).map((x) => ({ kind: 'type', skill: 'write', prompt: 'Viết bằng tiếng Hy Lạp', sub: x.vi, answers: x.a }));
}
function speakQs(d, n) {
  const src = dialogOf(d).length ? dialogOf(d) : vocabOf(d);
  return pick(src, n).map((x) => ({ kind: 'speak', skill: 'speak', text: x.el, vi: x.vi }));
}
function dictQs(d, n) {
  const src = vocabOf(d).filter((v) => v.el.split(' ').length <= 3);
  return pick(src, n).map((v) => ({ kind: 'type', skill: 'listen', prompt: 'Nghe và gõ lại bằng chữ Hy Lạp', audio: v.el, auto: true, answers: [v.el].concat(v.alt), hint: v.vi }));
}

function buildLesson(d) {
  const q = [], vs = vocabOf(d), pool = poolVi(d);
  srsDue().filter((k) => !vs.some((v) => v.el === k)).slice(0, 12).forEach((k) => q.push({ kind: 'card', el: k, vi: S.srs[k].vi, step: 'Ôn từ cũ' }));
  q.push({ kind: 'learn', d, step: 'Bài mới' });
  (d.letters || []).forEach((l) => {
    const p = l.split('|'), others = pick([...new Set(d.letters.map((x) => x.split('|')[1]))].filter((x) => x !== p[1]), 2);
    const opts = shuffle([p[1]].concat(others));
    q.push({ kind: 'mc', skill: 'read', prompt: 'Chữ này đọc thế nào?', el: p[0], opts, a: opts.indexOf(p[1]), step: 'Bài mới' });
  });
  pick(vs, 8).forEach((v) => q.push(Object.assign(mcMeaning(v, pool, 'read', false), { step: 'Bài mới' })));
  (d.ex || []).forEach((e) => q.push(Object.assign(mcCustom(e, 'read'), { step: 'Bài mới' })));
  pick(vs.concat(dialogOf(d)), 5).forEach((v) => q.push(Object.assign(mcMeaning(v, pool, 'listen', true), { step: 'Nghe' })));
  dictQs(d, 3).forEach((x) => q.push(Object.assign(x, { step: 'Nghe' })));
  writeQs(d, 3).forEach((x) => q.push(Object.assign(x, { step: 'Viết' })));
  speakQs(d, 3).forEach((x) => q.push(Object.assign(x, { step: 'Nói' })));
  q.push({ kind: 'culture', d, step: 'Văn hóa Síp' });
  cultureQs(d).forEach((x) => q.push(Object.assign(x, { step: 'Văn hóa Síp' })));
  return q;
}
function buildTest(d) {
  const days = d.test.map(dayById), q = [];
  const vs = days.flatMap(vocabOf), dl = days.flatMap(dialogOf), pool = vs.concat(dl);
  pick(pool, 5).forEach((v) => q.push(Object.assign(mcMeaning(v, pool, 'listen', true), { step: 'Nghe' })));
  pick(vs.filter((v) => v.el.split(' ').length <= 3), 3).forEach((v) => q.push({ kind: 'type', skill: 'listen', prompt: 'Nghe và gõ lại bằng chữ Hy Lạp', audio: v.el, auto: true, answers: [v.el].concat(v.alt), step: 'Nghe' }));
  pick(pool, 5).forEach((v) => q.push(Object.assign(mcMeaning(v, pool, 'read', false), { step: 'Đọc', tr: '' })));
  pick(d.cultureFrom.map(dayById).flatMap(cultureQs), 5).forEach((x) => q.push(Object.assign(x, { step: 'Đọc' })));
  pick(days.flatMap((x) => writeQs(x, 2)), 6).forEach((x) => q.push(Object.assign(x, { step: 'Viết' })));
  pick(dl, 5).forEach((x) => q.push({ kind: 'speak', skill: 'speak', text: x.el, vi: x.vi, step: 'Nói' }));
  q.forEach((x) => { x.test = true; });
  return q;
}

// ---- màn hình chính
let run = null, timer = null;
function home() {
  run = null; clearInterval(timer);
  if (window.speechSynthesis) speechSynthesis.cancel();
  const due = srsDue().length, doneN = Object.keys(S.done).length;
  const next = DAYS.find((d) => !S.done[d.id]);
  let streak = 0; { const set = new Set(S.days); const d = new Date(); if (!set.has(d.toLocaleDateString('sv'))) d.setDate(d.getDate() - 1); while (set.has(d.toLocaleDateString('sv'))) { streak++; d.setDate(d.getDate() - 1); } }
  let h = `<header><div><h1>Ελληνικά</h1><p class="sub">Tiếng Hy Lạp cho người Việt ở Síp · bản thử nghiệm, nội dung đang được soát</p></div><button class="ghost" onclick="settings()">Cài đặt</button></header>`;
  h += `<section class="stats"><div><b>${doneN}/${DAYS.length}</b><span>buổi đã học</span></div><div><b>${streak}</b><span>ngày liên tiếp</span></div><div><b>${due}</b><span>từ cần ôn</span></div><div><b>${Object.keys(S.srs).length}</b><span>từ đã học</span></div></section>`;
  h += `<section class="skills">` + Object.keys(SKILLS).map((k) => { const p = pct(S.skills[k]); return `<div class="skill"><label>${SKILLS[k]}<span>${p === null ? '–' : p + '%'}</span></label><div class="bar"><i class="${p !== null && p < 60 ? 'low' : ''}" style="width:${p || 0}%"></i></div></div>`; }).join('') + `</section><p class="note">Bài thi B1 đòi mỗi kỹ năng từ 60%. Thanh màu cam là kỹ năng đang dưới ngưỡng.</p>`;
  if (next) h += `<button class="primary big" onclick="start('${next.id}')">Học buổi hôm nay: ${esc(next.title)}</button>`;
  if (due) h += `<button class="ghost big" onclick="startReview()">Chỉ ôn ${due} từ đến hạn</button>`;
  STAGES.forEach((st) => {
    h += `<h2>${st.name}</h2><ul class="days">`;
    DAYS.filter((d) => d.stage === st.id).forEach((d) => {
      const n = DAYS.indexOf(d) + 1, dn = S.done[d.id];
      h += `<li class="${dn ? 'done' : ''} ${d.test ? 'test' : ''}" onclick="start('${d.id}')"><span class="n">${n}</span><span class="t">${esc(d.title)}</span><span class="r">${dn ? (dn.score !== undefined ? dn.score + '%' : '✓') : ''}</span></li>`;
    });
    h += `</ul>`;
  });
  h += `<p class="note">Mọi buổi đều mở sẵn, anh chị học theo thứ tự nào cũng được. Tiến độ lưu theo tài khoản của anh chị.</p>`;
  $('#app').innerHTML = h; window.scrollTo(0, 0);
}

function start(id) {
  const d = dayById(id);
  run = { d, q: d.test ? buildTest(d) : buildLesson(d), i: 0, res: {}, t0: Date.now() };
  timer = setInterval(() => { const e = $('#clock'); if (e) { const s = Math.floor((Date.now() - run.t0) / 1000); e.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); } }, 1000);
  show();
}
function startReview() {
  run = { d: { id: '_review', title: 'Ôn từ' }, q: srsDue().slice(0, 30).map((k) => ({ kind: 'card', el: k, vi: S.srs[k].vi, step: 'Ôn từ cũ' })), i: 0, res: {}, t0: Date.now(), review: true };
  show();
}
function next() { run.i++; if (run.i >= run.q.length) finish(); else show(); }

function frame(q, body) {
  const p = Math.round((run.i / run.q.length) * 100);
  return `<div class="top"><button class="ghost" onclick="home()">✕</button><div class="bar"><i style="width:${p}%"></i></div><span id="clock">0:00</span></div><p class="step">${esc(q.step || '')}${q.test ? ' · bài kiểm tra' : ''}</p><div class="card">${body}</div>`;
}
const playBtn = (t, label) => `<button class="play" onclick="say(this.dataset.t)" data-t="${esc(t)}">🔊 ${label || 'Nghe'}</button>`;
function kb() {
  const keys = 'α ά β γ δ ε έ ζ η ή θ ι ί κ λ μ ν ξ ο ό π ρ σ ς τ υ ύ φ χ ψ ω ώ ;'.split(' ');
  return `<div class="kb">` + keys.map((k) => `<button type="button" onclick="key('${k}')">${k}</button>`).join('') + `<button type="button" class="w" onclick="key(' ')">khoảng trắng</button><button type="button" class="w" onclick="key('⌫')">⌫ xóa</button></div>`;
}
function key(k) { const i = $('#inp'); if (!i || i.disabled) return; i.value = k === '⌫' ? i.value.slice(0, -1) : i.value + k; i.focus(); }

function show() {
  const q = run.q[run.i]; let b = '';
  if (q.kind === 'learn') {
    const d = q.d;
    b = `<h2>${esc(d.title)}</h2>`;
    if (d.letters) b += `<div class="letters">` + d.letters.map((l) => { const p = l.split('|'); return `<div><b>${p[0]}</b><span>${esc(p[1])}</span></div>`; }).join('') + `</div>`;
    b += `<p class="g">${d.grammar}</p><h3>Từ và mẫu câu <small>bấm vào để nghe</small></h3><ul class="voc">` + vocabOf(d).map((v) => `<li onclick="say(this.dataset.t)" data-t="${esc(v.el)}"><b>${esc(v.el)}</b><i>${esc(v.tr)}</i><span>${esc(v.vi)}</span></li>`).join('') + `</ul>`;
    if (dialogOf(d).length) b += `<h3>Hội thoại</h3><ul class="dlg">` + dialogOf(d).map((x) => `<li onclick="say(this.dataset.t)" data-t="${esc(x.el)}"><b>${esc(x.el)}</b><span>${esc(x.vi)}</span></li>`).join('') + `</ul>`;
    b += `<button class="primary" onclick="next()">Đã đọc xong, làm bài tập</button>`;
  } else if (q.kind === 'culture') {
    const c = q.d.culture;
    b = `<h2>Văn hóa Síp</h2><p class="elbig">${esc(c.el)}</p>${playBtn(c.el)}<p class="vi">${esc(c.vi)}</p><p class="g">${esc(c.words)}</p><p class="note">Bài thi văn hóa ra bằng tiếng Hy Lạp, nên anh chị đọc câu gốc vài lần trước khi trả lời.</p><button class="primary" onclick="next()">Trả lời 2 câu hỏi</button>`;
  } else if (q.kind === 'card') {
    b = `<p class="q">Anh chị còn nhớ từ này không?</p><p class="elbig">${esc(q.el)}</p>${playBtn(q.el)}<div id="rev"><button class="primary" onclick="reveal()">Xem nghĩa</button></div>`;
  } else if (q.kind === 'mc') {
    b = `<p class="q">${esc(q.prompt)}</p>` + (q.el ? `<p class="elbig">${esc(q.el)}</p>` + (q.tr && !q.test ? `<p class="tr">${esc(q.tr)}</p>` : '') : '') + (q.audio ? playBtn(q.audio, q.auto ? 'Nghe lại' : 'Nghe') : '') + `<div class="opts">` + q.opts.map((o, i) => `<button onclick="ansMc(${i})">${esc(o)}</button>`).join('') + `</div><div id="fb"></div>`;
  } else if (q.kind === 'type') {
    b = `<p class="q">${esc(q.prompt)}</p>` + (q.sub ? `<p class="elbig vi2">${esc(q.sub)}</p>` : '') + (q.audio ? playBtn(q.audio, 'Nghe lại') : '') + `<input id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Gõ chữ Hy Lạp…" onkeydown="if(event.key==='Enter')ansType()">${kb()}<button class="primary" id="chk" onclick="ansType()">Kiểm tra</button><div id="fb"></div>`;
  } else if (q.kind === 'speak') {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    b = `<p class="q">Nghe mẫu rồi nói to câu này</p><p class="elbig">${esc(q.text)}</p><p class="vi">${esc(q.vi)}</p>${playBtn(q.text, 'Nghe mẫu')}` + (SR ? `<button class="play" id="mic" onclick="listen()">🎤 Bấm rồi nói</button>` : '') + `<div id="fb"></div><p class="note">${SR ? 'Máy nghe không ra thì anh chị tự chấm bằng hai nút dưới.' : 'Trình duyệt này không nhận giọng nói, anh chị tự chấm bằng hai nút dưới.'}</p><div class="row"><button onclick="ansSpeak(true)">Tôi nói được</button><button onclick="ansSpeak(false)">Chưa nói được</button></div>`;
  }
  $('#app').innerHTML = frame(q, b); window.scrollTo(0, 0);
  if (q.auto && q.audio) setTimeout(() => say(q.audio), 250);
  if (q.kind === 'card' || q.kind === 'speak') setTimeout(() => say(q.el || q.text), 250);
  const i = $('#inp'); if (i) i.focus();
}
const nextBtn = () => `<button class="primary" onclick="next()">Tiếp</button>`;
function reveal() {
  const q = run.q[run.i];
  $('#rev').innerHTML = `<p class="vi">${esc(q.vi)}</p><div class="row"><button onclick="srsMark(run.q[run.i].el,false);next()">Quên</button><button class="primary" onclick="srsMark(run.q[run.i].el,true);next()">Nhớ</button></div>`;
}
function ansMc(i) {
  const q = run.q[run.i]; if (q.answered) return; q.answered = true;
  const ok = i === q.a; score(q.skill, ok);
  document.querySelectorAll('.opts button').forEach((b, j) => { b.disabled = true; if (j === q.a) b.classList.add('ok'); else if (j === i) b.classList.add('bad'); });
  $('#fb').innerHTML = `<p class="${ok ? 'good' : 'wrong'}">${ok ? 'Đúng.' : 'Chưa đúng.'}${q.auto ? ' Câu vừa nghe: <b>' + esc(q.audio) + '</b>' : ''}</p>` + nextBtn();
}
function ansType() {
  const q = run.q[run.i]; if (q.answered) return;
  const v = $('#inp').value; if (!v.trim()) return;
  q.answered = true; const r = judge(v, q.answers); score(q.skill, r > 0);
  $('#inp').disabled = true; $('#chk').style.display = 'none';
  const ans = `<b>${esc(q.answers[0])}</b>`;
  $('#fb').innerHTML = `<p class="${r ? 'good' : 'wrong'}">${r === 2 ? 'Đúng.' : r === 1 ? 'Đúng chữ, nhưng anh chị chú ý dấu trọng âm: ' + ans : 'Chưa đúng. Đáp án: ' + ans}${q.hint ? ' (' + esc(q.hint) + ')' : ''}</p>` + nextBtn();
}
function listen() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition, q = run.q[run.i];
  const r = new SR(); r.lang = 'el-GR'; r.maxAlternatives = 3;
  $('#mic').textContent = '🎤 Đang nghe…';
  r.onresult = (e) => {
    const want = stripAcc(norm(q.text)).split(' ');
    let best = 0, heard = '';
    for (const alt of e.results[0]) { const got = stripAcc(norm(alt.transcript)).split(' '); const m = want.filter((w) => got.includes(w)).length / want.length; if (m >= best) { best = m; heard = alt.transcript; } }
    const ok = best >= 0.7;
    $('#fb').innerHTML = `<p class="${ok ? 'good' : 'wrong'}">Máy nghe được: <b>${esc(heard)}</b> · khớp ${Math.round(best * 100)}%</p>`;
    $('#mic').textContent = '🎤 Nói lại';
  };
  r.onerror = () => { $('#fb').innerHTML = `<p class="wrong">Máy không nghe được. Anh chị thử lại hoặc tự chấm.</p>`; $('#mic').textContent = '🎤 Bấm rồi nói'; };
  r.start();
}
function ansSpeak(ok) { score('speak', ok); next(); }

function finish() {
  clearInterval(timer);
  const d = run.d, mins = Math.max(1, Math.round((Date.now() - run.t0) / 60000));
  let tot = [0, 0]; Object.values(run.res).forEach((r) => { tot[0] += r[0]; tot[1] += r[1]; });
  const sc = pct(tot);
  if (!run.review) {
    S.done[d.id] = { date: today(), score: sc === null ? undefined : sc };
    if (d.test) S.tests[d.id] = { date: today(), res: run.res };
    else vocabOf(d).forEach(srsAdd);
  }
  if (!S.days.includes(today())) S.days.push(today());
  save();
  let h = `<div class="card"><h2>${run.review ? 'Ôn xong' : d.test ? 'Kết quả kiểm tra' : 'Xong buổi học'}</h2><p class="q">${esc(d.title)} · ${mins} phút${sc !== null ? ' · ' + sc + '%' : ''}</p>`;
  const keys = Object.keys(SKILLS).filter((k) => run.res[k]);
  if (keys.length) h += `<table><tr><th>Kỹ năng</th><th>Đúng</th><th>Tỷ lệ</th><th></th></tr>` + keys.map((k) => { const r = run.res[k], p = pct(r); return `<tr><td>${SKILLS[k]}</td><td>${r[0]}/${r[1]}</td><td>${p}%</td><td>${d.test ? (p >= 60 ? 'Đạt' : 'Dưới 60%') : ''}</td></tr>`; }).join('') + `</table>`;
  if (d.test) { const low = keys.filter((k) => pct(run.res[k]) < 60); h += `<p class="g">${low.length ? 'Kỹ năng cần kéo lên: <b>' + low.map((k) => SKILLS[k]).join(', ') + '</b>. Anh chị nên học lại các buổi trong tuần trước khi sang tuần mới.' : 'Cả bốn kỹ năng đều từ 60% trở lên.'}</p>`; }
  h += `<button class="primary" onclick="home()">Về trang chính</button></div>`;
  $('#app').innerHTML = h; window.scrollTo(0, 0);
}

function settings() {
  refreshVoices();
  let h = `<header><h1>Cài đặt</h1><button class="ghost" onclick="home()">Xong</button></header><div class="card"><h3>Giọng đọc tiếng Hy Lạp</h3>`;
  if (voices.length) h += `<select onchange="S.voice=this.value;save()">` + voices.map((v) => `<option ${v.name === S.voice ? 'selected' : ''}>${esc(v.name)}</option>`).join('') + `</select>`;
  else h += `<p class="wrong">Máy chưa có giọng Hy Lạp.</p>`;
  h += `<p class="note">Máy đọc bằng giọng Hy Lạp có sẵn của thiết bị. iPhone, iPad, Mac và điện thoại Android thường có sẵn; trên Windows cần cài gói ngôn ngữ Greek trong Settings → Time & language → Speech.</p>
  <label>Tốc độ đọc: <input type="range" min="0.6" max="1.1" step="0.05" value="${S.rate}" oninput="S.rate=+this.value;save()"></label>
  <button class="play" onclick="say('Καλημέρα! Με λένε Λέο και μένω στην Πάφο.')">🔊 Nghe thử</button>
  <h3>Bàn phím Hy Lạp</h3><p class="note">Trang có sẵn bàn phím bấm. Muốn gõ nhanh, anh chị thêm bàn phím Greek trong cài đặt bàn phím của máy. Dấu trọng âm: bấm phím <b>;</b> rồi bấm nguyên âm.</p></div>`;
  $('#app').innerHTML = h; window.scrollTo(0, 0);
}
if (typeof document !== 'undefined' && document.getElementById('app')) home();
window.addEventListener('pagehide', () => { clearTimeout(pushT); HOC.push(S); });
