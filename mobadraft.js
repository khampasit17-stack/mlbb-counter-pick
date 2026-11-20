// ============================================================================
// MOBADRAFT SIMULATOR ENGINE (V4 EDITION)
// Replicates https://mobadraft.com/draft UI & 20-Turn Tournament Draft Flow
// while preserving full AI Counter Pick, Meta Combo, Spell & Gear features
// ============================================================================

const MOBADRAFT_TOURNAMENT_SEQUENCE = [
  // Phase 1: 6 Bans (Alternating Blue / Red)
  { step: 1,  type: 'ban',   index: 0, side: 'left',  phase: 'Ban',  label: 'ฝั่งฟ้า แบนตัวที่ 1 (Blue Ban 1)' },
  { step: 2,  type: 'ban',   index: 5, side: 'right', phase: 'Ban',  label: 'ฝั่งแดง แบนตัวที่ 1 (Red Ban 1)' },
  { step: 3,  type: 'ban',   index: 1, side: 'left',  phase: 'Ban',  label: 'ฝั่งฟ้า แบนตัวที่ 2 (Blue Ban 2)' },
  { step: 4,  type: 'ban',   index: 6, side: 'right', phase: 'Ban',  label: 'ฝั่งแดง แบนตัวที่ 2 (Red Ban 2)' },
  { step: 5,  type: 'ban',   index: 2, side: 'left',  phase: 'Ban',  label: 'ฝั่งฟ้า แบนตัวที่ 3 (Blue Ban 3)' },
  { step: 6,  type: 'ban',   index: 7, side: 'right', phase: 'Ban',  label: 'ฝั่งแดง แบนตัวที่ 3 (Red Ban 3)' },
  // Phase 1: 6 Picks (B1 -> R1, R2 -> B2, B3 -> R3)
  { step: 7,  type: 'ally',  index: 0, side: 'left',  phase: 'Pick', label: 'ฝั่งฟ้า เลือกตัวที่ 1 (Blue S1 First Pick)' },
  { step: 8,  type: 'enemy', index: 0, side: 'right', phase: 'Pick', label: 'ฝั่งแดง เลือกตัวที่ 1 (Red S1)' },
  { step: 9,  type: 'enemy', index: 1, side: 'right', phase: 'Pick', label: 'ฝั่งแดง เลือกตัวที่ 2 (Red S2)' },
  { step: 10, type: 'ally',  index: 1, side: 'left',  phase: 'Pick', label: 'ฝั่งฟ้า เลือกตัวที่ 2 (Blue S2)' },
  { step: 11, type: 'ally',  index: 2, side: 'left',  phase: 'Pick', label: 'ฝั่งฟ้า เลือกตัวที่ 3 (Blue S3)' },
  { step: 12, type: 'enemy', index: 2, side: 'right', phase: 'Pick', label: 'ฝั่งแดง เลือกตัวที่ 3 (Red S3)' },
  // Phase 2: 4 Bans (Red -> Blue -> Red -> Blue)
  { step: 13, type: 'ban',   index: 8, side: 'right', phase: 'Ban',  label: 'ฝั่งแดง แบนตัวที่ 4 (Red Ban 4)' },
  { step: 14, type: 'ban',   index: 3, side: 'left',  phase: 'Ban',  label: 'ฝั่งฟ้า แบนตัวที่ 4 (Blue Ban 4)' },
  { step: 15, type: 'ban',   index: 9, side: 'right', phase: 'Ban',  label: 'ฝั่งแดง แบนตัวที่ 5 (Red Ban 5)' },
  { step: 16, type: 'ban',   index: 4, side: 'left',  phase: 'Ban',  label: 'ฝั่งฟ้า แบนตัวที่ 5 (Blue Ban 5)' },
  // Phase 2: 4 Picks (R4 -> B4, B5 -> R5)
  { step: 17, type: 'enemy', index: 3, side: 'right', phase: 'Pick', label: 'ฝั่งแดง เลือกตัวที่ 4 (Red S4)' },
  { step: 18, type: 'ally',  index: 3, side: 'left',  phase: 'Pick', label: 'ฝั่งฟ้า เลือกตัวที่ 4 (Blue S4)' },
  { step: 19, type: 'ally',  index: 4, side: 'left',  phase: 'Pick', label: 'ฝั่งฟ้า เลือกตัวที่ 5 (Blue S5)' },
  { step: 20, type: 'enemy', index: 4, side: 'right', phase: 'Pick', label: 'ฝั่งแดง เลือกตัวที่ 5 (Red S5 Last Pick)' }
];

