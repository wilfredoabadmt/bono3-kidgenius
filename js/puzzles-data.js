/**
 * KidGenius Puzzles Database
 * High-quality vector scenes, math question banks, slide configs, tangram models & worlds
 */

export const WORLDS_DATA = [
  {
    id: 'valle',
    name: 'Valle Jurásico',
    subtitle: 'Nivel Inicial • Explora y Descubre',
    icon: '🌴',
    badgeColor: '#7AC943',
    bgGradient: 'from-[#1E3A2B] to-[#35206F]',
    levels: [
      { id: 'valle_jigsaw_1', type: 'jigsaw', title: 'Rexy Bebé en el Valle', difficulty: '2x2 (4 piezas)', grid: 2, icon: '🦖' },
      { id: 'valle_math_1', type: 'math', title: 'Suma Jurásica Mágica', operationType: 'addition', grid: 3, icon: '➕' },
      { id: 'valle_slide_1', type: 'slide', title: 'Deslizador de Fósiles', grid: 3, icon: '🧩' },
      { id: 'valle_tangram_1', type: 'tangram', title: 'Silueta del Triceratops', icon: '🌿' },
      { id: 'valle_jigsaw_2', type: 'jigsaw', title: 'Bronto en la Laguna', difficulty: '3x3 (9 piezas)', grid: 3, icon: '🦕' },
      { id: 'valle_math_2', type: 'math', title: 'Restas Prehistóricas', operationType: 'subtraction', grid: 3, icon: '➖' }
    ]
  },
  {
    id: 'selva',
    name: 'Selva Cretácica',
    subtitle: 'Nivel Medio • Agilidad & Lógica',
    icon: '🌿',
    badgeColor: '#38A9E8',
    bgGradient: 'from-[#14364D] to-[#35206F]',
    levels: [
      { id: 'selva_jigsaw_1', type: 'jigsaw', title: 'Pterodáctilo en el Vuelo', difficulty: '3x3 (9 piezas)', grid: 3, icon: '🦅' },
      { id: 'selva_math_1', type: 'math', title: 'Tablas de Multiplicar (2, 3 y 5)', operationType: 'multiplication_easy', grid: 3, icon: '✖️' },
      { id: 'selva_slide_1', type: 'slide', title: 'Deslizador Selva Tropical', grid: 3, icon: '🌴' },
      { id: 'selva_tangram_1', type: 'tangram', title: 'Pterodáctilo Geométrico', icon: '✨' }
    ]
  },
  {
    id: 'volcan',
    name: 'Volcán de Retos',
    subtitle: 'Nivel Avanzado • Grandes Maestros',
    icon: '🌋',
    badgeColor: '#FF8A25',
    bgGradient: 'from-[#4D1C14] to-[#35206F]',
    levels: [
      { id: 'volcan_jigsaw_1', type: 'jigsaw', title: 'Duelo en el Volcán', difficulty: '4x4 (16 piezas)', grid: 4, icon: '🔥' },
      { id: 'volcan_math_1', type: 'math', title: 'Tablas de Multiplicar (6, 7, 8 y 9)', operationType: 'multiplication_hard', grid: 4, icon: '✖️' },
      { id: 'volcan_slide_1', type: 'slide', title: 'Deslizador de Lava Ardiente', grid: 4, icon: '⚡' }
    ]
  },
  {
    id: 'diamante',
    name: 'Isla Diamante KidGenius',
    subtitle: 'Reto Legendario • Diploma de Honor',
    icon: '💎',
    badgeColor: '#FFC928',
    bgGradient: 'from-[#4D3B0A] to-[#35206F]',
    levels: [
      { id: 'diamante_jigsaw_1', type: 'jigsaw', title: 'La Gran Fiesta de los Dinosaurios', difficulty: '4x4 (16 piezas)', grid: 4, icon: '👑' },
      { id: 'diamante_math_1', type: 'math', title: 'Gran Desafío Mixto KidGenius', operationType: 'mixed', grid: 4, icon: '🏆' }
    ]
  }
];

