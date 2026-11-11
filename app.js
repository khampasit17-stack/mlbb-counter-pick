// MLBB Counter Pick & Meta Combo Pro [V2 Edition]
const DATA = window.MLBB_DATA || { heroes: [] };
const HEROES = DATA.heroes || [];
const HERO_BY_ID = new Map(HEROES.map(h => [h.id, h]));
const HERO_BY_NAME = new Map(HEROES.map(h => [h.name.toLowerCase(), h]));

const COMBOS = (window.MLBB_COMBOS || []).map(c => ({
  ...c,
  heroObjs: c.heroes.map(name => HERO_BY_NAME.get(name.toLowerCase())).filter(Boolean),
  mustBanObjs: (c.mustBan || []).map(name => HERO_BY_NAME.get(name.toLowerCase())).filter(Boolean)
}));

const ALL_LANES = ['EXP Lane', 'Jungle', 'Mid Lane', 'Gold Lane', 'Roam'];

// Official MLBB in-game Lane Images
const LANE_IMAGE = {
  'EXP Lane': 'assets/lanes/exp.png',
  'Jungle': 'assets/lanes/jungle.png',
  'Mid Lane': 'assets/lanes/mid.png',
  'Gold Lane': 'assets/lanes/gold.png',
  'Roam': 'assets/lanes/roam.png'
};

// Verified Pro Competitive Tournament Meta Heroes (MPL / M-Series / MSC / Mythical Glory+ pro play)
const PRO_COMPETITIVE_HEROES = new Set([
  // EXP Lane (Pro Tournament Meta)
  'lukas', 'masha', 'paquito', 'yu zhong', 'terizla', 'ruby', 'cici', 'arlott', 
  'benedetta', 'edith', 'lapu-lapu', 'chou', 'gloo', 'uranus', 'khaleed', 'guinevere', 
  'fredrinn', 'baxia', 'esmeralda', 'dyrroth', 'phoveus', 'thamuz', 'joy',

  // Jungle (Pro Tournament Meta)
  'fanny', 'ling', 'hayabusa', 'suyou', 'nolan', 'julian', 'roger', 'baxia', 
  'fredrinn', 'alpha', 'guinevere', 'lancelot', 'akai', 'barats', 'helcurt', 
  'martis', 'joy', 'yi sun-shin', 'gusion', 'hirara',

  // Mid Lane (Pro Tournament Meta)
  'zhuxin', 'harith', 'valentina', 'pharsa', 'xavier', 'vexana', 'cecilion', 
  'lylia', 'novaria', 'faramis', 'kadita', 'luo yi', 'yve', 'nana', 'lunox', 'zetian',

  // Gold Lane (Pro Tournament Meta)
  'harith', 'claude', 'moskov', 'roger', 'karrie', 'brody', 'bruno', 'beatrix', 
  'natan', 'wanwan', 'granger', 'lesley', 'irithel', 'clint', 'popol and kupa', 'obsidia',

  // Roam (Pro Tournament Meta)
  'mathilda', 'tigreal', 'minotaur', 'chip', 'hylos', 'belerick', 'khufra', 
  'kaja', 'grock', 'franco', 'angela', 'estes', 'lolita', 'carmilla', 'diggie', 
  'rafaela', 'jawhead', 'atlas', 'gatotkaca', 'kalea', 'marcel', 'floryn'
]);

const LANE_ICONS = {
  'EXP Lane': '⚔️ EXP',
  'Jungle': '🌲 Jungle',
  'Mid Lane': '🔮 Mid',
  'Gold Lane': '🪙 Gold',
  'Roam': '🛡️ Roam'
};
const LANE_ONLY_ICON = {
  'EXP Lane': '⚔️',
  'Jungle': '🌲',
  'Mid Lane': '🔮',
  'Gold Lane': '🪙',
  'Roam': '🛡️'
};
const LANE_SHORT_LABEL = {
  'EXP Lane': 'EXP',
  'Jungle': 'Jungle',
  'Mid Lane': 'Mid',
  'Gold Lane': 'Gold',
  'Roam': 'Roam'
};
const LANE_TH_DESC = {
  'EXP Lane': 'เลนไฟต์เตอร์ / ยืนเดี่ยวชนแนวหน้าและโซนหลังศัตรู',
  'Jungle': 'ป่า / ฟาร์มหลักของทีมและชิง Lord & Turtle (ถือสเปล Retribution)',
  'Mid Lane': 'เลนกลาง / เมจทำดาเมจเวท เคลียร์เลนไว และเดินเติมไฟต์',
  'Gold Lane': 'เลนทอง / ตัวทำดาเมจหลักช่วงท้ายเกม (แครี่ / เมจเลนทอง)',
  'Roam': 'โรมมิ่ง / เดินเปิดแมพ โซนไฟต์ รับดาเมจ หรือซัพพอร์ตเพื่อน'
};

// Multi-Lane Flex Heroes Enrichment (so heroes like Kimmy can flex between Gold Lane, Mid Lane, Jungle, etc.)
const HERO_FLEX_LANES = {
  'kimmy': ['Gold Lane', 'Mid Lane', 'Jungle'],
  'harith': ['Gold Lane', 'Mid Lane', 'Jungle'],
  'lunox': ['Mid Lane', 'Gold Lane', 'Jungle'],
  'alice': ['EXP Lane', 'Mid Lane', 'Gold Lane', 'Jungle'],
  'julian': ['Jungle', 'Mid Lane', 'EXP Lane'],
  'ruby': ['EXP Lane', 'Roam', 'Gold Lane'],
  'bane': ['Jungle', 'EXP Lane', 'Gold Lane', 'Mid Lane'],
  'guinevere': ['EXP Lane', 'Roam', 'Jungle'],
  'silvanna': ['EXP Lane', 'Roam', 'Jungle'],
  'carmilla': ['Roam', 'EXP Lane'],
  'edith': ['EXP Lane', 'Roam'],
  'gatotkaca': ['EXP Lane', 'Roam'],
  'belerick': ['Roam', 'EXP Lane'],
  'hylos': ['Roam', 'EXP Lane'],
  'fredrinn': ['Jungle', 'EXP Lane'],
  'barats': ['EXP Lane', 'Jungle', 'Roam'],
  'baxia': ['Jungle', 'Roam'],
  'akai': ['Roam', 'Jungle'],
  'kalea': ['Roam', 'EXP Lane'],
  'suyou': ['Jungle', 'EXP Lane'],
  'lukas': ['EXP Lane', 'Jungle'],
  'cici': ['EXP Lane', 'Gold Lane'],
  'freya': ['EXP Lane', 'Gold Lane', 'Jungle'],
  'masha': ['EXP Lane', 'Roam', 'Jungle'],
  'minsitthar': ['EXP Lane', 'Roam'],
  'kaja': ['Roam', 'EXP Lane'],
  'selena': ['Mid Lane', 'Roam', 'Jungle'],
  'natalia': ['Roam', 'Jungle'],
  'helcurt': ['Roam', 'Jungle'],
  'saber': ['Jungle', 'Roam'],
  'kadita': ['Mid Lane', 'Roam'],
  'faramis': ['Mid Lane', 'Roam'],
  'zhuxin': ['Mid Lane', 'Roam'],
  'nana': ['Mid Lane', 'Roam'],
  'vexana': ['Mid Lane', 'Roam'],
  'aurora': ['Mid Lane', 'Roam'],
  'popol and kupa': ['Gold Lane', 'Jungle', 'Roam'],
  'roger': ['Jungle', 'Gold Lane'],
  'yi sun-shin': ['Jungle', 'Gold Lane'],
  'natan': ['Gold Lane', 'Jungle'],
  'granger': ['Gold Lane', 'Jungle'],
  'cyclops': ['Mid Lane', 'Jungle'],
  'harley': ['Jungle', 'Mid Lane'],
  'gusion': ['Jungle', 'Mid Lane'],
  'joy': ['Jungle', 'EXP Lane', 'Mid Lane'],
  'benedetta': ['EXP Lane', 'Jungle'],
  'paquito': ['EXP Lane', 'Jungle'],
  'chou': ['EXP Lane', 'Roam'],
  'jawhead': ['Roam', 'EXP Lane', 'Jungle'],
  'hilda': ['Roam', 'EXP Lane'],
  'khaleed': ['EXP Lane', 'Roam'],
  'arlott': ['EXP Lane', 'Roam'],
  'esmeralda': ['EXP Lane', 'Mid Lane'],
  'uranus': ['EXP Lane', 'Roam'],
  'gloo': ['EXP Lane', 'Roam'],
  'johnson': ['Roam', 'EXP Lane']
};

for (const h of HEROES) {
  const flex = HERO_FLEX_LANES[h.name.toLowerCase()];
  if (flex) {
    // Keep flex[0] order when specified for Popol and Kupa, otherwise preserve primary lane h.lanes[0]
    if (h.name.toLowerCase() === 'popol and kupa') {
      h.lanes = [...new Set([...flex, ...h.lanes])];
    } else {
      h.lanes = [...new Set([...h.lanes, ...flex])];
    }
  }
}

// Official MLBB Battle Spells Dictionary (Real Official Icons, No Emojis)
const BATTLE_SPELLS = [
  { key: 'Retribution', en: 'Retribution', th: 'ฟาร์มป่า', cd: '35s', desc: 'ใช้สังหารมอนสเตอร์ป่า/Lord/Turtle และสโลว์ศัตรู (Ice/Flame/Bloody)', img: 'assets/spells/Retribution.png' },
  { key: 'Flicker', en: 'Flicker', th: 'แฟลช', cd: '120s', desc: 'วาร์ประยะสั้นทันที + เพิ่มเกราะกายภาพและเกราะเวทชั่วคราว ใช้หนีหรือเปิดจังหวะ', img: 'assets/spells/Flicker.png' },
  { key: 'Purify', en: 'Purify', th: 'ล้าง CC', cd: '90s', desc: 'ล้างสถานะผิดปกติทั้งหมดทันที (ยกเว้น Suppress) + อมตะ CC 1.2 วินาที และวิ่งเร็วขึ้น', img: 'assets/spells/Purify.png' },
  { key: 'Vengeance', en: 'Vengeance', th: 'สะท้อนดาเมจ', cd: '75s', desc: 'ลดดาเมจที่ได้รับลง 35% และสะท้อนดาเมจเวทกลับไปหาผู้โจมตี 35% นาน 3 วินาที', img: 'assets/spells/Vengeance.png' },
  { key: 'Petrify', en: 'Petrify', th: 'สตั๊นหิน', cd: '75s', desc: 'สาปศัตรูรอบตัวให้กลายเป็นหิน (สตั๊น) 0.8 วินาที และสโลว์ต่อ 50% หยุดตัวพริ้วได้ดีมาก', img: 'assets/spells/Petrify.png' },
  { key: 'Inspire', en: 'Inspire', th: 'เร่งตีเร็ว', cd: '75s', desc: 'เพิ่มความเร็วโจมตีสูงสุด 1.55 เท่า เจาะเกราะกายภาพ และดูดเลือดทุกการโจมตีปกติ', img: 'assets/spells/Inspire.png' },
  { key: 'Sprint', en: 'Sprint', th: 'วิ่งเร็ว', cd: '100s', desc: 'เพิ่มความเร็วเคลื่อนที่ 50% และต้านทานสถานะสโลว์ (Slow Immunity) 100% ตลอดระยะเวลา', img: 'assets/spells/Sprint.png' },
  { key: 'Execute', en: 'Execute', th: 'ประหาร', cd: '90s', desc: 'ฟันทำดาเมจจริง (True Damage) ตามเลือดที่หายไปของศัตรู ทะลุเกราะขาวทั้งหมด', img: 'assets/spells/Execute.png' },
  { key: 'Flameshot', en: 'Flameshot', th: 'ยิงไฟผลัก', cd: '50s', desc: 'ยิงกระสุนไฟระยะไกล และผลักศัตรูที่อยู่ใกล้ตัวให้กระเด็นถอยหลังพร้อมสโลว์', img: 'assets/spells/Flameshot.png' },
  { key: 'Aegis', en: 'Aegis', th: 'เกราะป้องกัน', cd: '75s', desc: 'สร้างเกราะดูดซับดาเมจขนาดใหญ่ให้ตัวเองเป็นเวลา 5 วินาที ป้องกันการโดนเบิร์สต์ชุดเดียว', img: 'assets/spells/Aegis.png' },
  { key: 'Revitalize', en: 'Revitalize', th: 'บ่อฮีลหมู่', cd: '75s', desc: 'เรียกบ่อน้ำศักดิ์สิทธิ์ฟื้นฟู HP ต่อเนื่องให้เพื่อนร่วมทีมในวง และเพิ่มผลฮีล/เกราะ 25%', img: 'assets/spells/Revitalize.png' },
  { key: 'Arrival', en: 'Arrival', th: 'วาร์ปกันป้อม', cd: '75s', desc: 'วาร์ปไปยังป้อมหรือครีปทั่วแผนที่ ใช้กันบ้านจากตัวแยกดันหรือเติมไฟต์ข้ามแมพ', img: 'assets/spells/Arrival.png' }
];
const SPELL_BY_KEY = new Map(BATTLE_SPELLS.map(s => [s.key, s]));

// Comprehensive MLBB Counter & New Meta Items Database (26 Counter & Tactical Meta Items + 16 Core Build Items = 42 Official Items)
const COUNTER_ITEMS_DB = [
  {
    id: 'sky_piercer',
    name: 'Sky Piercer',
    thName: 'ดาบประหารเมต้าใหม่ (สังหารทันทีเมื่อ HP ต่ำ)',
    shortTag: '⚡ NEW META: ประหารทันทีที่ HP ต่ำกว่า 4%–12%',
    category: 'New-Meta',
    isNewMeta: true,
    roleGroup: 'all',
    forRoles: ['Assassin', 'Marksman', 'Mage', 'Fighter'],
    forLanes: 'Jungle / Gold Lane / Mid Lane',
    color: '#38bdf8',
    bg: 'linear-gradient(135deg, #0284c7, #1e3a8a)',
    img: 'assets/items/sky_piercer.png',
    icon: '⚡🗡️',
    stats: '+60 พลังโจมตี/เวท (Adaptive) • +15 ความเร็วเคลื่อนที่',
    passive: 'Lethality (ไอเทมเมต้าใหม่): เมื่อทำดาเมจใส่ฮีโร่ศัตรู จะสั่งประหารสังหารทันทีหาก HP ศัตรูต่ำกว่า 4% และเก็บสแต็ก Lethality สูงสุด 80 สแต็ก (ประหารทันทีที่ HP 12%!) แก้ทางตัวพริ้วชอบหนีตอนเลือดก้นหลอด'
  },
  {
    id: 'malefic_gun',
    name: 'Malefic Gun',
    thName: 'ปืนเมต้าใหม่ เพิ่มระยะยิง 15% + เจาะเกราะ 30%',
    shortTag: '⚡ NEW META: ยิงไกลขึ้น 15% + เจาะเกราะ 30% + วิ่งเร็ว',
    category: 'Tank-Buster',
    isNewMeta: true,
    roleGroup: 'physical',
    forRoles: ['Marksman', 'Fighter'],
    forLanes: 'Gold Lane',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, #d97706, #78350f)',
    img: 'assets/items/malefic_gun.png',
    icon: '🔫⚡',
    stats: '+40 พลังโจมตี • +20% ความเร็วโจมตี',
    passive: 'Armor Buster & Malefic Energy (เมต้าแครี่ยุคใหม่): มอบเจาะเกราะกายภาพ 30% ถาวร + เพิ่มระยะยิงโจมตีปกติขึ้น 15% ตลอดเวลา และเมื่อยิงโดนจะวิ่งเร็วขึ้น 10% ทำให้แครี่ยืนยิงฟรีนอกระยะศัตรูพร้อมละลายแทงค์'
  },
  {
    id: 'thunder_belt',
    name: 'Thunder Belt',
    thName: 'เข็มขัดสายฟ้าโฉมใหม่ เก็บสแต็กเกราะถาวร + True DMG',
    shortTag: '⚡ NEW META: เก็บเกราะถาวรไม่จำกัด + ตี True Damage',
    category: 'Anti-Burst',
    isNewMeta: true,
    roleGroup: 'tank',
    forRoles: ['Tank', 'Fighter', 'Support'],
    forLanes: 'Roam / EXP Lane',
    color: '#60a5fa',
    bg: 'linear-gradient(135deg, #2563eb, #1e3a8a)',
    img: 'assets/items/thunder_belt.png',
    icon: '⚡🥋',
    stats: '+800 HP • +15 เกราะกายภาพ • +15 เกราะเวท • +20 ความเร็วเคลื่อนที่',
    passive: 'Thunderbolt (โฉมใหม่ยอดฮิต): ทุก 4 วินาที การโจมตีปกติครั้งถัดไปจะทำ True Damage ตามเกราะรวมของเรา สโลว์ 99% และเพิ่มเกราะกายภาพ+เวทถาวร +1 สแต็กตลอดเกม! (เมต้าหลักของ Hylos, Badang, Edith, Lukas, Gatotkaca, Belerick, Khufra)'
  },
  {
    id: 'dominance_ice',
    name: 'Dominance Ice',
    thName: 'เกราะน้ำแข็งตัดเลือด 50% & ลดตีเร็ว',
    shortTag: '🩸 ตัดฮีล 50% + ❄️ ลดตีเร็วศัตรู',
    category: 'Anti-Heal',
    isNewMeta: true,
    roleGroup: 'tank',
    forRoles: ['Tank', 'Support', 'Fighter'],
    forLanes: 'Roam / EXP Lane',
    color: '#38bdf8',
    bg: 'linear-gradient(135deg, #0284c7, #1e3a8a)',
    img: 'assets/items/dominance_ice.png',
    icon: '❄️🛡️',
    stats: '+55 เกราะกายภาพ • +500 HP • +5% ความเร็วเคลื่อนที่',
    passive: 'Lifebane & Arctic Cold (โฉมใหม่เพิ่ม HP): เมื่อรับดาเมจจะลดการฟื้นฟูเลือดและเกราะขาวของศัตรูลง 50% พร้อมลดความเร็วโจมตีของศัตรูลงเหลือ 80%'
  },
  {
    id: 'sea_halberd',
    name: 'Sea Halberd',
    thName: 'ง้าวฟ้าตัดเลือดกายภาพ & ตีตัวเลือดเยอะ',
    shortTag: '🩸 ตัดฮีลกายภาพ 50% + ⚔️ ตีแทงค์แรงขึ้น 8%',
    category: 'Anti-Heal',
    isNewMeta: false,
    roleGroup: 'physical',
    forRoles: ['Marksman', 'Fighter', 'Assassin'],
    forLanes: 'Gold Lane / EXP / Jungle',
    color: '#06b6d4',
    bg: 'linear-gradient(135deg, #0891b2, #0f766e)',
    img: 'assets/items/sea_halberd.png',
    icon: '🔱🩸',
    stats: '+80 พลังโจมตี • +20% ความเร็วโจมตี',
    passive: 'Lifebane & Punish: โจมตีลดฮีลและเกราะขาวศัตรูลง 50% นาน 3 วินาที และทำดาเมจเพิ่มขึ้น 8% ต่อศัตรูที่มี HP สูงกว่าเรา'
  },
  {
    id: 'glowing_wand',
    name: 'Glowing Wand',
    thName: 'คทาไฟโฉมใหม่ เผาตัดเลือดเวท 50% & เผา %HP',
    shortTag: '⚡ NEW META: ตัดฮีลเวท 50% + 🔥 เผา %Max HP',
    category: 'Anti-Heal',
    isNewMeta: true,
    roleGroup: 'magic',
    forRoles: ['Mage', 'Support', 'Tank'],
    forLanes: 'Mid Lane / Roam',
    color: '#f97316',
    bg: 'linear-gradient(135deg, #ea580c, #9a3412)',
    img: 'assets/items/glowing_wand.png',
    icon: '🔥🪄',
    stats: '+75 พลังเวท • +400 HP • +5% ความเร็วเคลื่อนที่',
    passive: 'Lifebane & Scorch (รวม Necklace of Durance เข้าด้วยกัน): สกิลเวทเผาศัตรูเป็น % เลือดสูงสุดต่อเนื่อง 3 วินาที พร้อมลดฮีลและเกราะขาวของศัตรูลง 50% ทันที'
  },
  {
    id: 'wishing_lantern',
    name: 'Wishing Lantern',
    thName: 'โคมผีเสื้อเมต้าใหม่ ระเบิด 8% เลือดสูงสุด',
    shortTag: '⚡ NEW META: สกิลเวทระเบิด 8% Max HP แทงค์',
    category: 'Tank-Buster',
    isNewMeta: true,
    roleGroup: 'magic',
    forRoles: ['Mage'],
    forLanes: 'Mid Lane',
    color: '#a855f7',
    bg: 'linear-gradient(135deg, #9333ea, #4c1d95)',
    img: 'assets/items/wishing_lantern.png',
    icon: '🏮🦋',
    stats: '+75 พลังเวท • +400 มานา • +10% ลดคูลดาวน์',
    passive: 'Butterfly Goddess (ไอเทมเมต้าใหม่): ทุกครั้งที่สกิลเวททำดาเมจสะสมครบ 800 จะปล่อยผีเสื้อทำดาเมจเวทเท่ากับ 8% ของ HP สูงสุดของศัตรู ละลายแทงค์เลือดเยอะคู่กับ Glowing Wand ได้โหดมาก'
  },
  {
    id: 'demon_hunter_sword',
    name: 'Demon Hunter Sword',
    thName: 'ดาบยักษ์ (DHS) ตีละลายเลือดแทงค์',
    shortTag: '⚔️ ตีเป็น % เลือดปัจจุบันของศัตรู',
    category: 'Tank-Buster',
    isNewMeta: false,
    roleGroup: 'physical',
    forRoles: ['Marksman', 'Fighter'],
    forLanes: 'Gold Lane / EXP (สายตีเร็ว)',
    color: '#f43f5e',
    bg: 'linear-gradient(135deg, #e11d48, #881337)',
    img: 'assets/items/demon_hunter_sword.png',
    icon: '🗡️👹',
    stats: '+35 พลังโจมตี • +20% ความเร็วโจมตี • ดูดเลือด',
    passive: 'Devour: การโจมตีปกติทำดาเมจกายภาพเพิ่มเติมตาม 8% ของเลือดปัจจุบันของศัตรู ยิ่งศัตรูเลือดเยอะ (เช่น Hylos, Masha, Belerick, Lukas) ยิ่งละลายไว'
  },
  {
    id: 'corrosion_scythe',
    name: 'Corrosion Scythe',
    thName: 'เคียวเขียวสโลว์ 40% & เร่งความเร็วโจมตี',
    shortTag: '🐢 โจมตีสโลว์ 40% + เร่งตีเร็ว คู่หูละลายแทงค์',
    category: 'Tank-Buster',
    isNewMeta: false,
    roleGroup: 'physical',
    forRoles: ['Marksman', 'Fighter'],
    forLanes: 'Gold Lane / EXP (สายตีเร็ว)',
    color: '#10b981',
    bg: 'linear-gradient(135deg, #059669, #064e3b)',
    img: 'assets/items/corrosion_scythe.png',
    icon: '🧪⚔️',
    stats: '+30 พลังโจมตี • +30% ความเร็วโจมตี • +5% ความเร็วเคลื่อนที่',
    passive: 'Corrosive & Impulse: การโจมตีปกติทำดาเมจกายภาพเสริมและสโลว์ศัตรูสูงสุด 40% พร้อมเร่งความเร็วโจมตี 30% ใช้จับขาไฟต์เตอร์และแทงค์ไม่ให้เดินหนี'
  },
  {
    id: 'malefic_roar',
    name: 'Malefic Roar',
    thName: 'ปืนทองเจาะเกราะกายภาพ % ทะลุแทงค์',
    shortTag: '🎯 เจาะเกราะกายภาพทะลุแทงค์สูงสุด 60%',
    category: 'Tank-Buster',
    isNewMeta: false,
    roleGroup: 'physical',
    forRoles: ['Assassin', 'Fighter', 'Marksman'],
    forLanes: 'Jungle / EXP / Gold Lane',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, #d97706, #78350f)',
    img: 'assets/items/malefic_roar.png',
    icon: '🔫💥',
    stats: '+60 พลังโจมตี • +20% เจาะเกราะกายภาพพื้นฐาน',
    passive: 'Armor Buster: ยิ่งศัตรูมีเกราะกายภาพสูง ยิ่งได้เจาะเกราะเพิ่มสูงสุดอีก 30% เหมาะกับแอสซาซินและไฟต์เตอร์สกิลเจาะแทงค์'
  },
  {
    id: 'divine_glaive',
    name: 'Divine Glaive',
    thName: 'ดาบแดงเจาะเกราะเวท % ทะลุแทงค์',
    shortTag: '🔮 เจาะเกราะเวททะลุสูงสุด 60%',
    category: 'Tank-Buster',
    isNewMeta: false,
    roleGroup: 'magic',
    forRoles: ['Mage', 'Assassin'],
    forLanes: 'Mid Lane / Jungle เวท',
    color: '#ec4899',
    bg: 'linear-gradient(135deg, #db2777, #831843)',
    img: 'assets/items/divine_glaive.png',
    icon: '⚔️✨',
    stats: '+60 พลังเวท • +40% เจาะเกราะเวทพื้นฐาน',
    passive: 'Spellbreaker: ยิ่งศัตรูออกของกันเวทเยอะ ยิ่งได้เจาะเกราะเวทเพิ่มสูงสุดอีก 20% จำเป็นมากเมื่อศัตรูออก Athena หรือ Radiant'
  },
  {
    id: 'cursed_helmet',
    name: 'Cursed Helmet',
    thName: 'หมวกไฟโฉมใหม่ เผา %HP + ลดเกราะทั้งกายภาพและเวท',
    shortTag: '⚡ NEW META: เผา %HP รอบตัว + ลดเกราะศัตรูให้ทีม',
    category: 'Tank-Buster',
    isNewMeta: true,
    roleGroup: 'tank',
    forRoles: ['Tank', 'Fighter'],
    forLanes: 'Roam / EXP / Jungle แทงค์',
    color: '#f97316',
    bg: 'linear-gradient(135deg, #c2410c, #7c2d12)',
    img: 'assets/items/cursed_helmet.png',
    icon: '🔥🪖',
    stats: '+1200 HP • +20 เกราะเวท',
    passive: 'Burning Soul & Curse (โฉมใหม่): เผาศัตรูรอบตัวเป็น %Max HP ต่อวินาที พร้อมลดทั้งเกราะกายภาพและเกราะเวทของศัตรูที่โดนเผาลงสูงสุด 15 หน่วย ช่วยให้ทั้งทีมตีแทงค์ศัตรูเข้าแรงขึ้น'
  },
  {
    id: 'winter_crown',
    name: 'Winter Crown',
    thName: 'มงกุฎน้ำแข็งเมต้าใหม่ กดแช่แข็งอมตะ 2 วินาที',
    shortTag: '⚡ NEW META: กดใช้แช่แข็งตัวเองเป็นอมตะ 2 วิ (ออกได้ทุกสาย)',
    category: 'Anti-Burst',
    isNewMeta: true,
    roleGroup: 'all',
    forRoles: ['Mage', 'Assassin', 'Marksman', 'Fighter', 'Support', 'Tank'],
    forLanes: 'ทุกตำแหน่ง (Adaptive ออกได้ทุกสาย)',
    color: '#7dd3fc',
    bg: 'linear-gradient(135deg, #0284c7, #0369a1)',
    img: 'assets/items/winter_crown.png',
    icon: '👑❄️',
    stats: '+45 พลังโจมตี/เวท (Adaptive) • +400 HP • +5% ลดคูลดาวน์',
    passive: 'Frozen (กดใช้ — โฉมใหม่ใช้ระหว่างกางอัลติได้!): แช่แข็งตัวเองเป็นอมตะ ไม่ตกเป็นเป้าหมายและไม่รับดาเมจใดๆ นาน 2 วินาที ใช้หลบอัลติ Hayabusa, Saber, Harley, Eudora, Aldous'
  },
  {
    id: 'flask_of_the_oasis',
    name: 'Flask of the Oasis',
    thName: 'ขวดน้ำซัพพอร์ต เด้งเกราะฉุกเฉินกันเพื่อนโดนล้วง',
    shortTag: '⚡ NEW META: เด้งเกราะก้อนโตให้เพื่อนเมื่อ HP ต่ำกว่า 35%',
    category: 'Anti-Burst',
    isNewMeta: true,
    roleGroup: 'magic',
    forRoles: ['Support', 'Mage'],
    forLanes: 'Roam (ซัพพอร์ตสายฮีล/เกราะ)',
    color: '#34d399',
    bg: 'linear-gradient(135deg, #059669, #065f46)',
    img: 'assets/items/flask_of_the_oasis.png',
    icon: '🧪💚',
    stats: '+60 พลังเวท • +300 HP • +10% ลดคูลดาวน์ • +12% ผลฮีลและเกราะ',
    passive: 'Blessing: เมื่อฮีลหรือใส่เกราะให้เพื่อนที่เลือดต่ำกว่า 35% จะเด้งเกราะดูดซับดาเมจก้อนใหญ่ทันทีและลดคูลดาวน์สกิลของเราลง แก้ทางแอสซาซินล้วงแครี่ได้ชะงัด (ของหลัก Estes, Floryn, Angela, Rafaela, Mathilda)'
  },
  {
    id: 'fleeting_time',
    name: 'Fleeting Time',
    thName: 'นาฬิกาลดคูลดาวน์อัลติ 30% (โฉมใหม่ Adaptive)',
    shortTag: '⚡ NEW META: คิล/แอสซิสต์ ลดคูลดาวน์อัลติลง 30% ทันที',
    category: 'New-Meta',
    isNewMeta: true,
    roleGroup: 'all',
    forRoles: ['Support', 'Tank', 'Mage', 'Fighter'],
    forLanes: 'Roam / Mid / EXP (ตัวเปิดด้วยอัลติ)',
    color: '#60a5fa',
    bg: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    img: 'assets/items/fleeting_time.png',
    icon: '⏳⚡',
    stats: '+30 พลังโจมตี/เวท (Adaptive) • +600 HP • +15% ลดคูลดาวน์',
    passive: 'Timestream (โฉมใหม่เพิ่ม HP 600 ออกได้ทั้งแทงค์และเมจ!): ทุกครั้งที่ได้ Kill หรือ Assist จะลดคูลดาวน์สกิลอัลติปัจจุบันลง 30% ทันที เหมาะกับ Tigreal, Atlas, Carmilla, Badang, Angela, Floryn, Johnson'
  },
  {
    id: 'oracle',
    name: 'Oracle',
    thName: 'เกราะเขียวเพิ่มฮีลและเกราะขาวตัวเอง +30%',
    shortTag: '💚 เพิ่มรับฮีล/เกราะขาว 30% แก้ทางของตัดเลือดศัตรู',
    category: 'Anti-Burst',
    isNewMeta: false,
    roleGroup: 'tank',
    forRoles: ['Fighter', 'Tank', 'Support'],
    forLanes: 'EXP Lane / Roam',
    color: '#10b981',
    bg: 'linear-gradient(135deg, #047857, #064e3b)',
    img: 'assets/items/oracle.png',
    icon: '💚🛡️',
    stats: '+850 HP • +20 เกราะกายภาพ • +20 เกราะเวท • +10% ลดคูลดาวน์',
    passive: 'Bless: เพิ่มผลฟื้นฟูเลือดและเกราะขาวที่ตัวเองได้รับขึ้น 30%! ใช้แก้ทางเมื่อฝั่งตรงข้ามออกไอเทมตัดเลือด (Dominance Ice / Sea Halberd / Glowing Wand) มาสู้กับฮีโร่สายดูดเลือดของเรา'
  },
  {
    id: 'antique_cuirass',
    name: 'Antique Cuirass',
    thName: 'เกราะเขียวลดพลังสกิลกายภาพ 18%',
    shortTag: '🛡️ ลดพลังโจมตีสกิลกายภาพศัตรู 18%',
    category: 'Anti-Burst',
    isNewMeta: false,
    roleGroup: 'tank',
    forRoles: ['Tank', 'Fighter', 'Support'],
    forLanes: 'Roam / EXP Lane',
    color: '#10b981',
    bg: 'linear-gradient(135deg, #059669, #064e3b)',
    img: 'assets/items/antique_cuirass.png',
    icon: '🛡️🌿',
    stats: '+920 HP • +54 เกราะกายภาพ • +4 ฟื้นฟู HP',
    passive: 'Deter: เมื่อถูกโจมตีด้วยสกิล จะลดพลังโจมตีของศัตรูตัวนั้นลง 6% นาน 2 วินาที (ซ้อนทับ 3 ครั้ง รวมลด 18%) แก้ทางแอสซาซินและไฟต์เตอร์สกิลหนัก เช่น Fanny, Hayabusa, Paquito, Saber'
  },
  {
    id: 'blade_armor',
    name: 'Blade Armor',
    thName: 'เกราะหนามสะท้อนคริติคอล & ตีปกติ',
    shortTag: '🌵 สะท้อนดาเมจตีปกติ + ลดคริ 20%',
    category: 'Anti-AtkSpeed',
    isNewMeta: false,
    roleGroup: 'tank',
    forRoles: ['Tank', 'Fighter', 'Support'],
    forLanes: 'Roam / EXP Lane',
    color: '#94a3b8',
    bg: 'linear-gradient(135deg, #475569, #1e293b)',
    img: 'assets/items/blade_armor.png',
    icon: '🌵🛡️',
    stats: '+70 เกราะกายภาพ • +20% ลดดาเมจคริติคอล',
    passive: 'Bladedmail: เมื่อถูกโจมตีปกติ จะสะท้อนดาเมจกลับไปหาผู้โจมตีพร้อมสโลว์ 15% (เมื่อกดคู่กับสเปล Vengeance แครี่ศัตรูจะยิงตัวเองตาย!)'
  },
  {
    id: 'wind_of_nature',
    name: 'Wind of Nature',
    thName: 'กดอมตะกันดาเมจกายภาพ 100% (2 วิ)',
    shortTag: '🌪️ กดใช้: อมตะกันกายภาพ 2 วินาที',
    category: 'Anti-Burst',
    isNewMeta: false,
    roleGroup: 'physical',
    forRoles: ['Marksman', 'Fighter'],
    forLanes: 'Gold Lane',
    color: '#34d399',
    bg: 'linear-gradient(135deg, #10b981, #047857)',
    img: 'assets/items/wind_of_nature.png',
    icon: '🌪️🏹',
    stats: '+30 พลังโจมตี • +20% ความเร็วโจมตี • +10% ดูดเลือด',
    passive: 'Wind Chant (กดใช้): เป็นอมตะต่อดาเมจกายภาพทั้งหมดเป็นเวลา 2 วินาที ใช้ดวลชนะแครี่ศัตรูและรอดจากแอสซาซินสายกายภาพ'
  },
  {
    id: 'athenas_shield',
    name: "Athena's Shield",
    thName: 'โล่อาธีน่า กันเวทเบิร์สต์ชุดเดียว',
    shortTag: '🔮 ลดดาเมจเวทลง 25% นาน 3 วินาที',
    category: 'Magic-Burst-Def',
    isNewMeta: false,
    roleGroup: 'tank',
    forRoles: ['Tank', 'Fighter', 'Marksman', 'Assassin', 'Mage', 'Support'],
    forLanes: 'ทุกตำแหน่งเมื่อเจอเมจชุดเดียวตาย',
    color: '#c084fc',
    bg: 'linear-gradient(135deg, #9333ea, #581c87)',
    img: 'assets/items/athenas_shield.png',
    icon: '🛡️🔮',
    stats: '+900 HP • +48 เกราะเวท • +2 ฟื้นฟู HP',
    passive: 'Shield: ทันทีที่ได้รับดาเมจเวท จะลดดาเมจเวททั้งหมดลง 25% นาน 3 วินาที ป้องกันเมจเบิร์สต์ชุดเดียวอย่าง Eudora, Kadita, Aurora, Vale, Gusion ได้ดีที่สุด'
  },
  {
    id: 'radiant_armor',
    name: 'Radiant Armor',
    thName: 'เกราะทองกันเวทต่อเนื่องหลายฮิต',
    shortTag: '✨ รับดาเมจเวทต่อเนื่องได้เกราะเวทพุ่งสูง',
    category: 'Magic-Def',
    isNewMeta: false,
    roleGroup: 'tank',
    forRoles: ['Tank', 'Fighter', 'Support'],
    forLanes: 'Roam / EXP Lane',
    color: '#fbbf24',
    bg: 'linear-gradient(135deg, #d97706, #92400e)',
    img: 'assets/items/radiant_armor.png',
    icon: '✨🛡️',
    stats: '+950 HP • +40 เกราะเวท • +12 ฟื้นฟู HP',
    passive: 'Holy Blessing: ทุกครั้งที่โดนดาเมจเวทจะเพิ่มเกราะเวทสะสมสูงสุด 6 สแต็ก แก้ทางเมจดาเมจต่อเนื่อง เช่น Zhuxin, Harith, Yve, Valir, Chang\'e, Kimmy, Odette'
  },
  {
    id: 'rose_gold_meteor',
    name: 'Rose Gold Meteor',
    thName: 'ดาบกุหลาบทองโฉมใหม่ เกราะฉุกเฉิน + เพิ่มเกราะตามดูดเลือด',
    shortTag: '⚡ NEW META: เกราะฉุกเฉิน + เปลี่ยน %ดูดเลือดเป็นเกราะป้องกัน',
    category: 'Magic-Burst-Def',
    isNewMeta: true,
    roleGroup: 'physical',
    forRoles: ['Marksman', 'Fighter', 'Assassin'],
    forLanes: 'Gold Lane / Jungle / EXP',
    color: '#fb7185',
    bg: 'linear-gradient(135deg, #e11d48, #9f1239)',
    img: 'assets/items/rose_gold_meteor.png',
    icon: '🌹🗡️',
    stats: '+40 พลังโจมตี • +20% ความเร็วโจมตี • +10% ดูดเลือด',
    passive: 'Lifeline & Dragon Scale (โฉมใหม่): เปลี่ยนค่า Lifesteal เป็นเกราะกายภาพและเกราะเวทสูงสุด 50 หน่วย และเมื่อ HP ต่ำกว่า 30% จะเด้งเกราะดูดซับดาเมจก้อนโต + วิ่งเร็ว 50%!'
  },
  {
    id: 'tough_boots',
    name: 'Tough Boots',
    thName: 'รองเท้ากันเวท + ลดเวลาติด CC 30%',
    shortTag: '🥾 ลดเวลาติดสตั๊น/สโลว์/CC ลง 30%',
    category: 'Tenacity',
    isNewMeta: false,
    roleGroup: 'all',
    forRoles: ['Fighter', 'Tank', 'Assassin', 'Marksman', 'Mage', 'Support'],
    forLanes: 'ทุกตำแหน่งเมื่อเจอทีม CC หนัก',
    color: '#2dd4bf',
    bg: 'linear-gradient(135deg, #0d9488, #115e59)',
    img: 'assets/items/tough_boots.png',
    icon: '🥾✨',
    stats: '+40 ความเร็วเคลื่อนที่ • +22 เกราะเวท',
    passive: 'Fortitude: ลดระยะเวลาที่ติดสถานะควบคุม (Stun, Slow, Terrify, Taunt, Freeze) ลง 30% ช่วยให้หลุดออกจากวงคอมโบไวขึ้นมาก'
  },
  {
    id: 'twilight_armor',
    name: 'Twilight Armor',
    thName: 'เกราะม่วงโฉมใหม่ ลดดาเมจเบิร์สต์ก้อนใหญ่ & True DMG',
    shortTag: '⚡ NEW META: ลดดาเมจที่แรงเกิน 800 ต่อฮิตลงอย่างมาก',
    category: 'Anti-Burst',
    isNewMeta: true,
    roleGroup: 'tank',
    forRoles: ['Tank', 'Fighter', 'Support'],
    forLanes: 'Roam / EXP Lane',
    color: '#818cf8',
    bg: 'linear-gradient(135deg, #4f46e5, #312e81)',
    img: 'assets/items/twilight_armor.png',
    icon: '🌌🛡️',
    stats: '+1200 HP • +15 เกราะกายภาพ',
    passive: 'Twilight & Redemption: เมื่อได้รับดาเมจเกิน 800 ในฮิตเดียว จะลดดาเมจส่วนเกินลงอย่างมหาศาล และฟื้นฟูเลือดเมื่อโดนเบิร์สต์ แก้ทางดาเมจนัดเดียวแรงๆ เช่น Lesley, Aldous, Brody, Clint, Eudora'
  },
  {
    id: 'immortality',
    name: 'Immortality',
    thName: 'เกราะเกิดใหม่ ยื้อชีวิตไฟต์ตัดสิน',
    shortTag: '👼 ตายแล้วฟื้นคืนชีพพร้อมเกราะป้องกัน',
    category: 'Anti-Burst',
    isNewMeta: false,
    roleGroup: 'all',
    forRoles: ['Tank', 'Fighter', 'Assassin', 'Marksman', 'Mage', 'Support'],
    forLanes: 'ทุกตำแหน่งช่วงกลาง-เลทเกม',
    color: '#facc15',
    bg: 'linear-gradient(135deg, #ca8a04, #713f12)',
    img: 'assets/items/immortality.png',
    icon: '👼🛡️',
    stats: '+800 HP • +20 เกราะกายภาพ',
    passive: 'Immortal: ฟื้นคืนชีพใน 2.5 วินาทีหลังถูกสังหาร ได้รับ HP 16% และเกราะดูดซับดาเมจ ใช้กันตัวล้วงหรือตัวเก็บตกอย่าง Karina, Martis, Saber, Hayabusa'
  },
  {
    id: 'queens_wings',
    name: "Queen's Wings",
    thName: 'ปีกแดงโฉมใหม่ ลดดาเมจ 30% + เพิ่มดาเมจตามเลือดที่ลด',
    shortTag: '⚡ NEW META: ลดดาเมจ 30% + ยิ่งเลือดน้อยยิ่งตีแรงและลดคูลดาวน์',
    category: 'Anti-Burst',
    isNewMeta: true,
    roleGroup: 'physical',
    forRoles: ['Fighter', 'Tank', 'Assassin'],
    forLanes: 'EXP Lane / Jungle',
    color: '#ef4444',
    bg: 'linear-gradient(135deg, #dc2626, #7f1d1d)',
    img: 'assets/items/queens_wings.png',
    icon: '🦇🛡️',
    stats: '+40 พลังโจมตี/เวท (Adaptive) • +600 HP • +10% ลดคูลดาวน์ • +10% Spell Vamp',
    passive: 'Demonize & Defiance (โฉมใหม่): ยิ่งเลือดลดยิ่งทำดาเมจแรงขึ้นสูงสุด 15% และเมื่อ HP ต่ำกว่า 40% จะลดดาเมจที่ได้รับลง 30% พร้อมลดคูลดาวน์สกิลลง 2 วินาที!'
  }
];
const COUNTER_ITEM_BY_ID = new Map(COUNTER_ITEMS_DB.map(item => [item.id, item]));