const mdState = {
  tabMode: 'role',       // 'role' (All/Tank/Marksman/...) | 'lane' (ทุกเลน/EXP/JG/Mid/Gold/Roam)
  roleFilter: 'ALL',
  laneFilter: 'ALL',
  sortByAi: false,       // false = A-Z (exact MobaDraft default), true = sort by AI Counter / Ban score (#1, #2, #3...)
  turnIdx: 0,            // 0..19 in MOBADRAFT_TOURNAMENT_SEQUENCE
  timerSeconds: 42,
  timerInterval: null,
  isRunning: false,
  showAiDrawer: true
};

// Find which turn in MOBADRAFT_TOURNAMENT_SEQUENCE matches a slot, or first empty turn
function findNextEmptyMobaTurn() {
  for (let i = 0; i < MOBADRAFT_TOURNAMENT_SEQUENCE.length; i++) {
    const t = MOBADRAFT_TOURNAMENT_SEQUENCE[i];
    if (t.type === 'ban' && !state.bans[t.index]) return i;
    if (t.type === 'ally' && !state.allyPicks[t.index]) return i;
    if (t.type === 'enemy' && !state.enemyPicks[t.index]) return i;
  }
  return MOBADRAFT_TOURNAMENT_SEQUENCE.length; // All 20 slots filled
}

function syncActiveSlotWithMobaTurn() {
  const turn = MOBADRAFT_TOURNAMENT_SEQUENCE[mdState.turnIdx];
  if (turn) {
    state.pickMode = turn.type;
    state.activeSlot = { type: turn.type, index: turn.index };
  }
}

// Click on any Ban circle or Pick square to focus that exact slot immediately
function focusMobaSlot(type, index) {
  state.pickMode = type;
  state.activeSlot = { type, index };
  const seqIdx = MOBADRAFT_TOURNAMENT_SEQUENCE.findIndex(t => t.type === type && t.index === index);
  if (seqIdx !== -1) {
    mdState.turnIdx = seqIdx;
  }
  mdState.timerSeconds = 42;
  refreshAllViews();
}

// Click on a hero inside the Center Circular Pool Grid
function selectHeroFromMobaPool(heroId) {
  const status = getHeroStatus(heroId);
  if (status !== 'AVAILABLE') {
    // Clicking an already-assigned hero removes it from its slot
    const bIdx = state.bans.indexOf(heroId);
    if (bIdx !== -1) {
      state.bans[bIdx] = null;
      focusMobaSlot('ban', bIdx);
      return;
    }
    const aIdx = state.allyPicks.indexOf(heroId);
    if (aIdx !== -1) {
      removeDraftSlot('ally', aIdx);
      focusMobaSlot('ally', aIdx);
      return;
    }
    const eIdx = state.enemyPicks.indexOf(heroId);
    if (eIdx !== -1) {
      removeDraftSlot('enemy', eIdx);
      focusMobaSlot('enemy', eIdx);
      return;
    }
  }

  // Assign hero to current activeSlot
  const slotType = state.activeSlot?.type || 'ban';
  const slotIdx = state.activeSlot?.index ?? 0;

  if (slotType === 'ban') {
    state.bans[slotIdx] = heroId;
  } else if (slotType === 'ally') {
    state.allyPicks[slotIdx] = heroId;
    delete state.laneOverrides[`ally-${slotIdx}`];
  } else if (slotType === 'enemy') {
    state.enemyPicks[slotIdx] = heroId;
    delete state.laneOverrides[`enemy-${slotIdx}`];
  }

  // Advance to next empty turn in tournament draft sequence
  mdState.turnIdx = findNextEmptyMobaTurn();
  mdState.timerSeconds = 42;
  if (mdState.turnIdx < MOBADRAFT_TOURNAMENT_SEQUENCE.length) {
    syncActiveSlotWithMobaTurn();
  }
  refreshAllViews();
}

function advanceMobaDraftTurn() {
  mdState.turnIdx = (mdState.turnIdx + 1) % MOBADRAFT_TOURNAMENT_SEQUENCE.length;
  mdState.timerSeconds = 42;
  syncActiveSlotWithMobaTurn();
  refreshAllViews();
}