// Vector Illustrations for Jigsaw & Math Reveal scenes
export const SCENE_ILLUSTRATIONS = {
  rexy_valley: {
    title: 'Rexy Explorador en el Valle',
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#48CAE4"/>
          <stop offset="60%" stop-color="#90E0EF"/>
          <stop offset="100%" stop-color="#CAF0F8"/>
        </linearGradient>
        <linearGradient id="sun1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF275"/>
          <stop offset="100%" stop-color="#FFC928"/>
        </linearGradient>
        <linearGradient id="grass1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#98E062"/>
          <stop offset="100%" stop-color="#4F9A25"/>
        </linearGradient>
        <linearGradient id="rexyG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7AC943"/>
          <stop offset="100%" stop-color="#3B7D1A"/>
        </linearGradient>
      </defs>
      <!-- Sky & Sun -->
      <rect width="400" height="400" fill="url(#sky1)"/>
      <circle cx="330" cy="70" r="45" fill="url(#sun1)"/>
      <circle cx="330" cy="70" r="55" fill="#FFE071" opacity="0.4"/>
      <!-- Clouds -->
      <path d="M 50 80 Q 70 60 90 80 Q 110 60 130 80 Q 140 100 120 105 Q 40 105 50 80 Z" fill="#FFFFFF" opacity="0.9"/>
      <path d="M 220 120 Q 235 105 250 120 Q 265 105 280 120 Q 290 135 275 140 Q 210 140 220 120 Z" fill="#FFFFFF" opacity="0.8"/>
      <!-- Mountains -->
      <polygon points="-20,280 90,140 190,280" fill="#7B8CA3"/>
      <polygon points="120,280 230,120 340,280" fill="#607289"/>
      <polygon points="260,280 340,160 420,280" fill="#7B8CA3"/>
      <!-- Green Hills -->
      <path d="M -10 320 Q 120 220 260 320 Q 340 270 420 320 L 420 420 L -10 420 Z" fill="url(#grass1)"/>
      <!-- Palm Trees -->
      <path d="M 60 330 Q 70 260 65 200" stroke="#7A4B20" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M 65 200 Q 30 170 10 200 Q 40 180 65 200 Q 60 150 70 140 Q 75 175 65 200 Q 100 170 120 195 Q 90 180 65 200" fill="#4F9A25"/>
      <!-- Cute Rexy Dinosaur -->
      <g transform="translate(140, 160)">
        <!-- Tail -->
        <path d="M 20 140 Q -40 150 -60 110 Q -40 110 0 120 Z" fill="url(#rexyG)"/>
        <!-- Body -->
        <ellipse cx="60" cy="120" rx="45" ry="40" fill="url(#rexyG)"/>
        <ellipse cx="65" cy="125" rx="30" ry="25" fill="#FFE071" opacity="0.8"/>
        <!-- Legs & Feet -->
        <ellipse cx="40" cy="155" rx="14" ry="20" fill="#3B7D1A"/>
        <ellipse cx="40" cy="170" rx="18" ry="8" fill="#3B7D1A"/>
        <ellipse cx="80" cy="155" rx="14" ry="20" fill="url(#rexyG)"/>
        <ellipse cx="85" cy="170" rx="18" ry="8" fill="url(#rexyG)"/>
        <!-- Tiny Arms -->
        <path d="M 90 115 Q 110 115 105 125" stroke="url(#rexyG)" stroke-width="8" stroke-linecap="round" fill="none"/>
        <!-- Neck & Head -->
        <path d="M 75 95 Q 95 65 85 45 C 75 25 120 15 135 45 C 145 65 125 90 100 90 Z" fill="url(#rexyG)"/>
        <!-- Spikes on back -->
        <polygon points="40,85 46,75 52,85" fill="#FFC928"/>
        <polygon points="56,80 62,70 68,80" fill="#FFC928"/>
        <polygon points="72,75 78,65 84,75" fill="#FFC928"/>
        <!-- Big Eye -->
        <circle cx="105" cy="45" r="10" fill="#FFFFFF"/>
        <circle cx="107" cy="45" r="5.5" fill="#221245"/>
        <circle cx="105" cy="42" r="2.5" fill="#FFFFFF"/>
        <!-- Smile & Cheek -->
        <circle cx="95" cy="62" r="6" fill="#FF5E8E" opacity="0.6"/>
        <path d="M 105 65 Q 120 72 130 65" stroke="#221245" stroke-width="3" fill="none" stroke-linecap="round"/>
      </g>
      <!-- Flowers and sparkles -->
      <circle cx="120" cy="360" r="6" fill="#FF5E8E"/>
      <circle cx="280" cy="370" r="6" fill="#FFC928"/>
      <circle cx="340" cy="350" r="6" fill="#38A9E8"/>
    </svg>`
  },
  bronto_lagoon: {
    title: 'Bronto en la Laguna Mágica',
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lakeSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFD6A5"/>
          <stop offset="60%" stop-color="#FDFFB6"/>
          <stop offset="100%" stop-color="#CAFFBF"/>
        </linearGradient>
        <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#70C5F5"/>
          <stop offset="100%" stop-color="#0077B6"/>
        </linearGradient>
        <linearGradient id="brontoPink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFAAA6"/>
          <stop offset="100%" stop-color="#FF5E8E"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#lakeSky)"/>
      <!-- Sun -->
      <circle cx="80" cy="90" r="40" fill="#FF8A25" opacity="0.8"/>
      <!-- Distant Jungle -->
      <path d="M 0 240 Q 60 190 140 230 Q 220 180 300 220 Q 360 190 400 230 L 400 300 L 0 300 Z" fill="#4F9A25"/>
      <!-- Water Lagoon -->
      <path d="M 0 270 Q 150 250 400 270 L 400 400 L 0 400 Z" fill="url(#waterGrad)"/>
      <ellipse cx="200" cy="330" rx="160" ry="15" fill="#FFFFFF" opacity="0.3"/>
      <!-- Brontosaurus -->
      <g transform="translate(110, 100)">
        <!-- Long Tail -->
        <path d="M 20 220 Q -60 210 -80 160 Q -60 170 0 190 Z" fill="url(#brontoPink)"/>
        <!-- Big Round Body -->
        <ellipse cx="60" cy="200" rx="60" ry="40" fill="url(#brontoPink)"/>
        <ellipse cx="60" cy="210" rx="45" ry="25" fill="#FFF275" opacity="0.7"/>
        <!-- Long Curved Neck -->
        <path d="M 95 190 Q 140 100 130 30 Q 110 30 90 100 Q 75 160 70 190 Z" fill="url(#brontoPink)"/>
        <!-- Cute Head -->
        <ellipse cx="135" cy="25" rx="20" ry="14" fill="url(#brontoPink)"/>
        <!-- Eye & Flower -->
        <circle cx="140" cy="22" r="5" fill="#221245"/>
        <circle cx="139" cy="20" r="2" fill="#FFFFFF"/>
        <circle cx="120" cy="15" r="4" fill="#FFC928"/>
        <!-- Smile -->
        <path d="M 142 30 Q 148 35 152 30" stroke="#221245" stroke-width="2" fill="none"/>
        <!-- Water ripples around legs -->
        <ellipse cx="40" cy="240" rx="20" ry="6" fill="#FFFFFF" opacity="0.6"/>
        <ellipse cx="90" cy="240" rx="20" ry="6" fill="#FFFFFF" opacity="0.6"/>
      </g>
      <!-- Water Lily Pads -->
      <ellipse cx="60" cy="350" rx="30" ry="10" fill="#4F9A25"/>
      <circle cx="60" cy="345" r="8" fill="#FF5E8E"/>
      <ellipse cx="320" cy="340" rx="35" ry="12" fill="#4F9A25"/>
      <circle cx="320" cy="335" r="10" fill="#FFFFFF"/>
    </svg>`
  },
  ptero_sky: {
    title: 'Pterodáctilo en la Selva Voladora',
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skySun" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38A9E8"/>
          <stop offset="50%" stop-color="#70C5F5"/>
          <stop offset="100%" stop-color="#FFA658"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#skySun)"/>
      <circle cx="200" cy="220" r="60" fill="#FFC928" opacity="0.8"/>
      <!-- Giant Pterodactyl flying -->
      <g transform="translate(60, 80)">
        <!-- Left Wing -->
        <path d="M 140 100 Q 40 30 -20 70 Q 60 120 120 120 Z" fill="#38A9E8" stroke="#0077B6" stroke-width="2"/>
        <!-- Right Wing -->
        <path d="M 140 100 Q 240 30 300 70 Q 220 120 160 120 Z" fill="#38A9E8" stroke="#0077B6" stroke-width="2"/>
        <!-- Body -->
        <ellipse cx="140" cy="110" rx="18" ry="30" fill="#48CAE4"/>
        <ellipse cx="140" cy="115" rx="10" ry="20" fill="#FFE071"/>
        <!-- Head & Crest -->
        <path d="M 140 85 Q 150 40 140 20 Q 130 50 135 85 Z" fill="#FF8A25"/>
        <ellipse cx="140" cy="75" rx="14" ry="12" fill="#48CAE4"/>
        <!-- Long Beak -->
        <polygon points="135,70 145,70 140,110" fill="#FFC928"/>
        <!-- Eyes -->
        <circle cx="133" cy="72" r="4" fill="#221245"/>
        <circle cx="132" cy="70" r="1.5" fill="#FFFFFF"/>
        <circle cx="147" cy="72" r="4" fill="#221245"/>
        <circle cx="146" cy="70" r="1.5" fill="#FFFFFF"/>
      </g>
      <!-- Mountain Peaks below -->
      <polygon points="0,400 100,290 220,400" fill="#2B2D42"/>
      <polygon points="160,400 280,260 400,400" fill="#1D3557"/>
    </svg>`
  },
  volcano_party: {
    title: 'La Gran Fiesta de los Dinosaurios',
    svg: `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="volcSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FF5E8E"/>
          <stop offset="50%" stop-color="#FF8A25"/>
          <stop offset="100%" stop-color="#FFC928"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#volcSky)"/>
      <!-- Friendly Volcano -->
      <polygon points="80,400 180,180 240,180 340,400" fill="#554A6D"/>
      <ellipse cx="210" cy="180" rx="30" ry="10" fill="#FF5E8E"/>
      <!-- Fireworks / Confetti sparkles -->
      <circle cx="210" cy="130" r="6" fill="#FFFFFF"/>
      <circle cx="180" cy="110" r="8" fill="#FFC928"/>
      <circle cx="240" cy="100" r="7" fill="#7AC943"/>
      <circle cx="210" cy="70" r="10" fill="#38A9E8"/>
      <!-- Characters Celebrating -->
      <circle cx="120" cy="330" r="35" fill="#7AC943"/>
      <circle cx="280" cy="330" r="35" fill="#38A9E8"/>
      <polygon points="200,280 215,315 250,318 222,340 230,375 200,355 170,375 178,340 150,318 185,315" fill="#FFC928" stroke="#FF8A25" stroke-width="2"/>
    </svg>`
  }
};

// Math Operation Question Generator
export function generateMathQuestions(type, count = 9) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    let a, b, op, ans, text;
    if (type === 'addition') {
      a = Math.floor(Math.random() * 12) + 1;
      b = Math.floor(Math.random() * 12) + 1;
      op = '+';
      ans = a + b;
      text = `${a} + ${b}`;
    } else if (type === 'subtraction') {
      a = Math.floor(Math.random() * 15) + 5;
      b = Math.floor(Math.random() * a) + 1;
      op = '-';
      ans = a - b;
      text = `${a} - ${b}`;
    } else if (type === 'multiplication_easy') {
      const table = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      b = Math.floor(Math.random() * 10) + 1;
      a = table;
      op = '×';
      ans = a * b;
      text = `${a} × ${b}`;
    } else if (type === 'multiplication_hard') {
      const table = [6, 7, 8, 9][Math.floor(Math.random() * 4)];
      b = Math.floor(Math.random() * 10) + 1;
      a = table;
      op = '×';
      ans = a * b;
      text = `${a} × ${b}`;
    } else { // mixed
      const mode = Math.floor(Math.random() * 3);
      if (mode === 0) {
        a = Math.floor(Math.random() * 25) + 5;
        b = Math.floor(Math.random() * 25) + 5;
        ans = a + b;
        text = `${a} + ${b}`;
      } else if (mode === 1) {
        a = Math.floor(Math.random() * 30) + 10;
        b = Math.floor(Math.random() * a) + 1;
        ans = a - b;
        text = `${a} - ${b}`;
      } else {
        a = Math.floor(Math.random() * 8) + 2;
        b = Math.floor(Math.random() * 9) + 2;
        ans = a * b;
        text = `${a} × ${b}`;
      }
    }

    // Generate 3 fake options
    const options = new Set([ans]);
    while (options.size < 4) {
      const offset = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 5) + 1);
      const fake = Math.max(1, ans + offset);
      options.add(fake);
    }

    questions.push({
      id: i,
      text,
      answer: ans,
      options: Array.from(options).sort(() => Math.random() - 0.5)
    });
  }
  return questions;
}
