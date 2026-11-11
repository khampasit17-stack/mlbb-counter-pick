// MLBB Pro Meta Combos Database (Duo, Trio, and 5-Man Lineups)
window.MLBB_COMBOS = [
  // ==================== DUO COMBOS (คู่หูดูโอ้ 2 คน) ====================
  {
    id: 'duo-carmilla-cecilion',
    title: 'Carmilla + Cecilion (สายสัมพันธ์โลหิตระเบิดหมู่)',
    type: 'duo',
    tier: 'SS',
    badge: 'SS-Tier Wombo Combo',
    winRateBonus: '+6.4% WR',
    difficulty: 'ปานกลาง',
    heroes: ['Carmilla', 'Cecilion'],
    summary: 'คอมโบคู่รักที่แรงที่สุดในเมต้าปัจจุบัน อัลติของ Carmilla เชื่อมดาเมจและ CC ศัตรูเข้าด้วยกัน ทำให้สกิลค้างคาวของ Cecilion ที่ฟาดใส่ตัวหน้า ชิ่งระเบิดตายยกทีมพร้อมกัน',
    steps: [
      '1. Carmilla เปิดสกิล 2 วิ่งสตั๊นและปาอัลติ Curse of Blood เชื่อมศัตรู 2-5 ตัวเข้าด้วยกัน',
      '2. Cecilion กดอัลติ Bats Feast และสาดสกิล 1 Bat Impact ใส่ศัตรูตัวไหนก็ได้ในวงที่ถูกเชื่อม',
      '3. ดาเมจและสโลว์จะแชร์ถึงกันหมด ทำให้แนวหลังศัตรูละลายหายไปพร้อมกับแทงค์ทันที (มีสกิลพิเศษ Moonlit Waltz ดึง Carmilla เข้าหาตัวได้ด้วย)'
    ],
    strongAgainst: 'ทีมที่เดินเกาะกลุ่มฮีล (Estes, Rafaela) หรือทีมที่มีแนวหน้ายืนชิดกัน',
    mustBan: ['Diggie', 'Baxia', 'Fanny']
  },
  {
    id: 'duo-marcel-ixia',
    title: 'Marcel + Ixia (ขังวงสังหาร Full Barrage)',
    type: 'duo',
    tier: 'SS',
    badge: 'Mythical Glory Top Meta',
    winRateBonus: '+5.8% WR',
    difficulty: 'ง่าย',
    heroes: ['Marcel', 'Ixia'],
    summary: 'Marcel เป็นโรมมิ่ง SS-Tier ที่มีสกิลขังและรวบพื้นที่กว้างมาก เมื่อจับคู่กับ Ixia ที่กางอัลติยิงกราดเป็นพัด จะทำให้ศัตรูเดินหนีออกจากพัดของ Ixia ไม่ได้เลย',
    steps: [
      '1. Marcel เปิดจังหวะด้วยสกิล CC หมู่ ล็อกขาและรวบศัตรูในพื้นที่แคบ',
      '2. Ixia กางอัลติ Full Barrage จากระยะไกลและรัวสกิล 1-2 ใส่ทุกคนในวงพร้อมกัน',
      '3. เลือดศัตรูทั้งทีมจะไหลลงพร้อมกันใน 3 วินาทีขณะที่ขยับหนีไม่ได้'
    ],
    strongAgainst: 'ไฟต์เตอร์และแทงค์ระยะประชิด รวมถึงทีมที่ต้องแย่งพื้นที่หน้า Lord/Turtle',
    mustBan: ['Lolita', 'Diggie', 'Hayabusa']
  },
  {
    id: 'duo-lukas-floryn',
    title: 'Lukas + Floryn (สัตว์เทพอมตะ 1v5)',
    type: 'duo',
    tier: 'SS',
    badge: 'Immortal Raid Boss',
    winRateBonus: '+5.2% WR',
    difficulty: 'ง่าย',
    heroes: ['Lukas', 'Floryn'],
    summary: 'Lukas ในร่างสัตว์เทพ (Sacred Beast) มีทั้งดาเมจและเลือดที่สูงมาก เมื่อได้โคมไฟของ Floryn และอัลติฮีลข้ามแมพที่ล้างผลตัดเลือดได้ จะทำให้ Lukas กลายเป็นบอสที่ฆ่าไม่ตาย',
    steps: [
      '1. Floryn มอบไอเทมดอกไม้ (Dew) ให้ Lukas เพื่อเพิ่มพลังโจมตีและเกราะตั้งแต่ต้นเกม',
      '2. เมื่อเข้าไฟต์ Lukas แปลงร่างเป็น Sacred Beast กระโจนเข้าใส่แนวหลังศัตรู',
      '3. ทันทีที่เลือด Lukas ลดลงครึ่งหลอด Floryn กดอัลติ Bloom ฮีลเต็มหลอดแบบไม่สนไอเทมตัดเลือดของศัตรู'
    ],
    strongAgainst: 'ทีมเบิร์สต์ดาเมจที่ไม่มีตัวหยุด Suppress หรือทีมที่พึ่งพาไอเทมตัดเลือด',
    mustBan: ['Minsitthar', 'Karrie', 'Valir']
  },
  {
    id: 'duo-eudora-tigreal',
    title: 'Tigreal + Eudora Revamped (รวบช็อตสายฟ้าลูกโซ่)',
    type: 'duo',
    tier: 'SS',
    badge: 'Instant Team Wipe',
    winRateBonus: '+5.5% WR',
    difficulty: 'ง่าย',
    heroes: ['Tigreal', 'Eudora'],
    summary: 'Eudora (Revamped) มีดาเมจสายฟ้าชิ่งหมู่ที่รุนแรงมาก เมื่อ Tigreal แฟลชรวบศัตรูเข้าจุดเดียวกัน สายฟ้าของ Eudora จะชิ่งซ้อนทับกันจนตัวบางตายคาที่ทันที',
    steps: [
      '1. Tigreal กด Flicker + อัลติ Implosion ดูดศัตรูมารวมกันแล้วดันซ้ำด้วยสกิล 2',
      '2. Eudora แปะสกิล 2 Ball Lightning ให้ติดสถานะตัวนำไฟฟ้า แล้วกดอัลติ + สกิล 1 ทันที',
      '3. พายุสายฟ้าจะชิ่งซ้ำในกลุ่มที่ถูกรวบ สร้างดาเมจเวทระเบิดหมู่แบบกดเกราะไม่ทัน'
    ],
    strongAgainst: 'ทีมตัวบาง แครี่ เมจ และแอสซาซินที่ไม่ได้ถือสเปล Purify',
    mustBan: ['Diggie', 'Valir', 'Akai']
  },
  {
    id: 'duo-julian-angela',
    title: 'Julian + Angela (จอมเวทนักฆ่าติดเกราะสิงร่าง)',
    type: 'duo',
    tier: 'S',
    badge: 'Hyper-Dive Duo',
    winRateBonus: '+5.1% WR',
    difficulty: 'ปานกลาง',
    heroes: ['Julian', 'Angela'],
    summary: 'Julian มีสกิลคอมโบที่ได้ทั้งดูดเลือดและอมตะ เมื่อมี Angela อัลติสิงร่างจะช่วยเพิ่มความเร็ววิ่ง เกราะก้อนโต และสกิลผูกเชือกสตั๊น ทำให้ล้วงลึกถึงในป้อมได้สบาย',
    steps: [
      '1. Julian พุ่งเข้าทำจังหวะด้วยคอมโบสกิล 2-3-1 (โหมดดาบหมุนลอยฟ้าหรือโซ่ขัง)',
      '2. Angela กดอัลติ Heartguard สิงร่าง Julian ทันทีที่เข้าปะทะ มอบเกราะขนาดใหญ่',
      '3. Angela รัวสกิล 1 ฮีลและสกิล 2 ผูกเชือกสโลว์ให้ Julian ไล่เก็บงานจนหมดทีม'
    ],
    strongAgainst: 'ทีมที่มีแครี่/เมจขาตาย และทีมที่ขาดตัวล็อกเป้าแบบ Suppress',
    mustBan: ['Minsitthar', 'Saber', 'Esmeralda']
  },
  {
    id: 'duo-johnson-odette',
    title: 'Johnson + Odette (คอมโบรถชนหงส์สังหาร)',
    type: 'duo',
    tier: 'A',
    badge: 'Classic Wombo Combo',
    winRateBonus: '+4.9% WR',
    difficulty: 'ปานกลาง',
    heroes: ['Johnson', 'Odette'],
    summary: 'คอมโบสุดคลาสสิกที่ยังใช้ไต่แรงก์ได้ผลเสมอ Johnson ขับรถพา Odette พุ่งชนกลางวงศัตรูให้เกิดพื้นที่ไฟฟ้าสโลว์และสตั๊น แล้ว Odette กางอัลติ Swan Song ปิดฉาก',
    steps: [
      '1. Johnson กดอัลติ Rapid Touchdown แปลงเป็นรถและรับ Odette ขึ้นรถไปด้วย',
      '2. ขับอ้อมป่าเข้าชนกลุ่มแนวหลังศัตรูให้ติดสตั๊นหมู่ในวงไฟฟ้า',
      '3. Odette กดสกิล 2-1 และกดอัลติ Swan Song ทันที (สามารถกด Winter Crown ระหว่างกางอัลติเพื่อเป็นอมตะได้)'
    ],
    strongAgainst: 'ทีมที่ไม่มีตัวเปิดแมพในพุ่ม และทีมที่ไม่มีสกิลขัดจังหวะระยะไกล',
    mustBan: ['Diggie', 'Kadita', 'Akai']
  },
  {
    id: 'duo-atlas-zhuxin',
    title: 'Atlas + Zhuxin (ทุ่มรวบจับลอยนรกไร้ที่หนี)',
    type: 'duo',
    tier: 'S',
    badge: 'Infinite CC Chain',
    winRateBonus: '+5.4% WR',
    difficulty: 'ปานกลาง',
    heroes: ['Atlas', 'Zhuxin'],
    summary: 'เมื่อ Atlas พุ่งเข้าจับทุ่มศัตรูรวมกันที่จุดเดียว Zhuxin จะกางโคมไฟดูดวิญญาณค้างไว้ตรงจุดที่ศัตรูตกลงมา ทำให้ศัตรูถูกลอยทุ่มซ้ำสองต่อแบบไม่มีโอกาสกดสกิลหนี',
    steps: [
      '1. Atlas ใช้สกิล 2 พุ่งถอดร่างเข้าหาศัตรูแล้วกดอัลติ Fatal Links จับทุ่มรวมกัน',
      '2. Zhuxin เปิดอัลติและกางสกิล 2 Lantern Flare รอรับตรงจุดที่ Atlas ทุ่มศัตรูลงมา',
      '3. ศัตรูทั้งกลุ่มจะติดเกจโคมไฟเต็มทันทีและถูก Zhuxin จับยกทุ่มซ้ำต่ออีกชุด'
    ],
    strongAgainst: 'ทีมไฟต์เตอร์และแครี่ที่ต้องยืนรวมกันในไฟต์',
    mustBan: ['Diggie', 'Wanwan', 'Hayabusa']
  },
  {
    id: 'duo-luoyi-yuzhong',
    title: 'Luo Yi + Yu Zhong (วาร์ปมังกรดำตลบหลัง + ดูดหยินหยาง)',
    type: 'duo',
    tier: 'S',
    badge: 'MPL Tactical Combo',
    winRateBonus: '+4.8% WR',
    difficulty: 'สูง',
    heroes: ['Luo Yi', 'Yu Zhong'],
    summary: 'คอมโบระดับโปรเพลเยอร์ ใช้ประตูวาร์ปอัลติของ Luo Yi พา Yu Zhong ที่กำลังแปลงร่างเป็นมังกรดำวาร์ปไปลงกลางหัวแครี่และเมจศัตรู พร้อมสกิลดูดหยิน-หยาง',
    steps: [
      '1. Luo Yi กางวงอัลติ Diversion จากในพุ่มไม้ไปยังแนวหลังของศัตรู',
      '2. Yu Zhong กดอัลติ Black Dragon Form ในวงวาร์ปก่อนที่วาร์ปจะทำงาน 0.5 วินาที',
      '3. ทันทีที่วาร์ปไปถึง Yu Zhong จะพุ่งชนแนวหลังศัตรูพร้อมกับที่ Luo Yi สาดสกิล 1-2 ดูดศัตรูให้กระแทกกัน'
    ],
    strongAgainst: 'ทีมที่มีเมจและแครี่ยืนแนวหลังไกลๆ เช่น Pharsa, Yve, Xavier, Layla, Ixia',
    mustBan: ['Diggie', 'Valir', 'Karrie']
  },
  {
    id: 'duo-chip-masha',
    title: 'Chip + Masha (เปิดวาร์ปรุมขย้ำ 4 รุม 1 พังป้อมไว)',
    type: 'duo',
    tier: 'SS',
    badge: 'Global Macro Gank',
    winRateBonus: '+6.1% WR',
    difficulty: 'ปานกลาง',
    heroes: ['Chip', 'Masha'],
    summary: 'Chip สามารถเปิดประตูมิติเรียกเพื่อนมาทันที เมื่อมี Masha (SS-Tier เลือด 3 หลอด) วาร์ปตามลงมา จะสามารถสังหารเป้าหมายใน 1 วินาทีและไถป้อมแตกทันที',
    steps: [
      '1. Chip เดินไปจับตัวศัตรูที่เลนข้างแล้ววางอัลติ Shortcut เปิดประตูมิติ',
      '2. Masha วาร์ปผ่านประตูมิติลงมาพร้อมอัลติพุ่งกระแทก ละลายเป้าหมายทันที',
      '3. หลังจากฆ่าเสร็จ Masha ใช้ความเร็วโจมตีตีป้อมแตกภายในไม่กี่วินาทีก่อนศัตรูมาซ้อน'
    ],
    strongAgainst: 'ทีมที่ชอบแยกฟาร์มเดี่ยว และทีมที่หมุนเลนช้า',
    mustBan: ['Belerick', 'Tigreal', 'Luo Yi']
  },
  {
    id: 'duo-belerick-obsidia',
    title: 'Belerick + Obsidia (กำแพงหนามสะท้อน + ห่ากระดูกสังหาร)',
    type: 'duo',
    tier: 'SS',
    badge: 'Gold Lane Fortress',
    winRateBonus: '+5.6% WR',
    difficulty: 'ง่าย',
    heroes: ['Belerick', 'Obsidia'],
    summary: 'Belerick ยืนค้ำหน้าและยั่วยุ (Taunt) ศัตรูที่คิดจะพุ่งเข้ามาหา Obsidia พร้อมสะท้อนดาเมจกลับ เปิดโอกาสให้ Obsidia เก็บสแต็ก Bone Energy ยิงฟรีจนจบไฟต์',
    steps: [
      '1. Belerick เดินนำหน้าเปิดพุ่มและกดอัลติ Wrath of Dryad ยั่วยุศัตรูที่พุ่งเข้ามา',
      '2. ศัตรูที่ถูกยั่วยุจะถูกบังคับให้ตี Belerick และโดนหนามสะท้อนดาเมจกลับ',
      '3. Obsidia ยืนยิงฟรีจากด้านหลัง ปล่อย Bone Shards ละลายศัตรูทีละตัว'
    ],
    strongAgainst: 'ทีมที่มีแครี่สายตีเร็วและแอสซาซินสายล้วงระยะประชิด',
    mustBan: ['Valir', 'Karrie', 'X.Borg']
  },
  {
    id: 'duo-hylos-angela',
    title: 'Hylos + Angela (Thunder Belt ม้าศึกอมตะ + เกราะสิงร่าง Flask of the Oasis)',
    type: 'duo',
    tier: 'SS',
    badge: 'New Equipment Meta #1',
    winRateBonus: '+6.6% WR',
    difficulty: 'ง่าย',
    heroes: ['Hylos', 'Angela'],
    summary: 'คอมโบเมต้าไอเทมใหม่ที่โกงที่สุด! Hylos ออก Thunder Belt เก็บสแต็กเกราะถาวร + Glowing Wand วิ่งเปิดทางม้าศึก เมื่อ Angela ออก Flask of the Oasis สิงร่าง จะทำให้ Hylos วิ่งไล่เหยียบศัตรูถึงในป้อมแบบฆ่าไม่ตาย',
    steps: [
      '1. Hylos ออก Thunder Belt ชิ้นแรก เดินชนเก็บสแต็กเกราะถาวรและกางอัลติ Glorious Pathway เปิดทาง',
      '2. Angela กดอัลติ Heartguard สิงร่าง Hylos พร้อมไอเทม Flask of the Oasis และ Fleeting Time',
      '3. Hylos เปิดวงแหวนสกิล 2 เผาและสโลว์คู่กับเชือกของ Angela วิ่งไล่ทุบ True Damage จาก Thunder Belt จนศัตรูแตกพ่าย'
    ],
    strongAgainst: 'ทีมที่ไม่มีตัวละลายแทงค์ %HP แท้จริง และทีมแครี่ขาตาย',
    mustBan: ['Karrie', 'Valir', 'Baxia']
  },
  {
    id: 'duo-mathilda-granger',
    title: 'Mathilda + Granger Revamped (สายลมพาบิน + ปืนใหญ่ไร้ขีดจำกัด Sky Piercer)',
    type: 'duo',
    tier: 'SS',
    badge: 'Immortal Rank Top Duo',
    winRateBonus: '+6.3% WR',
    difficulty: 'ปานกลาง',
    heroes: ['Mathilda', 'Granger'],
    summary: 'Granger โฉมใหม่ที่สาดกระสุนและอัลติได้ต่อเนื่องโดยใช้พลังงาน เมื่อถือ Sky Piercer และจับคู่กับ Mathilda ที่พาบินเข้า-ออกด้วย Guiding Wind จะสามารถไล่ยิงประหารศัตรูที่เลือดต่ำกว่า 12% ได้ทั้งสนามรบ',
    steps: [
      '1. Granger รัวสกิล 1 Rhapsody และอัลติ Death Sonata ตอดเลือดศัตรูจากระยะไกล',
      '2. ทันทีที่ศัตรูเลือดลด Mathilda กดสกิล 2 Guiding Wind ให้ Granger กดบินตามเข้าไปประชิดพร้อมเกราะขาว',
      '3. Mathilda กดอัลติ Circling Eagle ชนลอย แล้ว Granger ยิงปิดฉากให้พาสซีฟ Sky Piercer ประหารทันที'
    ],
    strongAgainst: 'ทีมตัวบาง แครี่ เมจ และทีมที่ขาดตัวล็อกเป้าแบบ Suppress',
    mustBan: ['Lolita', 'Franco', 'Khufra']
  },
  {
    id: 'duo-badang-carmilla',
    title: 'Badang + Carmilla (Thunder Belt กำแพงหมัดสายฟ้า + เชื่อมเลือดสตั๊นหมู่)',
    type: 'duo',
    tier: 'SS',
    badge: 'Thunder Belt CC Chain',
    winRateBonus: '+5.9% WR',
    difficulty: 'ง่าย',
    heroes: ['Badang', 'Carmilla'],
    summary: 'Badang สายเมต้าใหม่ (ออก Thunder Belt + Fleeting Time) ต่อยสกิล 1 และอัลติติดผล Thunder Belt รัวๆ เมื่อ Carmilla เชื่อมอัลติ Curse of Blood จะทำให้หมัดของ Badang สตั๊นและทำ True Damage ชิ่งใส่ศัตรูยกทีม!',
    steps: [
      '1. Carmilla เปิดจังหวะปาอัลติ Curse of Blood เชื่อมศัตรู 2-5 ตัวเข้าด้วยกัน',
      '2. Badang พุ่งเข้าบล็อกทางด้วยกำแพงสกิล 2 Fist Break แล้วกดอัลติ Fist Crack ต่อยรัวอัดกำแพง',
      '3. ทุกหมัดของ Badang จะกระตุ้นสตั๊นและ Thunder Belt ชิ่งผ่านสายเลือดของ Carmilla จนศัตรูขยับไม่ได้จนตาย'
    ],
    strongAgainst: 'ทีมไฟต์เตอร์ แทงค์ และแครี่ที่ไม่มีสเปล Purify',
    mustBan: ['Diggie', 'Valir', 'Chou']
  },
  {
    id: 'duo-kalea-hayabusa',
    title: 'Kalea + Hayabusa (คลื่นน้ำจับทุ่มล็อกเป้า + เงาสังหาร Sky Piercer)',
    type: 'duo',
    tier: 'SS',
    badge: 'Instant Pick-Off Duo',
    winRateBonus: '+6.0% WR',
    difficulty: 'ปานกลาง',
    heroes: ['Kalea', 'Hayabusa'],
    summary: 'Kalea พุ่งจับล็อกเป้าหมายหลักแล้วทุ่มกลับมาให้ Hayabusa ที่ถือ Sky Piercer กดอัลติ Ougi: Shadow Kill สังหารเป้าหมายเดี่ยวได้ 100% โดยที่ศัตรูกดหนีหรือกดอมตะไม่ทัน',
    steps: [
      '1. Kalea ใช้สกิลพุ่งเข้าโซนน้ำและจับล็อกตัวแบกของศัตรูทุ่มกลับมา',
      '2. Hayabusa ปาเงาสกิล 2 Quad Shadow เข้าใส่เป้าหมายที่กำลังลอยอยู่กลางอากาศ',
      '3. Hayabusa กดอัลติ Shadow Kill ฟันรัวพร้อม Sky Piercer ปิดสกอร์ทันทีแล้วสลับเงาถอยออก'
    ],
    strongAgainst: 'ทีมที่พึ่งพาแครี่หรือเมจตัวแบกคนเดียว',
    mustBan: ['Minsitthar', 'Kaja', 'Franco']
  },
  {
    id: 'duo-popol-kalea',
    title: 'Popol and Kupa (Revamped) + Kalea (ขี่หลังหมาป่าจ่าฝูง + กับดักลดเกราะรุมขย้ำ)',
    type: 'duo',
    tier: 'S',
    badge: 'Revamped Icefield Duo',
    winRateBonus: '+5.8% WR',
    difficulty: 'ง่าย',
    heroes: ['Popol and Kupa', 'Kalea'],
    summary: 'Popol and Kupa โฉมใหม่ที่ขี่หลังหมา Kupa (สกิล 2) วิ่งตามจังหวะเปิดของ Kalea ได้ทันที พร้อมวางกับดักสกิล 3 ลดเกราะกายภาพและกดอัลติสั่ง Kupa กระโดดทุบงัดลอยซ้ำสองต่อ!',
    steps: [
      '1. Popol กดสกิล 2 ขี่หลังหมา Kupa วิ่งความเร็วสูงตาม Kalea เข้าไปจับเป้าหมาย',
      '2. Kalea พุ่งล็อกเป้าหมายแล้ว Popol วางกับดักสกิล 3 ใต้เท้าศัตรูเพื่อล็อกขาและลดเกราะกายภาพทันที',
      '3. เปิดอัลติ We Are Angry! แล้วกดสกิล 1 ให้หมาป่า Alpha Wolf กระโดดทุบงัดลอยซ้ำและรุมกัดด้วยโบนัสความเร็วโจมตีจากพาสซีฟใหม่'
    ],
    strongAgainst: 'ทีมที่มีแอสซาซินสายล้วง (Fanny, Hayabusa, Natalia, Harley) และแครี่ขาตาย',
    mustBan: ['Carmilla', 'Atlas', 'Hanabi']
  },

  // ==================== TRIO CORES (3 ประสานคุมเกม) ====================
  {
    id: 'trio-novaria-nolan-kalea',
    title: 'Novaria + Nolan + Kalea (3 ประสานส่องแมพ-ล็อกเป้า-สังหารไว)',
    type: 'trio',
    tier: 'S',
    badge: 'Pro Pick-Off Trio',
    winRateBonus: '+6.0% WR',
    difficulty: 'ปานกลาง',
    heroes: ['Novaria', 'Nolan', 'Kalea'],
    summary: 'สามประสาน Mid-Jungle-Roam ที่คุมจังหวะเกมไวที่สุด Novaria เปิดวิสัยทัศน์ทั้งแมพและขยายฮิตบ็อกซ์ Kalea พุ่งจับล็อกด้วยโซนน้ำ และ Nolan พุ่งตัดริฟต์ระเบิดดาเมจปิดงาน',
    steps: [
      '1. Novaria กดอัลติ Astral Echo ส่องตำแหน่งศัตรูในป่าและเพิ่มขนาดฮิตบ็อกซ์ 50%',
      '2. Kalea พุ่งเข้าล็อกเป้าหมายและกระแทกกลับหลังมาหาเพื่อน',
      '3. Nolan พุ่งเข้ามาเปิดคอมโบสกิล 1-2-อัลติ สังหารเป้าหมายใน 1 วินาทีแล้วถอยออกอย่างปลอดภัย'
    ],
    strongAgainst: 'ทีมที่ต้องพึ่งพาป่าตัวบางหรือแครี่ฟาร์มช้า',
    mustBan: ['Minsitthar', 'Phoveus', 'Khufra']
  },
  {
    id: 'trio-estes-fredrinn-valentina',
    title: 'Estes + Fredrinn + Valentina (แผน UBE เดินเกาะกลุ่มอมตะ)',
    type: 'trio',
    tier: 'SS',
    badge: 'MPL UBE Healing Core',
    winRateBonus: '+6.3% WR',
    difficulty: 'ง่าย',
    heroes: ['Estes', 'Fredrinn', 'Valentina'],
    summary: 'แผน UBE (Ultimate Bonding Experience) อันโด่งดังของแชมป์โลก ใช้ Fredrinn เป็นกำแพงยักษ์เดินบุกป่าและตีบอส โดยมี Estes ฮีลหมู่ให้เลือดเต็มตลอดเวลา และ Valentina คอยขโมยอัลติตัวเปิดของศัตรู',
    steps: [
      '1. เดินคุมพื้นที่ Turtle/Lord พร้อมกันทั้ง 3 คนโดยให้ Fredrinn ยืนรับดาเมจด้านหน้า',
      '2. Estes กดอัลติ Blessing of Moon Goddess ฮีลเชื่อมทั้งทีม ทำให้ Fredrinn เก็บเกจเลือดเทาได้มหาศาลโดยไม่ตาย',
      '3. Valentina ก๊อปปี้อัลติของแทงค์/เมจศัตรูมาใช้สวนกลับ และให้ Fredrinn ฟาดอัลติ Appraiser\'s Wrath ปิดไฟต์'
    ],
    strongAgainst: 'ทีมที่ดาเมจไม่พอจะละลายแทงค์ในชุดเดียว และทีมที่เน้นสกิลอัลติใหญ่ๆ',
    mustBan: ['Baxia', 'Luo Yi', 'Carmilla']
  },
  {
    id: 'trio-carmilla-eudora-suyou',
    title: 'Carmilla + Eudora + Suyou (เชื่อมเลือด-ช็อตหมู่-กวาดล้าง)',
    type: 'trio',
    tier: 'SS',
    badge: 'Burst & Clean-Up Trio',
    winRateBonus: '+6.7% WR',
    difficulty: 'ง่าย',
    heroes: ['Carmilla', 'Eudora', 'Suyou'],
    summary: 'สามประสานที่ชนะไฟต์ 3v3 ตั้งแต่เลเวล 4 ได้เด็ดขาดที่สุด Carmilla เชื่อมดาเมจ Eudora ช็อตสายฟ้าลดเลือดทั้งกลุ่มลงเหลือครึ่งหลอด แล้วให้ Suyou พุ่งเข้าเก็บกวาดรวดเดียว',
    steps: [
      '1. Carmilla ปาอัลติ Curse of Blood เชื่อมศัตรูในวงไฟต์',
      '2. Eudora สาดคอมโบสายฟ้า 2-3-1 ใส่ตัวที่ติดเชื่อม ทำให้โดนทั้งดาเมจและสตั๊นพร้อมกันทุกคน',
      '3. Suyou ใช้โหมดนักฆ่าพุ่งตัดและสลับโหมดอมตะฟาดเก็บตัวที่เลือดเหลือน้อยได้ครบทุกตัว'
    ],
    strongAgainst: 'เกือบทุกทีมในจังหวะชิง Turtle ตัวแรกและไฟต์ในป่าแคบ',
    mustBan: ['Diggie', 'Valir', 'Minsitthar']
  },
  {
    id: 'trio-hylos-zhuxin-granger',
    title: 'Hylos + Zhuxin + Granger (3 ประสานเมต้าไอเทมใหม่: Thunder Belt + Wishing Lantern + Sky Piercer)',
    type: 'trio',
    tier: 'SS',
    badge: 'New Patch God Trio',
    winRateBonus: '+6.9% WR',
    difficulty: 'ง่าย',
    heroes: ['Hylos', 'Zhuxin', 'Granger'],
    summary: '3 ประสานที่รวมฮีโร่และไอเทมเมต้าใหม่ไว้ด้วยกัน! Hylos (Thunder Belt) กางทางม้าศึกเร่งความเร็วให้ Zhuxin (Glowing Wand + Wishing Lantern) เดินกางโคมไฟจับทุ่มรัวๆ แล้วให้ Granger (Sky Piercer) ยิงประหารปิดสกอร์',
    steps: [
      '1. Hylos กางอัลติ Glorious Pathway เปิดทางเดินเข้าไฟต์พร้อมกด Revitalize/Vengeance รับดาเมจหน้าสุด',
      '2. Zhuxin วิ่งบนทางม้าศึกด้วยความเร็วสูง กางสกิล 2 Lantern Flare ดูดและจับศัตรูทุ่มซ้ำในวง',
      '3. Granger ยิงสกิล 1 และอัลติจากแนวหลัง กระตุ้น Sky Piercer สังหารศัตรูที่เลือดต่ำกว่า 12% ทันที'
    ],
    strongAgainst: 'ทีมไฟต์เตอร์และแทงค์ทุกชนิด รวมถึงทีมที่ต้องยืนไฟต์หน้า Lord',
    mustBan: ['Baxia', 'Fanny', 'Hayabusa']
  },
  {
    id: 'trio-mathilda-suyou-harith',
    title: 'Mathilda + Suyou + Harith (3 ประสาน MPL ความเร็วแสง: บินโฉบ-อมตะ-แดชยิงรัว)',
    type: 'trio',
    tier: 'SS',
    badge: 'MPL Immortal Tempo',
    winRateBonus: '+6.5% WR',
    difficulty: 'ปานกลาง',
    heroes: ['Mathilda', 'Suyou', 'Harith'],
    summary: 'ชุด 3 ประสานความคล่องตัวสูงสุดในแรงก์ Mythical Immortal! Mathilda พา Suyou และ Harith บินเข้า-ออกไฟต์ด้วยความเร็วสูง มีทั้งเกราะขาว ดาเมจเบิร์สต์ และดาเมจเวทต่อเนื่อง',
    steps: [
      '1. Mathilda กดสกิล 2 Guiding Wind พา Suyou พุ่งเข้าประชิดแนวหลังศัตรูพร้อมเกราะดูดซับดาเมจ',
      '2. Harith กางอัลติ Zaman Force และแดชยิงรัวด้วย Starlight + Concentrated Energy กลางวงไฟต์',
      '3. Suyou สลับโหมดนักฆ่าและโหมดอมตะเก็บงานตัวที่เหลือ แล้วกดบินตาม Mathilda ออกอย่างปลอดภัย'
    ],
    strongAgainst: 'ทีมที่สกิลเป็นเส้นตรง (Skillshot) และทีมที่ตามความเร็วไม่ทัน',
    mustBan: ['Minsitthar', 'Phoveus', 'Esmeralda']
  },

  // ==================== 5-MAN SQUAD LINEUPS (แผนทีม 5 คนครบทุกเลน) ====================
  {
    id: 'squad-new-item-meta',
    title: 'แผน 5 คน: "New Equipment Meta Raid Boss" (แก๊ง Thunder Belt + Sky Piercer + Malefic Gun)',
    type: 'squad',
    tier: 'SS',
    badge: '2026 New Item Patch #1',
    winRateBonus: '+7.5% WR',
    difficulty: 'ง่าย',
    heroes: ['Hylos', 'Suyou', 'Zhuxin', 'Granger', 'Badang'],
    summary: 'ดราฟต์ 5 คนที่ดึงพลังของไอเทมเมต้าใหม่ (Thunder Belt, Sky Piercer, Malefic Gun, Wishing Lantern, Glowing Wand) ออกมาได้เต็ม 100% แนวหน้าอึดถึกเก็บสแต็กเกราะไม่จำกัด ส่วนแนวหลังยิงประหารทันที!',
    steps: [
      'Roam: Hylos (ออก Thunder Belt + Glowing Wand ยืนค้ำหน้าและกางทางม้าศึก)',
      'EXP Lane: Badang (ออก Thunder Belt + Fleeting Time ต่อยสกิล 1 เก็บสแต็กเกราะและกางกำแพงสตั๊นหมู่)',
      'Mid Lane: Zhuxin (ออก Glowing Wand + Wishing Lantern กางโคมไฟจับทุ่มและเผา %HP)',
      'Jungle: Suyou (ออก Sky Piercer + Hunter Strike + Queen\'s Wings โฉบสังหารและชิงบอส)',
      'Gold Lane: Granger (ออก Sky Piercer + Malefic Gun + Malefic Roar สาดกระสุนระยะไกลประหารยกทีม)'
    ],
    strongAgainst: 'ชนะทางทีมไฟต์มาตรฐานเกือบทุกรูปแบบ ทั้งต้นเกม กลางเกม และเลทเกม',
    mustBan: ['Minsitthar', 'Karrie', 'Fanny']
  },
  {
    id: 'squad-wombo-blender',
    title: 'แผน 5 คน: "The Teamfight Blender" (รวบระเบิดหน้าบอส)',
    type: 'squad',
    tier: 'SS',
    badge: '5-Man Wombo Meta',
    winRateBonus: '+7.2% WR',
    difficulty: 'ปานกลาง',
    heroes: ['Lukas', 'Suyou', 'Eudora', 'Obsidia', 'Carmilla'],
    summary: 'ดราฟต์ 5 คนครบทุกตำแหน่งที่เน้นการไฟต์ 5v5 หน้า Lord/Turtle อย่างสมบูรณ์แบบ มีทั้งตัวเปิดเชื่อมเลือด (Carmilla), ตัวชนสัตว์เทพ (Lukas), เมจเบิร์สต์หมู่ (Eudora), ป่าคล่องตัวสูง (Suyou) และแครี่ไฮเปอร์แครี่ (Obsidia)',
    steps: [
      'EXP Lane: Lukas (แปลงร่างสัตว์เทพเปิดแนวหน้าและรับดาเมจ)',
      'Roam: Carmilla (ปาอัลติเชื่อมเลือดและสตั๊นศัตรูทั้งวง)',
      'Mid Lane: Eudora (ช็อตสายฟ้าหมู่ใส่ตัวที่ติดเชื่อมเลือดของ Carmilla)',
      'Gold Lane: Obsidia (สาดกระดูกยิงฟรีจากแนวหลัง)',
      'Jungle: Suyou (พุ่งเข้าเก็บงานตัวที่เหลือและโซนบอสด้วย Retribution)'
    ],
    strongAgainst: 'ทีมที่เน้นไฟต์ 5v5 มาตรฐาน และทีมที่ไม่มี Diggie',
    mustBan: ['Diggie', 'Minsitthar', 'Baxia']
  },
  {
    id: 'squad-global-macro',
    title: 'แผน 5 คน: "Global Portal & Split Push" (วาร์ปรุมฆ่า-แยกดันบ้านแตก)',
    type: 'squad',
    tier: 'SS',
    badge: '5-Man Macro Tempo',
    winRateBonus: '+6.8% WR',
    difficulty: 'ปานกลาง',
    heroes: ['Masha', 'Hirara', 'Zetian', 'Claude', 'Chip'],
    summary: 'ดราฟต์เน้นคุมแมพทั้งแผนที่! Chip เปิดประตูวาร์ปให้เพื่อนมาเติมใน 2 วินาที Zetian เปิดอัลติสตั๊นและเปิดแมพทั่วโลก Masha กับ Claude แยกดันป้อมไวมาก และมี Hirara ล้วงแนวหลัง',
    steps: [
      'Roam: Chip (เดินหาจังหวะจับศัตรูแล้วเปิดประตูวาร์ปเรียกเพื่อนมารุม)',
      'Mid Lane: Zetian (กดอัลติผ่าสตั๊นทั้งแผนที่และเร่งความเร็วให้เพื่อนทันทีที่เปิดวาร์ป)',
      'EXP Lane: Masha (วาร์ปลงมาขย้ำเป้าหมายด้วยเลือด 3 หลอดและไถป้อมต่อทันที)',
      'Jungle: Hirara (ใช้ความพริ้วและอมตะล้วงเก็บตัวบางแนวหลัง)',
      'Gold Lane: Claude (เคลียร์เลนไวและตามเข้าไฟต์ด้วยสกิลเงาสลับตำแหน่ง)'
    ],
    strongAgainst: 'ทีมที่เดินเกมช้า ทีมที่มีตัวขาตาย และทีมที่กันการแยกดันไม่เก่ง',
    mustBan: ['Belerick', 'Saber', 'Khufra']
  },
  {
    id: 'squad-anti-dive-fortress',
    title: 'แผน 5 คน: "Anti-Dive Counter Fortress" (ป้อมปราการสยบทีมสายพุ่งล้วง)',
    type: 'squad',
    tier: 'S',
    badge: '5-Man Counter Dive',
    winRateBonus: '+6.5% WR',
    difficulty: 'ง่าย',
    heroes: ['Phoveus', 'Aulus', 'Valir', 'Karrie', 'Minsitthar'],
    summary: 'แผนแก้ทางทีมศัตรูที่ชอบหยิบแอสซาซินและไฟต์เตอร์สายพริ้ว (เช่น Fanny, Ling, Hayabusa, Joy, Harith, Lukas) ใครพุ่งเข้ามาจะโดน Minsitthar ล็อกขา Phoveus ทุบซ้ำ และ Valir ผลักกระเด็นทันที',
    steps: [
      'Roam: Minsitthar (ดึงและกางอัลติ King\'s Calling ห้ามศัตรูใช้สกิลพุ่งทุกชนิด)',
      'EXP Lane: Phoveus (กระโดดทุบซ้ำทุกครั้งที่ศัตรูพยายามพุ่งหนี)',
      'Mid Lane: Valir (ผลักศัตรูที่เข้าประชิดแครี่ออกและเผาเป็น % เลือด)',
      'Gold Lane: Karrie (ยืนยิงละลายตัวหน้าที่ติดในวงด้วย True Damage)',
      'Jungle: Aulus (ฟาร์มไวและวิ่งเข้าทุบกวาดล้างช่วงกลางถึงเลทเกม)'
    ],
    strongAgainst: 'ทีมสายพุ่งล้วงทั้งหมด (Fanny, Ling, Joy, Harith, Nolan, Arlott, Freya)',
    mustBan: ['Novaria', 'Pharsa', 'Cecilion']
  }
];