function toggleMobaFilterTabMode() {
  mdState.tabMode = mdState.tabMode === 'role' ? 'lane' : 'role';
  const roleTabsEl = document.getElementById('mdRoleTabs');
  const laneTabsEl = document.getElementById('mdLaneTabs');
  const iconEl = document.getElementById('mdTabModeIcon');
  const labelEl = document.getElementById('mdTabModeLabel');
  const switchBtn = document.getElementById('mdTabModeSwitchBtn');

  if (mdState.tabMode === 'lane') {
    if (roleTabsEl) roleTabsEl.style.display = 'none';
    if (laneTabsEl) laneTabsEl.style.display = 'flex';
    if (iconEl) iconEl.textContent = '🗺️';
    if (labelEl) labelEl.textContent = 'เลน';
    if (switchBtn) switchBtn.classList.add('is-lane-mode');
    // Reset role filter so lane tabs show all heroes of that lane cleanly
    mdState.roleFilter = 'ALL';
    document.querySelectorAll('#mdRoleTabs .md-role-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mdrole') === 'ALL');
    });
  } else {
    if (roleTabsEl) roleTabsEl.style.display = 'flex';
    if (laneTabsEl) laneTabsEl.style.display = 'none';
    if (iconEl) iconEl.textContent = '🎭';
    if (labelEl) labelEl.textContent = 'สาย';
    if (switchBtn) switchBtn.classList.remove('is-lane-mode');
    // Reset lane filter so role tabs show all heroes of that role cleanly
    mdState.laneFilter = 'ALL';
    document.querySelectorAll('#mdLaneTabs .md-role-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mdlane') === 'ALL');
    });
    if (typeof _origSetRecLaneFilter === 'function') {
      _origSetRecLaneFilter('ALL');
    }
  }
  renderMobaHeroPool();
}

function setMobaRoleFilter(role) {
  mdState.roleFilter = role;
  document.querySelectorAll('#mdRoleTabs .md-role-tab').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-mdrole') === role);
  });
  renderMobaHeroPool();
}

function setMobaLaneFilter(lane) {
  mdState.laneFilter = lane;
  document.querySelectorAll('#mdLaneTabs .md-role-tab').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-mdlane') === lane);
  });
  // Sync bottom recommendation lane filter AND re-render the circular MobaDraft hero pool immediately!
  if (typeof _origSetRecLaneFilter === 'function') {
    _origSetRecLaneFilter(lane);
  }
  renderMobaHeroPool();
}

// Also hook setRecLaneFilter so clicking lane pills in the bottom drawer updates the top lane buttons and circular pool
const _origSetRecLaneFilter = window.setRecLaneFilter;
window.setRecLaneFilter = function (lane) {
  if (typeof _origSetRecLaneFilter === 'function') {
    _origSetRecLaneFilter(lane);
  }
  if (['ALL', 'EXP Lane', 'Jungle', 'Mid Lane', 'Gold Lane', 'Roam'].includes(lane) && mdState.laneFilter !== lane) {
    mdState.laneFilter = lane;
    document.querySelectorAll('#mdLaneTabs .md-role-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mdlane') === lane);
    });
  }
  renderMobaHeroPool();
};

function syncMobaSortControls() {
  const btn = document.getElementById('mdSortToggleBtn');
  if (btn) {
    btn.classList.toggle('ai-sort-active', mdState.sortByAi);
    btn.title = mdState.sortByAi
      ? 'กำลังเรียงตามลำดับแนะนำ #1, #2, #3... (คลิกเพื่อกลับไปเรียง A-Z แบบ MobaDraft)'
      : 'กำลังเรียงตามตัวอักษร A-Z แบบ MobaDraft (คลิกเพื่อเรียงตามลำดับแนะนำ #1, #2, #3...)';
  }
  const chk = document.getElementById('mdRecOrderCheck');
  if (chk) {
    chk.checked = mdState.sortByAi;
  }
  const chkLabel = chk?.closest('.md-rec-check-label');
  if (chkLabel) {
    chkLabel.classList.toggle('checked', mdState.sortByAi);
  }
}

function toggleMobaRecOrder(checked) {
  mdState.sortByAi = Boolean(checked);
  syncMobaSortControls();
  renderMobaHeroPool();
}

function toggleMobaPoolSort() {
  mdState.sortByAi = !mdState.sortByAi;
  syncMobaSortControls();
  renderMobaHeroPool();
}

