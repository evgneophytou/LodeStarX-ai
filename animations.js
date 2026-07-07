/* LodeStarX.ai — site-wide scroll animations + dashboards */
(function () {
  // ========= Scroll-triggered reveal =========
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  function arm() {
    const candidates = document.querySelectorAll(
      '.band .kicker-row, .band .stats, .band .grid, .band .row-table, .band .cta-strip, .arch-row, .feature-card, .pull, .hero-content > *'
    );
    candidates.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--rd', (i % 6) * 60 + 'ms');
      io.observe(el);
    });
  }

  // ========= Animated number counters =========
  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach((el) => {
      if (el.dataset.animated) return;
      const txt = el.textContent.trim();
      const m = txt.match(/^([^\d-]*)(-?[\d,.]+)(.*)$/);
      if (!m) return;
      const prefix = m[1], rawNum = m[2].replace(/,/g, ''), suffix = m[3];
      const target = parseFloat(rawNum);
      if (isNaN(target)) return;
      el.dataset.animated = '1';
      const numIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          numIO.unobserve(e.target);
          const dur = 1100;
          const start = performance.now();
          const decimals = (rawNum.split('.')[1] || '').length;
          function step(t) {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const v = target * eased;
            el.textContent = prefix + (decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()) + suffix;
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = txt;
          }
          requestAnimationFrame(step);
        });
      }, { threshold: 0.5 });
      numIO.observe(el);
    });
  }

  // ========= Dashboards =========
  function buildTargetDashboard(host) {
    host.innerHTML = `
      <div class="db-head">
        <div>
          <div class="db-eyebrow">// LIVE · TARGET RANKING</div>
          <div class="db-title">Tenant · Northway-Aus · Block 14</div>
        </div>
        <div class="db-pulse"><span class="db-dot"></span> 11 workflows reasoning</div>
      </div>
      <div class="db-grid">
        <div class="db-map">
          <svg viewBox="0 0 400 280" preserveAspectRatio="none" class="db-svg">
            <defs>
              <radialGradient id="hot" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#f5c518" stop-opacity="0.85"/>
                <stop offset="60%" stop-color="#c97b3a" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#c97b3a" stop-opacity="0"/>
              </radialGradient>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="400" height="280" fill="url(#grid)"/>
            <!-- topo lines -->
            <g stroke="rgba(245,197,24,0.18)" fill="none" stroke-width="1">
              <path d="M0,80 Q100,60 200,90 T400,70"/>
              <path d="M0,130 Q120,110 220,135 T400,120"/>
              <path d="M0,180 Q90,165 210,180 T400,170"/>
              <path d="M0,225 Q130,210 230,230 T400,215"/>
            </g>
            <!-- hot zones -->
            <circle cx="120" cy="110" r="55" fill="url(#hot)" class="db-hot db-hot-1"/>
            <circle cx="265" cy="170" r="42" fill="url(#hot)" class="db-hot db-hot-2"/>
            <circle cx="320" cy="90" r="30" fill="url(#hot)" class="db-hot db-hot-3"/>
            <!-- target pins -->
            <g class="db-pins">
              <g transform="translate(120,110)"><circle r="4" fill="#f5c518"/><circle r="10" fill="none" stroke="#f5c518" class="db-ring"/></g>
              <g transform="translate(265,170)"><circle r="4" fill="#f5c518"/><circle r="10" fill="none" stroke="#f5c518" class="db-ring db-ring-2"/></g>
              <g transform="translate(320,90)"><circle r="4" fill="#f5c518"/><circle r="10" fill="none" stroke="#f5c518" class="db-ring db-ring-3"/></g>
            </g>
            <!-- scan line -->
            <line x1="0" x2="400" y1="0" y2="0" stroke="rgba(245,197,24,0.5)" stroke-width="1" class="db-scan"/>
          </svg>
          <div class="db-tag db-tag-1">T-001 · 94%</div>
          <div class="db-tag db-tag-2">T-002 · 87%</div>
          <div class="db-tag db-tag-3">T-003 · 81%</div>
        </div>
        <div class="db-list">
          <div class="db-row"><span class="db-rank">01</span><span class="db-name">Target T-001</span><div class="db-bar"><i style="--w:94%"></i></div><span class="db-val">94%</span></div>
          <div class="db-row"><span class="db-rank">02</span><span class="db-name">Target T-002</span><div class="db-bar"><i style="--w:87%"></i></div><span class="db-val">87%</span></div>
          <div class="db-row"><span class="db-rank">03</span><span class="db-name">Target T-003</span><div class="db-bar"><i style="--w:81%"></i></div><span class="db-val">81%</span></div>
          <div class="db-row"><span class="db-rank">04</span><span class="db-name">Target T-004</span><div class="db-bar"><i style="--w:72%"></i></div><span class="db-val">72%</span></div>
          <div class="db-row"><span class="db-rank">05</span><span class="db-name">Target T-005</span><div class="db-bar"><i style="--w:68%"></i></div><span class="db-val">68%</span></div>
          <div class="db-row"><span class="db-rank">06</span><span class="db-name">Target T-006</span><div class="db-bar"><i style="--w:54%"></i></div><span class="db-val">54%</span></div>
        </div>
      </div>
    `;
  }

  function buildWorkflowDashboard(host) {
    host.innerHTML = `
      <div class="db-head">
        <div>
          <div class="db-eyebrow">// AI WORKFLOW FLEET · LIVE</div>
          <div class="db-title">11 specialized workflows · 14,210 decisions today</div>
        </div>
        <div class="db-pulse"><span class="db-dot"></span> healthy</div>
      </div>
      <div class="agent-grid">
        <div class="agent"><span class="agent-name">Targeting</span><span class="agent-status agent-on">running · 2.4k</span></div>
        <div class="agent"><span class="agent-name">Fusion</span><span class="agent-status agent-on">running · 1.8k</span></div>
        <div class="agent"><span class="agent-name">Hypothesis</span><span class="agent-status agent-on">running · 980</span></div>
        <div class="agent"><span class="agent-name">QA / Verify</span><span class="agent-status agent-on">running · 1.1k</span></div>
        <div class="agent"><span class="agent-name">Risk Scoring</span><span class="agent-status agent-on">running · 740</span></div>
        <div class="agent"><span class="agent-name">ROI Modeler</span><span class="agent-status agent-warn">queued · 12</span></div>
        <div class="agent"><span class="agent-name">Reporting</span><span class="agent-status agent-on">running · 410</span></div>
        <div class="agent"><span class="agent-name">Data Scout</span><span class="agent-status agent-on">running · 2.0k</span></div>
      </div>
      <div class="agent-stream">
        <div class="agent-line"><span class="al-time">14:02:18</span> <span class="al-tag">[Targeting]</span> proposed T-007 · confidence 0.71 · awaiting fusion verify</div>
        <div class="agent-line"><span class="al-time">14:02:11</span> <span class="al-tag">[Fusion]</span> reconciled airborne mag + Sentinel-2 · district 14</div>
        <div class="agent-line"><span class="al-time">14:01:52</span> <span class="al-tag">[Hypothesis]</span> discarded scenario H-241 · evidence below threshold</div>
        <div class="agent-line"><span class="al-time">14:01:30</span> <span class="al-tag">[Data Scout]</span> ingested 3 USGS PDFs · 47 new occurrences extracted</div>
        <div class="agent-line"><span class="al-time">14:01:05</span> <span class="al-tag">[QA]</span> verified T-002 · cross-modal agreement 0.93</div>
      </div>
    `;
  }

  function buildFusionDashboard(host) {
    host.innerHTML = `
      <div class="db-head">
        <div>
          <div class="db-eyebrow">// DATA FUSION · 24H</div>
          <div class="db-title">Records reconciled across 180 sources</div>
        </div>
        <div class="db-pulse"><span class="db-dot"></span> 6.2hr median</div>
      </div>
      <div class="spark-row">
        <svg viewBox="0 0 600 160" class="spark" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#f5c518" stop-opacity="0.45"/>
              <stop offset="100%" stop-color="#f5c518" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path class="spark-fill" d="M0,120 L40,110 L80,118 L120,90 L160,95 L200,80 L240,72 L280,78 L320,55 L360,60 L400,42 L440,48 L480,30 L520,38 L560,22 L600,28 L600,160 L0,160 Z" fill="url(#sg)"/>
          <path class="spark-line" d="M0,120 L40,110 L80,118 L120,90 L160,95 L200,80 L240,72 L280,78 L320,55 L360,60 L400,42 L440,48 L480,30 L520,38 L560,22 L600,28" stroke="#f5c518" stroke-width="2" fill="none"/>
          <g class="spark-grid" stroke="rgba(255,255,255,0.06)">
            <line x1="0" x2="600" y1="40" y2="40"/>
            <line x1="0" x2="600" y1="80" y2="80"/>
            <line x1="0" x2="600" y1="120" y2="120"/>
          </g>
        </svg>
      </div>
      <div class="spark-stats">
        <div><div class="spark-num" data-target="184320">0</div><div class="spark-label">Records reconciled</div></div>
        <div><div class="spark-num" data-target="2840">0</div><div class="spark-label">Conflicts resolved</div></div>
        <div><div class="spark-num" data-target="47">0</div><div class="spark-label">New sources today</div></div>
        <div><div class="spark-num" data-target="99.2" data-decimals="1" data-suffix="%">0%</div><div class="spark-label">Schema match rate</div></div>
      </div>
    `;

    // animate the spark counters when visible
    const numIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        numIO.unobserve(e.target);
        const target = parseFloat(e.target.dataset.target);
        const decimals = parseInt(e.target.dataset.decimals || '0', 10);
        const suffix = e.target.dataset.suffix || '';
        const dur = 1400;
        const start = performance.now();
        function step(t) {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const v = target * eased;
          e.target.textContent = (decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    host.querySelectorAll('.spark-num').forEach((el) => numIO.observe(el));
  }

  function mountDashboards() {
    document.querySelectorAll('[data-dash="targets"]').forEach(buildTargetDashboard);
    document.querySelectorAll('[data-dash="workflows"]').forEach(buildWorkflowDashboard);
    document.querySelectorAll('[data-dash="fusion"]').forEach(buildFusionDashboard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { arm(); animateCounters(); mountDashboards(); });
  } else {
    arm(); animateCounters(); mountDashboards();
  }
})();