// Core Meta Offensive & Archetype Items (for 6-Item Hero Pro Meta Builds)
const CORE_META_ITEMS_DB = [
  { id: 'war_axe', name: 'War Axe', thName: 'ขวานรบไฟต์เตอร์ (Spell Vamp + True Damage)', shortTag: '🪓 สแต็กเต็มทำ True Damage 10% + Spell Vamp 12%', img: 'assets/items/war_axe.png', stats: '+35 พลังโจมตี • +400 HP • +10% ลดคูลดาวน์ • +12% Spell Vamp' },
  { id: 'hunter_strike', name: 'Hunter Strike', thName: 'เคียวม่วงเจาะเกราะ + เร่งวิ่ง 50%', shortTag: '⚡ เจาะเกราะ 15 + ตี 5 ฮิตวิ่งเร็ว 50%', img: 'assets/items/hunter_strike.png', stats: '+80 พลังโจมตี • +10% ลดคูลดาวน์ • +15 เจาะเกราะกายภาพ' },
  { id: 'blade_of_the_heptaseas', name: 'Blade of the Heptaseas', thName: 'ดาบเจ็ดคาบสมุทร ฟันนัดแรกแรง + สโลว์', shortTag: '🗡️ ดักพุ่มฟันนัดแรกแรงขึ้น + สโลว์ 40%', img: 'assets/items/blade_of_the_heptaseas.png', stats: '+70 พลังโจมตี • +250 HP • +15 เจาะเกราะกายภาพ' },
  { id: 'blade_of_despair', name: 'Blade of Despair', thName: 'ดาบเขียว (BOD) พลังโจมตีสูงสุด', shortTag: '💥 +160 พลังโจมตี + ตีศัตรูเลือดต่ำกว่า 50% แรงขึ้น 25%', img: 'assets/items/blade_of_despair.png', stats: '+160 พลังโจมตี • +5% ความเร็วเคลื่อนที่' },
  { id: 'endless_battle', name: 'Endless Battle', thName: 'ดาบแดง True Damage หลังใช้สกิล', shortTag: '⚔️ ใช้สกิลแล้วตีปกติเป็น True Damage + วิ่งเร็ว', img: 'assets/items/endless_battle.png', stats: '+60 พลังโจมตี • +250 HP • +10% ลดคูลดาวน์ • +8% ดูดเลือด' },
  { id: 'berserkers_fury', name: "Berserker's Fury", thName: 'ขวานคริติคอล เพิ่มแรงคริ +40%', shortTag: '🎯 +25% โอกาสคริ + แรงคริติคอลเพิ่มขึ้น', img: 'assets/items/berserkers_fury.png', stats: '+65 พลังโจมตี • +25% โอกาสคริติคอล' },
  { id: 'haas_claws', name: "Haas's Claws", thName: 'กรงเล็บดูดเลือดคริติคอล + เร่งตีเร็ว', shortTag: '🩸 ดูดเลือด 20% + โอกาสคริ 20% + ตีเร็วเมื่อติดคริ', img: 'assets/items/haas_claws.png', stats: '+30 พลังโจมตี • +15% ความเร็วโจมตี • +20% โอกาสคริติคอล' },
  { id: 'golden_staff', name: 'Golden Staff', thName: 'กระบองทอง เบิ้ลเอฟเฟกต์โจมตีปกติ 3 ครั้ง', shortTag: '⚡ เปลี่ยนคริเป็นตีเร็ว + เบิ้ลพาสซีฟ DHS/เคียวเขียว', img: 'assets/items/golden_staff.png', stats: '+55 พลังโจมตี • +15% ความเร็วโจมตี' },
  { id: 'holy_crystal', name: 'Holy Crystal', thName: 'คริสตัลเขียว เพิ่มพลังเวทสูงสุด +35%', shortTag: '💎 ขยายพลังเวททั้งหมดขึ้น 21%–35%', img: 'assets/items/holy_crystal.png', stats: '+185 พลังเวท' },
  { id: 'genius_wand', name: 'Genius Wand', thName: 'คทาเจาะเกราะเวท + ลดเกราะเวทศัตรู', shortTag: '🔮 เจาะเกราะเวท + ลดเกราะเวทศัตรูเมื่อทำดาเมจ', img: 'assets/items/genius_wand.png', stats: '+75 พลังเวท • +5% ความเร็วเคลื่อนที่ • +10 เจาะเกราะเวท' },
  { id: 'lightning_truncheon', name: 'Lightning Truncheon', thName: 'คทาสายฟ้า ระเบิดเวทหมู่ + วิ่งเร็ว', shortTag: '⚡ สกิลชิ่งสายฟ้าหมู่ตามพลังเวท + วิ่งเร็ว 30%', img: 'assets/items/lightning_truncheon.png', stats: '+75 พลังเวท • +400 มานา • +10% ลดคูลดาวน์' },
  { id: 'blood_wings', name: 'Blood Wings', thName: 'ปีกเลือดเกราะขาวเวท + วิ่งเร็ว', shortTag: '🪽 มอบเกราะขาวตามพลังเวท + วิ่งเร็วเมื่อเกราะอยู่', img: 'assets/items/blood_wings.png', stats: '+90 พลังเวท' },
  { id: 'enchanted_talisman', name: 'Enchanted Talisman', thName: 'สมุดเวท ลดคูลดาวน์สูงสุด 25% + รีมานา', shortTag: '📖 ลดคูลดาวน์ 20% (ขยายเพดานเป็น 45%) + มานาไม่จำกัด', img: 'assets/items/enchanted_talisman.png', stats: '+50 พลังเวท • +250 HP • +20% ลดคูลดาวน์' },
  { id: 'concentrated_energy', name: 'Concentrated Energy', thName: 'คทาดูดเลือดเวท + สแต็กพลังเวทต่อเนื่อง', shortTag: '🔮 Hybrid Lifesteal 20% + ยิ่งตียิ่งแรงขึ้น 12%', img: 'assets/items/concentrated_energy.png', stats: '+70 พลังเวท • +400 HP • +20% Hybrid Lifesteal' },
  { id: 'feather_of_heaven', name: 'Feather of Heaven', thName: 'ขนนกตีเร็วเวท + ดูดเลือด', shortTag: '🪶 โจมตีปกติทำดาเมจเวทเสริม + เร่งความเร็วโจมตี', img: 'assets/items/feather_of_heaven.png', stats: '+55 พลังเวท • +20% ความเร็วโจมตี • +10% Lifesteal • +5% ลดคูลดาวน์' },
  { id: 'ice_queen_wand', name: 'Ice Queen Wand', thName: 'คทาน้ำแข็ง สกิลเวทสโลว์ 30% ต่อเนื่อง', shortTag: '❄️ สกิลเวทสโลว์ศัตรูสูงสุด 30% + Spell Vamp', img: 'assets/items/ice_queen_wand.png', stats: '+75 พลังเวท • +300 HP • +10% Spell Vamp • +7% ความเร็วเคลื่อนที่' }
];
const ALL_ITEMS_BY_ID = new Map([
  ...COUNTER_ITEMS_DB.map(i => [i.id, i]),
  ...CORE_META_ITEMS_DB.map(i => [i.id, i])
]);

// Return the 6-Item Pro Meta Core Build for any of the 133 Heroes (with real item images & Thai meta notes)
function getRecommendedCoreBuildForHero(hero) {
  if (!hero) return { title: 'Standard Meta Build', note: '', items: [] };
  const name = hero.name;
  const pickItems = (ids) => ids.map(id => ALL_ITEMS_BY_ID.get(id)).filter(Boolean);

  // 1. Healer & Shield Roam Supports (Flask of the Oasis + Fleeting Time Meta)
  if (['Estes', 'Floryn', 'Rafaela', 'Angela', 'Mathilda', 'Marcel', 'Diggie'].includes(name)) {
    return {
      title: 'เซ็ตเมต้าซัพพอร์ต (Flask of the Oasis + Fleeting Time)',
      note: 'ออกขวดน้ำ Flask of the Oasis เด้งเกราะฉุกเฉินกันเพื่อนโดนล้วง คู่กับ Fleeting Time ลดคูลดาวน์อัลติ 30% และของตัดเลือด',
      items: pickItems(['flask_of_the_oasis', 'fleeting_time', 'dominance_ice', 'glowing_wand', 'oracle', 'immortality'])
    };
  }

  // 2. Thunder Belt Raid-Boss Tanks & Setters (Thunder Belt Stacking Meta)
  if (['Hylos', 'Belerick', 'Gatotkaca', 'Edith', 'Badang', 'Carmilla', 'Khufra', 'Tigreal', 'Atlas', 'Minotaur', 'Lolita', 'Akai', 'Barats', 'Gloo', 'Baxia', 'Johnson', 'Chip', 'Kalea', 'Franco', 'Kaja', 'Grock'].includes(name)) {
    const usesFleeting = ['Tigreal', 'Atlas', 'Carmilla', 'Badang', 'Johnson', 'Minotaur', 'Kaja', 'Franco', 'Kalea'].includes(name);
    const usesGlowing = ['Hylos', 'Belerick', 'Gatotkaca', 'Baxia', 'Gloo', 'Alice'].includes(name);
    return {
      title: 'เซ็ตเมต้าเข็มขัดสายฟ้า (Thunder Belt Stacking Raid Boss)',
      note: 'ออก Thunder Belt ชิ้นแรกเพื่อเก็บสแต็กเกราะกายภาพและเวทถาวรตลอดเกม พร้อมทำ True Damage และสโลว์ 99% ทุก 4 วินาที',
      items: pickItems([
        'thunder_belt',
        'dominance_ice',
        usesFleeting ? 'fleeting_time' : (usesGlowing ? 'glowing_wand' : 'cursed_helmet'),
        'athenas_shield',
        'blade_armor',
        'immortality'
      ])
    };
  }

  // 3. Trinity Attack-Speed Tank-Shredder Marksmen & Fighters
  if (['Karrie', 'Claude', 'Wanwan', 'Melissa', 'Obsidia', 'Sun', 'Masha', 'Argus', 'Zilong'].includes(name)) {
    return {
      title: 'เซ็ตเมต้า 3 ดาบตีเร็วละลายแทงค์ (Trinity DHS + Malefic Gun)',
      note: 'คอมโบ Corrosion Scythe + Demon Hunter Sword + Golden Staff ซอย % เลือดแทงค์ พร้อมปืนใหม่ Malefic Gun เพิ่มระยะยิง 15%',
      items: pickItems(['corrosion_scythe', 'demon_hunter_sword', 'golden_staff', 'malefic_gun', 'wind_of_nature', 'rose_gold_meteor'])
    };
  }

  // 4. Crit + Malefic Gun Hypercarry Marksmen
  if (['Layla', 'Miya', 'Bruno', 'Ixia', 'Moskov', 'Irithel', 'Hanabi', 'Freya', 'Aulus'].includes(name)) {
    return {
      title: 'เซ็ตเมต้าคริติคอลระยะไกล (Malefic Gun + Rose Gold Revamp)',
      note: 'ใช้ Malefic Gun เพิ่มระยะยิงปกติ 15% + เจาะเกราะ 30% ยืนยิงฟรีจากแนวหลัง คู่กับ Haas\'s Claws และ Rose Gold Meteor โฉมใหม่',
      items: pickItems(['haas_claws', 'berserkers_fury', 'malefic_gun', 'sea_halberd', 'wind_of_nature', 'rose_gold_meteor'])
    };
  }

  // 4b. Popol and Kupa (Revamped Icefield Companions — Synchronized Attack Speed + Mounting Kupa)
  if (name === 'Popol and Kupa') {
    return {
      title: 'เซ็ตเมต้า Popol & Kupa Revamped (ตีเร็วคริติคอล + ขี่หลังหมาไล่ล่า)',
      note: 'สกิลปรับใหม่ (Revamped): พาสซีฟเมื่อรุมตีเป้าเดียวกันกับ Kupa จะได้โบนัสตีเร็ว+วิ่งเร็ว และสกิล 2 กระโดดขี่หลัง Kupa วิ่งไล่ล่าได้ จึงออก Corrosion Scythe + คริติคอล + Malefic Gun ให้ Kupa รับผลไอเทมกัดรัวละลายทั้งคนและป้อม!',
      items: pickItems(['corrosion_scythe', 'haas_claws', 'berserkers_fury', 'malefic_gun', 'sea_halberd', 'wind_of_nature'])
    };
  }

  // 5. Skill-Caster / Burst Marksmen (Granger Revamp, Brody, Clint, Beatrix, Lesley, Roger, YSS)
  if (['Granger', 'Brody', 'Clint', 'Beatrix', 'Lesley', 'Roger', 'Yi Sun-shin'].includes(name)) {
    return {
      title: 'เซ็ตเมต้าปืนใหญ่ประหาร (Sky Piercer + Hunter Strike + Malefic Gun)',
      note: 'ใช้ Sky Piercer สั่งประหารศัตรูที่เลือดต่ำกว่า 12% ทันที คู่กับ Hunter Strike และ Malefic Gun/Endless Battle ยิงทะลุเกราะ',
      items: pickItems(['sky_piercer', 'hunter_strike', 'endless_battle', 'malefic_gun', 'blade_of_despair', 'rose_gold_meteor'])
    };
  }

  // 6. Starlight / Attack-Speed / Sustain Hybrid Mages (Harith, Kimmy, Natan, Alice, Esmeralda, Guinevere, Silvanna, Zhask, Chang'e)
  if (['Harith', 'Kimmy', 'Natan', 'Alice', 'Esmeralda', 'Guinevere', 'Silvanna', 'Zhask', 'Chang\'e'].includes(name)) {
    const isBasicAtkMage = ['Harith', 'Kimmy', 'Natan', 'Zhask', 'Chang\'e'].includes(name);
    return {
      title: 'เซ็ตเมต้าเวทไฮบริดดูดเลือด & ตีต่อเนื่อง (Concentrated Energy + Glowing Wand)',
      note: 'เน้นสแปมสกิลและดูดเลือดเวทด้วย Concentrated Energy คู่กับ Glowing Wand ตัดเลือด 50% และ Holy Crystal',
      items: pickItems([
        isBasicAtkMage ? 'feather_of_heaven' : 'enchanted_talisman',
        'concentrated_energy',
        'glowing_wand',
        'holy_crystal',
        'divine_glaive',
        'blood_wings'
      ])
    };
  }

  // 7. Magic Assassins & Dive Burst Mages (Gusion, Aamon, Karina, Harley, Joy, Julian, Selena, Kadita)
  if (['Gusion', 'Aamon', 'Karina', 'Harley', 'Joy', 'Julian', 'Selena', 'Kadita'].includes(name)) {
    return {
      title: 'เซ็ตเมต้านักฆ่าเวทประหาร (Sky Piercer + Genius Wand + Holy Crystal)',
      note: 'ออก Sky Piercer เก็บสแต็กประหารศัตรูทันทีที่เลือดต่ำกว่า 12% คู่กับ Genius Wand เจาะเกราะเวท และ Winter Crown กดแช่แข็งหลบสวน',
      items: pickItems(['sky_piercer', 'genius_wand', 'glowing_wand', 'holy_crystal', 'divine_glaive', 'winter_crown'])
    };
  }

  // 8. Control & Artillery Mid Lane Mages (Zhuxin, Zetian, Aurora, Eudora, Cecilion, Vexana, Xavier, Yve, Valir, Luo Yi, Valentina, Novaria, Pharsa, Odette, Nana, Lylia, Gord, Vale, Kagura, Lunox, Cyclops, Faramis)
  if (hero.roles.includes('Mage')) {
    const isControlBurn = ['Zhuxin', 'Yve', 'Valir', 'Lylia', 'Gord', 'Odette', 'Vexana', 'Aurora', 'Zetian'].includes(name);
    return {
      title: 'เซ็ตเมต้าเมจเผา %HP & โคมผีเสื้อ (Glowing Wand + Wishing Lantern)',
      note: 'คอมโบเมต้าเมจยุคใหม่: Glowing Wand เผาตัดเลือด 50% + Wishing Lantern ปล่อยผีเสื้อระเบิด 8% Max HP ละลายได้ทั้งตัวบางและแทงค์',
      items: pickItems([
        isControlBurn ? 'enchanted_talisman' : 'lightning_truncheon',
        'glowing_wand',
        'wishing_lantern',
        'holy_crystal',
        'divine_glaive',
        'winter_crown'
      ])
    };
  }

  // 9. Physical Burst Assassins (Fanny, Hayabusa, Ling, Nolan, Suyou, Hirara, Saber, Lancelot, Helcurt, Natalia, Benedetta, Paquito, Yin, Dyrroth, Chou)
  if (hero.roles.includes('Assassin') || ['Suyou', 'Hirara', 'Paquito', 'Yin', 'Dyrroth', 'Chou'].includes(name)) {
    return {
      title: 'เซ็ตเมต้าแอสซาซินล้วงประหาร (Sky Piercer + Heptaseas + Hunter Strike)',
      note: 'คอมโบเจาะเกราะล้วงแนวหลังชุดเดียวหาย พร้อม Sky Piercer ประหารทันทีไม่ให้แครี่กดดูดเลือดหรือกดแช่แข็งทัน',
      items: pickItems(['sky_piercer', 'blade_of_the_heptaseas', 'hunter_strike', 'malefic_roar', 'blade_of_despair', 'rose_gold_meteor'])
    };
  }

  // 10. Sustain & Teamfight EXP Bruisers (Lukas, Ruby, Yu Zhong, Alpha, Terizla, Lapu-Lapu, Cici, Arlott, X.Borg, Thamuz, Phoveus, Sora, Fredrinn, Balmond, Alucard, Leomord, Khaleed, Hilda, Minsitthar, Martis, Aldous, Bane, Uranus)
  return {
    title: 'เซ็ตเมต้าไฟต์เตอร์ยืนชนอมตะ (War Axe + Queen\'s Wings + Thunder Belt)',
    note: 'คอมโบไฟต์เตอร์เมต้าใหม่: War Axe ทำ True Damage + Queen\'s Wings ลดดาเมจ 30% ตอนเลือดน้อย + Oracle เพิ่มฮีล 30% สู้ของตัดเลือด',
    items: pickItems(['war_axe', 'thunder_belt', 'queens_wings', 'oracle', 'sea_halberd', 'immortality'])
  };
}

// Complete 133-Hero Battle Spell Profiles (Non-Jungle Lane Spells; any hero in Jungle automatically gets Retribution)

// ==================== MLBB OFFICIAL EMBLEM & TALENT SYSTEM ====================
const EMBLEM_ASSETS = {
  emblems: {
    assassin: { name: 'Assassin Emblem', thName: 'Assassin Emblem (+Adaptive Pen & Atk)', img: 'assets/emblems/assassin_emblem.png' },
    mage: { name: 'Mage Emblem', thName: 'Mage Emblem (+Magic Power & Pen)', img: 'assets/emblems/mage_emblem.png' },
    fighter: { name: 'Fighter Emblem', thName: 'Fighter Emblem (+Spell Vamp & Hybrid Def)', img: 'assets/emblems/fighter_emblem.png' },
    tank: { name: 'Tank Emblem', thName: 'Tank Emblem (+HP & Hybrid Def)', img: 'assets/emblems/tank_emblem.png' },
    marksman: { name: 'Marksman Emblem', thName: 'Marksman Emblem (+Atk Speed & Adaptive Atk)', img: 'assets/emblems/marksman_emblem.png' },
    support: { name: 'Support Emblem', thName: 'Support Emblem (+Healing Effect & CDR)', img: 'assets/emblems/support_emblem.png' },
    common: { name: 'Common Emblem', thName: 'Common Emblem (+Hybrid Regen & HP)', img: 'assets/emblems/common_emblem.png' }
  },
  talents: {
    // Tier 1 Talents
    thrill: { name: 'Thrill', desc: '+16 พลังโจมตี/เวท Adaptive', img: 'assets/emblems/thrill.png' },
    swift: { name: 'Swift', desc: '+10% ความเร็วโจมตี', img: 'assets/emblems/swift.png' },
    vitality: { name: 'Vitality', desc: '+225 HP สูงสุด', img: 'assets/emblems/vitality.png' },
    firmness: { name: 'Firmness', desc: '+6 เกราะกายภาพ & เวท', img: 'assets/emblems/firmness.png' },
    agility: { name: 'Agility', desc: '+4% ความเร็วเคลื่อนที่', img: 'assets/emblems/agility.png' },
    inspire: { name: 'Inspire', desc: '+5% ลดคูลดาวน์', img: 'assets/emblems/inspire.png' },
    rupture: { name: 'Rupture', desc: '+5 เจาะเกราะ Adaptive', img: 'assets/emblems/rupture.png' },
    // Tier 2 Talents
    seasoned_hunter: { name: 'Seasoned Hunter', desc: '+15% ดาเมจใส่ครีปป่า/เต่า/ลอร์ด (ฟาร์มไวมาก)', img: 'assets/emblems/seasoned_hunter.png' },
    festival_of_blood: { name: 'Festival of Blood', desc: '+6%–10% Spell Vamp ดูดเลือดจากสกิล', img: 'assets/emblems/festival_of_blood.png' },
    pull_yourself_together: { name: 'Pull Yourself Together', desc: '-15% คูลดาวน์สเปลและไอเทมกดใช้', img: 'assets/emblems/pull_yourself_together.png' },
    bargain_hunter: { name: 'Bargain Hunter', desc: 'ลดราคาซื้อไอเทมในร้าน 5%', img: 'assets/emblems/bargain_hunter.png' },
    weapons_master: { name: 'Weapons Master', desc: '+5% พลังโจมตี/เวทจากไอเทม', img: 'assets/emblems/weapons_master.png' },
    wilderness_blessing: { name: 'Wilderness Blessing', desc: '+10% วิ่งไวขึ้นในแม่น้ำและป่า', img: 'assets/emblems/wilderness_blessing.png' },
    tenacity: { name: 'Tenacity', desc: 'เลือดต่ำกว่า 50% เพิ่มเกราะ +15', img: 'assets/emblems/tenacity.png' },
    master_assassin: { name: 'Master Assassin', desc: 'ศัตรูอยู่เดี่ยว ทำดาเมจแรงขึ้น 7%', img: 'assets/emblems/master_assassin.png' },
    // Tier 3 Core Talents
    killing_spree: { name: 'Killing Spree', desc: 'ฆ่าศัตรูฟื้นฟูเลือด 8% + วิ่งเร็ว 15%', img: 'assets/emblems/killing_spree.png' },
    war_cry: { name: 'War Cry', desc: 'โจมตี 3 ฮิต เพิ่มดาเมจทุกชนิด 8% นาน 6 วิ (Meta Core)', img: 'assets/emblems/war_cry.png' },
    lethal_ignition: { name: 'Lethal Ignition', desc: 'ดาเมจ 3 ครั้งเกิน 7% เผาทำลายซ้ำ (เบิร์สต์เมจ/แอสซาซิน)', img: 'assets/emblems/lethal_ignition.png' },
    impure_rage: { name: 'Impure Rage', desc: 'สกิลโดนทำดาเมจเสริมตามเลือด + รีมานา (เมจโป๊ก)', img: 'assets/emblems/impure_rage.png' },
    brave_smite: { name: 'Brave Smite', desc: 'ใช้สกิลโดนศัตรูฟื้นฟู HP 4% (คูลดาวน์ 6 วิ)', img: 'assets/emblems/brave_smite.png' },
    quantum_charge: { name: 'Quantum Charge', desc: 'โจมตีปกติเร่งวิ่ง 30% + ฟื้นฟู HP (ไคท์ศัตรู)', img: 'assets/emblems/quantum_charge.png' },
    weakness_finder: { name: 'Weakness Finder', desc: 'โจมตีปกติสโลว์ศัตรู 50% + ลดสปีดตี 30%', img: 'assets/emblems/weakness_finder.png' },
    concussive_blast: { name: 'Concussive Blast', desc: 'ตีหลังสกิลระเบิดเวทตาม Max HP (แทงค์เคลียร์เวฟ/เบิร์สต์)', img: 'assets/emblems/concussive_blast.png' },
    temporal_reign: { name: 'Temporal Reign', desc: 'กดอัลติรีคูลดาวน์สกิลอื่นทันที 1.5 วิ + ต่อเนื่อง 4 วิ (เมต้าใหม่)', img: 'assets/emblems/temporal_reign.png' },
    focusing_mark: { name: 'Focusing Mark', desc: 'โจมตีศัตรู เพื่อนร่วมทีมทำดาเมจใส่ตัวนั้นแรงขึ้น 6%', img: 'assets/emblems/focusing_mark.png' }
  }
};

function getRecommendedEmblemForHero(hero, assignedLane) {
  if (!hero) return null;
  const name = hero.name;
  const roles = hero.roles || [];
  const lane = assignedLane || (hero.lanes && hero.lanes[0]) || 'Mid Lane';
  const isJungle = lane === 'Jungle';
  const isRoam = lane === 'Roam';
  const E = EMBLEM_ASSETS.emblems;
  const T = EMBLEM_ASSETS.talents;

  const buildRes = (title, emblemKey, t1Key, t2Key, t3Key) => ({
    title,
    mainImg: E[emblemKey].img,
    mainName: E[emblemKey].name,
    mainTh: E[emblemKey].thName,
    talent1: T[t1Key],
    talent2: T[t2Key],
    talent3: T[t3Key]
  });

  // Specific Meta Champions
  if (['Estes', 'Floryn', 'Rafaela', 'Angela'].includes(name)) {
    return buildRes('เมต้าฮีล & บัฟทีม (Support + Focusing Mark)', 'support', 'agility', 'pull_yourself_together', 'focusing_mark');
  }
  if (['Mathilda', 'Diggie', 'Marcel', 'Faramis', 'Chip'].includes(name)) {
    return buildRes('เมต้าซัพพอร์ตเปิดไฟต์ (Support + Temporal Reign)', 'support', 'agility', 'pull_yourself_together', 'temporal_reign');
  }
  if (['Tigreal', 'Atlas', 'Minotaur', 'Khufra', 'Lolita', 'Carmilla', 'Akai', 'Grock'].includes(name)) {
    const t3 = ['Tigreal', 'Atlas'].includes(name) ? 'temporal_reign' : 'concussive_blast';
    return buildRes('เมต้าแทงค์เปิดจังหวะ (Tank + CC Burst)', 'tank', 'firmness', 'tenacity', t3);
  }
  if (['Hylos', 'Belerick', 'Gatotkaca', 'Edith', 'Baxia', 'Gloo', 'Barats'].includes(name)) {
    if (isJungle) return buildRes('เมต้าแทงค์ป่า (Tank Jungle + Seasoned Hunter)', 'tank', 'vitality', 'seasoned_hunter', 'concussive_blast');
    return buildRes('เมต้าแทงค์เรดบอส (Tank Raid Boss + Brave Smite)', 'tank', 'vitality', 'tenacity', 'brave_smite');
  }
  if (name === 'Zhuxin') {
    return buildRes('เมต้า Zhuxin พายุยกต่อเนื่อง (Support + Impure Rage)', 'support', 'agility', 'bargain_hunter', 'impure_rage');
  }
  if (name === 'Suyou') {
    if (isJungle) return buildRes('เมต้า Suyou ป่า 3 สเต็ป (Assassin + Seasoned Hunter)', 'assassin', 'rupture', 'seasoned_hunter', 'war_cry');
    return buildRes('เมต้า Suyou ออฟเลน (Assassin + War Cry)', 'assassin', 'rupture', 'master_assassin', 'war_cry');
  }
  if (['Ling', 'Fanny', 'Hayabusa', 'Nolan', 'Lancelot', 'Helcurt', 'Saber', 'Gusion', 'Aamon', 'Joy', 'Hirara'].includes(name)) {
    if (isJungle) return buildRes('เมต้าแอสซาซินป่าล้วงไว (Assassin + Seasoned Hunter)', 'assassin', 'rupture', 'seasoned_hunter', 'killing_spree');
    return buildRes('เมต้าแอสซาซินเบิร์สต์เดี่ยว (Assassin + Master Assassin)', 'assassin', 'rupture', 'master_assassin', 'killing_spree');
  }
  if (name === 'Claude') {
    return buildRes('เมต้า Claude โดดสกิลไคท์ (Assassin + Quantum Charge)', 'assassin', 'agility', 'bargain_hunter', 'quantum_charge');
  }
  if (['Karrie', 'Wanwan', 'Melissa', 'Moskov', 'Miya'].includes(name)) {
    return buildRes('เมต้าแครี่ตีเร็วแทงค์ละลาย (Marksman + Weakness Finder)', 'marksman', 'swift', 'weapons_master', 'weakness_finder');
  }
  if (['Brody', 'Clint', 'Beatrix', 'Lesley', 'Bruno', 'Ixia', 'Granger', 'Popol and Kupa'].includes(name)) {
    if (isJungle) return buildRes('เมต้าแครี่ป่าเบิร์สต์ (Assassin + Seasoned Hunter)', 'assassin', 'rupture', 'seasoned_hunter', 'war_cry');
    return buildRes('เมต้าแครี่เบิร์สต์กายภาพ (Assassin + Quantum Charge)', 'assassin', 'rupture', 'weapons_master', 'quantum_charge');
  }
  if (['Terizla', 'Yu Zhong', 'Ruby', 'Thamuz', 'Alpha', 'Lapu-Lapu', 'Paquito', 'Dyrroth', 'Arlott', 'Benedetta', 'Cici', 'Khaleed', 'Silvanna', 'Guinevere', 'Freya'].includes(name)) {
    if (isJungle) return buildRes('เมต้าไฟต์เตอร์ป่าดูดเลือด (Fighter + Seasoned Hunter)', 'fighter', 'rupture', 'seasoned_hunter', 'war_cry');
    return buildRes('เมต้าไฟต์เตอร์ชนเลนดูดเลือด (Fighter + Festival of Blood)', 'fighter', 'firmness', 'festival_of_blood', 'war_cry');
  }
  if (['Kagura', 'Kadita', 'Eudora', 'Aurora', 'Vexana', 'Pharsa', 'Xavier', 'Vale', 'Lunox', 'Nana', 'Odette', 'Cecilion', 'Valentina'].includes(name)) {
    return buildRes('เมต้าเมจเบิร์สต์นัดเดียวหาย (Mage + Lethal Ignition)', 'mage', 'rupture', 'bargain_hunter', 'lethal_ignition');
  }
  if (['Lylia', 'Chang\'e', 'Valir', 'Novaria', 'Yve', 'Gord', 'Cyclops'].includes(name)) {
    return buildRes('เมต้าเมจโป๊กตอดเลือดต่อเนื่อง (Mage + Impure Rage)', 'mage', 'inspire', 'bargain_hunter', 'impure_rage');
  }
  if (name === 'Harith') {
    return buildRes('เมต้า Harith พุ่งสแปมสกิล (Mage + War Cry)', 'mage', 'inspire', 'bargain_hunter', 'war_cry');
  }

  // Fallbacks by Role / Lane
  if (isRoam) {
    if (roles.includes('Tank')) return buildRes('เมต้าแทงค์โรมมิ่ง (Tank + Concussive Blast)', 'tank', 'firmness', 'tenacity', 'concussive_blast');
    return buildRes('เมต้าซัพพอร์ตโรมมิ่ง (Support + Focusing Mark)', 'support', 'agility', 'pull_yourself_together', 'focusing_mark');
  }
  if (isJungle) {
    if (roles.includes('Mage')) return buildRes('เมต้าเมจป่าฟาร์มไว (Mage + Seasoned Hunter)', 'mage', 'thrill', 'seasoned_hunter', 'lethal_ignition');
    if (roles.includes('Tank')) return buildRes('เมต้าแทงค์ป่า (Tank + Seasoned Hunter)', 'tank', 'vitality', 'seasoned_hunter', 'concussive_blast');
    return buildRes('เมต้าป่าฟาร์มไวเคลียร์ออบเจ็กต์ (Assassin + Seasoned Hunter)', 'assassin', 'rupture', 'seasoned_hunter', 'killing_spree');
  }
  if (roles.includes('Marksman')) {
    return buildRes('เมต้าแครี่ดาเมจสูง (Marksman + War Cry)', 'marksman', 'swift', 'weapons_master', 'war_cry');
  }
  if (roles.includes('Mage')) {
    return buildRes('เมต้าพลังเวทเบิร์สต์ (Mage + Lethal Ignition)', 'mage', 'rupture', 'bargain_hunter', 'lethal_ignition');
  }
  if (roles.includes('Tank')) {
    return buildRes('เมต้าแทงค์เกราะหนา (Tank + Brave Smite)', 'tank', 'firmness', 'tenacity', 'brave_smite');
  }
  if (roles.includes('Support')) {
    return buildRes('เมต้าซัพพอร์ต (Support + Focusing Mark)', 'support', 'agility', 'pull_yourself_together', 'focusing_mark');
  }
  // Default Fighter / Assassin
  return buildRes('เมต้าไฟต์เตอร์ออลราวด์ (Fighter + War Cry)', 'fighter', 'rupture', 'festival_of_blood', 'war_cry');
}