function startMobaDraftSequence() {
  const startBtn = document.getElementById('mdStartBtn');
  if (mdState.isRunning) {
    // Pause timer
    mdState.isRunning = false;
    if (mdState.timerInterval) clearInterval(mdState.timerInterval);
    mdState.timerInterval = null;
    if (startBtn) {
      startBtn.classList.remove('running');
      startBtn.innerHTML = '▶ Start';
    }
    return;
  }

  // If all slots are full or user clicks Start fresh, jump to first empty turn (or reset if all full)
  const nextEmpty = findNextEmptyMobaTurn();
  if (nextEmpty >= MOBADRAFT_TOURNAMENT_SEQUENCE.length) {
    resetMobaDraft(true);
  } else {
    mdState.turnIdx = nextEmpty;
    syncActiveSlotWithMobaTurn();
  }

  mdState.isRunning = true;
  mdState.timerSeconds = 42;
  if (startBtn) {
    startBtn.classList.add('running');
    startBtn.innerHTML = '⏸ Pause';
  }
  refreshAllViews();

  if (mdState.timerInterval) clearInterval(mdState.timerInterval);
  mdState.timerInterval = setInterval(() => {
    if (!mdState.isRunning) return;
    if (mdState.turnIdx >= MOBADRAFT_TOURNAMENT_SEQUENCE.length) {
      mdState.isRunning = false;
      clearInterval(mdState.timerInterval);
      if (startBtn) {
        startBtn.classList.remove('running');
        startBtn.innerHTML = '▶ Start';
      }
      return;
    }
    mdState.timerSeconds--;
    if (mdState.timerSeconds <= 0) {
      mdState.timerSeconds = 42;
      advanceMobaDraftTurn();
    } else {
      const timerEl = document.getElementById('mdTimerValue');
      if (timerEl) timerEl.textContent = String(mdState.timerSeconds);
    }
  }, 1000);
}

function resetMobaDraft(keepRunning = false) {
  state.bans = Array(10).fill(null);
  state.allyPicks = Array(5).fill(null);
  state.enemyPicks = Array(5).fill(null);
  state.spellOverrides = {};
  state.laneOverrides = {};
  state.expandedHeroCards.clear();
  mdState.turnIdx = 0;
  mdState.timerSeconds = 42;
  if (!keepRunning) {
    mdState.isRunning = false;
    if (mdState.timerInterval) clearInterval(mdState.timerInterval);
    mdState.timerInterval = null;
    const startBtn = document.getElementById('mdStartBtn');
    if (startBtn) {
      startBtn.classList.remove('running');
      startBtn.innerHTML = '▶ Start';
    }
  }
  syncActiveSlotWithMobaTurn();
  refreshAllViews();
}

function cycleMobaTournamentMode() {
  const order = ['mpl-id', 'mpl-ph', 'msl-th', 'combined', 'm8-pred', 'm8-scrim'];
  const currIdx = order.indexOf(state.activeTournament);
  const nextId = order[(currIdx + 1) % order.length];
  setTournamentMeta(nextId, true);
  refreshAllViews();
}

function toggleMobaAiPanel() {
  mdState.showAiDrawer = !mdState.showAiDrawer;
  const drawer = document.getElementById('centerRecCol');
  const btn = document.getElementById('mdAiDrawerBtn');
  if (drawer) {
    drawer.style.display = mdState.showAiDrawer ? 'block' : 'none';
  }
  if (btn) {
    btn.classList.toggle('active', mdState.showAiDrawer);
  }
}

