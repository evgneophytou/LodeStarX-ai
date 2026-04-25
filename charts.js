/* LodeStarX.ai — animated chart components, mounted via [data-chart] */
(function () {
  function buildDiscoveryChart(host) {
    // Bar chart comparing legacy vs LodeStarX discovery rate
    host.innerHTML = `
      <div class="chart-shell">
        <div class="chart-eyebrow">// DISCOVERY SUCCESS RATE · PILOT COHORT</div>
        <div class="chart-bars">
          <div class="cb"><div class="cb-label">Legacy</div><div class="cb-track"><i class="cb-fill" style="--w:5%"></i></div><div class="cb-val">5%</div></div>
          <div class="cb"><div class="cb-label">Modeling</div><div class="cb-track"><i class="cb-fill" style="--w:11%"></i></div><div class="cb-val">11%</div></div>
          <div class="cb"><div class="cb-label cb-hl">LodeStarX</div><div class="cb-track"><i class="cb-fill cb-fill-hl" style="--w:38%"></i></div><div class="cb-val cb-val-hl">38%</div></div>
        </div>
        <div class="chart-foot">3.4× higher discovery success · n=14 programs</div>
      </div>`;
  }
  function buildCostChart(host) {
    host.innerHTML = `
      <div class="chart-shell">
        <div class="chart-eyebrow">// CAPEX PER PROGRAM · NORMALIZED</div>
        <svg viewBox="0 0 320 160" class="cost-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#f5c518" stop-opacity="0.5"/>
              <stop offset="100%" stop-color="#f5c518" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <g class="cg-grid" stroke="rgba(10,22,40,0.06)">
            <line x1="0" x2="320" y1="40" y2="40"/>
            <line x1="0" x2="320" y1="80" y2="80"/>
            <line x1="0" x2="320" y1="120" y2="120"/>
          </g>
          <path class="cost-line-a" d="M0,40 L60,55 L120,52 L180,60 L240,58 L320,62" stroke="#c97b3a" stroke-width="2" fill="none"/>
          <path class="cost-fill" d="M0,40 L60,80 L120,95 L180,118 L240,128 L320,138 L320,160 L0,160 Z" fill="url(#cg)"/>
          <path class="cost-line-b" d="M0,40 L60,80 L120,95 L180,118 L240,128 L320,138" stroke="#f5c518" stroke-width="2.5" fill="none"/>
        </svg>
        <div class="chart-legend">
          <span><i style="background:#c97b3a"></i>Industry baseline</span>
          <span><i style="background:#f5c518"></i>LodeStarX customers</span>
        </div>
        <div class="chart-foot">−42% capital exposure · trailing 6 quarters</div>
      </div>`;
  }
  function buildFootprintChart(host) {
    host.innerHTML = `
      <div class="chart-shell">
        <div class="chart-eyebrow">// HECTARES DISTURBED PER DISCOVERY</div>
        <div class="donut-wrap">
          <svg viewBox="0 0 120 120" class="donut">
            <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(10,22,40,0.08)" stroke-width="14"/>
            <circle cx="60" cy="60" r="48" fill="none" stroke="#f5c518" stroke-width="14"
              stroke-dasharray="301.6" stroke-dashoffset="301.6"
              transform="rotate(-90 60 60)" class="donut-arc"/>
          </svg>
          <div class="donut-center">
            <div class="donut-num">−61<span>%</span></div>
            <div class="donut-label">vs. industry mean</div>
          </div>
        </div>
        <div class="chart-foot">Less land disturbed per gram of metal recovered</div>
      </div>`;
  }
  function buildMarketChart(host) {
    host.innerHTML = `
      <div class="chart-shell">
        <div class="chart-eyebrow">// CRITICAL MINERAL DEMAND · 2025 → 2040</div>
        <svg viewBox="0 0 320 160" class="market-svg" preserveAspectRatio="none">
          <g class="cg-grid" stroke="rgba(255,255,255,0.06)">
            <line x1="0" x2="320" y1="40" y2="40"/>
            <line x1="0" x2="320" y1="80" y2="80"/>
            <line x1="0" x2="320" y1="120" y2="120"/>
          </g>
          <g class="bars">
            <rect x="20" y="120" width="22" height="0" fill="#c97b3a" data-h="20"/>
            <rect x="60" y="120" width="22" height="0" fill="#c97b3a" data-h="34"/>
            <rect x="100" y="120" width="22" height="0" fill="#c97b3a" data-h="48"/>
            <rect x="140" y="120" width="22" height="0" fill="#f5c518" data-h="64"/>
            <rect x="180" y="120" width="22" height="0" fill="#f5c518" data-h="78"/>
            <rect x="220" y="120" width="22" height="0" fill="#f5c518" data-h="92"/>
            <rect x="260" y="120" width="22" height="0" fill="#f5c518" data-h="108"/>
          </g>
          <g class="lbls" font-family="JetBrains Mono" font-size="9" fill="rgba(246,243,236,0.5)">
            <text x="31" y="140" text-anchor="middle">'25</text>
            <text x="71" y="140" text-anchor="middle">'27</text>
            <text x="111" y="140" text-anchor="middle">'29</text>
            <text x="151" y="140" text-anchor="middle">'31</text>
            <text x="191" y="140" text-anchor="middle">'33</text>
            <text x="231" y="140" text-anchor="middle">'35</text>
            <text x="271" y="140" text-anchor="middle">'40</text>
          </g>
        </svg>
        <div class="chart-foot">3.6× growth in lithium, copper, REE demand by 2040</div>
      </div>`;
    // animate bar heights
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(!e.isIntersecting) return;
        io.unobserve(e.target);
        host.querySelectorAll('.bars rect').forEach((r,i)=>{
          const h = parseFloat(r.dataset.h);
          setTimeout(()=>{
            r.style.transition='all .8s cubic-bezier(.2,.7,.2,1)';
            r.setAttribute('height', h);
            r.setAttribute('y', 120 - h);
          }, i*90);
        });
      });
    },{threshold:0.4});
    io.observe(host);
  }
  function mount(){
    document.querySelectorAll('[data-chart="discovery"]').forEach(buildDiscoveryChart);
    document.querySelectorAll('[data-chart="cost"]').forEach(buildCostChart);
    document.querySelectorAll('[data-chart="footprint"]').forEach(buildFootprintChart);
    document.querySelectorAll('[data-chart="market"]').forEach(buildMarketChart);
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
