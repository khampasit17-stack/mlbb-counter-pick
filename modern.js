// ============================================================
// MLBB DRAFT LAB — MODERN PRO EDITION (2026)
// Reactive Esports Draft & Counter Recommendation Engine
// ============================================================

(function() {
  'use strict';

  const DATA = window.MLBB_DATA || { heroes: [] };
  const HEROES = DATA.heroes || [];
  const HERO_BY_ID = new Map(HEROES.map(h => [h.id, h]));
  const HERO_BY_NAME = new Map(HEROES.map(h => [h.name.toLowerCase(), h]));

  const COMBOS = (window.MLBB_COMBOS || []).map(c => ({
    ...c,
    heroObjs: c.heroes.map(name => HERO_BY_NAME.get(name.toLowerCase())).filter(Boolean),
    mustBanObjs: (c.mustBan || []).map(name => HERO_BY_NAME.get(name.toLowerCase())).filter(Boolean)
  }));

  // Verified Pro Competitive Tournament Meta Heroes (MPL / M-Series / MSC)
  const PRO_COMPETITIVE_HEROES = new Set([
    'lukas', 'masha', 'paquito', 'yu zhong', 'terizla', 'ruby', 'cici', 'arlott', 
    'benedetta', 'edith', 'lapu-lapu', 'chou', 'gloo', 'uranus', 'khaleed', 'guinevere', 
    'fredrinn', 'baxia', 'esmeralda', 'dyrroth', 'phoveus', 'thamuz', 'joy', 'freya',
    'fanny', 'ling', 'hayabusa', 'suyou', 'nolan', 'julian', 'roger', 'alpha', 
    'lancelot', 'akai', 'barats', 'helcurt', 'martis', 'yi sun-shin', 'gusion', 'hirara', 'aulus',
    'zhuxin', 'harith', 'valentina', 'pharsa', 'xavier', 'vexana', 'cecilion', 
    'lylia', 'novaria', 'faramis', 'kadita', 'luo yi', 'yve', 'nana', 'lunox', 'zetian', 'eudora',
    'claude', 'moskov', 'karrie', 'brody', 'bruno', 'beatrix', 'natan', 'wanwan', 
    'granger', 'lesley', 'irithel', 'clint', 'popol and kupa', 'obsidia',
    'mathilda', 'tigreal', 'minotaur', 'chip', 'hylos', 'belerick', 'khufra', 
    'kaja', 'grock', 'franco', 'angela', 'estes', 'lolita', 'carmilla', 'diggie', 
    'rafaela', 'jawhead', 'atlas', 'gatotkaca', 'kalea', 'marcel', 'floryn'
  ]);

  // MPL Philippines 2026 Signature Meta
  const MPL_PH_SIGNATURE_HEROES = new Map([
    ['freya', { role: '👑 Tier-0 Priority (140+ Bans)', note: 'แบนอันดับ 1 ใน MPL-PH เลทเกม 1v1 ดันป้อมสุดเถื่อน ยืนได้ทั้ง EXP / Jungle / Gold' }],
    ['atlas', { role: '👑 Top Set-Up Roamer', note: 'ตัวเปิดไฟต์อันดับ 1 ในโซนหลุม Lord สกิล Fatal Links พลิกไฟต์ได้ในเสี้ยววินาที' }],
    ['paquito', { role: '⭐ Core Flex Priority', note: 'ตัว Flex อันดับ 1 ของโปรฟิลิปปินส์ สลับ EXP / Jungle ชนะเลนและเชื่อมไฟต์กลางเกมเฉียบคม' }],
    ['zhuxin', { role: '👑 Lord Zone Control', note: 'เมจคุมโซนและบีบ Chokepoint อันดับ 1 สกิลลากศัตรูไม่ให้เข้าใกล้ Objective' }],
    ['belerick', { role: '🛡️ Anti-Marksman Roamer', note: 'ตัวชนเคาน์เตอร์แครี่ตีเร็ว ยืนรับดาเมจและสะท้อนหนามใส่ศัตรูได้อย่างชะงัก' }],
    ['julian', { role: '⚔️ Fast-Tempo Hybrid Jungle', note: 'เคลียร์ไว ชิง Turtle/Lord ได้เปรียบ ปรับบิลด์ได้ทั้งเวทและกึ่งแทงค์' }],
    ['karrie', { role: '🪙 Tank Shredder Marksman', note: 'แครี่ดวลแทงค์อันดับ 1 ดาเมจจริง True Damage ละลายแนวหน้าหนาๆ ได้เร็วที่สุด' }],
    ['pharsa', { role: '🔮 Global High-Ground Burst', note: 'เมจคุมระยะไกลและป้องกันป้อมสูง ให้วิชั่นแมพและยิงทิ้งระเบิดขู่ศัตรู' }],
    ['eudora', { role: '⚡ Target Eliminator (Revamped)', note: 'เมจล็อกเป้าเด็ดหัวตัวล้วงแบบ One-shot สร้างความได้เปรียบจำนวนคนก่อนเริ่มไฟต์' }],
    ['fanny', { role: '🦅 Elite Mechanical Assassin', note: 'ตัวสร้าง Map Pressure สูงสุดของโปรฟิลิปปินส์ บีบให้เลนหลังศัตรูต้องเล่นติดป้อม' }],
    ['fredrinn', { role: '🛡️ UBE Anchor Frontliner', note: 'หัวใจของแผนเดิน 5 คนสไตล์ฟิลิปปินส์ ดูดซับดาเมจแล้วสวนด้วย Crystal Slash' }],
    ['mathilda', { role: '💨 UBE Tactical Initiator', note: 'ซัพพอร์ตแท็กติกพาทีมบินเข้า-ออกไฟต์ตามจังหวะ UBE Strategy' }],
    ['masha', { role: '👑 Split-Push & Objective Breaker', note: 'ตัวดันป้อมและละลายบอส สถิติ Ban/Win Rate ทะลุเกณฑ์มาตรฐานในสายแข่ง' }],
    ['marcel', { role: '👑 Crowd Control Lockdown', note: 'ตัว CC คุมเชิงและเซฟเพื่อน ยืนโซนหน้าแน่นหนา' }],
    ['hirara', { role: '👑 High-Mobility Executioner', note: 'แอสซาซินความเร็วสูง ดำดิ่งล้วงแนวหลังและเอาตัวรอดไร้เป้าหมาย' }]
  ]);

  const LANE_ORDER = ['EXP Lane', 'Jungle', 'Mid Lane', 'Gold Lane', 'Roam'];
  const LANE_IMAGE = {
    'EXP Lane': 'assets/lanes/exp.png',
    'Jungle': 'assets/lanes/jungle.png',
    'Mid Lane': 'assets/lanes/mid.png',
    'Gold Lane': 'assets/lanes/gold.png',
    'Roam': 'assets/lanes/roam.png'
  };
  const LANE_SHORT = {
    'EXP Lane': 'EXP',
    'Jungle': 'Jungle',
    'Mid Lane': 'Mid',
    'Gold Lane': 'Gold',
    'Roam': 'Roam'
  };

  // State
  const state = {
    bans: Array(10).fill(null), // 0-4 Ally, 5-9 Enemy
    allyPicks: Array(5).fill(null),
    enemyPicks: Array(5).fill(null),
    activeSlot: { side: 'ally', index: 0 }, // where the next pick goes
    strategyMode: 'counter', // 'counter' | 'combo' | 'all'
    recLaneFilter: 'ALL',
    searchQuery: ''
  };

  // Default Builds / Items / Emblems Generator
  function getHeroMetaKit(hero) {
    const isMage = hero.roles.includes('Mage');
    const isTank = hero.roles.includes('Tank') || hero.roles.includes('Support');
    const isMarksman = hero.roles.includes('Marksman');
    const isJungle = hero.lanes.includes('Jungle');

    let bootName = 'Tough Boots';
    let emblemName = 'custom_fighter';
    let coreItems = ['Blade of Despair', 'Hunter Strike', 'Malefic Roar', 'Queen\'s Wings', 'Immortality'];

    if (isJungle) {
      bootName = 'Swift Boots';
      emblemName = 'custom_assassin';
      coreItems = ['Hunter Strike', 'Sky Piercer', 'Malefic Roar', 'Blade of Despair', 'Immortality'];
    } else if (isMarksman) {
      bootName = 'Swift Boots';
      emblemName = 'custom_marksman';
      coreItems = ['Corrosion Scythe', 'Demon Hunter Sword', 'Golden Staff', 'Wind of Nature', 'Malefic Gun'];
    } else if (isMage) {
      bootName = 'Arcane Boots';
      emblemName = 'custom_mage';
      coreItems = ['Lightning Truncheon', 'Genius Wand', 'Wishing Lantern', 'Holy Crystal', 'Divine Glaive'];
    } else if (isTank) {
      bootName = 'Tough Boots';
      emblemName = 'custom_tank';
      coreItems = ['Dominance Ice', 'Athena\'s Shield', 'Antique Cuirass', 'Blade Armor', 'Immortality'];
    }

    return {
      emblemImg: `assets/emblems/${emblemName}.png`,
      talent1: 'assets/emblems/talent_swift.png',
      talent2: 'assets/emblems/talent_bargain_hunter.png',
      talentCore: 'assets/emblems/talent_bravery_smite.png',
      bootsImg: `assets/items/Tough_Boots.png`,
      items: [
        'assets/items/Tough_Boots.png',
        'assets/items/Dominance_Ice.png',
        'assets/items/Athena_s_Shield.png',
        'assets/items/Antique_Cuirass.png',
        'assets/items/Blade_Armor.png',
        'assets/items/Immortality.png'
      ]
    };
  }

  // Calculate Recommendations
  function calculateRecommendations() {
    const pickedEnemies = state.enemyPicks.map(id => HERO_BY_ID.get(id)).filter(Boolean);
    const pickedAllies = state.allyPicks.map(id => HERO_BY_ID.get(id)).filter(Boolean);
    const bannedSet = new Set(state.bans.filter(Boolean));
    const pickedSet = new Set([...state.allyPicks, ...state.enemyPicks].filter(Boolean));

    const isComboMode = state.strategyMode === 'combo';

    const results = [];

    for (const candidate of HEROES) {
      if (bannedSet.has(candidate.id) || pickedSet.has(candidate.id)) continue;

      if (state.recLaneFilter !== 'ALL' && !candidate.lanes.includes(state.recLaneFilter)) {
        continue;
      }

      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        const matchName = candidate.name.toLowerCase().includes(q);
        const matchRole = candidate.roles.some(r => r.toLowerCase().includes(q));
        if (!matchName && !matchRole) continue;
      }

      let counterScore = 0;
      const counteredTargets = [];
      const riskThreats = [];

      for (const enemy of pickedEnemies) {
        const strongItem = candidate.strongAgainst?.find(s => s.id === enemy.id);
        if (strongItem) {
          const deltaBonus = strongItem.deltaWr ? strongItem.deltaWr * 8 : 14;
          counterScore += (strongItem.score || 25) + deltaBonus;
          counteredTargets.push({
            enemyName: enemy.name,
            enemyHead: enemy.head,
            reason: strongItem.reason || `ได้เปรียบอัตราชนะ ${strongItem.deltaWr || ''}%`,
            badge: strongItem.badge || 'Counter'
          });
        }
        const counteredByItem = candidate.counteredBy?.find(c => c.id === enemy.id);
        if (counteredByItem) {
          riskThreats.push({
            enemyName: enemy.name,
            reason: counteredByItem.reason || 'ระวังแพ้ทาง'
          });
        }
      }

      let synergyScore = 0;
      const synergyAllies = [];
      const matchingCombos = [];

      for (const ally of pickedAllies) {
        const synItem = candidate.synergies?.find(s => s.id === ally.id);
        if (synItem) {
          synergyScore += (synItem.score || 18);
          synergyAllies.push({ allyName: ally.name, allyHead: ally.head });
        }
      }

      for (const c of COMBOS) {
        const hasCandidate = c.heroObjs.some(h => h.id === candidate.id);
        if (!hasCandidate) continue;
        const alliesInCombo = c.heroObjs.filter(h => pickedAllies.some(a => a.id === h.id));
        if (alliesInCombo.length > 0) {
          synergyScore += (c.tier === 'SS' ? 32 : 22);
          matchingCombos.push({ combo: c, alliesInCombo });
        }
      }

      const metaWeight = pickedEnemies.length > 0
        ? candidate.stats.metaScore * 0.28
        : candidate.stats.metaScore * 0.85;

      const tierBonus = candidate.tier === 'SS' ? 26 : (candidate.tier === 'S' ? 14 : (candidate.tier === 'A' ? 5 : 0));
      let ssExtraBonus = 0;
      if (candidate.tier === 'SS' && counteredTargets.length > 0) {
        ssExtraBonus = 8;
      }

      const isPro = PRO_COMPETITIVE_HEROES.has(candidate.name.toLowerCase());
      const proBonus = isPro ? 28 : (state.strategyMode === 'all' ? 0 : -65);

      const effectiveCounterScore = counterScore * (isComboMode ? 0.75 : 1.0);
      const totalScore = Number((effectiveCounterScore + synergyScore + metaWeight + tierBonus + ssExtraBonus + proBonus).toFixed(1));

      results.push({
        hero: candidate,
        totalScore,
        counterScore,
        synergyScore,
        counteredTargets,
        riskThreats,
        synergyAllies,
        matchingCombos,
        isProMeta: isPro
      });
    }

    results.sort((a, b) => b.totalScore - a.totalScore);
    return results;
  }

  // Calculate Win Probability Advantage
  function calculateAdvantage() {
    const allyCount = state.allyPicks.filter(Boolean).length;
    const enemyCount = state.enemyPicks.filter(Boolean).length;
    if (allyCount === 0 && enemyCount === 0) return { ally: 50, enemy: 50, text: 'ยังไม่มีการเลือกตัวละคร' };

    let allyPower = 50;
    const pickedAllies = state.allyPicks.map(id => HERO_BY_ID.get(id)).filter(Boolean);
    const pickedEnemies = state.enemyPicks.map(id => HERO_BY_ID.get(id)).filter(Boolean);

    let allyCounters = 0;
    let enemyCounters = 0;

    for (const a of pickedAllies) {
      for (const e of pickedEnemies) {
        if (a.strongAgainst?.some(s => s.id === e.id)) allyCounters++;
        if (e.strongAgainst?.some(s => s.id === a.id)) enemyCounters++;
      }
    }

    allyPower += (allyCounters * 6) - (enemyCounters * 6);
    allyPower = Math.max(25, Math.min(75, allyPower));
    const enemyPower = 100 - allyPower;

    let text = 'กำลังดราฟต์อย่างสูสี';
    if (allyPower >= 60) text = `🔥 ฝั่งเราได้เปรียบแก้ทาง +${allyPower - 50}% (ดราฟต์กดดันศัตรูดีมาก)`;
    else if (allyPower <= 40) text = `⚠️ ศัตรูได้เปรียบแก้ทาง +${enemyPower - 50}% (แนะนำหยิบตัวแก้ทางด่วน)`;

    return { ally: allyPower, enemy: enemyPower, text };
  }

  // Auto Ban Top 10 MPL-PH
  function autoBanMplPh() {
    const mplTopBans = ['freya', 'hirara', 'masha', 'atlas', 'marcel', 'fanny', 'paquito', 'zhuxin', 'lukas', 'suyou'];
    const bannedIds = mplTopBans.map(name => HERO_BY_NAME.get(name)?.id).filter(Boolean);
    state.bans = Array(10).fill(null).map((_, i) => bannedIds[i] || null);
    renderAll();
  }

  // Load MPL-PH 2026 Authentic Match
  function loadMplPhDemoDraft() {
    const getId = (name) => HERO_BY_NAME.get(name.toLowerCase())?.id || null;
    state.bans = [
      getId('Freya'), getId('Atlas'), getId('Fanny'), getId('Paquito'), getId('Hirara'),
      getId('Marcel'), getId('Ling'), getId('Zhuxin'), getId('Masha'), getId('Lukas')
    ];
    state.enemyPicks = [
      getId('Julian'),
      getId('Terizla'),
      getId('Pharsa'),
      null,
      null
    ];
    state.allyPicks = [
      getId('Fredrinn'),
      null,
      null,
      null,
      null
    ];
    state.activeSlot = { side: 'ally', index: 1 };
    renderAll();
  }

  // Reset
  function resetDraft() {
    state.bans = Array(10).fill(null);
    state.allyPicks = Array(5).fill(null);
    state.enemyPicks = Array(5).fill(null);
    state.activeSlot = { side: 'ally', index: 0 };
    renderAll();
  }

  // Select a slot
  function setActiveSlot(side, index) {
    state.activeSlot = { side, index };
    renderAll();
  }

  // Assign hero to active slot
  function pickHeroForActiveSlot(heroId) {
    const { side, index } = state.activeSlot;
    if (side === 'ally') {
      state.allyPicks[index] = heroId;
      // Auto advance to next empty ally slot
      const nextEmpty = state.allyPicks.findIndex(p => p === null);
      if (nextEmpty !== -1) state.activeSlot = { side: 'ally', index: nextEmpty };
      else {
        const nextEnemyEmpty = state.enemyPicks.findIndex(p => p === null);
        if (nextEnemyEmpty !== -1) state.activeSlot = { side: 'enemy', index: nextEnemyEmpty };
      }
    } else {
      state.enemyPicks[index] = heroId;
      const nextEmpty = state.enemyPicks.findIndex(p => p === null);
      if (nextEmpty !== -1) state.activeSlot = { side: 'enemy', index: nextEmpty };
      else {
        const nextAllyEmpty = state.allyPicks.findIndex(p => p === null);
        if (nextAllyEmpty !== -1) state.activeSlot = { side: 'ally', index: nextAllyEmpty };
      }
    }
    closeHeroPickerModal();
    renderAll();
  }

  function removeHero(side, index) {
    if (side === 'ally') state.allyPicks[index] = null;
    else state.enemyPicks[index] = null;
    state.activeSlot = { side, index };
    renderAll();
  }

  function removeBan(index) {
    state.bans[index] = null;
    renderAll();
  }

  function quickBanHero(heroId) {
    const emptyIdx = state.bans.findIndex(b => b === null);
    if (emptyIdx !== -1) {
      state.bans[emptyIdx] = heroId;
      renderAll();
    }
  }

  // Modal Picker
  function openHeroPickerModal(side, index) {
    state.activeSlot = { side, index };
    renderModalHeroes();
    const modal = document.getElementById('heroPickerModal');
    if (modal) modal.classList.add('open');
  }

  function closeHeroPickerModal() {
    const modal = document.getElementById('heroPickerModal');
    if (modal) modal.classList.remove('open');
  }

  function renderModalHeroes(filterText = '') {
    const container = document.getElementById('modalHeroesGrid');
    if (!container) return;

    const bannedSet = new Set(state.bans.filter(Boolean));
    const pickedSet = new Set([...state.allyPicks, ...state.enemyPicks].filter(Boolean));

    const q = filterText.toLowerCase();
    const available = HEROES.filter(h => {
      if (bannedSet.has(h.id) || pickedSet.has(h.id)) return false;
      if (q && !h.name.toLowerCase().includes(q) && !h.roles.some(r => r.toLowerCase().includes(q))) return false;
      return true;
    });

    container.innerHTML = available.map(h => `
      <div class="modal-hero-item" onclick="ModernDraft.pickHeroForActiveSlot(${h.id})">
        <img src="${h.head}" alt="${h.name}" loading="lazy" />
        <span>${h.name}</span>
      </div>
    `).join('');
  }

  // ============================================================
  // RENDER PIPELINE
  // ============================================================
  function renderAll() {
    renderBans();
    renderTeams();
    renderAdvantage();
    renderRecommendations();
    renderCombos();
  }

  function renderBans() {
    // Ban Suggestions
    const banSuggestContainer = document.getElementById('banSuggestionsScroll');
    if (banSuggestContainer) {
      const mplTopBans = ['freya', 'hirara', 'masha', 'atlas', 'marcel', 'fanny', 'paquito', 'zhuxin', 'lukas', 'suyou'];
      const candidates = HEROES
        .filter(h => !state.allyPicks.includes(h.id) && !state.enemyPicks.includes(h.id) && !state.bans.includes(h.id))
        .sort((a, b) => {
          const aMpl = mplTopBans.includes(a.name.toLowerCase()) ? 1 : 0;
          const bMpl = mplTopBans.includes(b.name.toLowerCase()) ? 1 : 0;
          if (bMpl !== aMpl) return bMpl - aMpl;
          return b.stats.banRate - a.stats.banRate;
        })
        .slice(0, 8);

      banSuggestContainer.innerHTML = candidates.map(h => `
        <span class="ban-pill-chip" onclick="ModernDraft.quickBanHero(${h.id})" title="คลิกเพื่อแบน ${h.name} (Ban Rate ${h.stats.banRate}%)">
          <img src="${h.head}" alt="${h.name}" />
          <span>${h.name}</span>
          <span style="color:#7dd3fc; font-size:0.65rem;">[${LANE_SHORT[h.lanes[0]] || h.lanes[0]}]</span>
          <span style="color:#fda4af; font-size:0.68rem;">${h.stats.banRate}%</span>
        </span>
      `).join('');
    }

    // Slots
    const allySlotsEl = document.getElementById('allyBanSlots');
    const enemySlotsEl = document.getElementById('enemyBanSlots');

    const renderSlot = (idx) => {
      const id = state.bans[idx];
      const h = id ? HERO_BY_ID.get(id) : null;
      if (!h) {
        return `
          <div class="ban-slot-box" onclick="ModernDraft.openHeroPickerModal('ban', ${idx})" title="คลิกเพื่อเลือกตัวแบนช่องที่ ${idx + 1}">
            <span style="color:#475569; font-size:0.8rem;">🚫</span>
          </div>
        `;
      }
      return `
        <div class="ban-slot-box filled" title="แบน: ${h.name}">
          <img src="${h.head}" alt="${h.name}" />
          <div class="ban-slash-overlay"></div>
          <button class="ban-clear-btn" onclick="ModernDraft.removeBan(${idx})">✕</button>
        </div>
      `;
    };

    if (allySlotsEl) allySlotsEl.innerHTML = [0, 1, 2, 3, 4].map(renderSlot).join('');
    if (enemySlotsEl) enemySlotsEl.innerHTML = [5, 6, 7, 8, 9].map(renderSlot).join('');
  }

  function renderTeams() {
    const allyContainer = document.getElementById('allyPickSlots');
    const enemyContainer = document.getElementById('enemyPickSlots');

    const renderPickSlot = (side, idx) => {
      const picks = side === 'ally' ? state.allyPicks : state.enemyPicks;
      const id = picks[idx];
      const h = id ? HERO_BY_ID.get(id) : null;
      const isActive = state.activeSlot.side === side && state.activeSlot.index === idx;

      const laneDefault = LANE_ORDER[idx] || 'Lane';
      const laneIcon = LANE_IMAGE[laneDefault] || 'assets/lanes/mid.png';

      if (!h) {
        return `
          <div class="modern-pick-slot ${isActive ? 'active-pick-slot' : ''}" onclick="ModernDraft.setActiveSlot('${side}', ${idx})">
            <div class="slot-empty-view">
              <div class="slot-empty-circle">S${idx + 1}</div>
              <div class="slot-empty-text-wrap">
                <span class="slot-empty-tag">${side === 'ally' ? 'เลือกฮีโร่ทีมเรา' : 'เลือกฮีโร่ฝ่ายตรงข้าม'}</span>
                <span class="slot-empty-hint">${laneDefault} • คลิกเพื่อเลือกตัว</span>
              </div>
            </div>
          </div>
        `;
      }

      const metaKit = getHeroMetaKit(h);

      return `
        <div class="modern-pick-slot ${isActive ? 'active-pick-slot' : ''}" onclick="ModernDraft.setActiveSlot('${side}', ${idx})">
          <div class="slot-filled-view">
            <div class="slot-main-row">
              <img src="${h.head}" class="slot-avatar-img" alt="${h.name}" />
              <div class="slot-info-col">
                <div class="slot-hero-title-row">
                  <span class="slot-hero-name">${h.name}</span>
                  <span class="tier-badge tier-${h.tier}">${h.tier}</span>
                </div>
                <div class="slot-lane-badge">
                  <img src="${LANE_IMAGE[h.lanes[0]] || laneIcon}" alt="${h.lanes[0]}" />
                  <span>${LANE_SHORT[h.lanes[0]] || h.lanes[0]}</span>
                  <span style="color:#94a3b8; font-size:0.68rem; margin-left:4px;">WR ${h.stats.winRate}%</span>
                </div>
              </div>
              <button class="slot-remove-mini" onclick="event.stopPropagation(); ModernDraft.removeHero('${side}', ${idx})" title="ยกเลิกตัวนี้">✕</button>
            </div>
            
            <div class="slot-build-micro-row">
              <div class="slot-emblem-mini-group" title="Emblem & Talents">
                <img src="${metaKit.emblemImg}" class="slot-emblem-icon" alt="Emblem" />
                <img src="${metaKit.talent1}" class="slot-talent-mini" alt="T1" />
                <img src="${metaKit.talentCore}" class="slot-talent-mini slot-talent-core" alt="Core" />
                <img src="${metaKit.talent2}" class="slot-talent-mini" alt="T2" />
              </div>
              <div class="slot-items-mini-group" title="6-Item Meta Build (Starts with Boots)">
                ${metaKit.items.map(it => `<img src="${it}" class="slot-item-img" alt="item" />`).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    };

    if (allyContainer) allyContainer.innerHTML = [0, 1, 2, 3, 4].map(i => renderPickSlot('ally', i)).join('');
    if (enemyContainer) enemyContainer.innerHTML = [0, 1, 2, 3, 4].map(i => renderPickSlot('enemy', i)).join('');

    // Update active turn title
    const turnEl = document.getElementById('activeTurnBanner');
    if (turnEl) {
      const { side, index } = state.activeSlot;
      const sideText = side === 'ally' ? 'ทีมเรา (Blue Side)' : 'ฝ่ายตรงข้าม (Red Side)';
      const sideColor = side === 'ally' ? '#38bdf8' : '#fb7185';
      turnEl.innerHTML = `
        <span class="active-turn-title">
          <span>🎯 กำลังเลือก:</span>
          <span style="color:${sideColor}; font-weight:800;">${sideText} ช่อง S${index + 1} (${LANE_ORDER[index] || ''})</span>
        </span>
        <span class="active-turn-hint">คลิกการ์ดแนะนำด้านล่าง หรือกดเลือกในตารางเพื่อใส่ฮีโร่ทันที</span>
      `;
    }
  }

  function renderAdvantage() {
    const adv = calculateAdvantage();
    const fillEl = document.getElementById('advProgressFill');
    const allyEl = document.getElementById('advAllyScore');
    const enemyEl = document.getElementById('advEnemyScore');
    const textEl = document.getElementById('advStatusText');

    if (fillEl) fillEl.style.width = `${adv.ally}%`;
    if (allyEl) allyEl.textContent = `ฝั่งเรา ${adv.ally}%`;
    if (enemyEl) enemyEl.textContent = `ศัตรู ${adv.enemy}%`;
    if (textEl) textEl.textContent = adv.text;
  }

  function renderRecommendations() {
    const container = document.getElementById('modernRecGrid');
    if (!container) return;

    const recs = calculateRecommendations().slice(0, 9);
    if (recs.length === 0) {
      container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:2rem; color:#64748b;">ไม่พบฮีโร่ที่ตรงกับเงื่อนไข</div>`;
      return;
    }

    container.innerHTML = recs.map((r, i) => {
      const h = r.hero;
      const isSS = h.tier === 'SS';
      const sigInfo = MPL_PH_SIGNATURE_HEROES.get(h.name.toLowerCase());

      const targetsHtml = r.counteredTargets.slice(0, 2).map(t => `
        <span class="target-vs-pill" title="${t.reason}">
          <img src="${t.enemyHead}" alt="${t.enemyName}" />
          <span>ชนะ ${t.enemyName}</span>
        </span>
      `).join('');

      return `
        <div class="modern-rec-card ${isSS ? 'ss-tier-card' : ''}">
          <div class="rec-card-header">
            <div class="rec-avatar-frame">
              <img src="${h.head}" alt="${h.name}" loading="lazy" />
              <span class="rec-rank-bubble">#${i + 1}</span>
            </div>
            <div class="rec-info-col">
              <div class="rec-title-line">
                <span class="rec-hero-name">${h.name}</span>
                <span class="rec-score-pill">${r.totalScore}</span>
              </div>
              <div class="rec-badges-line">
                <span class="tier-badge tier-${h.tier}">${h.tier}</span>
                ${r.isProMeta ? `<span class="pro-badge">${sigInfo ? '🇵🇭 MPL-PH' : '🏆 PRO'}</span>` : ''}
              </div>
              <div class="rec-lane-meta">
                <img src="${LANE_IMAGE[h.lanes[0]] || 'assets/lanes/mid.png'}" alt="lane" />
                <span>${h.lanes.join(' / ')}</span>
              </div>
            </div>
          </div>

          <div class="rec-impact-box">
            ${sigInfo ? `<div class="rec-reason-item" style="color:#7dd3fc;"><strong>🇵🇭 MPL Meta:</strong> ${sigInfo.note}</div>` : ''}
            ${r.matchingCombos.length > 0 ? `<div class="rec-reason-item" style="color:#c084fc;"><strong>⚡ คอมโบ:</strong> ${r.matchingCombos[0].combo.title}</div>` : ''}
            ${targetsHtml ? `<div class="rec-target-chip-row">${targetsHtml}</div>` : ''}
            <div style="font-size:0.68rem; color:#64748b;">WR ${h.stats.winRate}% • Ban ${h.stats.banRate}%</div>
          </div>

          <button class="rec-pick-cta-btn" onclick="ModernDraft.pickHeroForActiveSlot(${h.id})">
            <span>⚡ เลือก ${h.name} ลงช่อง ${state.activeSlot.side === 'ally' ? 'ทีมเรา' : 'ศัตรู'} S${state.activeSlot.index + 1}</span>
          </button>
        </div>
      `;
    }).join('');
  }

  function renderCombos() {
    const container = document.getElementById('modernComboCards');
    if (!container) return;

    const pickedAllies = state.allyPicks.map(id => HERO_BY_ID.get(id)).filter(Boolean);
    const bannedSet = new Set(state.bans.filter(Boolean));

    // Show available combos
    const viable = COMBOS.filter(c => !c.heroObjs.some(h => bannedSet.has(h.id))).slice(0, 3);

    container.innerHTML = viable.map(c => {
      const heroesHtml = c.heroObjs.map(h => {
        const inTeam = pickedAllies.some(a => a.id === h.id);
        return `
          <span class="combo-hero-pill ${inTeam ? 'in-team' : ''}" title="${h.name}">
            <img src="${h.head}" alt="${h.name}" />
            <span>${h.name}${inTeam ? ' ✓' : ''}</span>
          </span>
        `;
      }).join('<span style="color:#38bdf8;font-size:0.75rem;">+</span>');

      return `
        <div class="modern-combo-card">
          <div class="combo-card-top-row">
            <span class="combo-card-title">${c.title}</span>
            <span class="combo-win-badge">${c.winRateBonus || '+6.5% WR'}</span>
          </div>
          <div class="combo-heroes-avatars">
            ${heroesHtml}
          </div>
          <div style="font-size:0.7rem; color:#94a3b8; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">
            ${c.summary}
          </div>
        </div>
      `;
    }).join('');
  }

  // Set rec lane filter
  function setRecLaneFilter(lane) {
    state.recLaneFilter = lane;
    document.querySelectorAll('.modern-lane-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lane === lane);
    });
    renderRecommendations();
  }

  // Set strategy mode
  function setStrategyMode(mode) {
    state.strategyMode = mode;
    document.querySelectorAll('.strat-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    renderAll();
  }

  // Initialize
  window.addEventListener('DOMContentLoaded', () => {
    loadMplPhDemoDraft();

    const searchInput = document.getElementById('heroSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim();
        renderRecommendations();
      });
    }

    const modalSearch = document.getElementById('modalSearchInput');
    if (modalSearch) {
      modalSearch.addEventListener('input', (e) => {
        renderModalHeroes(e.target.value.trim());
      });
    }
  });

  // Export to global scope
  window.ModernDraft = {
    state,
    setActiveSlot,
    pickHeroForActiveSlot,
    removeHero,
    removeBan,
    quickBanHero,
    autoBanMplPh,
    loadMplPhDemoDraft,
    resetDraft,
    openHeroPickerModal,
    closeHeroPickerModal,
    setRecLaneFilter,
    setStrategyMode
  };

})();