// Render Top Ban Circles + Center <<< Ban 42 >>> Indicator
window.renderBanBoard = function renderMobaBanBoard() {
  const turn = MOBADRAFT_TOURNAMENT_SEQUENCE[mdState.turnIdx] || null;
  const phaseEl = document.getElementById('mdPhaseText');
  const arrowLeftEl = document.getElementById('mdArrowLeft');
  const arrowRightEl = document.getElementById('mdArrowRight');
  const timerEl = document.getElementById('mdTimerValue');
  const subEl = document.getElementById('mdTurnSubText');

  const activeType = state.activeSlot?.type || (turn ? turn.type : 'ban');
  const activeIdx = state.activeSlot?.index ?? (turn ? turn.index : 0);
  const isLeftSide = (activeType === 'ban' && activeIdx < 5) || activeType === 'ally';

  if (phaseEl) {
    if (mdState.turnIdx >= MOBADRAFT_TOURNAMENT_SEQUENCE.length) {
      phaseEl.textContent = 'Ready';
    } else {
      phaseEl.textContent = activeType === 'ban' ? 'Ban' : 'Pick';
    }
  }
  if (arrowLeftEl) arrowLeftEl.classList.toggle('active', isLeftSide);
  if (arrowRightEl) arrowRightEl.classList.toggle('active', !isLeftSide);
  if (timerEl) timerEl.textContent = String(mdState.timerSeconds);
  if (subEl) {
    if (turn && turn.type === activeType && turn.index === activeIdx) {
      subEl.textContent = `เทิร์นที่ ${turn.step}/20 • ${turn.label}`;
    } else {
      const slotLabel = activeType === 'ban'
        ? `ช่องแบนที่ ${activeIdx + 1}`
        : (activeType === 'ally' ? `ฝั่งฟ้า S${activeIdx + 1}` : `ฝั่งแดง S${activeIdx + 1}`);
      subEl.textContent = `กำลังเลือกใส่: ${slotLabel}`;
    }
  }

  // Render 5 Left Ban Circles (0..4) and 5 Right Ban Circles (5..9)
  const renderBanCircle = (idx) => {
    const heroId = state.bans[idx];
    const hero = heroId ? HERO_BY_ID.get(heroId) : null;
    const isTarget = state.activeSlot.type === 'ban' && state.activeSlot.index === idx;

    if (!hero) {
      return `
        <div
          class="md-ban-circle ${isTarget ? 'active-turn' : ''}"
          onclick="focusMobaSlot('ban', ${idx})"
          ondblclick="openSlotPickerModal('ban', ${idx})"
          title="ช่องแบนที่ ${idx + 1} (คลิกเพื่อเลือกช่องนี้ แล้วจิ้มฮีโร่จากตารางด้านล่าง)"
        >?</div>
      `;
    }
    return `
      <div
        class="md-ban-circle filled ${isTarget ? 'active-turn' : ''}"
        onclick="focusMobaSlot('ban', ${idx})"
        title="แบน ${hero.name} (คลิกปุ่ม ✕ เพื่อยกเลิก)"
      >
        <img src="${hero.head}" alt="${hero.name}" loading="lazy" />
        <div class="md-ban-remove" onclick="event.stopPropagation(); removeDraftSlot('ban', ${idx}); focusMobaSlot('ban', ${idx});">✕</div>
      </div>
    `;
  };

  const allyBansEl = document.getElementById('allyBanSlots');
  const enemyBansEl = document.getElementById('enemyBanSlots');
  if (allyBansEl) allyBansEl.innerHTML = [0, 1, 2, 3, 4].map(renderBanCircle).join('');
  if (enemyBansEl) enemyBansEl.innerHTML = [5, 6, 7, 8, 9].map(renderBanCircle).join('');

  // Render Smart 1-Line AI Suggestions Strip (Ban recommendations during Ban phase, Counter recommendations during Pick phase)
  const suggestBar = document.getElementById('banSuggestionsBar');
  if (!suggestBar) return;

  if (activeType === 'ban') {
    const enemyLaneAnalysis = analyzeTeamLanes(state.enemyPicks, 'enemy');
    const enemyFilledLanes = enemyLaneAnalysis.filledLanes;
    let banCandidates = [...HEROES].filter(h => getHeroStatus(h.id) === 'AVAILABLE');
    if (enemyFilledLanes.size > 0 && enemyFilledLanes.size < 5) {
      banCandidates = banCandidates.filter(h => isHeroBanEligibleAgainstEnemy(h, enemyFilledLanes));
    }
    const topBans = banCandidates
      .sort((a, b) => (b.tier === 'SS' ? 1 : 0) - (a.tier === 'SS' ? 1 : 0) || b.stats.banRate - a.stats.banRate)
      .slice(0, 6);

    suggestBar.innerHTML = [
      `<span class="ban-suggest-label">🚫 แนะนำแบน:</span>`,
      ...topBans.map(h => `
        <span class="ban-chip" onclick="selectHeroFromMobaPool(${h.id})" title="คลิกเพื่อแบน ${h.name} (BR ${h.stats.banRate}%)">
          <img src="${h.head}" alt="${h.name}" loading="lazy" />
          <span>${h.name}</span>
          <span class="br-val">${h.stats.banRate}%</span>
        </span>
      `)
    ].join('');
  } else {
    const { recommendations } = calculateRecommendations();
    const topPicks = recommendations.slice(0, 6);
    suggestBar.innerHTML = [
      `<span class="ban-suggest-label" style="color:#6ee7b7;">🎯 แนะนำหยิบแก้ทาง:</span>`,
      ...topPicks.map(r => `
        <span class="ban-chip" style="border-color:rgba(16,185,129,0.4);" onclick="selectHeroFromMobaPool(${r.hero.id})" title="คลิกเพื่อเลือก ${r.hero.name} (คะแนน ${r.totalScore})">
          <img src="${r.hero.head}" alt="${r.hero.name}" loading="lazy" />
          <span>${r.hero.name}</span>
          <span class="br-val" style="color:#6ee7b7;">${r.totalScore}</span>
        </span>
      `)
    ].join('');
  }
};