const HERO_SPELL_PROFILES = {
  // === Petrify / Flicker Combo Specialists ===
  'kadita':     { primary: 'Petrify', valid: ['Petrify', 'Flicker'], note: 'สเปลบังคับของ Kadita: ใช้ S1 พุ่ง + Petrify สตั๊นหิน (หรือ Flicker) ต่อด้วยอัลติคลื่นยักษ์' },
  'yu zhong':   { primary: 'Petrify', valid: ['Petrify', 'Vengeance', 'Flicker'], note: 'สเปลหลัก Yu Zhong: ใช้ S3 กระโดดทุบ + Petrify สตั๊นหินกลางวงอย่างแม่นยำ' },
  'benedetta':  { primary: 'Petrify', valid: ['Petrify', 'Vengeance', 'Execute'], note: 'สเปลหลัก Benedetta (EXP): กางอัลติ Alecto + กด Petrify ล็อกศัตรูให้อยู่ในวงดาบ' },
  'arlott':     { primary: 'Petrify', valid: ['Petrify', 'Flicker', 'Flameshot', 'Vengeance'], note: 'สเปลหลัก Arlott: กด Petrify แปะมาร์กให้พุ่งสกิล 2 Vengeance ซ้ำได้ทันที (หรือใช้ Flicker รวบอัลติ)' },
  'dyrroth':    { primary: 'Petrify', valid: ['Petrify', 'Flicker', 'Vengeance', 'Execute'], note: 'สเปลหลัก Dyrroth (EXP): กด Petrify สตั๊นศัตรูขณะชาร์จอัลติ Abysm Strike ให้โดนเต็มดาเมจ' },
  'yin':        { primary: 'Petrify', valid: ['Petrify', 'Flicker', 'Execute'], note: 'สเปลหลัก Yin (EXP): กด Petrify สตั๊นศัตรูในมิติอัลติ My Turn ไม่ให้วิ่งหนีพ้นหมัดรัว' },
  'julian':     { primary: 'Petrify', valid: ['Petrify', 'Flicker', 'Vengeance'], note: 'สเปลหลัก Julian (Mid/EXP): ใช้ Petrify หรือ Flicker ล็อกเป้าต่อคอมโบสกิลเสริมพลัง' },
  'helcurt':    { primary: 'Petrify', valid: ['Petrify', 'Execute', 'Flicker'], note: 'สเปลหลัก Helcurt (Roam): พุ่งเข้ามาพร้อม Petrify หรือ Execute ปิดดาเมจแนวหลัง' },

  // === Flicker Combo Fighters & Initiators (EXP / Roam) ===
  'lapu-lapu':  { primary: 'Flicker', valid: ['Flicker', 'Vengeance'], note: 'สเปลบังคับของ Lapu-Lapu: ใช้ Flicker ขยับจังหวะทุบอัลติ Bravest Fighter ล้วงแนวหลัง' },
  'ruby':       { primary: 'Flicker', valid: ['Flicker', 'Vengeance', 'Petrify'], note: 'สเปลหลัก Ruby: ใช้คอมโบอัลติ I\'m Offended! + Flicker ดึงรวบศัตรูเข้าป้อมหรือกลางวงเพื่อน' },
  'chou':       { primary: 'Flicker', valid: ['Flicker', 'Petrify'], note: 'สเปลบังคับของ Chou: ใช้ Flicker ต่อระยะเตะอัลติ The Way of Dragon เตะส่งให้ทีม' },
  'terizla':    { primary: 'Flicker', valid: ['Flicker', 'Vengeance'], note: 'สเปลหลัก Terizla: ใช้คอมโบกระโดดอัลติ Penalty Zone + Flicker ทุบล็อกหมู่ระยะไกล' },
  'paquito':    { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Execute'], note: 'สเปลหลัก Paquito (EXP): ใช้ Flicker ต่อจังหวะหมัดอัลติ Knockout Strike แบบไม่ทันตั้งตัว' },
  'guinevere':  { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Execute'], note: 'สเปลหลัก Guinevere: ใช้สกิล 2 Spatial Migration + Flicker กระโดดงัดลอยแบบหลบไม่ทัน' },
  'badang':     { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Sprint'], note: 'สเปลหลัก Badang: ใช้ Flicker พุ่งไปกางกำแพง S2 + อัลติต่อยรัวติดกำแพง' },
  'minsitthar': { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Vengeance'], note: 'สเปลหลัก Minsitthar: ใช้หอก S1 + Flicker ดึง หรือพุ่งกางอัลติ King\'s Calling ห้ามแดช' },
  'edith':      { primary: 'Flicker', valid: ['Flicker', 'Inspire', 'Vengeance'], note: 'สเปลหลัก Edith: ใช้ Flicker พุ่งงัด S2 + S1 เปิดไฟต์ หรือใช้ Inspire ยิงตอนแปลงร่าง' },
  'phoveus':    { primary: 'Flicker', valid: ['Flicker', 'Vengeance', 'Petrify'], note: 'สเปลหลัก Phoveus: ใช้ Flicker หรือ Vengeance เข้าเปิดจังหวะกระโดดทุบต่อเนื่อง' },
  'x.borg':     { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Vengeance'], note: 'สเปลหลัก X.Borg: ใช้ Flicker พุ่งเข้ากลางวงศัตรูจังหวะระเบิดอัลติ Last Insanity' },
  'silvanna':   { primary: 'Flicker', valid: ['Flicker', 'Vengeance', 'Petrify'], note: 'สเปลหลัก Silvanna: ใช้ Flicker ขยายระยะกระโดดขังอัลติ Imperial Justice' },
  'jawhead':    { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Execute'], note: 'สเปลหลัก Jawhead (Roam/EXP): ใช้ Flicker พุ่งไปกด S2 Ejector โยนศัตรูกลับมาให้ทีม' },
  'aldous':     { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Vengeance'], note: 'สเปลหลัก Aldous: ใช้ Flicker ต่อย S1 Soul Steal ใส่แครี่/เมจที่พยายามแฟลชหนี' },
  'suyou':      { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Vengeance'], note: 'สเปลหลัก Suyou (EXP): ใช้ Flicker หรือ Petrify ต่อคอมโบสกิล (หากเล่นป่าใช้ Retribution)' },
  'sora':       { primary: 'Flicker', valid: ['Flicker', 'Vengeance', 'Petrify'], note: 'สเปลหลัก Sora: ใช้ Flicker หรือ Vengeance เข้าทำจังหวะไฟต์ระยะประชิด' },
  'martis':     { primary: 'Flicker', valid: ['Flicker', 'Vengeance', 'Petrify'], note: 'สเปลหลัก Martis (EXP): ใช้ Flicker พุ่งสับอัลติ Decimation ปิดสกอร์ต่อเนื่อง' },
  'bane':       { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Purify'], note: 'สเปลหลัก Bane (เลน): ใช้ Flicker เปลี่ยนมุมคลื่นฉลาม Deadly Catch' },
  'gloo':       { primary: 'Flicker', valid: ['Flicker', 'Vengeance', 'Sprint'], note: 'สเปลหลัก Gloo: ใช้ Flicker พุ่งดึงศัตรูกลับเข้าหาทีมตอนเกาะร่างอัลติ' },
  'barats':     { primary: 'Flicker', valid: ['Flicker', 'Vengeance', 'Sprint'], note: 'สเปลหลัก Barats (EXP): ใช้ Flicker ขยับพาตัวที่โดนกลืนด้วยอัลติไปกระแทกกำแพง' },
  'khaleed':    { primary: 'Flicker', valid: ['Flicker', 'Execute', 'Petrify', 'Vengeance'], note: 'สเปลหลัก Khaleed: ใช้ Flicker ต่อระยะอัลติพายุทราย Raging Sandstorm หรือใช้ Execute' },

  // === Vengeance / Sustain Frontline Specialists ===
  'belerick':   { primary: 'Vengeance', valid: ['Vengeance', 'Flicker', 'Revitalize'], note: 'สเปลบังคับของ Belerick: กด Vengeance สะท้อนดาเมจคู่กับหนามพาสซีฟและอัลติยั่วยุ' },
  'gatotkaca':  { primary: 'Vengeance', valid: ['Vengeance', 'Flicker'], note: 'สเปลหลัก Gatotkaca: กด Vengeance รับดาเมจสะสม Rage แล้วทุบพาสซีฟสวนกลับอย่างรุนแรง' },
  'thamuz':     { primary: 'Vengeance', valid: ['Vengeance', 'Inspire', 'Flicker'], note: 'สเปลหลัก Thamuz: กด Vengeance คู่อัลติ Cauterant Inferno ยืนชนแลกเลือดกลางวง' },
  'lukas':      { primary: 'Vengeance', valid: ['Vengeance', 'Flicker', 'Petrify'], note: 'สเปลหลัก Lukas (EXP): กด Vengeance ยืนชนในร่างสัตว์อสูร (หากเล่นป่าใช้ Retribution)' },
  'fredrinn':   { primary: 'Vengeance', valid: ['Vengeance', 'Flicker'], note: 'สเปลหลัก Fredrinn (EXP): กด Vengeance รับดาเมจสะสมหลอดเทาเพื่อฟาดอัลติสวน (หากเล่นป่าใช้ Retribution)' },
  'cici':       { primary: 'Vengeance', valid: ['Vengeance', 'Sprint', 'Flicker'], note: 'สเปลหลัก Cici: ใช้ Vengeance หรือ Sprint วิ่งไคต์โยโย่รอบไฟต์อย่างพริ้วไหว' },
  'alpha':      { primary: 'Vengeance', valid: ['Vengeance', 'Flicker', 'Petrify'], note: 'สเปลหลัก Alpha (EXP): ใช้ Vengeance ยืนฟันดูดเลือด หรือ Flicker ต่ออัลติ (หากเล่นป่าใช้ Retribution)' },
  'alice':      { primary: 'Vengeance', valid: ['Vengeance', 'Flicker', 'Sprint'], note: 'สเปลหลัก Alice: กด Vengeance คู่อัลติยืนดูดเลือดและลดดาเมจกลางวงศัตรู' },
  'joy':        { primary: 'Vengeance', valid: ['Vengeance', 'Flicker'], note: 'สเปลหลัก Joy (EXP/Mid): กด Vengeance ขณะแดชเก็บจังหวะเพลงพุ่งเข้ากลางวงศัตรู' },
  'harith':     { primary: 'Vengeance', valid: ['Vengeance', 'Purify', 'Flicker'], note: 'สเปลหลัก Harith (Gold/Mid): กด Vengeance หรือ Purify ยืนแดชรัวในวงอัลติ Zaman Force' },
  'baxia':      { primary: 'Vengeance', valid: ['Vengeance', 'Flicker', 'Revitalize'], note: 'สเปลหลัก Baxia (Roam): กด Vengeance กลิ้งชนเปิดไฟต์และตัดเลือดศัตรู' },
  'balmond':    { primary: 'Vengeance', valid: ['Vengeance', 'Flicker', 'Execute'], note: 'สเปลหลัก Balmond (EXP): ใช้ Vengeance ยืนปั่นสกิล 2 รับดาเมจ (หากเล่นป่าใช้ Retribution)' },
  'alucard':    { primary: 'Vengeance', valid: ['Vengeance', 'Flicker', 'Purify'], note: 'สเปลหลัก Alucard (EXP): ใช้ Vengeance กันโดนเบิร์สต์ขณะกระโดดดูดเลือด (หากเล่นป่าใช้ Retribution)' },
  'leomord':    { primary: 'Vengeance', valid: ['Vengeance', 'Sprint', 'Flicker'], note: 'สเปลหลัก Leomord (EXP): กด Vengeance หรือ Sprint ตอนขี่ม้า Barbiel เข้ากลางไฟต์' },

  // === Inspire Basic-Attack Specialists (EXP / Gold) ===
  'masha':      { primary: 'Inspire', valid: ['Inspire', 'Sprint', 'Arrival'], note: 'สเปลหลัก Masha: กด Inspire เร่งความเร็วโจมตีทุบแครี่/เมจและตีป้อมแตกในพริบตา' },
  'sun':        { primary: 'Inspire', valid: ['Inspire', 'Petrify', 'Arrival'], note: 'สเปลหลัก Sun (EXP): กด Inspire ให้ตัวเองและร่างแยกตีรัวละลายเกราะศัตรู' },
  'argus':      { primary: 'Inspire', valid: ['Inspire', 'Flicker', 'Sprint'], note: 'สเปลบังคับของ Argus: กด Inspire คู่อัลติอมตะ Eternal Evil ฟันรัวดูดเลือดเต็มหลอด' },
  'freya':      { primary: 'Inspire', valid: ['Inspire', 'Flicker', 'Vengeance'], note: 'สเปลหลัก Freya (EXP/Gold): กด Inspire คู่อัลติ Valkyrie Descent ฟันกระจายหมู่' },
  'zilong':     { primary: 'Inspire', valid: ['Inspire', 'Sprint', 'Arrival', 'Flicker'], note: 'สเปลหลัก Zilong: กด Inspire หรือ Sprint วิ่งพุ่งแทงล้วงแนวหลังและดันป้อม' },
  'aulus':      { primary: 'Inspire', valid: ['Inspire', 'Vengeance', 'Flicker'], note: 'สเปลหลัก Aulus (EXP): กด Inspire เร่งสแต็กขวานทุบรัว (หากเล่นป่าใช้ Retribution)' },
  'miya':       { primary: 'Inspire', valid: ['Inspire', 'Flicker', 'Purify'], note: 'สเปลหลัก Miya: มีอัลติล้าง CC/หายตัวอยู่แล้ว จึงใช้ Inspire ยิงรัวทำดาเมจสูงสุด' },
  'moskov':     { primary: 'Inspire', valid: ['Inspire', 'Purify', 'Flicker'], note: 'สเปลหลัก Moskov: กด Inspire ยิงทะลุความเร็วสูงและรีเซ็ตคูลดาวน์สกิลแดช' },
  'wanwan':     { primary: 'Inspire', valid: ['Inspire', 'Purify', 'Flicker', 'Aegis'], note: 'สเปลหลัก Wanwan: มีสกิล 2 ล้าง CC ในตัว ใช้ Inspire เร่งความเร็วกระโดดผ่าจุดตายและยิงอัลติ' },
  'melissa':    { primary: 'Inspire', valid: ['Inspire', 'Purify', 'Flicker', 'Aegis'], note: 'สเปลหลัก Melissa: กด Inspire ยิงผ่านตุ๊กตา Muddles ละลายทั้งทีมศัตรู' },
  'obsidia':    { primary: 'Inspire', valid: ['Inspire', 'Flicker', 'Purify'], note: 'สเปลหลัก Obsidia: กด Inspire เร่งความเร็วโจมตีและเจาะเกราะช่วงไฟต์' },

  // === Sprint Mobility & Zone Specialists ===
  'uranus':     { primary: 'Sprint', valid: ['Sprint', 'Vengeance', 'Flicker'], note: 'สเปลหลัก Uranus: กด Sprint วิ่งต้านสโลว์ตัดเลนและรักษาสแต็กฟื้นฟูเลือดต่อเนื่อง' },
  'esmeralda':  { primary: 'Sprint', valid: ['Sprint', 'Purify', 'Vengeance'], note: 'สเปลหลัก Esmeralda: กด Sprint หรือ Purify วิ่งรำดูดเกราะขาวศัตรูโดยไม่โดนสโลว์ดัก' },
  'cecilion':   { primary: 'Sprint', valid: ['Sprint', 'Flicker', 'Purify'], note: 'สเปลหลัก Cecilion: กด Sprint คู่อัลติ Bats Feast วิ่งรักษาระยะปาค้างคาวสแต็กแรงๆ' },
  'zhuxin':     { primary: 'Sprint', valid: ['Sprint', 'Flicker', 'Purify'], note: 'สเปลหลัก Zhuxin: กด Sprint วิ่งไล่กางโคมไฟ Lantern Flare จับทุ่มศัตรูต่อเนื่อง' },
  'lylia':      { primary: 'Sprint', valid: ['Sprint', 'Purify', 'Flicker'], note: 'สเปลหลัก Lylia: กด Sprint วิ่งวางระเบิด Shadow Energy และไคต์หนีตัวล้วง' },
  'chang\'e':   { primary: 'Sprint', valid: ['Sprint', 'Flicker', 'Purify', 'Inspire'], note: 'สเปลหลัก Chang\'e: กด Sprint วิ่งสาดฝนดาวตก Meteor Shower ด้วยความเร็วสูง' },
  'irithel':    { primary: 'Sprint', valid: ['Sprint', 'Inspire', 'Purify', 'Flicker'], note: 'สเปลหลัก Irithel: กด Sprint คู่อัลติยิงไปวิ่งไปโดยไม่ติดสโลว์' },
  'kimmy':      { primary: 'Sprint', valid: ['Sprint', 'Flicker', 'Purify'], note: 'สเปลหลัก Kimmy (Gold/Mid): ใช้ Sprint หรือ Flicker ยิงไคต์ขณะเคลื่อนที่ (หากเล่นป่าใช้ Retribution)' },
  'popol and kupa': { primary: 'Inspire', valid: ['Inspire', 'Flicker', 'Sprint', 'Purify'], note: 'สเปลหลัก Popol & Kupa (Revamped): มีสกิล 2 ขี่หลัง Kupa วิ่งหนี/ไล่ล่าได้แล้ว จึงใช้ Inspire เร่งตีเร็วคู่พาสซีฟรุมกัด หรือใช้ Flicker/Purify (หากเล่นป่าใช้ Retribution)' },

  // === Roam Tanks & Supports ===
  'tigreal':    { primary: 'Flicker', valid: ['Flicker', 'Petrify'], note: 'สเปลบังคับของ Tigreal: ใช้คอมโบอัลติ Implosion + Flicker รวบทั้งทีมศัตรูแล้วดันกลับ' },
  'atlas':      { primary: 'Flicker', valid: ['Flicker', 'Sprint'], note: 'สเปลบังคับของ Atlas: ใช้ S2 พุ่งแยกตัว + Flicker กดอัลติ Fatal Links รวบทุ่มหมู่' },
  'khufra':     { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Execute'], note: 'สเปลหลัก Khufra: ใช้ Flicker ต่อระยะพุ่ง S1 Tyrant\'s Revenge หรือตบอัลติอัดกำแพง' },
  'minotaur':   { primary: 'Flicker', valid: ['Flicker', 'Revitalize'], note: 'สเปลบังคับของ Minotaur: ใช้ S1 กระโดด + Flicker ทุบยกหมู่ต่อด้วยอัลติ Minoan Fury' },
  'franco':     { primary: 'Flicker', valid: ['Flicker', 'Sprint'], note: 'สเปลบังคับของ Franco: ใช้ Flicker + อัลติ Bloody Hunt งับล็อกเป้าหมายสำคัญทันที' },
  'kaja':       { primary: 'Flicker', valid: ['Flicker', 'Sprint'], note: 'สเปลบังคับของ Kaja: ใช้ Flicker พุ่งไปคล้องอัลติ Divine Judgment ลากศัตรูกลับมาให้ทีม' },
  'akai':       { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Vengeance'], note: 'สเปลหลัก Akai (Roam): ใช้ Flicker ข้ามไปด้านหลังศัตรูแล้วปั่นอัลติ Heavy Spin ดันเข้าหาทีม' },
  'lolita':     { primary: 'Flicker', valid: ['Flicker', 'Revitalize'], note: 'สเปลบังคับของ Lolita: ชาร์จอัลติ Noumenon Blast + กด Flicker ย้ายวงทุบสตั๊นหมู่ทันที' },
  'grock':      { primary: 'Flicker', valid: ['Flicker', 'Execute'], note: 'สเปลหลัก Grock: ใช้ Flicker พุ่งชนอัลติ Wild Charge อัดกำแพงเปิดไฟต์' },
  'carmilla':   { primary: 'Flicker', valid: ['Flicker', 'Vengeance', 'Petrify', 'Revitalize'], note: 'สเปลหลัก Carmilla: ใช้ Flicker พุ่งสตั๊นและปาอัลติ Curse of Blood เชื่อมดาเมจหมู่ (หรือใช้ Vengeance)' },
  'hylos':      { primary: 'Revitalize', valid: ['Revitalize', 'Vengeance', 'Sprint', 'Flicker'], note: 'สเปลหลัก Hylos: กางบ่อฮีล Revitalize หรือ Vengeance เดินเปิดทางด้วยอัลติ Glorious Pathway' },
  'johnson':    { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Sprint', 'Vengeance'], note: 'สเปลหลัก Johnson: ใช้ Flicker หรือ Petrify ต่อจังหวะสตั๊นหลังขับรถชน' },
  'chip':       { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Vengeance'], note: 'สเปลหลัก Chip: ใช้ Flicker พุ่งสตั๊นและเปิดประตูวาร์ป Shortcut เรียกเพื่อนมารุม' },
  'kalea':      { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Revitalize'], note: 'สเปลหลัก Kalea: ใช้ Flicker พุ่งจับล็อกเป้าหมายเปิดจังหวะให้ทีม' },
  'marcel':     { primary: 'Flicker', valid: ['Flicker', 'Revitalize', 'Purify'], note: 'สเปลหลัก Marcel: ใช้ Flicker หรือ Revitalize ซัพพอร์ตเพื่อนร่วมทีม' },
  'estes':      { primary: 'Flicker', valid: ['Flicker', 'Purify', 'Revitalize'], note: 'สเปลหลัก Estes: ใช้ Flicker หนีจังหวะโดนล้วง หรือ Purify ไม่ให้โดนขัดจังหวะกางอัลติฮีลหมู่' },
  'rafaela':    { primary: 'Flicker', valid: ['Flicker', 'Revitalize', 'Purify'], note: 'สเปลหลัก Rafaela: ใช้ Flicker หรือ Revitalize คอยฮีลและเร่งความเร็วให้ทีม' },
  'floryn':     { primary: 'Flicker', valid: ['Flicker', 'Flameshot', 'Purify'], note: 'สเปลหลัก Floryn: ใช้ Flicker รักษาระยะปลอดภัยหรือ Flameshot ผลักตัวล้วง' },
  'angela':     { primary: 'Flicker', valid: ['Flicker', 'Flameshot', 'Sprint', 'Purify'], note: 'สเปลหลัก Angela: ใช้ Flicker หรือ Sprint ไล่ผูกเชือก S2 Puppet-on-a-String' },
  'diggie':     { primary: 'Flicker', valid: ['Flicker', 'Flameshot', 'Revitalize'], note: 'สเปลหลัก Diggie: มีอัลติ Time Journey ล้าง CC หมู่อยู่แล้ว จึงใช้ Flicker หรือ Flameshot' },
  'mathilda':   { primary: 'Flicker', valid: ['Flicker', 'Revitalize', 'Purify'], note: 'สเปลหลัก Mathilda: ใช้ Flicker พาเพื่อนบินเข้า/ออกด้วยสกิล 2 Guiding Wind' },

  // === Execute / Flameshot Specialists ===
  'hilda':      { primary: 'Execute', valid: ['Execute', 'Sprint', 'Vengeance', 'Flicker'], note: 'สเปลหลัก Hilda: ใช้ Execute ปิดดาเมจคู่กับอัลติ Power of Wildness ตอนเดินป่วนป่า/เลน' },
  'kagura':     { primary: 'Execute', valid: ['Execute', 'Flicker', 'Flameshot'], note: 'สเปลหลัก Kagura: มีสกิลร่มฟ้าล้าง CC ในตัวอยู่แล้ว จึงใช้ Execute หรือ Flameshot ปิดคอมโบร่ม' },
  'natalia':    { primary: 'Execute', valid: ['Execute', 'Petrify', 'Inspire'], note: 'สเปลหลัก Natalia (Roam): ใช้ Execute ปิดดาเมจล้วงแครี่/เมจ (หากเล่นป่าใช้ Retribution)' },
  'saber':      { primary: 'Execute', valid: ['Execute', 'Flicker', 'Petrify'], note: 'สเปลหลัก Saber (Roam): ใช้ Execute หรือ Flicker พุ่งล็อกอัลติ Triple Sweep (หากเล่นป่าใช้ Retribution)' },
  'novaria':    { primary: 'Flameshot', valid: ['Flameshot', 'Flicker', 'Sprint', 'Purify'], note: 'สเปลหลัก Novaria: ใช้ Flameshot ยิงซ้ำระยะไกลคู่กับสกิล 2 Astral Recall เก็บงานขอบจอ' },

  // === Mid Lane Mages ===
  'lunox':      { primary: 'Flicker', valid: ['Flicker', 'Purify', 'Sprint'], note: 'สเปลหลัก Lunox: ใช้ Flicker กระโดดเปิดวงอัลติมืด/สว่าง หรือใช้ Purify' },
  'valentina':  { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Purify'], note: 'สเปลหลัก Valentina: ใช้ Flicker พุ่งขโมยอัลติศัตรูและต่อคอมโบสกิลที่ขโมยมา' },
  'faramis':    { primary: 'Flicker', valid: ['Flicker', 'Purify', 'Sprint', 'Flameshot'], note: 'สเปลหลัก Faramis: ใช้ Flicker พุ่งเกี่ยววิญญาณ S1 หรือเข้ากางอัลติ Cult Altar ทันเวลา' },
  'xavier':     { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Purify', 'Flameshot'], note: 'สเปลหลัก Xavier: ใช้ Flicker หรือ Sprint รักษาระยะยิงลำแสง Dawning Light' },
  'nana':       { primary: 'Flicker', valid: ['Flicker', 'Flameshot', 'Purify', 'Sprint'], note: 'สเปลหลัก Nana: ใช้ Flicker หรือ Flameshot เอาตัวรอดคู่กับพาสซีฟแปลงร่าง' },
  'vexana':     { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Purify', 'Flameshot'], note: 'สเปลหลัก Vexana: ใช้ Flicker หรือ Purify รักษาระยะปล่อยหุ่นอัศวิน Eternal Guard' },
  'aurora':     { primary: 'Flicker', valid: ['Flicker', 'Purify', 'Flameshot'], note: 'สเปลหลัก Aurora: ใช้ Flicker หรือ Purify กางอัลติน้ำแข็งแช่แข็งหมู่' },
  'eudora':     { primary: 'Flicker', valid: ['Flicker', 'Flameshot', 'Purify'], note: 'สเปลหลัก Eudora: ใช้ Flicker พุ่งสตั๊น S2 + ช็อตอัลติชุดเดียวตาย' },
  'vale':       { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Purify', 'Flameshot'], note: 'สเปลหลัก Vale: ใช้ Flicker หรือ Sprint ขยับวางพายุอัลติ Windstorm' },
  'odette':     { primary: 'Flicker', valid: ['Flicker', 'Purify'], note: 'สเปลบังคับของ Odette: กดอัลติ Swan Song แล้วกด Flicker ย้ายวงอัลติเข้ากลางไฟต์' },
  'pharsa':     { primary: 'Flicker', valid: ['Flicker', 'Purify', 'Flameshot'], note: 'สเปลหลัก Pharsa: ใช้ Flicker หรือ Purify เอาตัวรอดขณะกางอัลติ Feathered Air Strike' },
  'yve':        { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Purify'], note: 'สเปลหลัก Yve: ใช้ Flicker หรือ Sprint รักษาระยะก่อนกางกระดานอัลติ Real World Manipulation' },
  'valir':      { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Flameshot'], note: 'สเปลหลัก Valir: มีอัลติ Vengeance Flame ล้าง CC ในตัวแล้ว จึงใช้ Flicker หรือ Sprint' },
  'gord':       { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Purify', 'Flameshot'], note: 'สเปลหลัก Gord: ใช้ Flicker ปรับทิศทางลำแสงอัลติ Mystic Gush หรือหนีตัวล้วง' },
  'zhask':      { primary: 'Flicker', valid: ['Flicker', 'Inspire', 'Purify', 'Sprint'], note: 'สเปลหลัก Zhask: ใช้ Flicker หรือ Inspire เสริมดาเมจป้อมอัลติ Nightmaric Spawn' },
  'cyclops':    { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Purify'], note: 'สเปลหลัก Cyclops (Mid): ใช้ Flicker หรือ Sprint วิ่งสแปมสกิล (หากเล่นป่าใช้ Retribution)' },
  'luo yi':     { primary: 'Flicker', valid: ['Flicker', 'Flameshot', 'Sprint', 'Purify'], note: 'สเปลหลัก Luo Yi: ใช้ Flicker หรือ Sprint ขยับมุมแปะหยิน-หยางดูดรวบศัตรู' },
  'zetian':     { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Purify', 'Flameshot'], note: 'สเปลหลัก Zetian: ใช้ Flicker หรือ Sprint รักษาระยะทำดาเมจเวท' },
  'selena':     { primary: 'Flicker', valid: ['Flicker', 'Execute', 'Flameshot', 'Purify'], note: 'สเปลหลัก Selena (Mid/Roam): ใช้ Flicker หรือ Execute ปิดคอมโบธนูสตั๊น' },

  // === Gold Lane Marksmen (Karrie, Claude, Hanabi, Flicker-Carries) ===
  'karrie':     { primary: 'Vengeance', valid: ['Vengeance', 'Flicker', 'Purify', 'Inspire'], note: 'สเปลหลัก Karrie: ใช้ Vengeance หรือ Flicker ยืนซอยกงจักร True Damage สู้ตัวล้วง' },
  'claude':     { primary: 'Vengeance', valid: ['Vengeance', 'Purify', 'Sprint', 'Aegis'], note: 'สเปลหลัก Claude: กด Vengeance หรือ Purify ขณะพุ่งไปปั่นอัลติ Blazing Duet กลางวงศัตรู' },
  'hanabi':     { primary: 'Aegis', valid: ['Aegis', 'Flicker', 'Inspire', 'Purify'], note: 'สเปลบังคับของ Hanabi: กดเกราะขาว Aegis เพื่อให้พาสซีฟต้านสถานะ CC ทำงานทันที!' },
  'bruno':      { primary: 'Flicker', valid: ['Flicker', 'Purify', 'Inspire', 'Aegis'], note: 'สเปลหลัก Bruno: ใช้ Flicker หรือ Purify รักษาระยะเลี้ยงบอลยิงคริติคอล' },
  'brody':      { primary: 'Flicker', valid: ['Flicker', 'Purify', 'Sprint', 'Aegis'], note: 'สเปลหลัก Brody: ใช้ Flicker หรือ Purify ต่อระยะสตั๊น S2 และฉีกหนีตอนฉีกอัลติ' },
  'clint':      { primary: 'Flicker', valid: ['Flicker', 'Purify', 'Aegis', 'Sprint'], note: 'สเปลหลัก Clint: ใช้ Flicker หรือ Purify รักษาระยะยิงพาสซีฟทะลุแถว' },
  'lesley':     { primary: 'Flicker', valid: ['Flicker', 'Sprint', 'Purify'], note: 'สเปลหลัก Lesley: ใช้ Flicker ย้ายตำแหน่งยิงนัดคริติคอล True Damage' },
  'beatrix':    { primary: 'Flicker', valid: ['Flicker', 'Purify', 'Sprint', 'Inspire'], note: 'สเปลหลัก Beatrix: ใช้ Flicker หรือ Purify ขยับมุมปืนสไนเปอร์/ลูกซอง/บาซูก้า' },
  'ixia':       { primary: 'Flicker', valid: ['Flicker', 'Purify', 'Inspire'], note: 'สเปลบังคับของ Ixia: ใช้ Flicker ขยับตำแหน่งขณะกางอัลติ Full Barrage ยิงกวาดทั้งหน้าจอ' },
  'layla':      { primary: 'Flicker', valid: ['Flicker', 'Inspire', 'Purify', 'Sprint'], note: 'สเปลหลัก Layla: ไม่มีสกิลแดช จึงต้องใช้ Flicker เป็นหลักในการหนีตัวล้วง' },
  'natan':      { primary: 'Flicker', valid: ['Flicker', 'Inspire', 'Purify', 'Aegis'], note: 'สเปลหลัก Natan (Gold): ใช้ Flicker หรือ Inspire คู่ร่างแยกอัลติ (หากเล่นป่าใช้ Retribution)' },
  'granger':    { primary: 'Flicker', valid: ['Flicker', 'Purify', 'Sprint'], note: 'สเปลหลัก Granger (Gold): ใช้ Flicker หรือ Purify ยิงไคต์ระยะไกล (หากเล่นป่าใช้ Retribution)' },
  'roger':      { primary: 'Flicker', valid: ['Flicker', 'Vengeance', 'Purify'], note: 'สเปลหลัก Roger (Gold): ใช้ Flicker หรือ Vengeance (หากเล่นป่าใช้ Retribution)' },
  'yi sun-shin':{ primary: 'Flicker', valid: ['Flicker', 'Purify'], note: 'สเปลหลัก Yi Sun-shin (เลน): ใช้ Flicker (หากเล่นป่าใช้ Retribution)' },

  // === Primary Junglers (Always Retribution in Jungle; fallback if switched to Side/Mid Lane) ===
  'fanny':      { primary: 'Execute', valid: ['Execute', 'Petrify', 'Flicker'], note: 'เล่นป่าใช้ Retribution เสมอ (หากยืนเลนใช้ Execute ปิดดาเมจโหนสลิง)' },
  'ling':       { primary: 'Flicker', valid: ['Flicker', 'Execute'], note: 'เล่นป่าใช้ Retribution เสมอ' },
  'nolan':      { primary: 'Flicker', valid: ['Flicker', 'Purify'], note: 'เล่นป่าใช้ Retribution เสมอ' },
  'hirara':     { primary: 'Flicker', valid: ['Flicker', 'Petrify', 'Execute'], note: 'เล่นป่าใช้ Retribution เสมอ' },
  'lancelot':   { primary: 'Flicker', valid: ['Flicker', 'Execute', 'Petrify'], note: 'เล่นป่าใช้ Retribution เสมอ' },
  'hayabusa':   { primary: 'Flicker', valid: ['Flicker', 'Execute', 'Petrify'], note: 'เล่นป่าใช้ Retribution เสมอ (หากยืนเลนใช้ Flicker หรือ Execute)' },
  'gusion':     { primary: 'Execute', valid: ['Execute', 'Petrify', 'Flicker'], note: 'เล่นป่าใช้ Retribution (หากยืน Mid ใช้ Execute หรือ Petrify ปิดชุดมีดสั้น)' },
  'aamon':      { primary: 'Flicker', valid: ['Flicker', 'Execute', 'Purify'], note: 'เล่นป่าใช้ Retribution เสมอ' },
  'karina':     { primary: 'Execute', valid: ['Execute', 'Vengeance', 'Flicker'], note: 'เล่นป่าใช้ Retribution เสมอ' },
  'hanzo':      { primary: 'Sprint', valid: ['Sprint', 'Flicker', 'Petrify'], note: 'เล่นป่าใช้ Retribution เสมอ' },
  'harley':     { primary: 'Execute', valid: ['Execute', 'Flameshot', 'Flicker'], note: 'เล่นป่าใช้ Retribution (หากยืน Mid ใช้ Execute หรือ Flameshot ปิดวงแหวนไฟ)' }
};

// Threat Classification Sets for Smart Counter-Spell & Counter-Item Resolution
const HEAVY_CC_ENEMIES = new Set([
  'Tigreal', 'Atlas', 'Minotaur', 'Carmilla', 'Guinevere', 'Zhuxin', 'Selena',
  'Kalea', 'Eudora', 'Aurora', 'Johnson', 'Terizla', 'Silvanna', 'Chou', 'Akai', 'Khufra',
  'Marcel', 'Lukas', 'Belerick', 'Gloo', 'Barats', 'Badang', 'Minsitthar', 'Yin', 'Arlott',
  'Ruby', 'Gatotkaca', 'Edith', 'Lolita', 'Vexana', 'Vale', 'Nana', 'Xavier', 'Odette',
  'Luo Yi', 'Zetian', 'Kadita', 'Julian', 'Saber', 'Helcurt', 'Jawhead', 'Martis', 'Popol and Kupa'
]);

const SUPPRESS_ENEMIES = new Set(['Franco', 'Kaja', 'Barats']);

const MULTI_HIT_DPS_ENEMIES = new Set([
  'Obsidia', 'Miya', 'Moskov', 'Wanwan', 'Melissa', 'Claude', 'Karrie', 'Irithel',
  'Bruno', 'Hanabi', 'Layla', 'Beatrix', 'Ixia', 'Natan', 'Kimmy', 'Popol and Kupa',
  'Masha', 'Sun', 'Zilong', 'Freya', 'Argus', 'Aulus', 'Thamuz', 'Cici', 'Badang',
  'Chang\'e', 'Zhask', 'Harley', 'Gusion', 'Hayabusa', 'Aamon', 'Natalia', 'Roger', 'Alucard', 'Sora'
]);

const AGILE_DIVE_ENEMIES = new Set([
  'Fanny', 'Ling', 'Nolan', 'Suyou', 'Hirara', 'Lancelot', 'Hayabusa', 'Joy', 'Benedetta',
  'Harith', 'Gusion', 'Aamon', 'Karina', 'Saber', 'Natalia', 'Helcurt', 'Julian', 'Kadita',
  'Paquito', 'Arlott', 'Yin', 'Chou', 'Freya', 'Zilong', 'Masha', 'Aldous', 'Leomord', 'Dyrroth'
]);

const HEAVY_SLOW_ZONE_ENEMIES = new Set([
  'Yve', 'Valir', 'Zhuxin', 'Lylia', 'Cecilion', 'Gord', 'Chang\'e', 'Hylos', 'Uranus',
  'Esmeralda', 'Alice', 'Baxia', 'X.Borg', 'Angela', 'Rafaela', 'Cici', 'Gloo', 'Thamuz', 'Odette'
]);

const REGEN_SHIELD_ENEMIES = new Set([
  'Masha', 'Lukas', 'Estes', 'Floryn', 'Rafaela', 'Angela', 'Uranus', 'Esmeralda',
  'Yu Zhong', 'Ruby', 'Alice', 'Freya', 'Thamuz', 'Argus', 'Aulus', 'Alucard', 'Dyrroth',
  'Alpha', 'Balmond', 'Fredrinn', 'Harith', 'Julian', 'Cici', 'Lapu-Lapu', 'Arlott',
  'Sora', 'Diggie', 'Marcel', 'Kalea', 'Minotaur', 'Gatotkaca', 'Terizla', 'Hilda', 'Barats', 'Gloo', 'Popol and Kupa'
]);

const SINGLE_HIT_NUKE_ENEMIES = new Set([
  'Lesley', 'Aldous', 'Brody', 'Clint', 'Granger', 'Bruno', 'Eudora', 'Balmond',
  'Fredrinn', 'Hilda', 'Dyrroth', 'Paquito', 'Pharsa', 'Novaria', 'Vale', 'Kadita'
]);

const SPLIT_PUSH_MACRO_ENEMIES = new Set([
  'Masha', 'Sun', 'Zilong', 'Argus', 'Chip', 'Luo Yi', 'Moskov', 'Popol and Kupa', 'Bane', 'Chang\'e'
]);

// Revamped Hero Skill Kits Breakdown (Displayed in Hero Dossier & Lookup)
const REVAMPED_HERO_KITS = {
  'Popol and Kupa': {
    badge: '⚡ REVAMPED ใหม่ล่าสุด: ขี่หลังหมา Kupa & รุมขย้ำ',
    summary: 'ปรับสกิลใหม่ครั้งใหญ่ (Icefield Companions Revamp): เพิ่มระบบกระโดดขึ้นขี่หลัง Kupa (Mounted Mode) วิ่งไล่ล่า/หนีได้ทั่วแมพ พร้อมพาสซีฟรุมตีเป้าหมายเดียวกันได้ตีเร็ว+วิ่งเร็ว!',
    skills: [
      '🐾 พาสซีฟ (We Are Friends — ปรับใหม่): เมื่อ Popol และ Kupa โจมตีเป้าหมายเดียวกันพร้อมกัน ทั้งคู่จะได้รับโบนัสความเร็วโจมตี (Attack Speed) และความเร็วเคลื่อนที่เพิ่มขึ้น! Kupa รับค่าสถานะและเอฟเฟกต์ไอเทมของ Popol เต็ม 100% และตีมอนสเตอร์ป่าแรงขึ้น',
      '🦴 สกิล 1 (Bite \'em, Kupa! — ปรับใหม่): ปาหอกสั่ง Kupa พุ่งกัดและสโลว์หนัก (ในร่างอัลติ Alpha Wolf: Kupa จะกระโดดทุบพื้นที่ งัดศัตรูหลายตัวลอยขึ้นฟ้า AoE Airborne พร้อมเบิร์สต์ดาเมจหมู่)',
      '🐕 สกิล 2 (Kupa, Help! — ระบบใหม่ ขี่หลังหมา Kupa!): เรียก Kupa กลับมาล้าง CC ทั้งหมดให้ Kupa ทันที + มอบเกราะขาวให้ Popol และสามารถกดกระโดดขึ้นขี่หลัง Kupa (Riding Mode) วิ่งทะยานด้วยความเร็วสูงเพื่อไล่ล่าหรือหนี พร้อมฟื้นฟูเลือด Kupa ต่อเนื่อง (ตอนเปิดอัลติ Kupa จะรีเลือดเต็มหลอดทันทีที่ขี่!)',
      '🪤 สกิล 3 (Popol\'s Surprise — ปรับใหม่): วางกับดักเปิดแมพ เมื่อศัตรูเหยียบจะติดล็อกขา (Immobilize) และถูกลดเกราะกายภาพ (Physical Defense Shred) ทำให้รุมกัดเข้าเนื้อแรงขึ้นมาก',
      '🐺 อัลติ (We Are Angry! — Alpha Wolf Form): แปลงร่าง Kupa เป็นหมาป่าจ่าฝูง เพิ่มความเร็วโจมตี ความเร็วเคลื่อนที่ และอัปเกรดสกิล 1 (ทุบงัดลอยหมู่) + สกิล 2 (เกราะใหญ่ขึ้นและรีเลือด Kupa เต็มทันทีตอนขี่)'
    ]
  },
  'Granger': {
    badge: '⚡ REVAMPED: ปืนใหญ่พลังงานไร้ขีดจำกัด',
    summary: 'ปรับสกิลใหม่ใช้หลอดพลังงาน (Demonic Energy) ที่สะสมจากการลาสต์ครีป/ฮีโร่ ยิงสกิล 1 และอัลติได้ต่อเนื่องแบบไร้คูลดาวน์เมื่อมีพลังงาน!',
    skills: [
      '🎵 พาสซีฟ (Capriccio): เก็บสแต็กพลังงานถาวรจากการสังหารครีป/มอนสเตอร์ป่า/ฮีโร่ เพิ่มความจุพลังงานสูงสุดตลอดทั้งเกม',
      '🔫 สกิล 1 (Rhapsody): ยิงกระสุนรัว 6 นัด (นัดสุดท้ายคริติคอล 100%) และเพิ่มความเร็วเคลื่อนที่ขณะยิง',
      '💨 สกิล 2 (Rondo): พุ่งแดชขณะยิงสกิล 1 ได้ทันที พร้อมฟื้นฟูพลังงานเมื่อโจมตีโดนศัตรู',
      '💥 อัลติ (Death Sonata): ยิงกระสุนปืนใหญ่ระยะไกลทะลุมินเนี่ยนได้ต่อเนื่องตราบใดที่มีพลังงานเหลือ คู่กับ Sky Piercer ประหารศัตรูขอบจอได้ทันที'
    ]
  },
  'Phoveus': {
    badge: '⚡ REVAMPED: จอมทุบสยบสายแดชไร้ชาร์จ',
    summary: 'ปรับโฉมใหม่ไม่ต้องรอชาร์จสแต็กเหมือนเดิม แค่ศัตรูพุ่งหรือถูกผลัก Phoveus ก็พุ่งเข้าชนและกระโดดทุบอัลติซ้ำเป็น % เลือดได้ทันที!',
    skills: [
      '👁️ พาสซีฟ (Demonic Force): การโจมตีปกติครั้งถัดไปจะพุ่งกระแทกศัตรูให้ถอยหลัง (บังคับติดมาร์ก Sinners ทันทีแม้ศัตรูไม่กดแดช!)',
      '🪨 สกิล 1 (Demonic Impact): ทุบหินลงพื้น 2 จังหวะ สโลว์และสร้างเกราะดูดซับดาเมจ',
      '🌪️ สกิล 2 (Dark Wave): เสยคลื่นพลังมืดงัดศัตรูลอยขึ้นฟ้า (Airborne) และลากมารวมกัน (บังคับติดมาร์กอัลติทันที!)',
      '☄️ อัลติ (Infernal Pursuit): กระโดดทุบเป้าหมายที่ติดมาร์กแบบไม่มีคูลดาวน์ ทำดาเมจกายภาพตาม %Max HP และฟื้นฟูเลือดตัวเองทุกครั้งที่ทุบ'
    ]
  },
  'Aurora': {
    badge: '⚡ REVAMPED: ราชินีน้ำแข็งอมตะ & แช่แข็งป้อม',
    summary: 'ปรับโฉมใหม่มีพาสซีฟแช่แข็งตัวเองเป็นอมตะเมื่อเลือดหมด (เหมือนมี Winter Crown ติดตัว) และสกิลแช่แข็งได้ทั้งฮีโร่และป้อม!',
    skills: [
      '❄️ พาสซีฟ (Pride of Ice): เมื่อได้รับดาเมจถึงตาย จะแช่แข็งตัวเองเป็นอมตะและฟื้นฟูเลือดกลับมาโดยไม่ตาย',
      '🌨️ สกิล 1 (Hailstone Blast): เรียกอุกกาบาตน้ำแข็งตกใส่พื้นที่รัวๆ สโลว์ต่อเนื่อง',
      '🌬️ สกิล 2 (Frosty Breeze): พัดพายุน้ำแข็งแช่แข็งศัตรูด้านหน้า (ระยไกลมีจุดแช่แข็งทันที)',
      '🏔️ อัลติ (Frigid Glacier): สร้างธารน้ำแข็งยักษ์พุ่งไปข้างหน้า แช่แข็งศัตรูและป้อมปราการทั้งแถบเป็นเวลานาน'
    ]
  }
};

// Application State
const state = {
  bans: Array(10).fill(null),      // 10 Ban slots (0..4 Ally Bans, 5..9 Enemy Bans)
  allyPicks: Array(5).fill(null),  // 5 Ally Pick slots (Blue Side)
  enemyPicks: Array(5).fill(null), // 5 Enemy Pick slots (Red Side)
  spellOverrides: {},              // Manual spell override per slot: 'ally-0': 'Purify', 'enemy-0': 'Vengeance'
  laneOverrides: {},               // Manual lane override per slot: 'ally-0': 'Gold Lane', 'ally-1': 'Mid Lane'
  pickMode: 'enemy',               // 'enemy' | 'ban' | 'ally' | 'inspect'
  strategyMode: 'counter',         // 'counter' | 'combo'
  activeSlot: { type: 'enemy', index: 0 },
  pickerModal: { open: false, type: 'ban', index: 0, lane: 'ALL' },
  gearModal: { open: false, targetEnemyId: 'ALL', roleFilter: 'ALL', allyHeroId: null },
  spellModal: { open: false, side: 'ally', slotIdx: 0, heroId: null },
  laneModal: { open: false, side: 'ally', slotIdx: 0, heroId: null },
  recLaneFilter: 'ALL',            // 'ALL' | 'MISSING' | lane name
  comboHubFilter: 'ALL',           // 'ALL' | 'duo' | 'trio' | 'squad'
  metaTabLane: 'ALL',
  lookupHeroId: HERO_BY_NAME.get('carmilla')?.id || HEROES[0]?.id || 1
};

// Get ordered list of Counter Spells to counter a specific Enemy Hero
function getCounterSpellsForEnemy(enemyHero) {
  if (!enemyHero) return [];
  const results = [];
  const addSpell = (key, reason, forRoles, weight) => {
    if (results.some(r => r.key === key)) return;
    const sp = SPELL_BY_KEY.get(key);
    if (!sp) return;
    results.push({ key, spell: sp, reason, forRoles, weight });
  };

  const name = enemyHero.name;
  const hasSpellInRaw = (spPrefix) =>
    (enemyHero.counterGear?.spells || []).some(s => s.name.toLowerCase().includes(spPrefix.toLowerCase()));

  // 1. Suppress enemies (Franco, Kaja, Barats)
  if (SUPPRESS_ENEMIES.has(name)) {
    addSpell('Flicker', `แฟลชหลบจังหวะฮุก/เปิดอัลติของ ${name} หรือรักษาระยะห่าง`, ['Marksman', 'Mage', 'Support', 'Fighter'], 96);
    addSpell('Purify', `ล้างสโลว์/สตั๊นก่อนโดน ${name} ล็อกตัว`, ['Marksman', 'Mage', 'Assassin'], 86);
    addSpell('Vengeance', `กดลดดาเมจ 35% และสะท้อนกลับจังหวะโดน ${name} จับให้เพื่อนรุม`, ['Tank', 'Fighter'], 82);
  }

  // 2. Heavy CC / Setter / Lockdown enemies
  if (HEAVY_CC_ENEMIES.has(name) || hasSpellInRaw('Purify') || (enemyHero.ability?.control || 0) >= 60) {
    addSpell('Purify', `กดล้างสตั๊น/รวบ/ล็อกขาของ ${name} ทันทีและได้อมตะ CC 1.2 วินาที`, ['Marksman', 'Mage', 'Assassin', 'Fighter', 'Support'], 95);
    addSpell('Flicker', `แฟลชหนีออกจากวงสกิล/อัลติของ ${name} ก่อนโดนคอมโบต่อเนื่อง`, ['Marksman', 'Mage', 'Support', 'Tank'], 82);
  }

  // 3. Multi-hit / Attack Speed / Crit DPS enemies
  if (MULTI_HIT_DPS_ENEMIES.has(name) || hasSpellInRaw('Vengeance') || enemyHero.roles.includes('Marksman')) {
    addSpell('Vengeance', `สะท้อนดาเมจรัวๆ ของ ${name} กลับไป 35% และลดดาเมจที่ได้รับลง 35%`, ['Tank', 'Fighter', 'Support', 'Marksman'], 94);
    addSpell('Petrify', `กดสตั๊นหิน 0.8 วินาที หยุดจังหวะยิง/โจมตีรัวของ ${name}`, ['Fighter', 'Tank', 'Assassin', 'Mage'], 78);
    addSpell('Aegis', `กางเกราะดูดซับดาเมจฉุกเฉินเมื่อต้องดวลหรือรับดาเมจจาก ${name}`, ['Marksman', 'Mage', 'Support'], 75);
  }

  // 4. Agile Dive Assassins & Skirmishers
  if (AGILE_DIVE_ENEMIES.has(name) || enemyHero.roles.includes('Assassin')) {
    addSpell('Petrify', `กดสตั๊นหินหยุดความพริ้วของ ${name} ทันทีที่พุ่งเข้าล้วงระยะประชิด`, ['Fighter', 'Tank', 'Mage', 'Support'], 91);
    addSpell('Aegis', `สร้างเกราะป้องกันไม่ให้ตัวบางโดน ${name} ล้วงเบิร์สต์ชุดเดียวตาย`, ['Marksman', 'Mage', 'Support'], 89);
    addSpell('Vengeance', `กดรับและสะท้อนดาเมจจังหวะที่ ${name} พุ่งเข้าใส่เต็มคอมโบ`, ['Tank', 'Fighter', 'Marksman'], 85);
    addSpell('Flameshot', `ยิงไฟผลัก ${name} ที่พุ่งเข้าประชิดตัวให้กระเด็นถอยออกไปทันที`, ['Mage', 'Support'], 80);
    addSpell('Flicker', `แฟลชฉีกหนีระยะล้วงของ ${name} เข้าหาป้อมหรือเพื่อนร่วมทีม`, ['Marksman', 'Mage', 'Support'], 79);
  }

  // 5. Heavy Slow / Zone Control enemies
  if (HEAVY_SLOW_ZONE_ENEMIES.has(name)) {
    addSpell('Sprint', `วิ่งเร็ว + ต้านทานสโลว์ 100% ใช้ฉีกหนีวงสโลว์/โซนพื้นที่ของ ${name}`, ['Mage', 'Marksman', 'Fighter', 'Support'], 92);
    addSpell('Purify', `ล้างสถานะสโลว์/เผา/ควบคุมของ ${name} เพื่อหลุดออกจากโซนอันตราย`, ['Marksman', 'Mage', 'Assassin'], 81);
  }

  // 6. Heavy Regen / Shield / Sustain enemies
  if (REGEN_SHIELD_ENEMIES.has(name)) {
    addSpell('Execute', `ประหารด้วย True Damage ทะลุเกราะขาวของ ${name} ตอนเลือดเหลือน้อย`, ['Fighter', 'Tank', 'Support', 'Assassin'], 83);
    addSpell('Vengeance', `ยืนแลกไฟต์ยืดเยื้อและสะท้อนดาเมจกลับใส่ ${name}`, ['Tank', 'Fighter'], 80);
    addSpell('Revitalize', `กางบ่อฮีลหมู่สู้ไฟต์ยืดเยื้อแข่งกับทีมที่มี ${name}`, ['Tank', 'Support'], 76);
  }

  // 7. Split-Push / Macro enemies
  if (SPLIT_PUSH_MACRO_ENEMIES.has(name)) {
    addSpell('Arrival', `วาร์ปไปกันป้อมเมื่อ ${name} แยกดันบ้าน หรือวาร์ปตามไปซ้อนไฟต์ข้ามแมพ`, ['Fighter', 'Tank', 'Mage'], 74);
  }

  // Fallback if still fewer than 2 counter spells
  addSpell('Flicker', `ใช้สร้างจังหวะเว้นระยะห่างหรือหลบสกิลสำคัญของ ${name}`, ['Marksman', 'Mage', 'Tank', 'Fighter', 'Support'], 70);
  addSpell('Vengeance', `ลดดาเมจที่ได้รับ 35% และสะท้อนดาเมจเมื่อปะทะกับ ${name}`, ['Tank', 'Fighter'], 68);

  results.sort((a, b) => b.weight - a.weight);
  return results;
}

// Get ordered list of Individual Counter Items (from COUNTER_ITEMS_DB) for a specific Enemy Hero
function getCounterItemsForEnemy(enemyHero) {
  if (!enemyHero) return [];
  const results = [];
  const addItem = (itemId, reason, priorityWeight) => {
    if (results.some(r => r.item.id === itemId)) return;
    const item = COUNTER_ITEM_BY_ID.get(itemId);
    if (!item) return;
    results.push({ item, reason, priorityWeight });
  };

  const name = enemyHero.name;
  const rawTypes = new Set((enemyHero.counterGear?.items || []).map(i => i.type));
  const isMagicHero = enemyHero.roles.includes('Mage') || ['Gusion', 'Aamon', 'Karina', 'Harley', 'Joy', 'Julian', 'Silvanna', 'Guinevere', 'Esmeralda', 'Alice', 'Uranus', 'Belerick', 'Gloo', 'Gatotkaca', 'Edith', 'Kimmy', 'Natan', 'Faramis', 'Floryn', 'Estes', 'Rafaela', 'Angela', 'Diggie', 'Johnson', 'Baxia', 'Hylos', 'Carmilla', 'Minotaur'].includes(name);
  const isPhysHero = !enemyHero.roles.includes('Mage') || ['Bane', 'Kimmy'].includes(name);

  // 1. Anti-Heal & Anti-Sustain (Regen / Lifesteal / Spell Vamp / Shield)
  if (rawTypes.has('Anti-Heal') || REGEN_SHIELD_ENEMIES.has(name) || (enemyHero.specialties || []).includes('Regen')) {
    addItem('dominance_ice', `ลดการฟื้นฟูเลือด/เกราะขาวของ ${name} ลง 50% และลดความเร็วโจมตี (โฉมใหม่ได้ +500 HP เหมาะสำหรับแทงค์/โรม/EXP)`, 96);
    addItem('sea_halberd', `โจมตีกายภาพตัดฮีล/เกราะขาวของ ${name} ลง 50% + ตีแรงขึ้น 8% ถ้า ${name} เลือดเยอะกว่า (สำหรับแครี่/ไฟต์เตอร์/ป่า)`, 94);
    addItem('glowing_wand', `สกิลเวทเผา %Max HP และตัดเลือด/เกราะขาวของ ${name} ลง 50% ทันที (สำหรับเมจ/ซัพพอร์ต/แทงค์เวท)`, 94);
  }

  // 2. Tank-Buster & New Meta Range/Shred (High HP / High Armor Tanks & Fighters)
  if (rawTypes.has('Tank-Buster') || enemyHero.roles.includes('Tank') || (enemyHero.ability?.durability || 0) >= 70) {
    addItem('malefic_gun', `ปืนเมต้าใหม่! เพิ่มระยะยิง 15% + เจาะเกราะกายภาพ 30% + วิ่งเร็ว ยืนยิงละลาย ${name} จากระยะปลอดภัย (สำหรับแครี่)`, 95);
    addItem('demon_hunter_sword', `ตีเป็น % เลือดปัจจุบัน ละลายหลอดเลือดหนาๆ ของ ${name} ได้ไวมาก (สำหรับแครี่/ไฟต์เตอร์ตีเร็ว)`, 93);
    addItem('wishing_lantern', `โคมผีเสื้อเมต้าใหม่! สกิลเวทระเบิดดาเมจ 8% ของ HP สูงสุดของ ${name} ต่อเนื่อง (สำหรับเมจ)`, 92);
    addItem('malefic_roar', `เจาะเกราะกายภาพเป็น % ทะลุเกราะของ ${name} สูงสุด 50-60% (สำหรับแอสซาซิน/ไฟต์เตอร์/แครี่)`, 90);
    addItem('divine_glaive', `เจาะเกราะเวทเป็น % ทะลุเกราะเวทของ ${name} สูงสุด 60% (สำหรับเมจ/แอสซาซินเวท)`, 89);
    addItem('corrosion_scythe', `โจมตีสโลว์ ${name} สูงสุด 40% ไม่ให้เดินเข้าถึงตัวแครี่ พร้อมเร่งความเร็วโจมตีคู่กับ DHS`, 87);
    addItem('cursed_helmet', `หมวกไฟโฉมใหม่! เผา %HP และลดทั้งเกราะกายภาพ/เวทของ ${name} ให้เพื่อนทั้งทีมช่วยกันรุมตีเข้าแรงขึ้น`, 85);
    addItem('thunder_belt', `เข็มขัดสายฟ้าโฉมใหม่! ตีทำ True Damage สโลว์ 99% และเก็บสแต็กเกราะถาวรจากการปะทะกับ ${name}`, 84);
  }

  // 3. Anti-AtkSpeed & Crit Reflection
  if (rawTypes.has('Anti-AtkSpeed') || MULTI_HIT_DPS_ENEMIES.has(name) || enemyHero.roles.includes('Marksman')) {
    addItem('blade_armor', `สะท้อนดาเมจโจมตีปกติของ ${name} กลับไป + ลดดาเมจคริติคอลลง 20% (ยิ่งกดคู่สเปล Vengeance ยิ่งสะท้อนแรง)`, 95);
    addItem('dominance_ice', `ลดความเร็วโจมตีของ ${name} ลงเหลือ 80% และตัดดูดเลือดลงครึ่งหนึ่ง`, 93);
    if (isPhysHero) {
      addItem('wind_of_nature', `กดใช้เป็นอมตะต่อดาเมจกายภาพของ ${name} นาน 2 วินาที ใช้ดวลสวนกลับได้ทันที`, 91);
    }
  }

  // 4. Physical Burst / Agile Dive Defense & Sky Piercer Finisher
  if (rawTypes.has('Anti-Burst') || AGILE_DIVE_ENEMIES.has(name) || enemyHero.roles.includes('Assassin') || enemyHero.roles.includes('Fighter')) {
    if (isPhysHero) {
      addItem('antique_cuirass', `ลดพลังโจมตีสกิลกายภาพของ ${name} ลงสูงสุด 18% เมื่อถูกสกิลโจมตี`, 93);
      addItem('wind_of_nature', `กดอมตะป้องกันดาเมจกายภาพจากจังหวะล้วงของ ${name} 100% นาน 2 วินาที (สำหรับแครี่)`, 90);
    }
    addItem('winter_crown', `มงกุฎน้ำแข็งเมต้าใหม่! กดแช่แข็งตัวเองเป็นอมตะ 2 วินาที หลบจังหวะคอมโบเบิร์สต์ของ ${name}`, 91);
    addItem('sky_piercer', `ดาบประหารเมต้าใหม่! สังหาร ${name} ทันทีเมื่อเลือดต่ำกว่า 4%–12% ป้องกันไม่ให้ ${name} แดชหรือโหนสลิงหนีรอดตอนเลือดก้นหลอด`, 89);
    addItem('flask_of_the_oasis', `ขวดน้ำซัพพอร์ต! เด้งเกราะก้อนโตอัตโนมัติทันทีที่เพื่อนโดน ${name} ล้วงจนเลือดต่ำกว่า 35%`, 87);
    addItem('queens_wings', `ปีกแดงโฉมใหม่! ลดดาเมจที่ได้รับลง 30% และลดคูลดาวน์เมื่อเลือดต่ำกว่า 40% ช่วยให้สวนกลับ ${name} ได้`, 85);
    addItem('immortality', `ตายแล้วฟื้นคืนชีพพร้อมเกราะดูดซับดาเมจ ซื้อเวลาให้เพื่อนมาช่วยเมื่อโดน ${name} ล้วง`, 83);
  }

  // 5. Single-Hit Nuke Defense
  if (SINGLE_HIT_NUKE_ENEMIES.has(name)) {
    addItem('twilight_armor', `เกราะม่วงโฉมใหม่! ลดดาเมจก้อนโตที่แรงเกิน 800 ต่อฮิตจาก ${name} ลงอย่างมหาศาล ป้องกันการโดนทุบ/ยิงนัดเดียวตาย`, 92);
    addItem('immortality', `กันเหนียวตายแล้วเกิดใหม่เมื่อโดนดาเมจระเบิดนัดเดียวของ ${name}`, 84);
  }

  // 6. Magic Burst Defense
  if (rawTypes.has('Magic-Burst-Def') || (isMagicHero && (enemyHero.roles.includes('Mage') || enemyHero.roles.includes('Assassin')))) {
    addItem('athenas_shield', `ลดดาเมจเวทชุดเดียวจาก ${name} ลง 25% ทันทีที่โดนสกิลเวท ป้องกันการโดนช็อตชุดเดียวตาย`, 95);
    addItem('rose_gold_meteor', `ดาบกุหลาบโฉมใหม่! เพิ่มเกราะตามดูดเลือด + เด้งเกราะกันเวทฉุกเฉินและวิ่งเร็ว 50% เมื่อโดนคอมโบของ ${name}`, 90);
    addItem('winter_crown', `กดแช่แข็งอมตะ 2 วินาที หลบจังหวะอัลติเมจ/แอสซาซินเวทของ ${name}`, 88);
    addItem('immortality', `ตายแล้วฟื้นคืนชีพ ป้องกันการโดนคอมโบเวทของ ${name} ชุดเดียวจบในเลทเกม`, 82);
  }

  // 7. Continuous / Multi-Hit Magic Defense & Anti-Heal Counter
  if (rawTypes.has('Magic-Def') || HEAVY_SLOW_ZONE_ENEMIES.has(name) || ['Chang\'e', 'Kimmy', 'Natan', 'Zhuxin', 'Yve', 'Valir', 'Lylia', 'Gord', 'Odette', 'Harley', 'Alice', 'Zhask', 'Cyclops', 'Esmeralda', 'Edith', 'Harith', 'Joy', 'Baxia'].includes(name)) {
    addItem('radiant_armor', `เพิ่มเกราะเวทสะสมสูงสุด 6 สแต็กเมื่อรับดาเมจเวทหลายฮิต/เผาต่อเนื่องจาก ${name}`, 94);
    addItem('oracle', `เพิ่มผลรับฮีลและเกราะขาวตัวเองขึ้น 30% ใช้หักล้างเมื่อ ${name} ออกของตัดเลือดมาสู้`, 85);
  }

  // 8. Crowd Control Tenacity & Ultimate Tempo
  if (rawTypes.has('Tenacity') || HEAVY_CC_ENEMIES.has(name) || (enemyHero.ability?.control || 0) >= 60) {
    addItem('tough_boots', `ลดระยะเวลาติดสตั๊น/สโลว์/ล็อกขาจาก ${name} ลง 30% ช่วยให้หลุดคอมโบไวขึ้น`, 89);
    addItem('fleeting_time', `ลดคูลดาวน์อัลติลง 30% ทุกครั้งที่คิล/แอสซิสต์ เพื่อให้มีอัลติเปิดสวนกลับ ${name} ได้ไวกว่าเดิม`, 82);
  }

  results.sort((a, b) => b.priorityWeight - a.priorityWeight);
  return results;
}

// Resolve the active lane for each slot (0..4) of a team ('ally' or 'enemy'), respecting manual laneOverrides
function resolveTeamSlotLanes(side = 'ally') {
  const heroIds = side === 'enemy' ? state.enemyPicks : state.allyPicks;
  const assigned = Array(5).fill(null);
  const filledLanes = new Set();

  // Pass 1: Apply explicit user lane overrides first
  for (let i = 0; i < 5; i++) {
    const h = heroIds[i] ? HERO_BY_ID.get(heroIds[i]) : null;
    if (!h) continue;
    const ov = state.laneOverrides[`${side}-${i}`];
    if (ov && ALL_LANES.includes(ov)) {
      assigned[i] = ov;
      filledLanes.add(ov);
    }
  }

  // Pass 2: Single-lane heroes without manual override
  for (let i = 0; i < 5; i++) {
    if (assigned[i]) continue;
    const h = heroIds[i] ? HERO_BY_ID.get(heroIds[i]) : null;
    if (!h) continue;
    if (h.lanes.length === 1) {
      const targetLane = h.lanes[0];
      if (targetLane === 'Jungle' && filledLanes.has('Jungle')) {
        assigned[i] = 'EXP Lane';
        filledLanes.add('EXP Lane');
      } else {
        assigned[i] = targetLane;
        filledLanes.add(targetLane);
      }
    }
  }

  // Pass 3: Primary lane (h.lanes[0]) if not yet occupied
  for (let i = 0; i < 5; i++) {
    if (assigned[i]) continue;
    const h = heroIds[i] ? HERO_BY_ID.get(heroIds[i]) : null;
    if (!h) continue;
    const prim = h.lanes[0];
    if (prim && !filledLanes.has(prim)) {
      assigned[i] = prim;
      filledLanes.add(prim);
    }
  }

  // Pass 4: Secondary flex lanes (never auto-assign 'Jungle' as a secondary flex lane unless user manually overrides)
  for (let i = 0; i < 5; i++) {
    if (assigned[i]) continue;
    const h = heroIds[i] ? HERO_BY_ID.get(heroIds[i]) : null;
    if (!h) continue;
    const openFlex = h.lanes.find(l => l !== 'Jungle' && !filledLanes.has(l));
    if (openFlex) {
      assigned[i] = openFlex;
      filledLanes.add(openFlex);
    } else {
      const fallback = (h.lanes[0] === 'Jungle' && filledLanes.has('Jungle'))
        ? (h.lanes.find(l => l !== 'Jungle') || 'EXP Lane')
        : (h.lanes[0] || 'EXP Lane');
      assigned[i] = fallback;
      filledLanes.add(fallback);
    }
  }

  return assigned;
}

function getSlotAssignedLane(side, slotIdx) {
  const heroIds = side === 'enemy' ? state.enemyPicks : state.allyPicks;
  const h = heroIds[slotIdx] ? HERO_BY_ID.get(heroIds[slotIdx]) : null;
  if (!h) return null;
  const resolved = resolveTeamSlotLanes(side);
  return resolved[slotIdx] || h.lanes[0] || 'EXP Lane';
}

// Determine which single hero on a team is assigned the Jungle role (for Retribution)
function getTeamJunglerHeroId(teamHeroIds, side = null) {
  const inferredSide = side || (teamHeroIds === state.allyPicks ? 'ally' : (teamHeroIds === state.enemyPicks ? 'enemy' : null));
  if (inferredSide) {
    const slotLanes = resolveTeamSlotLanes(inferredSide);
    const jgSlotIdx = slotLanes.findIndex(l => l === 'Jungle');
    return jgSlotIdx !== -1 ? teamHeroIds[jgSlotIdx] : null;
  }

  // For candidate array (e.g. [...allyPicks, candidateId])
  const allySlotLanes = resolveTeamSlotLanes('ally');
  const existingJgIdx = allySlotLanes.findIndex(l => l === 'Jungle');
  if (existingJgIdx !== -1 && state.allyPicks[existingJgIdx]) {
    return state.allyPicks[existingJgIdx];
  }

  const validHeroes = teamHeroIds.filter(Boolean).map(id => HERO_BY_ID.get(id)).filter(Boolean);
  const primJg = validHeroes.find(h => h.lanes[0] === 'Jungle');
  return primJg ? primJg.id : null;
}

// Get Hero's Authentic Battle Spell Profile
function getHeroSpellProfile(hero) {
  if (!hero) return { primary: 'Flicker', valid: ['Flicker', 'Purify'], note: 'สเปลมาตรฐาน' };
  return HERO_SPELL_PROFILES[hero.name.toLowerCase()] || {
    primary: 'Flicker',
    valid: ['Flicker', 'Purify'],
    note: `สเปลมาตรฐานของ ${hero.name}`
  };
}

// Get the Counter Spell to display/select on an Enemy Pick Slot (S1..S5)
function getEnemySlotCounterSpell(enemyHero, slotIdx) {
  return getRecommendedSpell(enemyHero, state.enemyPicks, state.allyPicks, 'enemy', slotIdx);
}

// Hero & Position-Aware Battle Spell Resolution (Every hero gets their true signature spell, and anyone in Jungle gets Retribution!)
function getRecommendedSpell(hero, teamHeroIds = [], opposingHeroIds = [], side = null, slotIdx = null) {
  if (!hero) return SPELL_BY_KEY.get('Flicker');

  // 1. Check manual override first (for ally slot, enemy slot, or recommended card)
  const overrideKey = (side === 'ally' || side === 'enemy') && slotIdx !== null
    ? state.spellOverrides[`${side}-${slotIdx}`]
    : state.spellOverrides[`rec-${hero.id}`];

  const profile = getHeroSpellProfile(hero);
  const validSpellObjs = profile.valid.map(k => SPELL_BY_KEY.get(k)).filter(Boolean);

  if (overrideKey && SPELL_BY_KEY.has(overrideKey)) {
    return {
      ...SPELL_BY_KEY.get(overrideKey),
      isCounterSpell: true,
      isManual: true,
      validSpells: validSpellObjs,
      counterTargets: [],
      allCounterSpells: side === 'enemy' ? getCounterSpellsForEnemy(hero) : [],
      reason: `เลือกสเปล ${overrideKey} เอง (สเปลประจำตัว ${hero.name}: ${profile.valid.join(' / ')})`
    };
  }

  // 2. Check if this hero is playing the Jungle position! Anyone playing Jungle MUST carry Retribution!
  let isPlayingJungle = false;
  if ((side === 'ally' || side === 'enemy') && slotIdx !== null) {
    isPlayingJungle = getSlotAssignedLane(side, slotIdx) === 'Jungle';
  } else {
    const allySlotLanes = resolveTeamSlotLanes('ally');
    const allyAlreadyHasJungler = allySlotLanes.includes('Jungle');
    if (!allyAlreadyHasJungler && (hero.lanes[0] === 'Jungle' || (state.recLaneFilter === 'Jungle' && hero.lanes.includes('Jungle')))) {
      isPlayingJungle = true;
    }
  }

  if (isPlayingJungle) {
    return {
      ...SPELL_BY_KEY.get('Retribution'),
      isCounterSpell: false,
      isManual: false,
      validSpells: [SPELL_BY_KEY.get('Retribution'), ...validSpellObjs],
      counterTargets: [],
      allCounterSpells: side === 'enemy' ? getCounterSpellsForEnemy(hero) : [],
      reason: `ตำแหน่งป่า (Jungle) ต้องใช้สเปลฟาร์ม Retribution เสมอ (หากสลับไปยืนเลนอื่นจะใช้ ${profile.valid.join(' / ')})`
    };
  }

  // 3. Return the Hero's Authentic Signature Spell (e.g. Kadita -> Petrify/Flicker, Lapu-Lapu -> Flicker, etc.)
  const primarySpell = SPELL_BY_KEY.get(profile.primary) || SPELL_BY_KEY.get('Flicker');
  const altNames = profile.valid.length > 1
    ? ` (ใช้ ${profile.valid.join(' หรือ ')} ได้)`
    : '';

  return {
    ...primarySpell,
    isCounterSpell: false,
    isManual: false,
    validSpells: validSpellObjs,
    counterTargets: [],
    allCounterSpells: side === 'enemy' ? getCounterSpellsForEnemy(hero) : [],
    reason: `${profile.note}${altNames}`
  };
}

function cycleSlotSpell(side, slotIdx) {
  openSpellPickerModal(side, slotIdx);
}

// Swap Heroes & Bans Between Blue Side (Ally) and Red Side (Enemy)
function swapAllTeams() {
  const tempPicks = [...state.allyPicks];
  state.allyPicks = [...state.enemyPicks];
  state.enemyPicks = tempPicks;

  const allyBans = state.bans.slice(0, 5);
  const enemyBans = state.bans.slice(5, 10);
  state.bans = [...enemyBans, ...allyBans];

  if (state.activeSlot.type === 'ban') {
    state.activeSlot.index = state.activeSlot.index < 5
      ? state.activeSlot.index + 5
      : state.activeSlot.index - 5;
  }

  // Clear slot spell overrides on team swap so counter spells recalculate cleanly for the new matchup
  state.spellOverrides = {};
  const newLaneOverrides = {};
  for (let i = 0; i < 5; i++) {
    if (state.laneOverrides[`ally-${i}`]) newLaneOverrides[`enemy-${i}`] = state.laneOverrides[`ally-${i}`];
    if (state.laneOverrides[`enemy-${i}`]) newLaneOverrides[`ally-${i}`] = state.laneOverrides[`enemy-${i}`];
  }
  state.laneOverrides = newLaneOverrides;
  refreshAllViews();
}

function swapSlotBetweenTeams(idx) {
  const temp = state.allyPicks[idx];
  state.allyPicks[idx] = state.enemyPicks[idx];
  state.enemyPicks[idx] = temp;
  delete state.spellOverrides[`ally-${idx}`];
  delete state.spellOverrides[`enemy-${idx}`];
  const tempLane = state.laneOverrides[`ally-${idx}`];
  if (state.laneOverrides[`enemy-${idx}`]) state.laneOverrides[`ally-${idx}`] = state.laneOverrides[`enemy-${idx}`];
  else delete state.laneOverrides[`ally-${idx}`];
  if (tempLane) state.laneOverrides[`enemy-${idx}`] = tempLane;
  else delete state.laneOverrides[`enemy-${idx}`];
  refreshAllViews();
}

function getHeroStatus(heroId) {
  if (state.bans.includes(heroId)) return 'BANNED';
  if (state.allyPicks.includes(heroId)) return 'ALLY';
  if (state.enemyPicks.includes(heroId)) return 'ENEMY';
  return 'AVAILABLE';
}

function analyzeTeamLanes(heroIds, side = null) {
  const inferredSide = side || (heroIds === state.allyPicks ? 'ally' : (heroIds === state.enemyPicks ? 'enemy' : null));
  if (inferredSide) {
    const slotLanes = resolveTeamSlotLanes(inferredSide);
    const filledLanes = new Set(slotLanes.filter(Boolean));
    const missingLanes = ALL_LANES.filter(l => !filledLanes.has(l));
    return { filledLanes, missingLanes, slotLanes };
  }

  const validHeroes = heroIds.filter(Boolean).map(id => HERO_BY_ID.get(id)).filter(Boolean);
  const filledLanes = new Set();
  const flexHeroes = [];

  for (const h of validHeroes) {
    if (h.lanes.length === 1) filledLanes.add(h.lanes[0]);
    else flexHeroes.push(h);
  }
  for (const h of flexHeroes) {
    const openMatch = h.lanes.find(l => !filledLanes.has(l));
    if (openMatch) filledLanes.add(openMatch);
    else if (h.lanes[0]) filledLanes.add(h.lanes[0]);
  }

  const missingLanes = ALL_LANES.filter(l => !filledLanes.has(l));
  return { filledLanes, missingLanes };
}

// Helper: Check if a hero is eligible for ban recommendation based on enemy picks.
// If the enemy has already picked a role/position (e.g. Jungle), we do NOT recommend banning that position.
function isHeroBanEligibleAgainstEnemy(hero, enemyFilledLanes) {
  if (!enemyFilledLanes || enemyFilledLanes.size === 0) return true;

  // 1. If hero's primary lane is already taken by the enemy team, do not recommend banning
  const primaryLane = hero.lanes[0];
  if (primaryLane && enemyFilledLanes.has(primaryLane)) {
    return false;
  }

  // 2. If ALL of hero's playable lanes are already filled in enemy team, do not recommend
  if (hero.lanes && hero.lanes.length > 0 && hero.lanes.every(l => enemyFilledLanes.has(l))) {
    return false;
  }

  return true;
}

// Helper: Find Pro Meta Combos involving a candidate hero & current allies
function findMatchingMetaCombosForCandidate(candidateId, pickedAllyIds) {
  const matches = [];
  for (const combo of COMBOS) {
    const ids = combo.heroObjs.map(h => h.id);
    if (!ids.includes(candidateId)) continue;
    // Check if any hero in this combo is banned or picked by enemy
    const blocked = ids.some(id => state.bans.includes(id) || state.enemyPicks.includes(id));
    if (blocked) continue;

    const alliesInCombo = ids.filter(id => pickedAllyIds.includes(id) && id !== candidateId);
    if (alliesInCombo.length > 0) {
      matches.push({
        combo,
        alliesInCombo: alliesInCombo.map(id => HERO_BY_ID.get(id)).filter(Boolean)
      });
    }
  }
  return matches;
}

// Core Engine: Calculate Counter + Meta Combo Recommendations
function calculateRecommendations() {
  const pickedEnemies = state.enemyPicks.filter(Boolean).map(id => HERO_BY_ID.get(id)).filter(Boolean);
  const pickedAllies = state.allyPicks.filter(Boolean).map(id => HERO_BY_ID.get(id)).filter(Boolean);
  const pickedAllyIds = pickedAllies.map(a => a.id);
  const { missingLanes } = analyzeTeamLanes(state.allyPicks);

  const isComboPriority = state.strategyMode === 'combo';
  const results = [];

  for (const candidate of HEROES) {
    if (getHeroStatus(candidate.id) !== 'AVAILABLE') continue;

    if (state.recLaneFilter === 'SS_ONLY') {
      if (candidate.tier !== 'SS') continue;
    } else if (state.recLaneFilter === 'MISSING') {
      if (missingLanes.length > 0 && !candidate.lanes.some(l => missingLanes.includes(l))) continue;
    } else if (state.recLaneFilter !== 'ALL') {
      if (!candidate.lanes.includes(state.recLaneFilter)) continue;
    }

    let counterScore = 0;
    const counteredTargets = [];
    const riskThreats = [];
    const synergyAllies = [];

    // 1. Evaluate against each picked Enemy Hero
    for (const enemy of pickedEnemies) {
      const matchFromCandidate = candidate.strongAgainst.find(x => x.id === enemy.id);
      const matchFromEnemy = enemy.counteredBy.find(x => x.id === candidate.id);
      const bestMatch = matchFromCandidate || matchFromEnemy;

      if (bestMatch) {
        const pts = bestMatch.score || 25;
        counterScore += pts;
        counteredTargets.push({
          enemyId: enemy.id,
          enemyName: enemy.name,
          enemyHead: enemy.head,
          badge: bestMatch.badge || 'Counter Pick',
          reason: bestMatch.reason || `${candidate.name} ชนะทาง ${enemy.name}`,
          score: pts
        });
      }

      const enemyCountersCandidate = enemy.strongAgainst.find(x => x.id === candidate.id);
      if (enemyCountersCandidate && enemyCountersCandidate.score >= 34) {
        counterScore -= enemyCountersCandidate.score * 0.42;
        riskThreats.push({
          enemyId: enemy.id,
          enemyName: enemy.name,
          badge: enemyCountersCandidate.badge
        });
      }
    }

    // 2. Evaluate Statistical & Curated Synergy with picked Allied Heroes
    let synergyScore = 0;
    for (const ally of pickedAllies) {
      const synA = candidate.synergies.find(x => x.id === ally.id);
      const synB = ally.synergies.find(x => x.id === candidate.id);
      const syn = synA || synB;
      if (syn) {
        synergyScore += (syn.score || 15) * (isComboPriority ? 1.35 : 0.75);
        synergyAllies.push({
          allyId: ally.id,
          allyName: ally.name,
          allyHead: ally.head,
          deltaWr: syn.deltaWr,
          comboTitle: null
        });
      }
    }

    // 3. Evaluate Pro Meta Combos completion!
    const matchingCombos = findMatchingMetaCombosForCandidate(candidate.id, pickedAllyIds);
    for (const mc of matchingCombos) {
      const bonus = isComboPriority ? 46 : 26;
      synergyScore += bonus * mc.alliesInCombo.length;
      for (const allyObj of mc.alliesInCombo) {
        const existingSyn = synergyAllies.find(s => s.allyId === allyObj.id);
        if (existingSyn) {
          existingSyn.comboTitle = mc.combo.title;
          existingSyn.winRateBonus = mc.combo.winRateBonus;
        } else {
          synergyAllies.push({
            allyId: allyObj.id,
            allyName: allyObj.name,
            allyHead: allyObj.head,
            deltaWr: null,
            comboTitle: mc.combo.title,
            winRateBonus: mc.combo.winRateBonus
          });
        }
      }
    }

    // If in Combo Priority mode and no allies picked yet, boost heroes that are part of SS/S-Tier unbanned Meta Combos
    if (isComboPriority && pickedAllies.length === 0) {
      const inTopCombo = COMBOS.some(c =>
        c.tier === 'SS' &&
        c.heroObjs.some(h => h.id === candidate.id) &&
        !c.heroObjs.some(h => state.bans.includes(h.id) || state.enemyPicks.includes(h.id))
      );
      if (inTopCombo) synergyScore += 22;
    }

    const metaWeight = pickedEnemies.length > 0
      ? candidate.stats.metaScore * 0.28
      : candidate.stats.metaScore * 0.85;

    const fillsNeededLane = pickedAllies.length > 0 && candidate.lanes.some(l => missingLanes.includes(l));
    const laneBonus = fillsNeededLane ? 12 : 0;
    const multiCounterBonus = counteredTargets.length >= 2 ? (counteredTargets.length - 1) * 16 : 0;

    // Direct Tier Meta Bonus: Much higher weight for SS (God Tier Meta)
    const tierBonus = candidate.tier === 'SS' ? 80 : (candidate.tier === 'S' ? 24 : (candidate.tier === 'A' ? 6 : 0));

    // Special SS God Meta Amplifiers (Dominates draft priority)
    let ssExtraBonus = 0;
    if (candidate.tier === 'SS') {
      if (counteredTargets.length > 0) ssExtraBonus += 32; // SS God Counter directly countering enemy
      if (pickedAllies.length === 0) ssExtraBonus += 35; // Unconditional first pick priority
      if (fillsNeededLane) ssExtraBonus += 18; // SS filling needed lane
    }

    // Competitive Tournament Pro Meta Check (MPL / M-Series / MSC)
    const isPro = PRO_COMPETITIVE_HEROES.has(candidate.name.toLowerCase());
    const proBonus = isPro ? 28 : (state.strategyMode === 'all' ? 0 : -65);

    const effectiveCounterScore = (counterScore + multiCounterBonus) * (isComboPriority ? 0.78 : 1.0);
    const totalScore = Number((effectiveCounterScore + synergyScore + metaWeight + tierBonus + ssExtraBonus + proBonus + laneBonus).toFixed(1));

    results.push({
      hero: candidate,
      totalScore,
      tierBonus,
      ssExtraBonus,
      isSsTier: candidate.tier === 'SS',
      isProMeta: isPro,
      counterScore: Number((counterScore + multiCounterBonus).toFixed(1)),
      synergyScore: Number(synergyScore.toFixed(1)),
      counteredTargets,
      synergyAllies,
      matchingCombos,
      riskThreats,
      fillsNeededLane
    });
  }

  results.sort((a, b) => b.totalScore - a.totalScore);
  return {
    recommendations: results,
    hasEnemyPicks: pickedEnemies.length > 0,
    pickedEnemies,
    pickedAllies,
    missingLanes
  };
}

// Render Live Playable Meta Combos Strip inside Draft Center Panel
function renderLiveComboStrip() {
  const stripEl = document.getElementById('liveComboStrip');
  const pickedAllyIds = state.allyPicks.filter(Boolean);
  const pickedEnemyIds = state.enemyPicks.filter(Boolean);

  // Score all unblocked combos
  const scoredCombos = [];
  for (const combo of COMBOS) {
    const heroIds = combo.heroObjs.map(h => h.id);
    // If any hero in this combo is banned or picked by enemy, skip
    const isBlocked = heroIds.some(id => state.bans.includes(id) || pickedEnemyIds.includes(id));
    if (isBlocked) continue;

    // Also check if an enemy already picked one of the combo's `mustBan` hard-counters!
    const hardCounteredByEnemy = combo.mustBanObjs.filter(mb => pickedEnemyIds.includes(mb.id));

    const alreadyInTeam = combo.heroObjs.filter(h => pickedAllyIds.includes(h.id));
    const missingFromTeam = combo.heroObjs.filter(h => !pickedAllyIds.includes(h.id));

    // Check if there are enough empty slots in Ally Team to fit the remaining combo heroes
    const emptyAllySlots = state.allyPicks.filter(x => x === null).length;
    if (missingFromTeam.length > emptyAllySlots) continue;

    // How well do the combo heroes counter the current enemy picks?
    let comboCounterPts = 0;
    const counteredEnemyNames = new Set();
    for (const ch of combo.heroObjs) {
      for (const eid of pickedEnemyIds) {
        const hit = ch.strongAgainst.find(x => x.id === eid);
        if (hit) {
          comboCounterPts += hit.score;
          const eHero = HERO_BY_ID.get(eid);
          if (eHero) counteredEnemyNames.add(eHero.name);
        }
      }
    }

    const score =
      (alreadyInTeam.length * 55) +
      comboCounterPts * 0.6 +
      (combo.tier === 'SS' ? 25 : 15) -
      (hardCounteredByEnemy.length * 35);

    scoredCombos.push({
      combo,
      alreadyInTeam,
      missingFromTeam,
      counteredEnemyNames: [...counteredEnemyNames],
      hardCounteredByEnemy,
      score
    });
  }

  scoredCombos.sort((a, b) => b.score - a.score);
  const topCombos = scoredCombos.slice(0, 3);

  if (topCombos.length === 0) {
    stripEl.style.display = 'none';
    return;
  }

  stripEl.style.display = 'block';
  stripEl.innerHTML = `
    <div class="live-combo-strip-header">
      <div style="font-size:0.84rem; font-weight:700; color:#7dd3fc; display:flex; align-items:center; gap:0.45rem;">
        <span>⚡ ทางเลือก Meta Combo ที่พร้อมเล่นในดราฟต์นี้ (ไม่ติดแบน):</span>
      </div>
      <button class="btn" style="font-size:0.72rem; padding:0.2rem 0.6rem; border-color:#38bdf8; color:#bae6fd;" onclick="switchTab('combos')">
        ดูคลังคอมโบทั้งหมด 16 แผน →
      </button>
    </div>
    <div class="live-combo-cards-row">
      ${topCombos.map(item => {
        const c = item.combo;
        const isPartialMatch = item.alreadyInTeam.length > 0 && item.missingFromTeam.length > 0;
        const isComplete = item.missingFromTeam.length === 0;

        return `
          <div class="mini-combo-card">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.35rem;">
              <strong style="font-size:0.8rem; color:#fff;">${c.title}</strong>
              <span style="font-size:0.68rem; color:#6ee7b7; font-weight:700; white-space:nowrap;">${c.winRateBonus}</span>
            </div>
            <div class="mini-combo-avatars">
              ${c.heroObjs.map(h => {
                const inAlly = pickedAllyIds.includes(h.id);
                return `
                  <span class="mini-combo-hero ${inAlly ? 'in-team' : ''}" title="${h.lanes.join('/')}">
                    <img src="${h.head}" alt="${h.name}" />
                    <span>${h.name}${inAlly ? ' ✓' : ''}</span>
                  </span>
                `;
              }).join('<span style="color:#38bdf8; font-weight:700; font-size:0.75rem;">+</span>')}
            </div>
            <div style="font-size:0.71rem; color:#cbd5e1;">
              ${item.counteredEnemyNames.length > 0
                ? `<span style="color:#fda4af;">⚔️ ชนะทาง: ${item.counteredEnemyNames.join(', ')}</span> • `
                : ''}
              <span>${c.summary.slice(0, 72)}...</span>
            </div>
            ${item.hardCounteredByEnemy.length > 0 ? `
              <div style="font-size:0.68rem; color:#fde68a;">⚠️ ศัตรูมีตัวแก้คอมโบนี้: ${item.hardCounteredByEnemy.map(x=>x.name).join(', ')}</div>
            ` : ''}
            <div style="display:flex; gap:0.35rem; margin-top:auto;">
              ${isComplete ? `
                <span style="font-size:0.72rem; color:#6ee7b7; font-weight:700;">✓ อยู่ในทีมครบชุดแล้ว!</span>
              ` : `
                <button class="btn-pick-ally" style="font-size:0.72rem; padding:0.28rem 0.5rem; background:linear-gradient(135deg,#0284c7,#7c3aed);" onclick="applyComboToDraft('${c.id}', false)">
                  ⚡ ${isPartialMatch ? `กดเติม ${item.missingFromTeam.map(x=>x.name).join(' + ')} เข้าทีม` : 'เลือกคอมโบนี้เข้าทีมเรา'}
                </button>
              `}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function applyComboToDraft(comboId, alsoAutoBanCounters = false) {
  const combo = COMBOS.find(c => c.id === comboId);
  if (!combo) return;

  if (alsoAutoBanCounters) {
    // Put combo's mustBan heroes into empty Ban slots if available
    for (const mb of combo.mustBanObjs) {
      if (getHeroStatus(mb.id) === 'AVAILABLE') {
        const emptyBanIdx = state.bans.findIndex(x => x === null);
        if (emptyBanIdx !== -1) state.bans[emptyBanIdx] = mb.id;
      }
    }
  }

  // If this is a 5-man squad, or if not enough slots, clear non-matching ally picks if needed
  const neededHeroes = combo.heroObjs.filter(h => !state.allyPicks.includes(h.id) && getHeroStatus(h.id) === 'AVAILABLE');
  const emptySlotsCount = state.allyPicks.filter(x => x === null).length;

  if (neededHeroes.length > emptySlotsCount) {
    // Reset ally picks to load this full combo cleanly
    state.allyPicks = Array(5).fill(null);
  }

  for (const h of combo.heroObjs) {
    if (state.allyPicks.includes(h.id)) continue;
    if (getHeroStatus(h.id) !== 'AVAILABLE') continue;
    const emptyIdx = state.allyPicks.findIndex(x => x === null);
    if (emptyIdx !== -1) {
      state.allyPicks[emptyIdx] = h.id;
    }
  }

  switchTab('draft');
  refreshAllViews();
}

function setStrategyMode(strat) {
  state.strategyMode = strat;
  document.querySelectorAll('.strat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.strat === strat);
  });
  refreshAllViews();
}

// Render Banned Heroes Section
function renderBanBoard() {
  const bannedCount = state.bans.filter(Boolean).length;
  document.getElementById('banCountBadge').textContent = `แบนไปแล้ว ${bannedCount} / 10 ตัว`;

  const enemyLaneAnalysis = analyzeTeamLanes(state.enemyPicks, 'enemy');
  const enemyFilledLanes = enemyLaneAnalysis.filledLanes;

  let banCandidates = [...HEROES].filter(h => getHeroStatus(h.id) === 'AVAILABLE');
  const hasEnemyFilter = enemyFilledLanes.size > 0 && enemyFilledLanes.size < 5;

  if (hasEnemyFilter) {
    banCandidates = banCandidates.filter(h => isHeroBanEligibleAgainstEnemy(h, enemyFilledLanes));
  }

  const topBanCandidates = banCandidates
    .sort((a, b) => {
      // 1. SS God Tier Priority in Bans (Must Ban)
      const aSS = a.tier === 'SS' ? 1 : 0;
      const bSS = b.tier === 'SS' ? 1 : 0;
      if (bSS !== aSS) return bSS - aSS;

      const aPro = PRO_COMPETITIVE_HEROES.has(a.name.toLowerCase()) ? 1 : 0;
      const bPro = PRO_COMPETITIVE_HEROES.has(b.name.toLowerCase()) ? 1 : 0;
      if (bPro !== aPro) return bPro - aPro;
      return b.stats.banRate - a.stats.banRate;
    })
    .slice(0, 7);

  let labelHtml = `<span class="ban-suggest-label">🔥 ตัวน่าแบนที่สุดตอนนี้ (คลิกเพื่อแบน):</span>`;
  if (hasEnemyFilter) {
    const filledText = [...enemyFilledLanes].map(l => LANE_SHORT_LABEL[l] || l).join(', ');
    const missingText = enemyLaneAnalysis.missingLanes.map(l => LANE_SHORT_LABEL[l] || l).join(', ');
    labelHtml = `<span class="ban-suggest-label" title="ศัตรูเลือกตำแหน่ง ${filledText} แล้ว จึงแนะนำเฉพาะตำแหน่งที่ศัตรูยังขาด">🎯 แนะนำแบนตำแหน่งที่ศัตรูยังขาด (${missingText}) • ข้าม ${filledText} ที่ศัตรูเลือกแล้ว:</span>`;
  } else if (enemyFilledLanes.size >= 5) {
    labelHtml = `<span class="ban-suggest-label">✓ ศัตรูเลือกครบ 5 ตำแหน่งแล้ว:</span>`;
  }

  const suggestHtml = [
    labelHtml,
    ...topBanCandidates.map(h => `
      <span class="ban-chip ${h.tier === 'SS' ? 'is-ss-ban' : ''}" onclick="quickAssignHero(${h.id}, 'ban')" title="คลิกเพื่อแบน ${h.name} (${h.tier} Tier • อัตราแบน ${h.stats.banRate}%)">
        <img src="${h.head}" alt="${h.name}" loading="lazy" />
        <span>${h.name}</span>
        ${h.tier === 'SS' ? `<span class="ss-mini-badge" title="SS God Tier Priority Ban">👑 SS</span>` : ''}
        <span style="font-size:0.65rem; color:#7dd3fc; margin-left:2px; font-weight:600; display:inline-flex; align-items:center; gap:2px;">
          <img src="${LANE_IMAGE[h.lanes[0]] || 'assets/lanes/mid.png'}" class="lane-pill-img" alt="${h.lanes[0]}" />[${LANE_SHORT_LABEL[h.lanes[0]] || h.lanes[0]}]
        </span>
        <span class="br-val">${h.stats.banRate}%</span>
      </span>
    `)
  ].join('');
  document.getElementById('banSuggestionsBar').innerHTML = suggestHtml;

  const renderSlot = (idx) => {
    const heroId = state.bans[idx];
    const hero = heroId ? HERO_BY_ID.get(heroId) : null;
    const isTarget = state.pickMode === 'ban' && state.activeSlot.type === 'ban' && state.activeSlot.index === idx;

    if (!hero) {
      return `
        <div class="ban-slot ${isTarget ? 'active-target' : ''}" onclick="openSlotPickerModal('ban', ${idx})" title="ช่องแบนที่ ${idx + 1} (คลิกเพื่อเปิดหน้าต่างเลือกฮีโร่ที่จะแบน)">
          <span class="empty-icon">🚫</span>
        </div>
      `;
    }
    return `
      <div class="ban-slot filled ${isTarget ? 'active-target' : ''}" onclick="openSlotPickerModal('ban', ${idx})" title="คลิกเพื่อเปลี่ยนตัวแบนในช่องที่ ${idx + 1} (${hero.name})">
        <button class="ban-remove-mini" onclick="event.stopPropagation(); removeDraftSlot('ban', ${idx})" title="ยกเลิกแบน ${hero.name}">✕</button>
        <img src="${hero.head}" alt="${hero.name}" />
        <div class="ban-slash"></div>
        <div class="slot-name">${hero.name}</div>
      </div>
    `;
  };

  document.getElementById('allyBanSlots').innerHTML = [0, 1, 2, 3, 4].map(renderSlot).join('');
  document.getElementById('enemyBanSlots').innerHTML = [5, 6, 7, 8, 9].map(renderSlot).join('');
}

// Render Team Columns (Ally & Enemy) — Clean S1..S5 slots + Real Battle Spell Icon & Counter Item Buttons!
function renderTeamColumns() {
  const allyPickedCount = state.allyPicks.filter(Boolean).length;
  document.getElementById('allyCountText').textContent = `${allyPickedCount} / 5 ตัว`;

  const allyLanes = analyzeTeamLanes(state.allyPicks);
  document.getElementById('allyLaneChecklist').innerHTML = ALL_LANES.map(lane => {
    const filled = allyLanes.filledLanes.has(lane);
    return `<span class="lane-status-pill ${filled ? 'filled' : 'missing'}">${filled ? '✓' : '⚠️'} <img src="${LANE_IMAGE[lane]}" class="lane-pill-img" alt="${lane}" /> ${LANE_SHORT_LABEL[lane]}</span>`;
  }).join('');

  document.getElementById('allyPickSlots').innerHTML = state.allyPicks.map((heroId, idx) => {
    const hero = heroId ? HERO_BY_ID.get(heroId) : null;
    const isTarget = state.pickMode === 'ally' && state.activeSlot.type === 'ally' && state.activeSlot.index === idx;

    if (!hero) {
      return `
        <div class="pick-slot ${isTarget ? 'active-target' : ''}" onclick="openSlotPickerModal('ally', ${idx})">
          <div class="pick-slot-avatar">S${idx + 1}</div>
          <div class="pick-slot-info">
            <div style="font-size:0.8rem; color:var(--text-muted);">คลิกเลือกฮีโร่ทีมเรา (S${idx + 1})</div>
          </div>
        </div>
      `;
    }

    const spell = getRecommendedSpell(hero, state.allyPicks, state.enemyPicks, 'ally', idx);
    const assignedLane = getSlotAssignedLane('ally', idx);
    const laneShort = LANE_SHORT_LABEL[assignedLane] || assignedLane;
    const laneImgSrc = LANE_IMAGE[assignedLane] || 'assets/lanes/mid.png';
    const emblem = getRecommendedEmblemForHero(hero, assignedLane);
    const coreBuild = getRecommendedCoreBuildForHero(hero);

    return `
      <div class="pick-slot ${isTarget ? 'active-target' : ''}" onclick="openSlotPickerModal('ally', ${idx})" title="คลิกเพื่อเปลี่ยนตัวละครในช่อง S${idx + 1}">
        <div class="pick-slot-avatar">
          <img src="${hero.head}" alt="${hero.name}" />
        </div>
        <div class="pick-slot-info">
          <div class="pick-slot-name">
            <span>${hero.name}</span>
            <span class="tier-badge tier-${hero.tier}">${hero.tier}</span>
          </div>
          <div class="pick-slot-meta">
            <span class="slot-active-lane-text" onclick="event.stopPropagation(); openLanePickerModal('ally', ${idx}, ${hero.id})" title="คลิกเพื่อเปลี่ยนตำแหน่ง/เลนที่เล่น (ปัจจุบัน: ${assignedLane})"><img src="${laneImgSrc}" class="lane-real-icon" alt="${assignedLane}" /> ${laneShort} ⇄</span> • <span style="color:#38bdf8;">WR ${hero.stats.winRate}%</span>
          </div>
          <div class="slot-action-pills-row" onclick="event.stopPropagation()">
            <button class="slot-mini-action-btn" onclick="openCounterGearModal('ALL', 'ALL', ${hero.id})" title="ดูไอเทมแก้ทางที่ ${hero.name} ควรออกสู้ศัตรูชุดนี้">
              🗡️
            </button>
            <button class="slot-mini-action-btn spell-btn" onclick="openSpellPickerModal('ally', ${idx}, ${hero.id})" title="คลิกเพื่อเลือกสเปลแก้ทางให้ ${hero.name}">
              ✨
            </button>
            <button class="slot-mini-action-btn lane-btn" onclick="openLanePickerModal('ally', ${idx}, ${hero.id})" title="คลิกเพื่อเปลี่ยนตำแหน่ง/เลนของ ${hero.name} (ปัจจุบัน: ${assignedLane})">
              <img src="${laneImgSrc}" class="lane-real-icon" alt="${assignedLane}" />
            </button>
          </div>
          <!-- Meta Emblem & 6 Items Recommendation Container -->
          <div class="slot-meta-build-box" onclick="event.stopPropagation()">
            <div class="slot-emblem-row" title="เซ็ต Emblem แนะนำตาม Meta: ${emblem ? emblem.title : ''}">
              <span class="slot-build-tag">Emblem:</span>
              <img src="${emblem ? emblem.mainImg : 'assets/emblems/fighter_emblem.png'}" class="slot-emblem-main" alt="${emblem ? emblem.mainName : ''}" title="Main: ${emblem ? emblem.mainName + ' (' + emblem.mainTh + ')' : ''}" />
              <div class="slot-talents-group">
                <img src="${emblem ? emblem.talent1.img : 'assets/emblems/rupture.png'}" class="slot-talent-icon" alt="${emblem ? emblem.talent1.name : ''}" title="Tier 1: ${emblem ? emblem.talent1.name + ' (' + emblem.talent1.desc + ')' : ''}" />
                <img src="${emblem ? emblem.talent2.img : 'assets/emblems/war_cry.png'}" class="slot-talent-icon" alt="${emblem ? emblem.talent2.name : ''}" title="Tier 2: ${emblem ? emblem.talent2.name + ' (' + emblem.talent2.desc + ')' : ''}" />
                <img src="${emblem ? emblem.talent3.img : 'assets/emblems/war_cry.png'}" class="slot-talent-icon slot-talent-core" alt="${emblem ? emblem.talent3.name : ''}" title="Core: ${emblem ? emblem.talent3.name + ' (' + emblem.talent3.desc + ')' : ''}" />
              </div>
            </div>
            <div class="slot-items-row" title="เซ็ตไอเทมเมต้าแนะนำ 6 ชิ้น: ${coreBuild ? coreBuild.title : ''}">
              <span class="slot-build-tag">Items:</span>
              <div class="slot-items-chips">
                ${(coreBuild && coreBuild.items ? coreBuild.items : []).map(it => `
                  <img src="${it.img}" class="slot-item-mini-img" alt="${it.name}" title="${it.name} (${it.thName}) — ${it.shortTag || ''}" onclick="openCounterGearModal('ALL', 'ALL', ${hero.id})" />
                `).join('')}
              </div>
            </div>
          </div>
        </div>
        <!-- Battle Spell (Dynamically counters Enemy Team or opens Spell Picker on click) -->
        <div class="spell-badge-box ${spell.isCounterSpell ? 'counter-spell-active' : ''}" onclick="event.stopPropagation(); openSpellPickerModal('ally', ${idx}, ${hero.id})" title="${spell.en} (${spell.th}) — ${spell.reason} (คลิกเพื่อเลือกสเปลแก้ทาง)">
          <img src="${spell.img}" class="spell-real-img" alt="${spell.en}" />
        </div>
        <button class="slot-remove-btn" onclick="event.stopPropagation(); removeDraftSlot('ally', ${idx})" title="นำออก">✕</button>
      </div>
    `;
  }).join('');

  // Enemy Team
  const enemyPickedCount = state.enemyPicks.filter(Boolean).length;
  document.getElementById('enemyCountText').textContent = `${enemyPickedCount} / 5 ตัว`;

  const enemyLanes = analyzeTeamLanes(state.enemyPicks);
  document.getElementById('enemyLaneChecklist').innerHTML = ALL_LANES.map(lane => {
    const filled = enemyLanes.filledLanes.has(lane);
    return `<span class="lane-status-pill ${filled ? 'filled' : ''}">${filled ? '⚔️' : '•'} <img src="${LANE_IMAGE[lane]}" class="lane-pill-img" alt="${lane}" /> ${LANE_SHORT_LABEL[lane]}</span>`;
  }).join('');

  document.getElementById('enemyPickSlots').innerHTML = state.enemyPicks.map((heroId, idx) => {
    const hero = heroId ? HERO_BY_ID.get(heroId) : null;
    const isTarget = state.pickMode === 'enemy' && state.activeSlot.type === 'enemy' && state.activeSlot.index === idx;

    if (!hero) {
      return `
        <div class="pick-slot ${isTarget ? 'active-target' : ''}" onclick="openSlotPickerModal('enemy', ${idx})">
          <div class="pick-slot-avatar" style="color:#fb7185;">S${idx + 1}</div>
          <div class="pick-slot-info">
            <div style="font-size:0.8rem; color:var(--text-muted);">คลิกเลือกฮีโร่ศัตรู (S${idx + 1})</div>
          </div>
        </div>
      `;
    }

    const topCountersForThisEnemy = hero.counteredBy
      .filter(c => getHeroStatus(c.id) === 'AVAILABLE')
      .slice(0, 2)
      .map(c => HERO_BY_ID.get(c.id)?.name)
      .filter(Boolean);

    // Counter Spell to use AGAINST this enemy hero!
    const counterSpell = getEnemySlotCounterSpell(hero, idx);
    const assignedLane = getSlotAssignedLane('enemy', idx);
    const laneShort = LANE_SHORT_LABEL[assignedLane] || assignedLane;
    const laneImgSrc = LANE_IMAGE[assignedLane] || 'assets/lanes/mid.png';
    const emblem = getRecommendedEmblemForHero(hero, assignedLane);
    const coreBuild = getRecommendedCoreBuildForHero(hero);

    return `
      <div class="pick-slot ${isTarget ? 'active-target' : ''}" onclick="openSlotPickerModal('enemy', ${idx})" title="คลิกเพื่อเปลี่ยนฮีโร่ศัตรูในช่อง S${idx + 1}">
        <div class="pick-slot-avatar">
          <img src="${hero.head}" alt="${hero.name}" />
        </div>
        <div class="pick-slot-info">
          <div class="pick-slot-name">
            <span>${hero.name}</span>
            <span class="tier-badge tier-${hero.tier}">${hero.tier}</span>
          </div>
          <div class="pick-slot-counters-mini">
            <span class="slot-active-lane-text" onclick="event.stopPropagation(); openLanePickerModal('enemy', ${idx}, ${hero.id})" title="คลิกเพื่อเปลี่ยนเลนของ ${hero.name} (ปัจจุบัน: ${assignedLane})"><img src="${laneImgSrc}" class="lane-real-icon" alt="${assignedLane}" /> ${laneShort} ⇄</span> • แพ้: <strong>${topCountersForThisEnemy.join(', ') || '-'}</strong>
          </div>
          <div class="slot-action-pills-row" onclick="event.stopPropagation()">
            <button class="slot-mini-action-btn" onclick="openCounterGearModal(${hero.id})" title="กดดูว่าต้องออก Item อะไรแก้ทาง ${hero.name}">
              🗡️
            </button>
            <button class="slot-mini-action-btn spell-btn" onclick="openSpellPickerModal('enemy', ${idx}, ${hero.id})" title="กดเลือกสเปลเอาไว้แก้ทาง ${hero.name}">
              ✨
            </button>
            <button class="slot-mini-action-btn lane-btn" onclick="openLanePickerModal('enemy', ${idx}, ${hero.id})" title="คลิกเพื่อเปลี่ยนตำแหน่ง/เลนของ ${hero.name} (ปัจจุบัน: ${assignedLane})">
              <img src="${laneImgSrc}" class="lane-real-icon" alt="${assignedLane}" />
            </button>
          </div>
          <!-- Meta Emblem & 6 Items Recommendation Container -->
          <div class="slot-meta-build-box" onclick="event.stopPropagation()">
            <div class="slot-emblem-row" title="เซ็ต Emblem ที่ ${hero.name} มักใส่ตาม Meta: ${emblem ? emblem.title : ''}">
              <span class="slot-build-tag">Emblem:</span>
              <img src="${emblem ? emblem.mainImg : 'assets/emblems/fighter_emblem.png'}" class="slot-emblem-main" alt="${emblem ? emblem.mainName : ''}" title="Main: ${emblem ? emblem.mainName + ' (' + emblem.mainTh + ')' : ''}" />
              <div class="slot-talents-group">
                <img src="${emblem ? emblem.talent1.img : 'assets/emblems/rupture.png'}" class="slot-talent-icon" alt="${emblem ? emblem.talent1.name : ''}" title="Tier 1: ${emblem ? emblem.talent1.name + ' (' + emblem.talent1.desc + ')' : ''}" />
                <img src="${emblem ? emblem.talent2.img : 'assets/emblems/war_cry.png'}" class="slot-talent-icon" alt="${emblem ? emblem.talent2.name : ''}" title="Tier 2: ${emblem ? emblem.talent2.name + ' (' + emblem.talent2.desc + ')' : ''}" />
                <img src="${emblem ? emblem.talent3.img : 'assets/emblems/war_cry.png'}" class="slot-talent-icon slot-talent-core" alt="${emblem ? emblem.talent3.name : ''}" title="Core: ${emblem ? emblem.talent3.name + ' (' + emblem.talent3.desc + ')' : ''}" />
              </div>
            </div>
            <div class="slot-items-row" title="เซ็ตไอเทมเมต้า 6 ชิ้นที่ ${hero.name} ศัตรูมักออก: ${coreBuild ? coreBuild.title : ''}">
              <span class="slot-build-tag">Items:</span>
              <div class="slot-items-chips">
                ${(coreBuild && coreBuild.items ? coreBuild.items : []).map(it => `
                  <img src="${it.img}" class="slot-item-mini-img" alt="${it.name}" title="${it.name} (${it.thName}) — คลิกเพื่อดูของแก้ทาง" onclick="openCounterGearModal(${hero.id})" />
                `).join('')}
              </div>
            </div>
          </div>
        </div>
        <!-- Counter Battle Spell Recommended AGAINST this Enemy Hero -->
        <div class="spell-badge-box counter-spell-active" onclick="event.stopPropagation(); openSpellPickerModal('enemy', ${idx}, ${hero.id})" title="สเปลแก้ทาง ${hero.name}: ${counterSpell.en} (${counterSpell.th}) — ${counterSpell.reason} (คลิกเพื่อเลือกสเปลแก้ทาง)">
          <img src="${counterSpell.img}" class="spell-real-img" alt="${counterSpell.en}" />
        </div>
        <button class="slot-remove-btn" onclick="event.stopPropagation(); removeDraftSlot('enemy', ${idx})" title="นำออก">✕</button>
      </div>
    `;
  }).join('');
}

// Render Center Counter + Meta Combo Recommendations
function renderRecommendations() {
  renderLiveComboStrip();

  const { recommendations, hasEnemyPicks, pickedEnemies } = calculateRecommendations();
  const bannedCount = state.bans.filter(Boolean).length;
  const isComboMode = state.strategyMode === 'combo';

  const titleEl = document.getElementById('recHeaderTitle');
  const subEl = document.getElementById('recHeaderSub');

  if (isComboMode) {
    titleEl.innerHTML = `⚡ แนะนำฮีโร่เน้นคอมโบทีมเรา + แก้ทางศัตรู`;
    subEl.textContent = `ให้น้ำหนักคู่หู Meta Combo ที่เข้าขากับเพื่อนในทีมสูงสุด ควบคู่กับการแก้ทางศัตรู (หักตัวแบน ${bannedCount} ตัวแล้ว)`;
  } else if (hasEnemyPicks) {
    const enemyNames = pickedEnemies.map(e => e.name).join(', ');
    titleEl.innerHTML = `🎯 แนะนำฮีโร่แก้ทาง: <span style="color:#fda4af;">${enemyNames}</span>`;
    subEl.textContent = `คัดกรองจากฮีโร่ที่พร้อมใช้งาน (หักตัวแบน ${bannedCount} ตัวแล้ว) • เรียงตามคะแนนชนะทาง + คอมโบทีม + สเปลแก้ทาง`;
  } else {
    titleEl.innerHTML = `🔥 แนะนำ First Pick / ตัวท็อป Meta ที่หลุดแบนตอนนี้`;
    subEl.textContent = `คลิกเลือกฮีโร่ศัตรู (S1–S5 ฝั่งขวา) เพื่อดูตัวแก้ทาง สเปลแก้ทาง และไอเทมแก้ทางอัตโนมัติ!`;
  }

  const topRecs = recommendations.slice(0, 12);
  const container = document.getElementById('recCardsContainer');

  // Render SS God Tier Alert Banner (Shows when unbanned SS tier heroes are available)
  const ssSpotlightEl = document.getElementById('ssGodSpotlightStrip');
  const unbannedSs = HEROES.filter(h => h.tier === 'SS' && getHeroStatus(h.id) === 'AVAILABLE');
  if (ssSpotlightEl) {
    if (unbannedSs.length > 0) {
      ssSpotlightEl.style.display = 'flex';
      ssSpotlightEl.innerHTML = `
        <div class="ss-spotlight-header">
          <span class="ss-crown-anim">👑</span>
          <div>
            <div style="font-size:0.92rem; font-weight:800; color:#fef08a; display:flex; align-items:center; gap:6px;">
              <span>ฮีโร่ระดับ SS GOD META ที่หลุดแบน (${unbannedSs.length} ตัว)</span>
              <span class="ss-god-badge">MUST PICK</span>
            </div>
            <span class="ss-spotlight-sub">อันดับ 1 ในเมต้าการแข่งขันปัจจุบัน แนะนำให้ชิงเลือกทันทีก่อนศัตรูแย่ง หรือใช้ปิดเกม</span>
          </div>
        </div>
        <div class="ss-spotlight-chips">
          ${unbannedSs.map(h => {
            const laneImg = LANE_IMAGE[h.lanes[0]] || 'assets/lanes/mid.png';
            return `
              <div class="ss-spotlight-chip" onclick="quickAssignHero(${h.id}, 'ally')" title="คลิกเพื่อเลือก ${h.name} (SS God Tier) เข้าทีมเรา">
                <img src="${h.head}" alt="${h.name}" />
                <div class="ss-chip-info">
                  <div class="ss-chip-name">${h.name} <span class="ss-mini-badge">👑 SS</span></div>
                  <div class="ss-chip-lane"><img src="${laneImg}" class="lane-pill-img" alt="${h.lanes[0]}" /> ${LANE_SHORT_LABEL[h.lanes[0]] || h.lanes[0]} • WR ${h.stats.winRate}%</div>
                </div>
                <button class="ss-chip-pick-btn" onclick="event.stopPropagation(); quickAssignHero(${h.id}, 'ally')">🛡️ เลือก</button>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else {
      ssSpotlightEl.style.display = 'none';
      ssSpotlightEl.innerHTML = '';
    }
  }

  if (topRecs.length === 0) {
    container.innerHTML = `<div style="padding:2rem; color:var(--text-muted); text-align:center;">ไม่พบฮีโร่ในเงื่อนไขที่เลือก</div>`;
  } else {
    container.innerHTML = topRecs.map((item, idx) => {
      const h = item.hero;
      const isTop1 = idx === 0;

      const targetChipsHtml = item.counteredTargets.map(t => `
        <span class="target-vs-chip" title="${t.reason}">
          <img src="${t.enemyHead}" alt="${t.enemyName}" />
          <span>ชนะ <strong>${t.enemyName}</strong> (${t.badge})</span>
        </span>
      `).join('');

      const synergyChipsHtml = item.synergyAllies.map(s => `
        <span class="synergy-with-chip">
          <img src="${s.allyHead}" alt="${s.allyName}" />
          <span>${s.comboTitle ? `⚡ คอมโบคู่ <strong>${s.allyName}</strong> (${s.winRateBonus || 'Meta Combo'})` : `เข้าขากับ <strong>${s.allyName}</strong>`}</span>
        </span>
      `).join('');

      const riskChipsHtml = item.riskThreats.map(r => `
        <span class="risk-vs-chip">⚠️ ระวังแพ้ทาง ${r.enemyName}</span>
      `).join('');

      const reasonLines = [];
      if (item.isProMeta) {
        reasonLines.push(`• <strong style="color:#38bdf8;">🏆 ตัวแข่ง Pro Meta:</strong> ได้รับความนิยมและผ่านการใช้งานจริงในทัวร์นาเมนต์ระดับอาชีพ (MPL / M-Series / MSC)`);
      }
      if (h.tier === 'SS') {
        const totalSsScore = (item.tierBonus || 80) + (item.ssExtraBonus || 0);
        reasonLines.push(`• <strong style="color:#fde047; font-size:0.84rem;">👑 SS GOD TIER META (+${totalSsScore} คะแนน):</strong> ฮีโร่อันดับ 1 เมต้าที่เก่งและโกงที่สุดในแพตช์ปัจจุบัน (WR ${h.stats.winRate}% / BR ${h.stats.banRate}% ใน Mythical Glory+) ชิงหยิบทันทีเพื่อความได้เปรียบสูงสุด!`);
        if (item.counteredTargets.length > 0) {
          reasonLines.push(`• <strong style="color:#f87171;">⚔️ SS God Counter (+32 คะแนน):</strong> ตัว SS ตัวนี้ยังชนะทาง ${item.counteredTargets.map(t => t.enemyName).join(', ')} โดยตรง!`);
        }
      } else if (h.tier === 'S') {
        reasonLines.push(`• <strong style="color:#6ee7b7;">⭐ S-Tier Top Meta (+${item.tierBonus} คะแนน):</strong> ฮีโร่กลุ่ม Top Meta เก่งรอบด้าน (WR ${h.stats.winRate}%)`);
      }

      if (item.matchingCombos?.length > 0) {
        for (const mc of item.matchingCombos) {
          reasonLines.push(`• <strong style="color:#7dd3fc;">⚡ คอมโบ ${mc.combo.title}:</strong> ${mc.combo.summary}`);
        }
      }
      if (item.counteredTargets.length > 0) {
        for (const t of item.counteredTargets) {
          reasonLines.push(`• <strong>⚔️ แก้ทาง ${t.enemyName}:</strong> ${t.reason}`);
        }
      }
      if (reasonLines.length === 0) {
        reasonLines.push(`• <strong>ท็อป Meta (${h.tier} Tier):</strong> อัตราชนะ ${h.stats.winRate}% และอัตราแบน ${h.stats.banRate}% ในแรงก์ Mythical Glory`);
      }

      const recSpell = getRecommendedSpell(h, [...state.allyPicks.filter(Boolean), h.id], state.enemyPicks, 'rec', idx);
      const coreBuild = getRecommendedCoreBuildForHero(h);
      if (recSpell.isCounterSpell && recSpell.counterTargets?.length > 0) {
        reasonLines.push(`• <strong style="color:#6ee7b7;">✨ สเปลแก้ทางแนะนำ (${recSpell.en} - ${recSpell.th}):</strong> รับมือ ${recSpell.counterTargets.join(', ')}`);
      }

      const miniCoreItemsHtml = coreBuild.items.slice(0, 3).map(it => `
        <img src="${it.img}" style="width:20px;height:20px;border-radius:4px;border:1px solid rgba(251,191,36,0.65);vertical-align:middle;" alt="${it.name}" title="ไอเทมเมต้าของ ${h.name}: ${it.name} (${it.thName})" />
      `).join('');

      return `
        <div class="rec-card ${h.tier === 'SS' ? 'tier-ss-card' : ''} ${isTop1 ? 'rank-1' : ''}">
          <div class="rec-card-top">
            <div class="rec-avatar-wrap">
              <img src="${h.head}" alt="${h.name}" loading="lazy" />
              <span class="rec-rank-tag">#${idx + 1}</span>
            </div>
            <div class="rec-main-info">
              <div class="rec-name-row">
                <span class="rec-hero-name">${h.name}</span>
                <span class="tier-badge tier-${h.tier}">${h.tier}</span>
                ${h.tier === 'SS' ? `<span class="ss-god-badge" title="SS God Tier: ฮีโร่ที่เก่งที่สุดในแพตช์ปัจจุบัน (ชิงเลือกทันที)">👑 SS GOD TIER</span>` : (h.tier === 'S' ? `<span class="s-meta-badge" title="S Tier: ติด Top Meta">⭐ S TOP META</span>` : '')}
                ${item.isProMeta ? `<span class="pro-meta-badge" title="ฮีโร่เมต้าที่นิยมใช้ในการแข่งขันจริง (MPL / M-Series / MSC)">🏆 PRO META</span>` : ''}
                <span class="rec-spell-inline ${recSpell.isCounterSpell ? 'is-counter-spell' : ''}" onclick="openSpellPickerModal('rec', ${idx}, ${h.id})" title="${recSpell.en} (${recSpell.th}) — ${recSpell.reason} (คลิกเพื่อเปลี่ยนสเปล)">
                  <img src="${recSpell.img}" style="width:20px;height:20px;border-radius:50%;vertical-align:middle;" alt="${recSpell.en}" />
                </span>
                <span style="display:inline-flex;align-items:center;gap:2px;cursor:pointer;" onclick="openCounterGearModal('ALL', 'ALL', ${h.id})" title="${coreBuild.title} (คลิกดูเซ็ตไอเทมเมต้าและของแก้ทาง)">
                  ${miniCoreItemsHtml}
                </span>
                ${item.matchingCombos?.length > 0 ? `<span style="font-size:0.65rem; background:rgba(168,85,247,0.28); color:#e9d5ff; padding:1px 6px; border-radius:4px;">⚡ คู่หู Meta Combo</span>` : ''}
                ${item.fillsNeededLane ? `<span style="font-size:0.65rem; background:rgba(14,165,233,0.2); color:#7dd3fc; padding:1px 6px; border-radius:4px;">เติมเลนที่ขาด</span>` : ''}
              </div>
              <div class="rec-sub-meta">
                <span style="display:inline-flex;align-items:center;gap:4px;">
                  ${h.lanes.map(l => `<img src="${LANE_IMAGE[l] || 'assets/lanes/mid.png'}" class="lane-pill-img" alt="${l}" /> ${LANE_SHORT_LABEL[l] || l}`).join(' / ')}
                </span>
                <span>•</span>
                <span style="color:#6ee7b7;">WR ${h.stats.winRate}%</span>
                <span>•</span>
                <span style="color:#fca5a5;">BR ${h.stats.banRate}%</span>
              </div>
            </div>
            <div class="score-pill" title="คะแนนรวม: ${item.totalScore} (แก้ทาง ${item.counterScore} + คอมโบ ${item.synergyScore} + โบนัสเมต้า SS ${item.tierBonus + (item.ssExtraBonus || 0)} + โบนัสตัวแข่ง ${item.isProMeta ? 28 : (state.strategyMode === 'all' ? 0 : -65)})">
              <div style="font-size:0.62rem; opacity:0.85;">คะแนนรวม</div>
              <div>${item.totalScore}</div>
            </div>
          </div>

          ${(targetChipsHtml || synergyChipsHtml || riskChipsHtml) ? `
            <div class="rec-targets-row">
              ${synergyChipsHtml}
              ${targetChipsHtml}
              ${riskChipsHtml}
            </div>
          ` : ''}

          <div class="rec-reason-box">${reasonLines.join('<br/>')}</div>

          <div class="rec-actions">
            <button class="btn-pick-ally" onclick="quickAssignHero(${h.id}, 'ally')">
              🛡️ เลือกเข้าทีมเรา
            </button>
            <button class="btn-gear-sm" onclick="openCounterGearModal('ALL', 'ALL', ${h.id})" title="กดดูไอเทมและสเปลที่ ${h.name} ควรออกเพื่อแก้ทางศัตรู">
              🗡️
            </button>
            <button class="btn-gear-sm spell-sm" onclick="openSpellPickerModal('rec', ${idx}, ${h.id})" title="คลิกเพื่อเลือกสเปลแก้ทางให้ ${h.name}">
              ✨
            </button>
            <button class="btn-inspect-sm" onclick="openHeroModal(${h.id})">
              ℹ️ ข้อมูล
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  renderGearAdvisor(pickedEnemies);
}

// Aggregate Counter Items & Counter Spells across Picked Enemies
function aggregateEnemyCounterGear(pickedEnemies) {
  const itemMap = new Map();
  const spellMap = new Map();

  for (const enemy of pickedEnemies) {
    const eItems = getCounterItemsForEnemy(enemy);
    for (const entry of eItems) {
      const id = entry.item.id;
      const existing = itemMap.get(id);
      if (existing) {
        if (!existing.targets.some(t => t.id === enemy.id)) {
          existing.targets.push(enemy);
          existing.reasonsByEnemy.push({ enemy, reason: entry.reason });
          existing.totalWeight += entry.priorityWeight;
        }
      } else {
        itemMap.set(id, {
          item: entry.item,
          targets: [enemy],
          reasonsByEnemy: [{ enemy, reason: entry.reason }],
          totalWeight: entry.priorityWeight
        });
      }
    }

    const eSpells = getCounterSpellsForEnemy(enemy);
    for (const spEntry of eSpells.slice(0, 3)) {
      const key = spEntry.key;
      const existing = spellMap.get(key);
      if (existing) {
        if (!existing.targets.some(t => t.id === enemy.id)) {
          existing.targets.push(enemy);
          existing.reasonsByEnemy.push({ enemy, reason: spEntry.reason });
          existing.totalWeight += spEntry.weight;
        }
      } else {
        spellMap.set(key, {
          key,
          spell: spEntry.spell,
          forRoles: spEntry.forRoles,
          targets: [enemy],
          reasonsByEnemy: [{ enemy, reason: spEntry.reason }],
          totalWeight: spEntry.weight
        });
      }
    }
  }

  const items = [...itemMap.values()].sort((a, b) => (b.targets.length * 100 + b.totalWeight) - (a.targets.length * 100 + a.totalWeight));
  const spells = [...spellMap.values()].sort((a, b) => (b.targets.length * 100 + b.totalWeight) - (a.targets.length * 100 + a.totalWeight));
  return { items, spells };
}

function renderGearAdvisor(pickedEnemies) {
  const contentEl = document.getElementById('gearAdvisorContent');
  const topCtaBtn = document.getElementById('topViewCounterGearBtn');

  if (!pickedEnemies || pickedEnemies.length === 0) {
    if (topCtaBtn) {
      topCtaBtn.innerHTML = `🛡️ กดดูคลังไอเทม &amp; สเปลแก้ทางทั้งหมด (${COUNTER_ITEMS_DB.length} ชิ้น)`;
    }
    contentEl.innerHTML = `
      <span style="font-size:0.78rem; color:var(--text-muted);">
        เลือกฮีโร่ศัตรูอย่างน้อย 1 ตัว ระบบจะเลือก <strong>Battle Spell แก้ทาง</strong> และแนะนำ <strong>Item แก้ทาง</strong> ให้อัตโนมัติ (หรือคลิกปุ่มด้านขวาเพื่อดูคลังไอเทมแก้ทางทั้งหมด)
      </span>
    `;
    return;
  }

  const { items, spells } = aggregateEnemyCounterGear(pickedEnemies);
  if (topCtaBtn) {
    topCtaBtn.innerHTML = `🛡️ กดดูไอเทมแก้ทาง (${items.length} ชิ้น) &amp; สเปลแก้ทาง (${spells.length} สเปล) สำหรับศัตรูชุดนี้`;
  }

  const spellChips = spells.slice(0, 4).map(sp => `
    <div class="gear-chip" style="border-color:rgba(16,185,129,0.55); background:rgba(16,185,129,0.12);" onclick="openCounterGearModal('ALL')" title="คลิกเพื่อดูรายละเอียดและเลือกใส่ให้ทีมเรา">
      <img src="${sp.spell.img}" style="width:22px;height:22px;border-radius:50%;border:1px solid #fcd34d;" alt="${sp.spell.en}" />
      <span>✨ สเปลแก้ทาง: <strong style="color:#6ee7b7;">${sp.spell.en} (${sp.spell.th})</strong></span>
      <span style="color:#a7f3d0; font-size:0.7rem;">[รับมือ ${sp.targets.map(t => t.name).join(', ')}]</span>
    </div>
  `);

  const itemChips = items.slice(0, 6).map(it => `
    <div class="gear-chip" onclick="openCounterGearModal('ALL')" title="${it.item.passive} (คลิกเพื่อดูรายละเอียดไอเทมแก้ทาง)">
      <img src="${it.item.img}" class="item-chip-img" alt="${it.item.name}" />
      <strong>${it.item.name}</strong>
      <span style="font-size:0.68rem; color:#fde68a;">(${it.item.thName})</span>
      <span style="color:#fda4af; font-size:0.7rem;">[แก้ทาง ${it.targets.map(t => t.name).join(', ')}]</span>
    </div>
  `);

  contentEl.innerHTML = [
    ...spellChips,
    ...itemChips,
    `<button class="btn-open-gear-modal" style="margin-left:auto;" onclick="openCounterGearModal('ALL')">📋 กดดูรายละเอียดไอเทมแก้ทางทั้งหมด (${items.length} ชิ้น) →</button>`
  ].join('');
}

// Render All 133 Heroes Picker Grid
function renderHeroGrid() {
  const search = (document.getElementById('heroSearchInput')?.value || '').trim().toLowerCase();
  const laneFilter = document.getElementById('laneFilterSelect')?.value || 'ALL';
  const roleFilter = document.getElementById('roleFilterSelect')?.value || 'ALL';
  const tierFilter = document.getElementById('tierFilterSelect')?.value || 'ALL';
  const sortMode = document.getElementById('sortSelect')?.value || 'counter';

  const { recommendations, hasEnemyPicks } = calculateRecommendations();
  const recScoreMap = new Map(recommendations.map(r => [r.hero.id, r]));
  const topHighlightIds = new Set(
    (hasEnemyPicks || state.allyPicks.some(Boolean))
      ? recommendations.slice(0, 12).map(r => r.hero.id)
      : []
  );

  let filtered = HEROES.filter(h => {
    if (search && !h.name.toLowerCase().includes(search)) return false;
    if (laneFilter !== 'ALL' && !h.lanes.includes(laneFilter)) return false;
    if (roleFilter !== 'ALL' && !h.roles.includes(roleFilter)) return false;
    if (tierFilter !== 'ALL' && h.tier !== tierFilter) return false;
    return true;
  });

  filtered.sort((a, b) => {
    if (sortMode === 'counter') {
      const sA = recScoreMap.get(a.id)?.totalScore ?? -1;
      const sB = recScoreMap.get(b.id)?.totalScore ?? -1;
      if (sB !== sA) return sB - sA;
      return b.stats.metaScore - a.stats.metaScore;
    }
    if (sortMode === 'meta') {
      const aSS = a.tier === 'SS' ? 1 : 0;
      const bSS = b.tier === 'SS' ? 1 : 0;
      if (bSS !== aSS) return bSS - aSS;
      return b.stats.metaScore - a.stats.metaScore;
    }
    if (sortMode === 'ban') return b.stats.banRate - a.stats.banRate;
    if (sortMode === 'win') return b.stats.winRate - a.stats.winRate;
    if (sortMode === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  document.getElementById('gridCountLabel').textContent = filtered.length;

  const gridEl = document.getElementById('heroesGrid');
  gridEl.innerHTML = filtered.map(h => {
    const status = getHeroStatus(h.id);
    const isUnavailable = status !== 'AVAILABLE';
    const isHighlighted = !isUnavailable && topHighlightIds.has(h.id);
    const recInfo = recScoreMap.get(h.id);
    const hasCombo = recInfo?.matchingCombos?.length > 0;

    let overlayHtml = '';
    if (status === 'BANNED') overlayHtml = `<div class="status-overlay-badge" style="color:#f43f5e;">🚫 BANNED</div>`;
    else if (status === 'ALLY') overlayHtml = `<div class="status-overlay-badge" style="color:#38bdf8;">🛡️ ทีมเรา</div>`;
    else if (status === 'ENEMY') overlayHtml = `<div class="status-overlay-badge" style="color:#fb7185;">⚔️ ศัตรู</div>`;

    return `
      <div class="hero-card ${h.tier === 'SS' ? 'tier-ss-card' : ''} ${isUnavailable ? 'unavailable' : ''} ${isHighlighted ? 'is-counter-highlight' : ''}" onclick="handleHeroCardClick(${h.id})">
        <span class="tier-corner tier-${h.tier}">${h.tier === 'SS' ? '👑 SS' : h.tier}</span>
        ${hasCombo
          ? `<span class="counter-tag-corner" style="background:#38bdf8;">⚡ คอมโบ</span>`
          : (isHighlighted ? `<span class="counter-tag-corner">⚡ แก้ทาง</span>` : '')}
        <div class="hero-card-avatar">
          <img src="${h.head}" alt="${h.name}" loading="lazy" />
        </div>
        <div class="hero-card-name">${h.name}</div>
        <div class="hero-card-lane"><img src="${LANE_IMAGE[h.lanes[0]] || 'assets/lanes/mid.png'}" class="lane-pill-img" alt="${h.lanes[0]}" /> ${LANE_SHORT_LABEL[h.lanes[0]] || h.lanes[0]}</div>
        <div class="hero-card-stats">
          <span style="color:#6ee7b7;">WR ${h.stats.winRate}%</span>
          <span>•</span>
          <span style="color:#fca5a5;">BR ${h.stats.banRate}%</span>
        </div>
        <div class="hero-card-quick-btns" onclick="event.stopPropagation()">
          <button class="q-btn q-enemy" onclick="quickAssignHero(${h.id}, 'enemy')">ศัตรู</button>
          <button class="q-btn q-ban" onclick="quickAssignHero(${h.id}, 'ban')">แบน</button>
          <button class="q-btn q-ally" onclick="quickAssignHero(${h.id}, 'ally')">ทีมเรา</button>
          <button class="q-btn q-info" onclick="openHeroModal(${h.id})">ℹ️</button>
        </div>
        ${overlayHtml}
      </div>
    `;
  }).join('');
}

// ==================== TAB 2: META COMBOS HUB ====================
function setComboHubFilter(ctype) {
  state.comboHubFilter = ctype;
  document.querySelectorAll('#comboFilterPills .lane-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.ctype === ctype);
  });
  renderCombosHub();
}

function renderCombosHub() {
  const container = document.getElementById('combosHubContainer');
  if (!container) return;

  const list = COMBOS.filter(c => state.comboHubFilter === 'ALL' || c.type === state.comboHubFilter);
  const typeLabelMap = {
    duo: '👥 คู่หูดูโอ้ 2 คน (Duo Synergy)',
    trio: '🔱 3 ประสานคุมเกม (Trio Core)',
    squad: '🏆 แผนจัดทีม 5 คน (Full 5-Man Lineup)'
  };

  container.innerHTML = list.map(c => {
    const blockedHeroes = c.heroObjs.filter(h => state.bans.includes(h.id) || state.enemyPicks.includes(h.id));
    const isPlayable = blockedHeroes.length === 0;

    return `
      <div class="combo-hub-card">
        <div class="combo-hub-top">
          <div>
            <div style="display:flex; align-items:center; gap:0.45rem; flex-wrap:wrap; margin-bottom:0.2rem;">
              <span class="tier-badge tier-${c.tier}">TIER ${c.tier}</span>
              <span style="font-size:0.72rem; background:rgba(14,165,233,0.18); color:#7dd3fc; padding:2px 8px; border-radius:6px; font-weight:600;">
                ${typeLabelMap[c.type] || c.badge}
              </span>
              <span style="font-size:0.72rem; background:rgba(16,185,129,0.18); color:#6ee7b7; padding:2px 8px; border-radius:6px; font-weight:700;">
                📈 ${c.winRateBonus}
              </span>
              <span style="font-size:0.7rem; color:var(--text-muted);">ความยาก: ${c.difficulty}</span>
            </div>
            <div class="combo-hub-title">${c.title}</div>
          </div>
          <div>
            ${isPlayable
              ? `<span style="font-size:0.7rem; color:#6ee7b7; background:rgba(16,185,129,0.15); padding:3px 8px; border-radius:12px; border:1px solid rgba(16,185,129,0.4);">✓ พร้อมใช้งาน</span>`
              : `<span style="font-size:0.7rem; color:#fda4af; background:rgba(244,63,94,0.15); padding:3px 8px; border-radius:12px; border:1px solid rgba(244,63,94,0.4);">🚫 ติดแบน/ถูกเลือก (${blockedHeroes.map(x=>x.name).join(', ')})</span>`
            }
          </div>
        </div>

        <!-- Heroes in Combo -->
        <div class="combo-heroes-showcase">
          ${c.heroObjs.map(h => `
            <div class="combo-hero-node" onclick="openHeroModal(${h.id})" title="คลิกดูข้อมูล ${h.name}">
              <img src="${h.head}" alt="${h.name}" />
              <div>
                <div style="font-size:0.82rem; font-weight:700;">${h.name}</div>
                <div style="font-size:0.68rem; color:var(--accent-gold-light);">${h.lanes[0]}</div>
              </div>
            </div>
          `).join('<span class="combo-plus-sign">+</span>')}
        </div>

        <div style="font-size:0.8rem; color:#cbd5e1;">${c.summary}</div>

        <!-- Step-by-Step Execution -->
        <div class="combo-steps-box">
          <div style="font-weight:700; color:#7dd3fc; margin-bottom:2px;">⚡ ลำดับการกดสกิล / วิธีเล่นคอมโบนี้:</div>
          ${c.steps.map(s => `<div>${s}</div>`).join('')}
        </div>

        <div style="font-size:0.76rem; color:#a7f3d0;">
          <strong>⚔️ ชนะทางทีมแบบไหน:</strong> ${c.strongAgainst}
        </div>

        <!-- Must-Ban Counters -->
        <div class="combo-must-ban-row">
          <span style="color:#fda4af; font-weight:600;">🚫 ตัวแก้ทางที่ควรแบนก่อนเล่นคอมโบนี้:</span>
          ${c.mustBanObjs.map(mb => `
            <span class="ban-chip" onclick="quickAssignHero(${mb.id}, 'ban')" title="คลิกเพื่อแบน ${mb.name}">
              <img src="${mb.head}" alt="${mb.name}" />
              <span>${mb.name}</span>
            </span>
          `).join('')}
        </div>

        <!-- Action Buttons -->
        <div style="display:flex; gap:0.5rem; margin-top:auto; flex-wrap:wrap;">
          <button
            class="btn-pick-ally"
            style="padding:0.48rem 0.8rem; font-size:0.8rem; background:linear-gradient(135deg,#0284c7,#2563eb);"
            onclick="applyComboToDraft('${c.id}', false)"
          >
            ⚡ นำคอมโบนี้ลงทีมเราทันที
          </button>
          <button
            class="btn-pick-ally"
            style="padding:0.48rem 0.8rem; font-size:0.8rem; background:linear-gradient(135deg,#7c3aed,#db2777);"
            onclick="applyComboToDraft('${c.id}', true)"
          >
            🛡️ นำลงทีมเรา + แบนตัวแก้ทางให้อัตโนมัติ
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Draft Interaction Handlers
function setPickMode(mode) {
  state.pickMode = mode;
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  if (mode === 'enemy') {
    const emptyIdx = state.enemyPicks.findIndex(x => x === null);
    state.activeSlot = { type: 'enemy', index: emptyIdx !== -1 ? emptyIdx : 0 };
  } else if (mode === 'ally') {
    const emptyIdx = state.allyPicks.findIndex(x => x === null);
    state.activeSlot = { type: 'ally', index: emptyIdx !== -1 ? emptyIdx : 0 };
  } else if (mode === 'ban') {
    const emptyIdx = state.bans.findIndex(x => x === null);
    state.activeSlot = { type: 'ban', index: emptyIdx !== -1 ? emptyIdx : 0 };
  }
  refreshAllViews();
}

function removeDraftSlot(type, index) {
  if (type === 'ban') state.bans[index] = null;
  if (type === 'ally') {
    state.allyPicks[index] = null;
    delete state.spellOverrides[`ally-${index}`];
    delete state.laneOverrides[`ally-${index}`];
  }
  if (type === 'enemy') {
    state.enemyPicks[index] = null;
    delete state.spellOverrides[`enemy-${index}`];
    delete state.laneOverrides[`enemy-${index}`];
  }
  state.activeSlot = { type, index };
  refreshAllViews();
}

function handleHeroCardClick(heroId) {
  if (state.pickMode === 'inspect') {
    openHeroModal(heroId);
    return;
  }
  const status = getHeroStatus(heroId);
  if (status !== 'AVAILABLE') {
    const bIdx = state.bans.indexOf(heroId);
    if (bIdx !== -1) { removeDraftSlot('ban', bIdx); return; }
    const aIdx = state.allyPicks.indexOf(heroId);
    if (aIdx !== -1) { removeDraftSlot('ally', aIdx); return; }
    const eIdx = state.enemyPicks.indexOf(heroId);
    if (eIdx !== -1) { removeDraftSlot('enemy', eIdx); return; }
  }
  quickAssignHero(heroId, state.pickMode);
}

function quickAssignHero(heroId, targetMode) {
  const status = getHeroStatus(heroId);
  if (status !== 'AVAILABLE') {
    const bIdx = state.bans.indexOf(heroId);
    if (bIdx !== -1) state.bans[bIdx] = null;
    const aIdx = state.allyPicks.indexOf(heroId);
    if (aIdx !== -1) state.allyPicks[aIdx] = null;
    const eIdx = state.enemyPicks.indexOf(heroId);
    if (eIdx !== -1) state.enemyPicks[eIdx] = null;
  }

  if (targetMode === 'enemy') {
    let idx = (state.activeSlot.type === 'enemy' && state.enemyPicks[state.activeSlot.index] === null)
      ? state.activeSlot.index
      : state.enemyPicks.findIndex(x => x === null);
    if (idx === -1) idx = 4;
    state.enemyPicks[idx] = heroId;
    delete state.laneOverrides[`enemy-${idx}`];
    const nextEmpty = state.enemyPicks.findIndex(x => x === null);
    state.activeSlot = { type: 'enemy', index: nextEmpty !== -1 ? nextEmpty : idx };
  } else if (targetMode === 'ally') {
    let idx = (state.activeSlot.type === 'ally' && state.allyPicks[state.activeSlot.index] === null)
      ? state.activeSlot.index
      : state.allyPicks.findIndex(x => x === null);
    if (idx === -1) idx = 4;
    state.allyPicks[idx] = heroId;
    delete state.laneOverrides[`ally-${idx}`];
    const nextEmpty = state.allyPicks.findIndex(x => x === null);
    state.activeSlot = { type: 'ally', index: nextEmpty !== -1 ? nextEmpty : idx };
  } else if (targetMode === 'ban') {
    let idx = (state.activeSlot.type === 'ban' && state.bans[state.activeSlot.index] === null)
      ? state.activeSlot.index
      : state.bans.findIndex(x => x === null);
    if (idx === -1) idx = 9;
    state.bans[idx] = heroId;
    const nextEmpty = state.bans.findIndex(x => x === null);
    state.activeSlot = { type: 'ban', index: nextEmpty !== -1 ? nextEmpty : idx };
  }

  refreshAllViews();
}

function setRecLaneFilter(lane) {
  state.recLaneFilter = lane;
  document.querySelectorAll('#recLanePills .lane-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lane === lane);
  });
  renderRecommendations();
}

function autoBanTopMeta() {
  const enemyLaneAnalysis = analyzeTeamLanes(state.enemyPicks, 'enemy');
  const enemyFilledLanes = enemyLaneAnalysis.filledLanes;

  let candidates = [...HEROES]
    .filter(h => !state.allyPicks.includes(h.id) && !state.enemyPicks.includes(h.id));

  // If enemy has chosen positions, avoid banning those positions and focus on missing positions
  if (enemyFilledLanes.size > 0 && enemyFilledLanes.size < 5) {
    candidates = candidates.filter(h => isHeroBanEligibleAgainstEnemy(h, enemyFilledLanes));
  }

  const topBanned = candidates
    .sort((a, b) => {
      // Prioritize banning SS God Tier heroes first
      const aSS = a.tier === 'SS' ? 1 : 0;
      const bSS = b.tier === 'SS' ? 1 : 0;
      if (bSS !== aSS) return bSS - aSS;
      return b.stats.banRate - a.stats.banRate;
    })
    .slice(0, 10);

  state.bans = topBanned.map(h => h.id);
  refreshAllViews();
}

function loadDemoDraft() {
  const getId = (name) => HERO_BY_NAME.get(name.toLowerCase())?.id || null;
  state.bans = [
    getId('Hirara'), getId('Aulus'), getId('Belerick'), getId('Gloo'), getId('Diggie'),
    getId('Minsitthar'), null, null, null, null
  ];
  state.enemyPicks = [
    getId('Masha'),
    getId('Fanny'),
    getId('Tigreal'),
    null,
    null
  ];
  // Put Carmilla in Ally S1 so user immediately sees both Counter Recommendations AND Carmilla's Meta Combos (Cecilion / Eudora / Suyou)!
  state.allyPicks = [
    getId('Carmilla'),
    null,
    null,
    null,
    null
  ];
  state.spellOverrides = {};
  state.laneOverrides = {};
  state.pickMode = 'enemy';
  state.activeSlot = { type: 'enemy', index: 3 };
  refreshAllViews();
}

function resetDraft() {
  state.bans = Array(10).fill(null);
  state.allyPicks = Array(5).fill(null);
  state.enemyPicks = Array(5).fill(null);
  state.spellOverrides = {};
  state.laneOverrides = {};
  state.pickMode = 'enemy';
  state.activeSlot = { type: 'enemy', index: 0 };
  refreshAllViews();
}

// ==================== TAB 3: META TIER LIST ====================
function setMetaTabLane(lane) {
  state.metaTabLane = lane;
  document.querySelectorAll('#metaTabLanePills .lane-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mlane === lane);
  });
  renderMetaTierList();
}

function renderMetaTierList() {
  const tiers = [
    { key: 'SS', desc: 'God Meta / แบนหรือหยิบก่อน', bg: 'linear-gradient(135deg, #ef4444, #f59e0b)' },
    { key: 'S', desc: 'Strong Meta / ตัวแบกแรงก์', bg: 'linear-gradient(135deg, #f59e0b, #eab308)' },
    { key: 'A', desc: 'Balanced / ตัวแก้ทางชั้นดี', bg: 'linear-gradient(135deg, #8b5cf6, #6366f1)' },
    { key: 'B', desc: 'Situational / เลือกเฉพาะทาง', bg: 'linear-gradient(135deg, #0ea5e9, #2563eb)' },
    { key: 'C', desc: 'Pocket Pick / เฉพาะเมนหลัก', bg: 'linear-gradient(135deg, #64748b, #475569)' }
  ];

  const container = document.getElementById('tierListContainer');
  container.innerHTML = tiers.map(t => {
    const heroesInTier = HEROES.filter(h => {
      if (h.tier !== t.key) return false;
      if (state.metaTabLane !== 'ALL' && !h.lanes.includes(state.metaTabLane)) return false;
      return true;
    }).sort((a, b) => b.stats.metaScore - a.stats.metaScore);

    return `
      <div class="tier-row">
        <div class="tier-label-box" style="background:${t.bg};">
          <div>${t.key}</div>
          <span>${t.desc}</span>
        </div>
        <div class="tier-heroes-wrap">
          ${heroesInTier.map(h => `
            <div class="meta-hero-tile" onclick="openHeroModal(${h.id})">
              <img src="${h.head}" alt="${h.name}" loading="lazy" />
              <div style="min-width:0; flex:1;">
                <div style="font-weight:700; font-size:0.88rem; display:flex; justify-content:space-between;">
                  <span>${h.name}</span>
                  <span style="font-size:0.7rem; color:#fcd34d; display:inline-flex; align-items:center; gap:2px;"><img src="${LANE_IMAGE[h.lanes[0]] || 'assets/lanes/mid.png'}" class="lane-pill-img" alt="${h.lanes[0]}" /> ${LANE_SHORT_LABEL[h.lanes[0]] || h.lanes[0]}</span>
                </div>
                <div style="font-size:0.72rem; color:var(--text-muted); display:flex; gap:0.45rem;">
                  <span style="color:#6ee7b7;">WR ${h.stats.winRate}%</span>
                  <span style="color:#fca5a5;">BR ${h.stats.banRate}%</span>
                  <span>PR ${h.stats.pickRate}%</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// ==================== TAB 4: 1v1 COUNTER & COMBO LOOKUP ====================
function renderLookupQuickBar() {
  const q = (document.getElementById('lookupSearchInput')?.value || '').trim().toLowerCase();
  const list = HEROES.filter(h => !q || h.name.toLowerCase().includes(q))
    .sort((a, b) => b.stats.metaScore - a.stats.metaScore)
    .slice(0, 35);

  const bar = document.getElementById('lookupQuickBar');
  bar.innerHTML = list.map(h => `
    <div
      onclick="selectLookupHero(${h.id})"
      style="display:flex; align-items:center; gap:0.4rem; padding:0.35rem 0.65rem; border-radius:10px; cursor:pointer; flex-shrink:0; background:${state.lookupHeroId === h.id ? 'rgba(245,158,11,0.25)' : 'var(--bg-card)'}; border:1px solid ${state.lookupHeroId === h.id ? 'var(--accent-gold)' : 'var(--border-subtle)'};"
    >
      <img src="${h.head}" alt="${h.name}" style="width:28px; height:28px; border-radius:50%;" />
      <span style="font-size:0.82rem; font-weight:600;">${h.name}</span>
      <span class="tier-badge tier-${h.tier}">${h.tier}</span>
    </div>
  `).join('');
}

function selectLookupHero(heroId) {
  state.lookupHeroId = heroId;
  renderLookupQuickBar();
  renderLookupDetail();
}

function renderLookupDetail() {
  const h = HERO_BY_ID.get(state.lookupHeroId) || HEROES[0];
  if (!h) return;
  document.getElementById('lookupDetailContainer').innerHTML = buildHeroDossierHtml(h, false);
}

function buildHeroDossierHtml(h, isModal = true) {
  const heroCombos = COMBOS.filter(c => c.heroObjs.some(x => x.id === h.id));
  const revampInfo = REVAMPED_HERO_KITS[h.name];

  const revampBoxHtml = revampInfo ? `
    <div style="margin-bottom:1rem; padding:0.8rem 0.9rem; background:linear-gradient(135deg, rgba(16,185,129,0.14), rgba(14,165,233,0.12)); border-radius:10px; border:1px solid rgba(16,185,129,0.5);">
      <div style="font-size:0.88rem; font-weight:700; color:#6ee7b7; margin-bottom:0.35rem;">
        ${revampInfo.badge}
      </div>
      <div style="font-size:0.78rem; color:#e2e8f0; margin-bottom:0.5rem;">
        ${revampInfo.summary}
      </div>
      <div style="display:flex; flex-direction:column; gap:0.32rem; font-size:0.75rem; color:#cbd5e1; background:rgba(7,11,20,0.65); padding:0.55rem 0.7rem; border-radius:8px;">
        ${revampInfo.skills.map(sk => `<div>• ${sk}</div>`).join('')}
      </div>
    </div>
  ` : '';

  const combosHtml = heroCombos.length > 0 ? `
    <div style="margin-bottom:1rem; padding:0.75rem; background:rgba(14,165,233,0.1); border-radius:10px; border:1px solid rgba(56,189,248,0.35);">
      <div style="font-size:0.86rem; font-weight:700; color:#7dd3fc; margin-bottom:0.5rem;">
        ⚡ ชุดคอมโบ Meta ที่มี ${h.name} ร่วมทีม:
      </div>
      <div style="display:flex; flex-direction:column; gap:0.5rem;">
        ${heroCombos.map(c => `
          <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:0.5rem; background:rgba(7,11,20,0.65); padding:0.5rem 0.7rem; border-radius:8px;">
            <div>
              <strong style="color:#fff; font-size:0.84rem;">${c.title}</strong>
              <span style="color:#6ee7b7; font-size:0.75rem; margin-left:6px;">(${c.winRateBonus})</span>
              <div style="font-size:0.75rem; color:#cbd5e1;">${c.summary}</div>
            </div>
            <button class="btn-pick-ally" style="flex:0; white-space:nowrap; padding:0.3rem 0.65rem;" onclick="applyComboToDraft('${c.id}', false); if(${isModal}) closeHeroModal();">
              ⚡ เลือกคอมโบนี้เข้าทีม
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const countersListHtml = h.counteredBy.slice(0, 8).map((c, idx) => {
    const ch = HERO_BY_ID.get(c.id);
    if (!ch) return '';
    return `
      <div class="matchup-row-item">
        <img src="${ch.head}" alt="${ch.name}" />
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
            <strong style="font-size:0.9rem;">#${idx + 1} ${ch.name}</strong>
            <span class="tier-badge tier-${ch.tier}">${ch.tier}</span>
            <span style="font-size:0.7rem; background:rgba(16,185,129,0.2); color:#6ee7b7; padding:1px 6px; border-radius:6px;">${c.badge}</span>
          </div>
          <div style="font-size:0.75rem; color:#cbd5e1; margin-top:3px;">${c.reason}</div>
        </div>
        <button class="btn-pick-ally" style="flex:0; white-space:nowrap; padding:0.3rem 0.55rem;" onclick="quickAssignHero(${ch.id}, 'ally'); if(${isModal}) closeHeroModal();">
          🛡️ เลือกตัวนี้
        </button>
      </div>
    `;
  }).join('');

  const strongAgainstHtml = h.strongAgainst.slice(0, 8).map((s, idx) => {
    const th = HERO_BY_ID.get(s.id);
    if (!th) return '';
    return `
      <div class="matchup-row-item">
        <img src="${th.head}" alt="${th.name}" />
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
            <strong style="font-size:0.9rem;">#${idx + 1} ${th.name}</strong>
            <span class="tier-badge tier-${th.tier}">${th.tier}</span>
            <span style="font-size:0.7rem; background:rgba(244,63,94,0.2); color:#fda4af; padding:1px 6px; border-radius:6px;">${s.badge}</span>
          </div>
          <div style="font-size:0.75rem; color:#cbd5e1; margin-top:3px;">${s.reason}</div>
        </div>
      </div>
    `;
  }).join('');

  const detailedCounterSpells = getCounterSpellsForEnemy(h).slice(0, 4);
  const detailedCounterItems = getCounterItemsForEnemy(h);
  const coreBuild = getRecommendedCoreBuildForHero(h);
  const sigSpellProfile = getHeroSpellProfile(h);
  const sigSpellObj = SPELL_BY_KEY.get(h.lanes[0] === 'Jungle' ? 'Retribution' : sigSpellProfile.primary) || SPELL_BY_KEY.get('Flicker');

  const coreBuildHtml = coreBuild.items.length > 0 ? `
    <div style="margin-bottom:1rem; padding:0.78rem; background:linear-gradient(135deg, rgba(245,158,11,0.12), rgba(14,165,233,0.1)); border-radius:10px; border:1px solid rgba(251,191,36,0.45);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.45rem;">
        <div style="font-size:0.86rem; font-weight:700; color:#fef08a;">
          🔥 ${coreBuild.title} — เซ็ตไอเทมเมต้าประจำตัวของ ${h.name} (6 ชิ้น):
        </div>
        <span style="display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; background:rgba(16,185,129,0.18); color:#6ee7b7; padding:2px 8px; border-radius:12px; border:1px solid rgba(16,185,129,0.4);">
          <img src="${sigSpellObj.img}" style="width:18px;height:18px;border-radius:50%;" alt="${sigSpellObj.en}" />
          <span>สเปลหลัก: <strong>${sigSpellObj.en} (${sigSpellObj.th})</strong></span>
        </span>
      </div>
      <div style="font-size:0.75rem; color:#cbd5e1; margin-bottom:0.55rem;">${coreBuild.note}</div>
      <div class="gear-chips-wrap">
        ${coreBuild.items.map((it, idx) => `
          <div class="gear-chip" style="border-color:rgba(251,191,36,0.45); background:rgba(15,23,42,0.85);" title="${it.shortTag || ''} • ${it.stats || ''}">
            <img src="${it.img}" class="item-chip-img" alt="${it.name}" />
            <div>
              <div style="font-size:0.78rem; font-weight:700; color:#fff;">#${idx + 1} ${it.name}</div>
              <div style="font-size:0.68rem; color:#fde68a;">${it.thName}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const gearChips = [
    ...detailedCounterSpells.map(s => `
      <div class="gear-chip" style="border-color:rgba(16,185,129,0.5); background:rgba(16,185,129,0.12);" onclick="if(${isModal}) closeHeroModal(); openCounterGearModal(${h.id});">
        <img src="${s.spell.img}" style="width:22px;height:22px;border-radius:50%;border:1px solid #fcd34d;" alt="${s.spell.en}" />
        <span>✨ สเปลแก้ทาง: <strong style="color:#6ee7b7;">${s.spell.en} (${s.spell.th})</strong> — ${s.reason}</span>
      </div>
    `),
    ...detailedCounterItems.map(i => `
      <div class="gear-chip" onclick="if(${isModal}) closeHeroModal(); openCounterGearModal(${h.id});">
        <img src="${i.item.img}" class="item-chip-img" alt="${i.item.name}" />
        <span><strong>${i.item.name}</strong> <span style="color:#fde68a;">(${i.item.thName})</span>: ${i.reason}</span>
      </div>
    `)
  ].join('');

  return `
    <div class="${isModal ? '' : 'ban-board'}">
      <div class="modal-header">
        <img src="${h.head}" alt="${h.name}" />
        <div>
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <h2 style="font-size:1.35rem;">${h.name}</h2>
            <span class="tier-badge tier-${h.tier}" style="font-size:0.8rem; padding:2px 8px;">TIER ${h.tier}</span>
            <span style="font-size:0.82rem; color:var(--accent-gold-light); display:inline-flex; align-items:center; gap:4px; flex-wrap:wrap;">
              ${h.lanes.map(l => `<span style="display:inline-flex; align-items:center; gap:2px;"><img src="${LANE_IMAGE[l] || 'assets/lanes/mid.png'}" class="lane-pill-img" alt="${l}" /> ${LANE_SHORT_LABEL[l] || l}</span>`).join(' / ')} • ${h.roles.join(', ')}
            </span>
            ${PRO_COMPETITIVE_HEROES.has(h.name.toLowerCase()) ? `<span class="pro-meta-badge" style="font-size:0.68rem;">🏆 PRO META</span>` : ''}
          </div>
          <div style="font-size:0.82rem; color:var(--text-muted); margin-top:4px; display:flex; gap:1rem; flex-wrap:wrap;">
            <span>📈 Win Rate (MG): <strong style="color:#6ee7b7;">${h.stats.winRate}%</strong></span>
            <span>🚫 Ban Rate (MG): <strong style="color:#fda4af;">${h.stats.banRate}%</strong></span>
            <span>🎯 Pick Rate: <strong style="color:#38bdf8;">${h.stats.pickRate}%</strong></span>
            <span>⚡ ความถนัด: <strong>${h.specialties.join(', ')}</strong></span>
          </div>
          <div style="margin-top:0.55rem; display:flex; gap:0.45rem; flex-wrap:wrap;">
            <button class="btn" style="background:#e11d48; border:none; color:#fff;" onclick="quickAssignHero(${h.id}, 'enemy'); if(${isModal}) closeHeroModal(); switchTab('draft');">
              ⚔️ ใส่เป็นฮีโร่ศัตรู
            </button>
            <button class="btn" style="background:#7e22ce; border:none; color:#fff;" onclick="quickAssignHero(${h.id}, 'ban'); if(${isModal}) closeHeroModal(); switchTab('draft');">
              🚫 แบนฮีโร่ตัวนี้
            </button>
            <button class="btn" style="background:#0284c7; border:none; color:#fff;" onclick="quickAssignHero(${h.id}, 'ally'); if(${isModal}) closeHeroModal(); switchTab('draft');">
              🛡️ เลือกเข้าทีมเรา
            </button>
            <button class="btn" style="background:linear-gradient(135deg,#f59e0b,#d97706); border:none; color:#070b14; font-weight:700;" onclick="if(${isModal}) closeHeroModal(); openCounterGearModal(${h.id});">
              🗡️ ดูไอเทม &amp; สเปลแก้ทาง ${h.name} (ละเอียด)
            </button>
          </div>
        </div>
        ${isModal ? `<button class="modal-close" onclick="closeHeroModal()">✕</button>` : ''}
      </div>

      ${revampBoxHtml}

      ${combosHtml}

      ${coreBuildHtml}

      ${gearChips ? `
        <div style="margin-bottom:1rem; padding:0.75rem; background:rgba(7,11,20,0.65); border-radius:10px; border:1px solid rgba(245,158,11,0.35);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.45rem;">
            <div style="font-size:0.84rem; font-weight:700; color:var(--accent-gold-light);">
              🛡️ สเปลและไอเทมแนะนำสำหรับแก้ทางเมื่อเจอ ${h.name} ฝั่งตรงข้าม:
            </div>
            <button class="btn-open-gear-modal" onclick="if(${isModal}) closeHeroModal(); openCounterGearModal(${h.id});">
              🔍 เปิดตารางไอเทมแก้ทาง ${h.name} →
            </button>
          </div>
          <div class="gear-chips-wrap">${gearChips}</div>
        </div>
      ` : ''}

      <div class="modal-grid-2">
        <div>
          <h3 style="font-size:0.98rem; color:#6ee7b7; margin-bottom:0.6rem;">
            ⚡ ฮีโร่ที่ชนะทาง / แก้ทาง ${h.name} (ควรเลือกมาสู้)
          </h3>
          ${countersListHtml}
        </div>
        <div>
          <h3 style="font-size:0.98rem; color:#fda4af; margin-bottom:0.6rem;">
            ⚠️ ฮีโร่ที่แพ้ทาง ${h.name} (ห้ามหยิบมาเจอ)
          </h3>
          ${strongAgainstHtml}
        </div>
      </div>
    </div>
  `;
}

function openHeroModal(heroId) {
  const h = HERO_BY_ID.get(heroId);
  if (!h) return;
  document.getElementById('heroModalContent').innerHTML = buildHeroDossierHtml(h, true);
  document.getElementById('heroModal').classList.add('open');
}

function closeHeroModal() {
  document.getElementById('heroModal').classList.remove('open');
}

// ==================== SLOT HERO PICKER POPUP MODAL ====================
function getSlotCurrentHeroId(type, index) {
  if (type === 'ban') return state.bans[index];
  if (type === 'ally') return state.allyPicks[index];
  if (type === 'enemy') return state.enemyPicks[index];
  return null;
}

function openSlotPickerModal(type, index) {
  state.pickMode = type;
  state.activeSlot = { type, index };
  state.pickerModal = { open: true, type, index, lane: 'ALL' };

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === type);
  });

  const searchEl = document.getElementById('slotPickerSearch');
  if (searchEl) searchEl.value = '';
  const roleEl = document.getElementById('slotPickerRole');
  if (roleEl) roleEl.value = 'ALL';
  const sortEl = document.getElementById('slotPickerSort');
  if (sortEl) sortEl.value = 'smart';

  document.querySelectorAll('#slotPickerLanePills .lane-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.slane === 'ALL');
  });

  const badgeEl = document.getElementById('slotPickerBadge');
  const titleEl = document.getElementById('slotPickerTitle');
  const subEl = document.getElementById('slotPickerSubtitle');
  const clearBtn = document.getElementById('slotPickerClearBtn');
  const infoBtn = document.getElementById('slotPickerInfoBtn');

  const currentHeroId = getSlotCurrentHeroId(type, index);
  const currentHero = currentHeroId ? HERO_BY_ID.get(currentHeroId) : null;

  if (type === 'ban') {
    const sideText = index < 5 ? 'ฝั่งเรา' : 'ฝั่งศัตรู';
    badgeEl.className = 'slot-picker-badge badge-ban';
    badgeEl.textContent = `🚫 BAN #${index + 1}`;
    titleEl.textContent = currentHero
      ? `เปลี่ยนตัวแบนช่องที่ ${index + 1} (ปัจจุบัน: ${currentHero.name})`
      : `เลือกฮีโร่เพื่อแบน — ช่องแบนที่ ${index + 1} (${sideText})`;
    subEl.textContent = 'คลิกเลือกฮีโร่ที่ต้องการแบน ระบบจะตัดออกจากรายการแนะนำอัตโนมัติ';
  } else if (type === 'enemy') {
    badgeEl.className = 'slot-picker-badge badge-enemy';
    badgeEl.textContent = `⚔️ ENEMY S${index + 1}`;
    titleEl.textContent = currentHero
      ? `เปลี่ยนฮีโร่ศัตรูช่อง S${index + 1} (ปัจจุบัน: ${currentHero.name})`
      : `เลือกฮีโร่ฝั่งศัตรู — ช่อง S${index + 1}`;
    subEl.textContent = 'เลือกฮีโร่ที่ฝั่งศัตรูหยิบมา เพื่อคำนวณหาตัวแก้ทางและคอมโบที่ดีที่สุดทันที';
  } else if (type === 'ally') {
    badgeEl.className = 'slot-picker-badge badge-ally';
    badgeEl.textContent = `🛡️ ALLY S${index + 1}`;
    titleEl.textContent = currentHero
      ? `เปลี่ยนฮีโร่ทีมเราช่อง S${index + 1} (ปัจจุบัน: ${currentHero.name})`
      : `เลือกฮีโร่เข้าทีมเรา — ช่อง S${index + 1}`;
    subEl.textContent = 'เลือกได้ทั้งตัวแก้ทางศัตรูโดยตรง หรือตัวต่อคอมโบ Meta กับเพื่อนในทีม';
  }

  if (currentHero) {
    clearBtn.style.display = 'inline-flex';
    clearBtn.textContent = `🗑️ เอา ${currentHero.name} ออก`;
    infoBtn.style.display = 'inline-flex';
    infoBtn.textContent = `ℹ️ ข้อมูล ${currentHero.name}`;
  } else {
    clearBtn.style.display = 'none';
    infoBtn.style.display = 'none';
  }

  renderSlotPickerQuickRecommend();
  renderSlotPickerGrid();
  refreshAllViews();

  document.getElementById('slotPickerModal').classList.add('open');
  setTimeout(() => searchEl?.focus(), 60);
}

function closeSlotPickerModal() {
  state.pickerModal.open = false;
  document.getElementById('slotPickerModal').classList.remove('open');
}

function setSlotPickerLane(lane) {
  state.pickerModal.lane = lane;
  document.querySelectorAll('#slotPickerLanePills .lane-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.slane === lane);
  });
  renderSlotPickerGrid();
}

function clearCurrentPickerSlot() {
  const { type, index } = state.pickerModal;
  removeDraftSlot(type, index);
  closeSlotPickerModal();
}

function inspectCurrentPickerSlotHero() {
  const { type, index } = state.pickerModal;
  const heroId = getSlotCurrentHeroId(type, index);
  if (heroId) {
    closeSlotPickerModal();
    openHeroModal(heroId);
  }
}

function pickHeroForModalSlot(heroId) {
  const { type, index } = state.pickerModal;
  const currentInSlot = getSlotCurrentHeroId(type, index);
  const status = getHeroStatus(heroId);

  if (status !== 'AVAILABLE' && heroId !== currentInSlot) return;

  if (type === 'ban') state.bans[index] = heroId;
  else if (type === 'ally') {
    state.allyPicks[index] = heroId;
    delete state.spellOverrides[`ally-${index}`];
    if (state.pickerModal.lane && state.pickerModal.lane !== 'ALL') {
      state.laneOverrides[`ally-${index}`] = state.pickerModal.lane;
    } else {
      delete state.laneOverrides[`ally-${index}`];
    }
  } else if (type === 'enemy') {
    state.enemyPicks[index] = heroId;
    delete state.spellOverrides[`enemy-${index}`];
    if (state.pickerModal.lane && state.pickerModal.lane !== 'ALL') {
      state.laneOverrides[`enemy-${index}`] = state.pickerModal.lane;
    } else {
      delete state.laneOverrides[`enemy-${index}`];
    }
  }

  closeSlotPickerModal();
  refreshAllViews();
}

function renderSlotPickerQuickRecommend() {
  const { type } = state.pickerModal;
  const quickBox = document.getElementById('slotPickerQuickRecommend');

  if (type === 'ban') {
    const enemyLaneAnalysis = analyzeTeamLanes(state.enemyPicks, 'enemy');
    const enemyFilledLanes = enemyLaneAnalysis.filledLanes;

    let eligibleBans = [...HEROES].filter(h => getHeroStatus(h.id) === 'AVAILABLE');
    const hasEnemyFilter = enemyFilledLanes.size > 0 && enemyFilledLanes.size < 5;

    if (hasEnemyFilter) {
      eligibleBans = eligibleBans.filter(h => isHeroBanEligibleAgainstEnemy(h, enemyFilledLanes));
    }

    const topBans = eligibleBans
      .sort((a, b) => b.stats.banRate - a.stats.banRate)
      .slice(0, 8);

    const filledText = [...enemyFilledLanes].map(l => LANE_SHORT_LABEL[l] || l).join(', ');
    const missingText = enemyLaneAnalysis.missingLanes.map(l => LANE_SHORT_LABEL[l] || l).join(', ');

    const titleText = hasEnemyFilter
      ? `🎯 แนะนำแบนตำแหน่งที่ศัตรูยังขาด (${missingText}) — ข้าม ${filledText} ที่ศัตรูเลือกแล้ว:`
      : `🔥 แนะนำตัวน่าแบนที่สุดใน Meta ตอนนี้ (คลิกเพื่อแบนลงช่องนี้ทันที):`;

    quickBox.innerHTML = `
      <div style="font-size:0.8rem; font-weight:600; color:#e9d5ff;">
        ${titleText}
      </div>
      <div class="slot-picker-quick-list">
        ${topBans.map(h => `
          <div class="slot-quick-card" style="border-color:rgba(168,85,247,0.45);" onclick="pickHeroForModalSlot(${h.id})">
            <img src="${h.head}" alt="${h.name}" />
            <div>
              <div style="font-size:0.82rem; font-weight:700;">
                ${h.name}
                <span style="font-size:0.7rem; color:#7dd3fc; margin-left:3px; font-weight:600;">[${LANE_SHORT_LABEL[h.lanes[0]] || h.lanes[0]}]</span>
                <span class="tier-badge tier-${h.tier}">${h.tier}</span>
              </div>
              <div style="font-size:0.7rem; color:#fda4af;">Ban Rate ${h.stats.banRate}% • WR ${h.stats.winRate}%</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (type === 'ally') {
    const { recommendations, hasEnemyPicks } = calculateRecommendations();
    const topRecs = recommendations.slice(0, 8);
    quickBox.innerHTML = `
      <div style="font-size:0.8rem; font-weight:600; color:#6ee7b7;">
        🎯 ${hasEnemyPicks ? 'ฮีโร่แก้ทาง & คู่หู Meta Combo ที่แนะนำให้หยิบลงช่องนี้:' : 'ฮีโร่ First Pick / คู่หู Meta Combo ที่หลุดแบน:'}
      </div>
      <div class="slot-picker-quick-list">
        ${topRecs.map((r, i) => `
          <div class="slot-quick-card" onclick="pickHeroForModalSlot(${r.hero.id})">
            <img src="${r.hero.head}" alt="${r.hero.name}" />
            <div>
              <div style="font-size:0.82rem; font-weight:700;">
                #${i + 1} ${r.hero.name}
                <span class="tier-badge tier-${r.hero.tier}">${r.hero.tier}</span>
                ${r.hero.tier === 'SS' ? `<span class="ss-mini-badge" style="font-size:0.56rem; padding:1px 5px;">👑 SS GOD</span>` : (r.hero.tier === 'S' ? `<span class="s-meta-badge" style="font-size:0.56rem; padding:0 5px;">⭐ S</span>` : '')}
              </div>
              <div style="font-size:0.7rem; color:#6ee7b7;">
                ${r.matchingCombos?.length > 0
                  ? `⚡ คอมโบคู่ ${r.matchingCombos[0].alliesInCombo.map(x=>x.name).join('+')}`
                  : (r.counteredTargets.length > 0
                      ? `⚔️ ชนะ ${r.counteredTargets.map(t => t.enemyName).join(', ')}`
                      : `<span style="display:inline-flex; align-items:center; gap:2px;"><img src="${LANE_IMAGE[r.hero.lanes[0]] || 'assets/lanes/mid.png'}" class="lane-pill-img" alt="${r.hero.lanes[0]}" /> ${LANE_SHORT_LABEL[r.hero.lanes[0]] || r.hero.lanes[0]}</span> • WR ${r.hero.stats.winRate}%`)}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    const topMeta = [...HEROES]
      .filter(h => getHeroStatus(h.id) === 'AVAILABLE')
      .sort((a, b) => {
        const aPro = PRO_COMPETITIVE_HEROES.has(a.name.toLowerCase()) ? 1 : 0;
        const bPro = PRO_COMPETITIVE_HEROES.has(b.name.toLowerCase()) ? 1 : 0;
        if (bPro !== aPro) return bPro - aPro;
        return b.stats.metaScore - a.stats.metaScore;
      })
      .slice(0, 8);

    quickBox.innerHTML = `
      <div style="font-size:0.8rem; font-weight:600; color:#fda4af;">
        ⚔️ ฮีโร่ยอดฮิตใน Meta ที่ศัตรูมักเลือก (คลิกเพื่อเลือกใส่ช่องนี้):
      </div>
      <div class="slot-picker-quick-list">
        ${topMeta.map(h => `
          <div class="slot-quick-card" style="border-color:rgba(244,63,94,0.45);" onclick="pickHeroForModalSlot(${h.id})">
            <img src="${h.head}" alt="${h.name}" />
            <div>
              <div style="font-size:0.82rem; font-weight:700;">${h.name} <span class="tier-badge tier-${h.tier}">${h.tier}</span></div>
              <div style="font-size:0.7rem; color:var(--text-muted);">${h.lanes[0]} • WR ${h.stats.winRate}%</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function renderSlotPickerGrid() {
  const { type, index, lane } = state.pickerModal;
  const currentHeroId = getSlotCurrentHeroId(type, index);
  const search = (document.getElementById('slotPickerSearch')?.value || '').trim().toLowerCase();
  const roleFilter = document.getElementById('slotPickerRole')?.value || 'ALL';
  const sortMode = document.getElementById('slotPickerSort')?.value || 'smart';

  const { recommendations, hasEnemyPicks } = calculateRecommendations();
  const recMap = new Map(recommendations.map(r => [r.hero.id, r]));
  const topCounterIds = new Set(
    hasEnemyPicks
      ? recommendations.filter(r => r.counteredTargets.length > 0).slice(0, 12).map(r => r.hero.id)
      : []
  );

  const enemyLaneAnalysis = analyzeTeamLanes(state.enemyPicks, 'enemy');
  const enemyFilledLanes = enemyLaneAnalysis.filledLanes;
  const hasEnemyFilter = enemyFilledLanes.size > 0 && enemyFilledLanes.size < 5;

  let list = HEROES.filter(h => {
    if (search && !h.name.toLowerCase().includes(search)) return false;
    if (lane !== 'ALL' && !h.lanes.includes(lane)) return false;
    if (roleFilter !== 'ALL' && !h.roles.includes(roleFilter)) return false;
    return true;
  });

  list.sort((a, b) => {
    const availA = getHeroStatus(a.id) === 'AVAILABLE' ? 1 : 0;
    const availB = getHeroStatus(b.id) === 'AVAILABLE' ? 1 : 0;
    if (availA !== availB) return availB - availA;

    if (sortMode === 'smart') {
      if (type === 'ban') {
        if (hasEnemyFilter) {
          const eligibleA = isHeroBanEligibleAgainstEnemy(a, enemyFilledLanes) ? 1 : 0;
          const eligibleB = isHeroBanEligibleAgainstEnemy(b, enemyFilledLanes) ? 1 : 0;
          if (eligibleA !== eligibleB) return eligibleB - eligibleA;
        }
        return b.stats.banRate - a.stats.banRate;
      }
      if (type === 'ally') {
        const sA = recMap.get(a.id)?.totalScore ?? 0;
        const sB = recMap.get(b.id)?.totalScore ?? 0;
        return sB - sA;
      }
      return b.stats.metaScore - a.stats.metaScore;
    }
    if (sortMode === 'counter') return (recMap.get(b.id)?.counterScore ?? 0) - (recMap.get(a.id)?.counterScore ?? 0);
    if (sortMode === 'combo') return (recMap.get(b.id)?.synergyScore ?? 0) - (recMap.get(a.id)?.synergyScore ?? 0);
    if (sortMode === 'ban') return b.stats.banRate - a.stats.banRate;
    if (sortMode === 'meta') {
      const aSS = a.tier === 'SS' ? 1 : 0;
      const bSS = b.tier === 'SS' ? 1 : 0;
      if (bSS !== aSS) return bSS - aSS;
      return b.stats.metaScore - a.stats.metaScore;
    }
    if (sortMode === 'win') return b.stats.winRate - a.stats.winRate;
    if (sortMode === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const gridEl = document.getElementById('slotPickerGrid');
  gridEl.innerHTML = list.map(h => {
    const status = getHeroStatus(h.id);
    const isCurrent = h.id === currentHeroId;
    const isUnavailable = status !== 'AVAILABLE' && !isCurrent;
    const isCounter = !isUnavailable && topCounterIds.has(h.id);
    const recInfo = recMap.get(h.id);
    const hasCombo = !isUnavailable && (recInfo?.matchingCombos?.length > 0);

    let statusBadge = '';
    if (isCurrent) statusBadge = `<div class="status-overlay-badge" style="color:#38bdf8; background:rgba(7,11,20,0.65);">✓ อยู่ในช่องนี้</div>`;
    else if (status === 'BANNED') statusBadge = `<div class="status-overlay-badge" style="color:#f43f5e;">🚫 BANNED</div>`;
    else if (status === 'ALLY') statusBadge = `<div class="status-overlay-badge" style="color:#38bdf8;">🛡️ ทีมเรา</div>`;
    else if (status === 'ENEMY') statusBadge = `<div class="status-overlay-badge" style="color:#fb7185;">⚔️ ศัตรู</div>`;

    let subMetric = `WR ${h.stats.winRate}%`;
    let banSkipBadge = '';
    if (type === 'ban') {
      const isEligible = isHeroBanEligibleAgainstEnemy(h, enemyFilledLanes);
      if (hasEnemyFilter && !isEligible) {
        subMetric = `ศัตรูมี ${LANE_SHORT_LABEL[h.lanes[0]] || h.lanes[0]} แล้ว`;
        banSkipBadge = `<span class="counter-tag-corner" style="background:#475569; color:#cbd5e1; font-size:0.58rem;">ข้ามแบน</span>`;
      } else {
        subMetric = `BR ${h.stats.banRate}%`;
      }
    }
    else if (type === 'ally' && hasCombo) subMetric = `⚡ คู่หูคอมโบ`;
    else if (type === 'ally' && recInfo?.counteredTargets?.length > 0) subMetric = `ชนะ ${recInfo.counteredTargets[0].enemyName}`;

    return `
      <div
        class="popup-hero-card ${h.tier === 'SS' ? 'is-ss-card' : ''} ${isUnavailable ? 'unavailable' : ''} ${isCurrent ? 'is-current-slot' : ''} ${(isCounter || hasCombo) ? 'is-counter-pick' : ''}"
        onclick="${isUnavailable ? '' : `pickHeroForModalSlot(${h.id})`}"
      >
        <span class="tier-corner tier-${h.tier}">${h.tier === 'SS' ? '👑 SS' : h.tier}</span>
        ${banSkipBadge}
        ${hasCombo
          ? `<span class="counter-tag-corner" style="background:#38bdf8;">⚡ คอมโบ</span>`
          : (isCounter ? `<span class="counter-tag-corner">⚡ แก้ทาง</span>` : '')}
        <div class="hero-card-avatar" style="width:58px; height:58px;">
          <img src="${h.head}" alt="${h.name}" loading="lazy" />
        </div>
        <div class="hero-card-name">${h.name}</div>
        <div class="hero-card-lane"><img src="${LANE_IMAGE[h.lanes[0]] || 'assets/lanes/mid.png'}" class="lane-pill-img" alt="${h.lanes[0]}" /> ${LANE_SHORT_LABEL[h.lanes[0]] || h.lanes[0]}</div>
        <div style="font-size:0.66rem; color:${type === 'ban' ? '#fda4af' : (hasCombo ? '#7dd3fc' : '#6ee7b7')}; font-weight:600; margin-top:2px;">
          ${subMetric}
        </div>
        ${statusBadge}
      </div>
    `;
  }).join('');
}

// ==================== COUNTER ITEMS & SPELLS ADVISOR MODAL ====================
function openCounterGearModal(targetEnemyId = 'ALL', roleFilter = 'ALL', allyHeroId = null) {
  let resolvedRoleFilter = roleFilter;
  if (allyHeroId && roleFilter === 'ALL') {
    const allyHero = HERO_BY_ID.get(allyHeroId);
    if (allyHero) {
      if (allyHero.roles.includes('Tank')) resolvedRoleFilter = 'tank';
      else if (allyHero.roles.includes('Mage')) resolvedRoleFilter = 'magic';
      else if (allyHero.roles.includes('Marksman') || allyHero.roles.includes('Assassin') || allyHero.roles.includes('Fighter')) resolvedRoleFilter = 'physical';
    }
  }

  state.gearModal = {
    open: true,
    targetEnemyId,
    roleFilter: resolvedRoleFilter,
    allyHeroId
  };

  renderCounterGearModal();
  document.getElementById('counterGearModal').classList.add('open');
}

function closeCounterGearModal() {
  state.gearModal.open = false;
  document.getElementById('counterGearModal').classList.remove('open');
}

function setGearModalEnemyFilter(targetEnemyId) {
  state.gearModal.targetEnemyId = targetEnemyId;
  renderCounterGearModal();
}

function setGearModalRoleFilter(roleFilter) {
  state.gearModal.roleFilter = roleFilter;
  renderCounterGearModal();
}

function setGearModalAllyHero(allyHeroId) {
  state.gearModal.allyHeroId = allyHeroId ? Number(allyHeroId) : null;
  if (state.gearModal.allyHeroId) {
    const ally = HERO_BY_ID.get(state.gearModal.allyHeroId);
    if (ally) {
      if (ally.roles.includes('Tank')) state.gearModal.roleFilter = 'tank';
      else if (ally.roles.includes('Mage')) state.gearModal.roleFilter = 'magic';
      else state.gearModal.roleFilter = 'physical';
    }
  } else {
    state.gearModal.roleFilter = 'ALL';
  }
  renderCounterGearModal();
}

function renderCounterGearModal() {
  const container = document.getElementById('counterGearModalContent');
  if (!container) return;

  const pickedEnemies = state.enemyPicks.filter(Boolean).map(id => HERO_BY_ID.get(id)).filter(Boolean);
  const pickedAllies = state.allyPicks.filter(Boolean).map(id => HERO_BY_ID.get(id)).filter(Boolean);
  const { targetEnemyId, roleFilter, allyHeroId } = state.gearModal;
  const focusAlly = allyHeroId ? HERO_BY_ID.get(allyHeroId) : null;

  let activeEnemies = [];
  if (targetEnemyId === 'ALL') {
    activeEnemies = pickedEnemies;
  } else {
    const single = HERO_BY_ID.get(Number(targetEnemyId));
    if (single) activeEnemies = [single];
  }

  const { items, spells } = aggregateEnemyCounterGear(activeEnemies);

  // Filter items by roleFilter
  const filteredItems = items.filter(entry => {
    if (roleFilter === 'ALL') return true;
    if (roleFilter === 'new_meta') return Boolean(entry.item.isNewMeta);
    if (roleFilter === 'anti_heal') return entry.item.category === 'Anti-Heal';
    if (roleFilter === 'tank_buster') return entry.item.category === 'Tank-Buster';
    return entry.item.roleGroup === roleFilter || entry.item.roleGroup === 'all';
  });

  // If no enemies picked yet and targetEnemyId === 'ALL', show full catalog of 26 counter & meta items
  const catalogMode = activeEnemies.length === 0;
  const displayItems = catalogMode
    ? COUNTER_ITEMS_DB.filter(it => {
        if (roleFilter === 'ALL') return true;
        if (roleFilter === 'new_meta') return Boolean(it.isNewMeta);
        if (roleFilter === 'anti_heal') return it.category === 'Anti-Heal';
        if (roleFilter === 'tank_buster') return it.category === 'Tank-Buster';
        return it.roleGroup === roleFilter || it.roleGroup === 'all';
      }).map(item => ({ item, targets: [], reasonsByEnemy: [], totalWeight: 80 }))
    : filteredItems;

  // Build Core Meta Build Box if focusAlly or single enemy is selected
  const buildHeroTarget = focusAlly || (activeEnemies.length === 1 ? activeEnemies[0] : null);
  const coreBuildObj = buildHeroTarget ? getRecommendedCoreBuildForHero(buildHeroTarget) : null;
  const coreBuildSectionHtml = (buildHeroTarget && coreBuildObj && coreBuildObj.items.length > 0) ? `
    <div style="margin-bottom:1.1rem; padding:0.8rem 0.9rem; background:linear-gradient(135deg, rgba(245,158,11,0.14), rgba(14,165,233,0.12)); border:1px solid rgba(251,191,36,0.5); border-radius:12px;">
      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.45rem;">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <img src="${buildHeroTarget.head}" style="width:32px; height:32px; border-radius:50%; border:2px solid #fcd34d;" alt="${buildHeroTarget.name}" />
          <div>
            <div style="font-size:0.9rem; font-weight:700; color:#fef08a;">
              🔥 เซ็ตไอเทมเมต้าประจำตัวของ ${buildHeroTarget.name} (6 ชิ้น — ${coreBuildObj.title})
            </div>
            <div style="font-size:0.74rem; color:#cbd5e1;">${coreBuildObj.note}</div>
          </div>
        </div>
      </div>
      <div class="gear-chips-wrap">
        ${coreBuildObj.items.map((it, idx) => `
          <div class="gear-chip" style="border-color:rgba(251,191,36,0.5); background:rgba(7,11,20,0.85);" title="${it.shortTag || ''} • ${it.stats || ''}">
            <img src="${it.img}" class="item-chip-img" alt="${it.name}" />
            <div>
              <div style="font-size:0.8rem; font-weight:700; color:#fff;">#${idx + 1} ${it.name}</div>
              <div style="font-size:0.68rem; color:#fde68a;">${it.thName}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  // Build Enemy Target Filter Strip
  const enemyPillsHtml = [
    `<button class="gear-enemy-filter-pill ${targetEnemyId === 'ALL' ? 'active' : ''}" onclick="setGearModalEnemyFilter('ALL')">
      <span>🔥 แก้ทางทั้งทีมศัตรู (${pickedEnemies.length} ตัว)</span>
    </button>`,
    ...pickedEnemies.map(e => `
      <button class="gear-enemy-filter-pill ${Number(targetEnemyId) === e.id ? 'active' : ''}" onclick="setGearModalEnemyFilter(${e.id})">
        <img src="${e.head}" alt="${e.name}" />
        <span>แก้ทาง ${e.name}</span>
      </button>
    `)
  ].join('');

  // Extra hero selector so user can inspect counter items for ANY of the 133 heroes anytime
  const inspectAnyEnemySelect = `
    <select class="select-ctrl" style="margin-left:auto; font-size:0.76rem; padding:0.3rem 0.6rem;" onchange="if(this.value) setGearModalEnemyFilter(Number(this.value))">
      <option value="">🔎 หรือเลือกดูของเมต้า/แก้ทางฮีโร่ตัวอื่น...</option>
      ${[...HEROES].sort((a, b) => a.name.localeCompare(b.name)).map(h => `
        <option value="${h.id}" ${Number(targetEnemyId) === h.id ? 'selected' : ''}>${h.name} (${h.lanes[0]})</option>
      `).join('')}
    </select>
  `;

  // Role Filter Pills
  const roleFilters = [
    { key: 'ALL', label: `🛡️ ไอเทมทุกสาย (${COUNTER_ITEMS_DB.length})` },
    { key: 'new_meta', label: '⚡ ไอเทมเมต้าใหม่ (New Meta Patch)' },
    { key: 'physical', label: '⚔️ สายกายภาพ (แครี่ / ไฟต์เตอร์ / ป่า)' },
    { key: 'magic', label: '🔮 สายเวท (เมจ / ซัพพอร์ต)' },
    { key: 'tank', label: '🛡️ สายแทงค์ / โรมมิ่ง / ยืนชน' },
    { key: 'anti_heal', label: '🩸 เฉพาะตัดเลือด 50%' },
    { key: 'tank_buster', label: '💥 เฉพาะละลายแทงค์ / เจาะเกราะ' }
  ];

  // Spells Section HTML
  const spellsSectionHtml = !catalogMode && spells.length > 0 ? `
    <div style="margin-bottom:1.1rem;">
      <div style="font-size:0.95rem; font-weight:700; color:#6ee7b7; margin-bottom:0.5rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.4rem;">
        <span>✨ สเปลแก้ทางที่แนะนำให้เลือกใช้ (Recommended Counter Battle Spells)</span>
        <span style="font-size:0.74rem; color:var(--text-muted); font-weight:400;">คลิกปุ่มด้านล่างสเปลเพื่อใส่สเปลแก้ทางให้ช่องทีมเรา S1–S5 ได้ทันที</span>
      </div>
      <div class="gear-spells-grid">
        ${spells.slice(0, 6).map((sp, idx) => `
          <div class="gear-spell-card">
            <div style="display:flex; align-items:center; gap:0.65rem;">
              <img src="${sp.spell.img}" style="width:46px; height:46px; border-radius:50%; border:2px solid #fcd34d; box-shadow:0 0 10px rgba(245,158,11,0.4);" alt="${sp.spell.en}" />
              <div style="flex:1; min-width:0;">
                <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
                  <strong style="font-size:0.96rem; color:#fef08a;">#${idx + 1} ${sp.spell.en} (${sp.spell.th})</strong>
                  <span style="font-size:0.66rem; background:rgba(16,185,129,0.25); color:#6ee7b7; padding:1px 6px; border-radius:6px; font-weight:700;">
                    แก้ทาง ${sp.targets.length} ตัว
                  </span>
                </div>
                <div style="font-size:0.7rem; color:#94a3b8;">คูลดาวน์ ${sp.spell.cd} • เหมาะกับ: ${sp.forRoles.join(', ')}</div>
              </div>
            </div>
            <div style="font-size:0.74rem; color:#cbd5e1; background:rgba(7,11,20,0.6); padding:0.4rem 0.55rem; border-radius:7px;">
              ${sp.reasonsByEnemy.map(r => `<div>• <strong style="color:#fda4af;">รับมือ ${r.enemy.name}:</strong> ${r.reason}</div>`).join('')}
            </div>
            ${pickedAllies.length > 0 ? `
              <div style="display:flex; align-items:center; gap:0.3rem; flex-wrap:wrap; margin-top:auto; padding-top:0.2rem;">
                <span style="font-size:0.68rem; color:#7dd3fc;">ใส่ให้ทีมเรา:</span>
                ${state.allyPicks.map((aid, sIdx) => {
                  const ah = aid ? HERO_BY_ID.get(aid) : null;
                  if (!ah) return '';
                  return `
                    <button class="slot-mini-action-btn spell-btn" onclick="assignCounterSpellToAllySlot(${sIdx}, '${sp.key}')" title="ตั้งค่าสเปล ${sp.spell.en} ให้ ${ah.name}">
                      S${sIdx + 1} ${ah.name}
                    </button>
                  `;
                }).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  // Items Section HTML
  const itemsGridHtml = displayItems.map((entry, idx) => {
    const it = entry.item;
    const isMustBuy = entry.targets.length >= 2 || (entry.targets.length === 1 && idx < 3);

    // Suggest which picked ally heroes should build this item
    const matchingAllies = pickedAllies.filter(ah =>
      it.forRoles.some(r => ah.roles.includes(r))
    );

    return `
      <div class="gear-item-card ${isMustBuy ? 'must-buy' : ''}">
        <div class="gear-item-top">
          <img src="${it.img}" class="item-real-img" style="border-color:${it.color};" alt="${it.name}" />
          <div style="flex:1; min-width:0;">
            <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
              <strong style="font-size:0.98rem; color:#fff;">${it.name}</strong>
              ${it.isNewMeta ? `<span style="font-size:0.62rem; background:linear-gradient(135deg,#0284c7,#7c3aed); color:#e0f2fe; padding:1px 6px; border-radius:6px; font-weight:700;">⚡ NEW META</span>` : ''}
              ${isMustBuy ? `<span style="font-size:0.64rem; background:linear-gradient(135deg,#f59e0b,#ef4444); color:#fff; padding:1px 6px; border-radius:6px; font-weight:700;">🔥 แนะนำด่วน</span>` : ''}
            </div>
            <div style="font-size:0.78rem; color:#fcd34d; font-weight:600;">${it.thName}</div>
            <div style="font-size:0.68rem; color:#7dd3fc; margin-top:1px;">${it.shortTag}</div>
          </div>
        </div>

        <div style="font-size:0.72rem; color:#94a3b8; display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.3rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.35rem;">
          <span>🎯 <strong>สายที่ควรออก:</strong> <span style="color:#e2e8f0;">${it.forRoles.join(', ')}</span></span>
          <span style="color:#cbd5e1;">${it.stats}</span>
        </div>

        <div style="font-size:0.74rem; color:#e2e8f0; background:rgba(7,11,20,0.55); padding:0.45rem 0.6rem; border-radius:8px; border-left:3px solid ${it.color};">
          ${it.passive}
        </div>

        ${entry.reasonsByEnemy.length > 0 ? `
          <div style="display:flex; flex-direction:column; gap:0.28rem; margin-top:0.1rem;">
            <div style="font-size:0.72rem; font-weight:700; color:#fda4af;">⚔️ ใช้แก้ทางศัตรูที่เลือก:</div>
            ${entry.reasonsByEnemy.map(r => `
              <div style="display:flex; align-items:flex-start; gap:0.4rem; font-size:0.73rem; color:#cbd5e1; background:rgba(244,63,94,0.1); padding:0.3rem 0.5rem; border-radius:7px; border:1px solid rgba(244,63,94,0.28);">
                <img src="${r.enemy.head}" style="width:20px; height:20px; border-radius:50%; flex-shrink:0; margin-top:1px;" alt="${r.enemy.name}" />
                <div><strong style="color:#fecdd3;">${r.enemy.name}:</strong> ${r.reason}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${matchingAllies.length > 0 ? `
          <div style="margin-top:auto; padding-top:0.3rem; font-size:0.71rem; color:#6ee7b7; display:flex; align-items:center; gap:0.3rem; flex-wrap:wrap;">
            <span>💡 <strong>ฮีโร่ทีมเราที่ควรออกชิ้นนี้:</strong></span>
            ${matchingAllies.map(a => `
              <span style="display:inline-flex; align-items:center; gap:3px; background:rgba(14,165,233,0.18); color:#bae6fd; padding:1px 6px; border-radius:10px;">
                <img src="${a.head}" style="width:15px;height:15px;border-radius:50%;" alt="${a.name}" />
                ${a.name}
              </span>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="slot-picker-header">
      <div class="slot-picker-title-wrap">
        <div class="slot-picker-badge badge-enemy" style="background:linear-gradient(135deg,rgba(245,158,11,0.25),rgba(16,185,129,0.25)); border-color:#f59e0b; color:#fef08a;">
          🛡️ COUNTER GEAR
        </div>
        <div>
          <h2 style="font-size:1.22rem; color:#fff;">
            ${focusAlly
              ? `ไอเทม & สเปลแก้ทางที่แนะนำสำหรับ ${focusAlly.name} (${focusAlly.roles.join('/')})`
              : (activeEnemies.length > 0
                  ? `เจาะลึกไอเทม & สเปลแก้ทาง: ${activeEnemies.map(e => e.name).join(', ')}`
                  : `คลังไอเทม & สเปลแก้ทางทั้งหมดใน MLBB (${COUNTER_ITEMS_DB.length} ชิ้น)`)}
          </h2>
          <p style="font-size:0.78rem; color:var(--text-muted);">
            วิเคราะห์จากสกิล ฮีล เกราะ ความเร็วโจมตี และ CC ของฮีโร่ฝ่ายตรงข้าม • คลิกเลือกดูรายตัวหรือกรองตามสายอาชีพได้เลย
          </p>
        </div>
      </div>
      <button class="modal-close" onclick="closeCounterGearModal()" title="ปิดหน้าต่าง (Esc)">✕</button>
    </div>

    <!-- Enemy Target Selector Strip -->
    <div class="gear-modal-enemy-strip">
      <span style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">🎯 เลือกศัตรูที่จะดูของแก้ทาง:</span>
      ${enemyPillsHtml}
      ${inspectAnyEnemySelect}
    </div>

    <!-- Role / Category Filter Pills -->
    <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:0.5rem; margin-bottom:0.85rem;">
      <div class="lane-filter-pills">
        ${roleFilters.map(rf => `
          <button class="lane-pill ${roleFilter === rf.key ? 'active' : ''}" onclick="setGearModalRoleFilter('${rf.key}')">
            ${rf.label}
          </button>
        `).join('')}
      </div>
      ${focusAlly ? `
        <button class="btn" style="font-size:0.74rem; padding:0.25rem 0.6rem;" onclick="setGearModalAllyHero(null)">
          ✕ ล้างตัวกรองของ ${focusAlly.name}
        </button>
      ` : ''}
    </div>

    ${coreBuildSectionHtml}

    ${spellsSectionHtml}

    <div>
      <div style="font-size:0.95rem; font-weight:700; color:var(--accent-gold-light); margin-bottom:0.35rem;">
        🗡️ ไอเทมแก้ทางที่แนะนำให้ออก (${displayItems.length} ชิ้น):
      </div>
      <div class="gear-items-grid">
        ${itemsGridHtml || `<div style="padding:1.5rem; color:var(--text-muted);">ไม่มีไอเทมในหมวดที่กรอง ลองเลือกหมวด "ไอเทมทุกสาย (All)"</div>`}
      </div>
    </div>
  `;
}

// ==================== BATTLE SPELL SELECTOR / COUNTER SPELL MODAL ====================
function openSpellPickerModal(side, slotIdx, heroId = null) {
  const resolvedHeroId = heroId || (
    side === 'ally' ? state.allyPicks[slotIdx] : (side === 'enemy' ? state.enemyPicks[slotIdx] : null)
  );
  const hero = resolvedHeroId ? HERO_BY_ID.get(resolvedHeroId) : null;
  if (!hero) return;

  state.spellModal = { open: true, side, slotIdx, heroId: hero.id };
  renderSpellPickerModal();
  document.getElementById('spellPickerModal').classList.add('open');
}

function closeSpellPickerModal() {
  state.spellModal.open = false;
  document.getElementById('spellPickerModal').classList.remove('open');
}

function selectSpellFromPicker(spellKey) {
  const { side, slotIdx, heroId } = state.spellModal;
  if (side === 'rec') {
    state.spellOverrides[`rec-${heroId}`] = spellKey;
  } else {
    state.spellOverrides[`${side}-${slotIdx}`] = spellKey;
  }
  closeSpellPickerModal();
  refreshAllViews();
}

function resetSpellOverride() {
  const { side, slotIdx, heroId } = state.spellModal;
  if (side === 'rec') {
    delete state.spellOverrides[`rec-${heroId}`];
  } else {
    delete state.spellOverrides[`${side}-${slotIdx}`];
  }
  closeSpellPickerModal();
  refreshAllViews();
}

function assignCounterSpellToAllySlot(allySlotIdx, spellKey) {
  state.spellOverrides[`ally-${allySlotIdx}`] = spellKey;
  refreshAllViews();
  if (state.gearModal.open) renderCounterGearModal();
  if (state.spellModal.open) closeSpellPickerModal();
}

function renderSpellPickerModal() {
  const container = document.getElementById('spellPickerModalContent');
  if (!container) return;

  const { side, slotIdx, heroId } = state.spellModal;
  const hero = HERO_BY_ID.get(heroId);
  if (!hero) return;

  const pickedEnemies = state.enemyPicks.filter(Boolean).map(id => HERO_BY_ID.get(id)).filter(Boolean);
  const isEnemySlot = side === 'enemy';

  const currentSpell = isEnemySlot
    ? getEnemySlotCounterSpell(hero, slotIdx)
    : getRecommendedSpell(
        hero,
        side === 'ally' ? state.allyPicks : [...state.allyPicks.filter(Boolean), hero.id],
        state.enemyPicks,
        side,
        slotIdx
      );

  // Determine recommended counter spells to highlight at top
  let recommendedCounterList = [];
  if (isEnemySlot) {
    recommendedCounterList = getCounterSpellsForEnemy(hero).map(cs => ({
      key: cs.key,
      spell: cs.spell,
      reason: cs.reason,
      targets: [hero.name]
    }));
  } else if (pickedEnemies.length > 0) {
    const { spells } = aggregateEnemyCounterGear(pickedEnemies);
    recommendedCounterList = spells.map(sp => ({
      key: sp.key,
      spell: sp.spell,
      reason: sp.reasonsByEnemy[0]?.reason || sp.spell.desc,
      targets: sp.targets.map(t => t.name)
    }));
  }

  const profile = getHeroSpellProfile(hero);
  const assignedLane = (side === 'ally' || side === 'enemy') && slotIdx !== null
    ? getSlotAssignedLane(side, slotIdx)
    : hero.lanes[0];
  const heroSignatureSpells = assignedLane === 'Jungle'
    ? [SPELL_BY_KEY.get('Retribution'), ...profile.valid.map(k => SPELL_BY_KEY.get(k)).filter(Boolean)]
    : profile.valid.map(k => SPELL_BY_KEY.get(k)).filter(Boolean);
  const sigKeysSet = new Set(heroSignatureSpells.map(s => s.key));
  const recKeysSet = new Set(recommendedCounterList.map(r => r.key));

  container.innerHTML = `
    <div class="slot-picker-header">
      <div class="slot-picker-title-wrap">
        <img src="${hero.head}" style="width:52px; height:52px; border-radius:12px; border:2px solid #fcd34d;" alt="${hero.name}" />
        <div>
          <h2 style="font-size:1.15rem; color:#fff; display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span>✨ เลือก Battle Spell สำหรับ: ${hero.name}</span>
            <span style="display:inline-flex; align-items:center; gap:3px; font-size:0.88rem; color:#fcd34d;">
              (<img src="${LANE_IMAGE[assignedLane] || 'assets/lanes/mid.png'}" class="lane-real-icon" alt="${assignedLane}" /> ${LANE_SHORT_LABEL[assignedLane] || assignedLane})
            </span>
          </h2>
          <p style="font-size:0.78rem; color:var(--text-muted);">
            สเปลปัจจุบัน: <strong style="color:#fef08a;">${currentSpell.en} (${currentSpell.th})</strong> — ${currentSpell.reason}
          </p>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:0.45rem;">
        <button class="btn btn-reset" onclick="resetSpellOverride()" title="ให้ระบบใช้สเปลประจำตัวตามตำแหน่งให้อัตโนมัติ">
          🔄 อัตโนมัติ (Auto)
        </button>
        <button class="modal-close" onclick="closeSpellPickerModal()">✕</button>
      </div>
    </div>

    <div style="margin-bottom:0.85rem; padding:0.75rem; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.45); border-radius:12px;">
      <div style="font-size:0.84rem; font-weight:700; color:#fcd34d; margin-bottom:0.45rem;">
        ⭐ สเปลประจำตัวของ ${hero.name} (${assignedLane === 'Jungle' ? 'ตำแหน่งป่าบังคับ Retribution' : profile.note}):
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:0.55rem;">
        ${heroSignatureSpells.map((sp, idx) => `
          <div class="spell-option-card recommended-counter ${currentSpell.key === sp.key ? 'active-spell' : ''}" style="border-color:${idx === 0 ? '#f59e0b' : 'rgba(245,158,11,0.4)'};" onclick="selectSpellFromPicker('${sp.key}')">
            <img src="${sp.img}" alt="${sp.en}" />
            <div style="min-width:0; flex:1;">
              <div style="font-size:0.84rem; font-weight:700; color:#fef08a;">
                ${idx === 0 ? '⭐ สเปลหลัก: ' : '✨ สเปลทางเลือก: '}${sp.en} (${sp.th})
              </div>
              <div style="font-size:0.68rem; color:#cbd5e1; margin-top:2px;">
                ${sp.desc}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    ${recommendedCounterList.length > 0 ? `
      <div style="margin-bottom:1rem; padding:0.75rem; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.4); border-radius:12px;">
        <div style="font-size:0.84rem; font-weight:700; color:#6ee7b7; margin-bottom:0.5rem;">
          🛡️ ${isEnemySlot ? `สเปลที่ทีมเราควรหยิบไปแก้ทาง ${hero.name}:` : `สเปลแก้ทางศัตรูในดราฟต์นี้:`}
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:0.55rem;">
          ${recommendedCounterList.slice(0, 4).map((rc, idx) => `
            <div class="spell-option-card recommended-counter ${currentSpell.key === rc.key ? 'active-spell' : ''}" onclick="selectSpellFromPicker('${rc.key}')">
              <img src="${rc.spell.img}" alt="${rc.spell.en}" />
              <div style="min-width:0; flex:1;">
                <div style="font-size:0.84rem; font-weight:700; color:#fef08a;">
                  #${idx + 1} ${rc.spell.en} (${rc.spell.th})
                </div>
                <div style="font-size:0.68rem; color:#6ee7b7; font-weight:600;">
                  ⚔️ แก้ทาง: ${rc.targets.join(', ')}
                </div>
                <div style="font-size:0.68rem; color:#cbd5e1; margin-top:2px;">
                  ${rc.reason}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <div>
      <div style="font-size:0.84rem; font-weight:700; color:var(--accent-gold-light);">
        ✨ Battle Spells ทั้งหมด 12 ชนิด (คลิกเพื่อเลือก):
      </div>
      <div class="spell-picker-grid">
        ${BATTLE_SPELLS.map(sp => {
          const isCurrent = currentSpell.key === sp.key;
          const isSig = sigKeysSet.has(sp.key);
          const isRec = recKeysSet.has(sp.key);
          return `
            <div class="spell-option-card ${isCurrent ? 'active-spell' : ''} ${(isSig || isRec) ? 'recommended-counter' : ''}" onclick="selectSpellFromPicker('${sp.key}')" title="${sp.desc}">
              <img src="${sp.img}" alt="${sp.en}" />
              <div style="min-width:0;">
                <div style="font-size:0.8rem; font-weight:700; color:#fff;">${sp.en}</div>
                <div style="font-size:0.7rem; color:#fcd34d;">${sp.th}</div>
                <div style="font-size:0.62rem; color:var(--text-muted);">CD ${sp.cd} ${isSig ? '• ⭐ ประจำตัว' : (isRec ? '• ✨ แก้ทาง' : '')}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <div style="margin-top:1rem; padding-top:0.75rem; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
      <span style="font-size:0.75rem; color:var(--text-muted);">ต้องการดูไอเทมแก้ทางควบคู่กับสเปลด้วยหรือไม่?</span>
      <button class="btn-open-gear-modal" onclick="closeSpellPickerModal(); openCounterGearModal(${isEnemySlot ? hero.id : `'ALL'`}, 'ALL', ${!isEnemySlot ? hero.id : 'null'});">
        🗡️ เปิดตารางไอเทมแก้ทางคู่กับสเปลนี้ →
      </button>
    </div>
  `;
}

// ==================== HERO LANE / ROLE SWITCHER MODAL ====================
function openLanePickerModal(side, slotIdx, heroId = null) {
  let resolvedHeroId = heroId;
  if (!resolvedHeroId) {
    resolvedHeroId = side === 'enemy' ? state.enemyPicks[slotIdx] : state.allyPicks[slotIdx];
  }
  const hero = HERO_BY_ID.get(Number(resolvedHeroId));
  if (!hero) return;

  state.laneModal = { open: true, side, slotIdx, heroId: hero.id };
  renderLanePickerModal();
  document.getElementById('lanePickerModal').classList.add('open');
}

function closeLanePickerModal() {
  state.laneModal.open = false;
  document.getElementById('lanePickerModal')?.classList.remove('open');
}

function selectLaneForSlot(laneName) {
  const { side, slotIdx } = state.laneModal;
  const key = `${side}-${slotIdx}`;
  if (!laneName || laneName === 'AUTO') {
    delete state.laneOverrides[key];
  } else {
    state.laneOverrides[key] = laneName;
  }
  closeLanePickerModal();
  refreshAllViews();
}

function cycleSlotLane(side, slotIdx) {
  const heroIds = side === 'enemy' ? state.enemyPicks : state.allyPicks;
  const hero = heroIds[slotIdx] ? HERO_BY_ID.get(heroIds[slotIdx]) : null;
  if (!hero) return;
  const currentLane = getSlotAssignedLane(side, slotIdx);
  const pool = hero.lanes.length > 1 ? hero.lanes : ALL_LANES;
  const idx = pool.indexOf(currentLane);
  const nextLane = pool[(idx + 1) % pool.length];
  state.laneOverrides[`${side}-${slotIdx}`] = nextLane;
  refreshAllViews();
}

function renderLanePickerModal() {
  const container = document.getElementById('lanePickerModalContent');
  if (!container) return;

  const { side, slotIdx, heroId } = state.laneModal;
  const hero = HERO_BY_ID.get(heroId);
  if (!hero) return;

  const isEnemy = side === 'enemy';
  const currentLane = getSlotAssignedLane(side, slotIdx);
  const hasManualOverride = Boolean(state.laneOverrides[`${side}-${slotIdx}`]);
  const naturalLanesSet = new Set(hero.lanes);

  // Check which lanes are currently occupied by OTHER teammates on the same side
  const slotLanes = resolveTeamSlotLanes(side);
  const teamHeroIds = isEnemy ? state.enemyPicks : state.allyPicks;

  container.innerHTML = `
    <div class="slot-picker-header">
      <div class="slot-picker-title-wrap">
        <img src="${hero.head}" style="width:48px; height:48px; border-radius:12px; border:2px solid var(--accent-gold); object-fit:cover;" alt="${hero.name}" />
        <div>
          <h2 style="font-size:1.12rem; color:#fef08a;">
            🗺️ เปลี่ยนตำแหน่ง/เลนของ ${hero.name} (${isEnemy ? `ฝั่งศัตรู S${slotIdx + 1}` : `ทีมเรา S${slotIdx + 1}`})
          </h2>
          <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px; display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span>เลนปัจจุบัน:</span>
            <span style="display:inline-flex; align-items:center; gap:3px; color:#38bdf8; font-weight:600;">
              <img src="${LANE_IMAGE[currentLane] || 'assets/lanes/mid.png'}" class="lane-real-icon" alt="${currentLane}" /> ${LANE_SHORT_LABEL[currentLane] || currentLane}
            </span>
            <span>• เลนถนัด:</span>
            <span style="display:inline-flex; align-items:center; gap:6px; color:#6ee7b7; font-weight:600;">
              ${hero.lanes.map(l => `<span style="display:inline-flex; align-items:center; gap:2px;"><img src="${LANE_IMAGE[l] || 'assets/lanes/mid.png'}" class="lane-pill-img" alt="${l}" /> ${LANE_SHORT_LABEL[l] || l}</span>`).join(' / ')}
            </span>
          </p>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:0.45rem;">
        ${hasManualOverride ? `
          <button class="btn btn-reset" onclick="selectLaneForSlot('AUTO')" title="รีเซ็ตกลับไปใช้เลนอัตโนมัติ">
            🔄 คืนค่าเลนอัตโนมัติ
          </button>
        ` : ''}
        <button class="modal-close" onclick="closeLanePickerModal()">✕</button>
      </div>
    </div>

    <div style="margin-bottom:0.85rem; font-size:0.82rem; color:#cbd5e1;">
      คลิกเลือกเลนที่ต้องการให้ <strong>${hero.name}</strong> ไปยืน (ระบบจะอัปเดตเช็กลิสต์เลนที่ขาดและปรับสเปล <strong>Retribution</strong> ให้อัตโนมัติหากย้ายเข้า/ออกจากป่า):
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:0.6rem;">
      ${ALL_LANES.map(lane => {
        const isCurrent = currentLane === lane;
        const isNatural = naturalLanesSet.has(lane);
        // Check if another teammate is currently on this lane
        const otherIdx = slotLanes.findIndex((l, i) => i !== slotIdx && l === lane && teamHeroIds[i]);
        const otherHero = otherIdx !== -1 ? HERO_BY_ID.get(teamHeroIds[otherIdx]) : null;

        return `
          <div
            class="spell-option-card ${isCurrent ? 'active-spell' : ''} ${isNatural ? 'recommended-counter' : ''}"
            onclick="selectLaneForSlot('${lane}')"
            style="padding:0.65rem 0.75rem; align-items:flex-start;"
          >
            <img src="${LANE_IMAGE[lane] || 'assets/lanes/mid.png'}" class="lane-modal-icon" alt="${lane}" />
            <div style="min-width:0; flex:1;">
              <div style="display:flex; align-items:center; gap:0.35rem; flex-wrap:wrap;">
                <strong style="font-size:0.88rem; color:#fff;">${lane}</strong>
                ${isCurrent ? `<span style="font-size:0.62rem; background:#0284c7; color:#fff; padding:1px 6px; border-radius:6px; font-weight:700;">✓ เลนปัจจุบัน</span>` : ''}
                ${isNatural ? `<span style="font-size:0.62rem; background:rgba(16,185,129,0.22); color:#6ee7b7; border:1px solid rgba(16,185,129,0.45); padding:1px 6px; border-radius:6px; font-weight:700;">⭐ เลนถนัด</span>` : ''}
              </div>
              <div style="font-size:0.7rem; color:#cbd5e1; margin-top:3px;">
                ${LANE_TH_DESC[lane]}
              </div>
              ${otherHero ? `
                <div style="font-size:0.66rem; color:#fde68a; margin-top:4px;">
                  ⚠️ มี ${otherHero.name} ยืนเลนนี้ในทีมแล้ว
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSlotPickerModal();
    closeHeroModal();
    closeCounterGearModal();
    closeSpellPickerModal();
    closeLanePickerModal();
  }
});

function switchTab(tabKey) {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabKey);
  });
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.id === `tab-${tabKey}`);
  });
  if (tabKey === 'combos') renderCombosHub();
  if (tabKey === 'meta') renderMetaTierList();
  if (tabKey === 'lookup') {
    renderLookupQuickBar();
    renderLookupDetail();
  }
}

function refreshAllViews() {
  renderBanBoard();
  renderTeamColumns();
  renderRecommendations();
  renderHeroGrid();
  renderCombosHub();
}

window.addEventListener('DOMContentLoaded', () => {
  loadDemoDraft();
  renderCombosHub();
  renderMetaTierList();
  renderLookupQuickBar();
  renderLookupDetail();
});