// Render Left 5 Square Pick Boxes (Blue Side) & Right 5 Square Pick Boxes (Red Side)
window.renderTeamColumns = function renderMobaSideColumns() {
  const allyPickedCount = state.allyPicks.filter(Boolean).length;
  const allyCountEl = document.getElementById('allyCountText');
  if (allyCountEl) allyCountEl.textContent = `${allyPickedCount}/5`;

  const allyLanes = analyzeTeamLanes(state.allyPicks);
  const allyLaneEl = document.getElementById('allyLaneChecklist');
  if (allyLaneEl) {
    allyLaneEl.innerHTML = ALL_LANES.map(lane => {
      const filled = allyLanes.filledLanes.has(lane);
      return `<span class="lane-status-pill ${filled ? 'filled' : 'missing'}" title="${lane}">${filled ? '✓' : '·'} ${LANE_SHORT_LABEL[lane]}</span>`;
    }).join('');
  }

  const allySlotsEl = document.getElementById('allyPickSlots');
  if (allySlotsEl) {
    allySlotsEl.innerHTML = state.allyPicks.map((heroId, idx) => {
      const hero = heroId ? HERO_BY_ID.get(heroId) : null;
      const isTarget = state.activeSlot.type === 'ally' && state.activeSlot.index === idx;

      if (!hero) {
        return `
          <div
            class="md-pick-box ${isTarget ? 'active-turn-blue' : ''}"
            onclick="focusMobaSlot('ally', ${idx})"
            ondblclick="openSlotPickerModal('ally', ${idx})"
            title="ฝั่งฟ้า S${idx + 1} (คลิกเพื่อเลือกช่องนี้ แล้วจิ้มฮีโร่จากตารางตรงกลาง)"
          >
            <span class="md-pick-box-empty-label">S${idx + 1}</span>
          </div>
        `;
      }

      const spell = getRecommendedSpell(hero, state.allyPicks, state.enemyPicks, 'ally', idx);
      const assignedLane = getSlotAssignedLane('ally', idx);
      const laneImgSrc = LANE_IMAGE[assignedLane] || 'assets/lanes/mid.png';

      return `
        <div
          class="md-pick-box filled ${isTarget ? 'active-turn-blue' : ''}"
          onclick="focusMobaSlot('ally', ${idx})"
          title="${hero.name} (${assignedLane}) • คลิกไอคอนเลนมุมซ้ายบนเพื่อเปลี่ยนเลน หรือคลิกสเปลมุมขวาบนเพื่อเปลี่ยนสเปล"
        >
          <img
            src="${laneImgSrc}"
            class="md-pick-lane-badge"
            alt="${assignedLane}"
            onclick="event.stopPropagation(); openLanePickerModal('ally', ${idx}, ${hero.id})"
            title="คลิกเพื่อเปลี่ยนเลนของ ${hero.name} (ปัจจุบัน: ${assignedLane})"
          />
          <img
            src="${spell.img}"
            class="md-pick-spell-badge"
            alt="${spell.en}"
            onclick="event.stopPropagation(); openSpellPickerModal('ally', ${idx}, ${hero.id})"
            title="สเปล: ${spell.en} (${spell.th}) — คลิกเพื่อเปลี่ยน"
          />
          <img src="${hero.head}" class="md-pick-hero-img" alt="${hero.name}" loading="lazy" />
          <div class="md-pick-box-caption" onclick="event.stopPropagation(); openCounterGearModal('ALL', 'ALL', ${hero.id})" title="คลิกที่ชื่อเพื่อดูเซ็ตไอเทมแก้ทางของ ${hero.name}">
            ${hero.name}
          </div>
          <button
            class="md-pick-remove-btn"
            onclick="event.stopPropagation(); removeDraftSlot('ally', ${idx}); focusMobaSlot('ally', ${idx});"
            title="นำออก"
          >✕</button>
        </div>
      `;
    }).join('');
  }

  // Red Side (Enemy)
  const enemyPickedCount = state.enemyPicks.filter(Boolean).length;
  const enemyCountEl = document.getElementById('enemyCountText');
  if (enemyCountEl) enemyCountEl.textContent = `${enemyPickedCount}/5`;

  const enemyLanes = analyzeTeamLanes(state.enemyPicks);
  const enemyLaneEl = document.getElementById('enemyLaneChecklist');
  if (enemyLaneEl) {
    enemyLaneEl.innerHTML = ALL_LANES.map(lane => {
      const filled = enemyLanes.filledLanes.has(lane);
      return `<span class="lane-status-pill ${filled ? 'filled' : ''}" title="${lane}">${filled ? '⚔️' : '·'} ${LANE_SHORT_LABEL[lane]}</span>`;
    }).join('');
  }

  const enemySlotsEl = document.getElementById('enemyPickSlots');
  if (enemySlotsEl) {
    enemySlotsEl.innerHTML = state.enemyPicks.map((heroId, idx) => {
      const hero = heroId ? HERO_BY_ID.get(heroId) : null;
      const isTarget = state.activeSlot.type === 'enemy' && state.activeSlot.index === idx;

      if (!hero) {
        return `
          <div
            class="md-pick-box ${isTarget ? 'active-turn-red' : ''}"
            onclick="focusMobaSlot('enemy', ${idx})"
            ondblclick="openSlotPickerModal('enemy', ${idx})"
            title="ฝั่งแดง S${idx + 1} (คลิกเพื่อเลือกช่องนี้ แล้วจิ้มฮีโร่จากตารางตรงกลาง)"
          >
            <span class="md-pick-box-empty-label">S${idx + 1}</span>
          </div>
        `;
      }

      const counterSpell = getEnemySlotCounterSpell(hero, idx);
      const assignedLane = getSlotAssignedLane('enemy', idx);
      const laneImgSrc = LANE_IMAGE[assignedLane] || 'assets/lanes/mid.png';

      return `
        <div
          class="md-pick-box filled ${isTarget ? 'active-turn-red' : ''}"
          onclick="focusMobaSlot('enemy', ${idx})"
          title="${hero.name} (${assignedLane}) • คลิกชื่อเพื่อดูไอเทมแก้ทางตัวนี้"
        >
          <img
            src="${laneImgSrc}"
            class="md-pick-lane-badge"
            alt="${assignedLane}"
            onclick="event.stopPropagation(); openLanePickerModal('enemy', ${idx}, ${hero.id})"
            title="คลิกเพื่อเปลี่ยนเลนของ ${hero.name}"
          />
          <img
            src="${counterSpell.img}"
            class="md-pick-spell-badge"
            alt="${counterSpell.en}"
            onclick="event.stopPropagation(); openSpellPickerModal('enemy', ${idx}, ${hero.id})"
            title="สเปลแก้ทาง ${hero.name}: ${counterSpell.en} (${counterSpell.th})"
          />
          <img src="${hero.head}" class="md-pick-hero-img" alt="${hero.name}" loading="lazy" />
          <div class="md-pick-box-caption" onclick="event.stopPropagation(); openCounterGearModal(${hero.id})" title="คลิกเพื่อดูไอเทมแก้ทาง ${hero.name}">
            ${hero.name}
          </div>
          <button
            class="md-pick-remove-btn"
            onclick="event.stopPropagation(); removeDraftSlot('enemy', ${idx}); focusMobaSlot('enemy', ${idx});"
            title="นำออก"
          >✕</button>
        </div>
      `;
    }).join('');
  }
};

// Render Center Circular Hero Pool (12 heroes per row, dynamic #1, #2, #3... recommendation rank per selected Role & Lane)
function renderMobaHeroPool() {
  const poolEl = document.getElementById('mdHeroPoolGrid');
  if (!poolEl) return;

  const query = (document.getElementById('mdHeroSearchInput')?.value || '').trim().toLowerCase();
  const roleFilter = mdState.roleFilter;
  const laneFilter = mdState.laneFilter || 'ALL';

  // Temporarily compute full recommendations across ALL lanes so we can rank dynamically within the chosen Role + Lane filter
  const prevRecLane = state.recLaneFilter;
  state.recLaneFilter = 'ALL';
  const { recommendations } = calculateRecommendations();
  state.recLaneFilter = prevRecLane;

  const scoreMap = new Map(recommendations.map(r => [r.hero.id, r.totalScore]));

  // Filter heroes matching current Role, Lane, and Search query
  const filtered = HEROES.filter(h => {
    if (query && !h.name.toLowerCase().includes(query)) return false;
    if (roleFilter !== 'ALL' && !h.roles.includes(roleFilter)) return false;
    if (laneFilter !== 'ALL' && !h.lanes.includes(laneFilter)) return false;
    return true;
  });

  // Compute dynamic #1, #2, #3... ranks specifically within the currently selected Role & Lane filter!
  const availableRanked = filtered
    .filter(h => getHeroStatus(h.id) === 'AVAILABLE')
    .slice()
    .sort((a, b) => (scoreMap.get(b.id) ?? -999) - (scoreMap.get(a.id) ?? -999) || b.stats.metaScore - a.stats.metaScore);

  const aiRankMap = new Map();
  availableRanked.forEach((h, idx) => {
    aiRankMap.set(h.id, {
      rank: idx + 1,
      score: scoreMap.get(h.id) ?? Math.round(h.stats.metaScore || 0)
    });
  });

  if (mdState.sortByAi) {
    // When checkbox "เรียงตามลำดับแนะนำ" is checked: sort available heroes #1, #2, #3... ascending, unavailable at the end
    filtered.sort((a, b) => {
      const aAvail = getHeroStatus(a.id) === 'AVAILABLE' ? 1 : 0;
      const bAvail = getHeroStatus(b.id) === 'AVAILABLE' ? 1 : 0;
      if (bAvail !== aAvail) return bAvail - aAvail;
      const aRank = aiRankMap.get(a.id)?.rank ?? 999;
      const bRank = aiRankMap.get(b.id)?.rank ?? 999;
      if (aRank !== bRank) return aRank - bRank;
      return a.name.localeCompare(b.name);
    });
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  poolEl.innerHTML = filtered.map(h => {
    const status = getHeroStatus(h.id);
    const isUnavailable = status !== 'AVAILABLE';
    const aiInfo = !isUnavailable ? aiRankMap.get(h.id) : null;
    // Show #1..#N badge on all available heroes when sortByAi is checked, or top 10 when in A-Z mode
    const showRankBadge = Boolean(aiInfo && (mdState.sortByAi || aiInfo.rank <= 10));
    const isTopHighlight = Boolean(aiInfo && aiInfo.rank <= 10);

    let statusTagHtml = '';
    if (status === 'BANNED') statusTagHtml = `<span class="md-pool-status-tag banned">BAN</span>`;
    else if (status === 'ALLY') statusTagHtml = `<span class="md-pool-status-tag ally">BLUE</span>`;
    else if (status === 'ENEMY') statusTagHtml = `<span class="md-pool-status-tag enemy">RED</span>`;

    return `
      <div
        class="md-pool-hero ${isUnavailable ? 'unavailable' : ''} ${isTopHighlight ? 'is-ai-rec' : ''} ${h.tier === 'SS' ? 'is-ss-meta' : ''}"
        onclick="selectHeroFromMobaPool(${h.id})"
        oncontextmenu="event.preventDefault(); openHeroModal(${h.id});"
        title="${h.name} (${h.roles.join('/')} • ${h.lanes.join('/')} • ${h.tier} Tier) | WR ${h.stats.winRate}% • BR ${h.stats.banRate}%${aiInfo ? ' • 🎯 ลำดับแนะนำ #' + aiInfo.rank + ' (คะแนน ' + aiInfo.score + ')' : ''} (คลิกซ้ายเพื่อเลือกลงช่องปัจจุบัน / คลิกขวาดูข้อมูล)"
      >
        <div class="md-pool-avatar-wrap">
          <img src="${h.head}" alt="${h.name}" loading="lazy" />
        </div>
        ${showRankBadge ? `<span class="md-pool-rank-dot ${aiInfo.rank <= 3 ? 'top-3' : (aiInfo.rank <= 10 ? 'top-10' : 'rank-rest')}">#${aiInfo.rank}</span>` : ''}
        ${statusTagHtml}
        <div class="md-pool-name">${h.name}</div>
      </div>
    `;
  }).join('');
}

// Hook into renderHeroGrid so any refreshAllViews() also updates the MobaDraft circular pool
const _origRenderHeroGrid = window.renderHeroGrid;
window.renderHeroGrid = function () {
  renderMobaHeroPool();
  if (typeof _origRenderHeroGrid === 'function') {
    try { _origRenderHeroGrid(); } catch (e) {}
  }
};

// Override loadDemoDraft & quickAssignHero to keep MobaDraft turn indicator in sync
const _origLoadDemoDraft = window.loadDemoDraft;
window.loadDemoDraft = function () {
  if (typeof _origLoadDemoDraft === 'function') {
    _origLoadDemoDraft();
  }
  mdState.turnIdx = findNextEmptyMobaTurn();
  syncActiveSlotWithMobaTurn();
  refreshAllViews();
};

// Initialize MobaDraft clean empty board on page load (matching screenshot)
window.addEventListener('DOMContentLoaded', () => {
  resetMobaDraft(false);
});
