/**
 * KidGenius Characters & Mascot Database
 * Authentic mascots from the KidGenius Club universe
 */

export const CHARACTERS = [
  {
    id: 'geni',
    name: 'Geni Estrella',
    title: 'Compañero KidGenius Club',
    emoji: '🌟',
    badge: '✨',
    color: '#7AC943',
    themeColor: 'from-[#35206F] via-[#4B2C99] to-[#7AC943]',
    accentColor: '#FFC928',
    avatarSvg: `<svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md">
      <defs>
        <radialGradient id="geniGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF275"/>
          <stop offset="60%" stop-color="#FFC928"/>
          <stop offset="100%" stop-color="#FF8A25"/>
        </radialGradient>
      </defs>
      <!-- Star Body -->
      <polygon points="60,10 75,45 112,48 83,72 92,108 60,88 28,108 37,72 8,48 45,45" fill="url(#geniGlow)" stroke="#FF8A25" stroke-width="3"/>
      <!-- Cheeks -->
      <circle cx="42" cy="65" r="7" fill="#FF5E8E" opacity="0.6"/>
      <circle cx="78" cy="65" r="7" fill="#FF5E8E" opacity="0.6"/>
      <!-- Eyes -->
      <ellipse cx="48" cy="55" rx="5" ry="7" fill="#221245"/>
      <ellipse cx="72" cy="55" rx="5" ry="7" fill="#221245"/>
      <circle cx="46" cy="52" r="2.5" fill="#FFFFFF"/>
      <circle cx="70" cy="52" r="2.5" fill="#FFFFFF"/>
      <!-- Smile -->
      <path d="M 48 68 Q 60 80 72 68" fill="none" stroke="#221245" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Magic Sparkle Top -->
      <polygon points="60,2 62,7 67,8 63,11 64,16 60,13 56,16 57,11 53,8 58,7" fill="#FFFFFF"/>
    </svg>`,
    greeting: '¡Hola! Soy Geni, tu compañero de aventuras en KidGenius Club. ¡Armemos juntos los mejores rompecabezas jurásicos!',
    victory: '¡Qué gran triunfo! ¡Eres una verdadera estrella brillante de KidGenius Club!'
  },
  {
    id: 'dinosaurio',
    name: 'Dino Aventurero',
    title: 'Explorador Prehistórico',
    emoji: '🦖',
    badge: '🌴',
    color: '#38A9E8',
    themeColor: 'from-[#35206F] via-[#38A9E8] to-[#7AC943]',
    accentColor: '#7AC943',
    avatarSvg: `<svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="dinoBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#48CAE4"/>
          <stop offset="100%" stop-color="#0077B6"/>
        </linearGradient>
      </defs>
      <!-- Dino Head -->
      <path d="M 30 70 C 25 35 60 20 85 28 C 105 35 110 65 95 85 C 85 98 45 100 30 70 Z" fill="url(#dinoBody)" stroke="#023E8A" stroke-width="3"/>
      <!-- Spikes -->
      <polygon points="35,32 42,22 48,30" fill="#FFC928"/>
      <polygon points="50,24 58,15 65,25" fill="#FFC928"/>
      <polygon points="68,22 76,14 82,24" fill="#FFC928"/>
      <!-- Cheek -->
      <circle cx="55" cy="72" r="7" fill="#FF5E8E" opacity="0.5"/>
      <!-- Big Eye -->
      <ellipse cx="65" cy="48" rx="8" ry="10" fill="#FFFFFF"/>
      <ellipse cx="67" cy="48" rx="5" ry="7" fill="#023E8A"/>
      <circle cx="65" cy="45" r="2.5" fill="#FFFFFF"/>
      <!-- Snout & Teeth -->
      <path d="M 85 68 Q 98 70 95 80 Q 75 88 65 80" fill="#0077B6"/>
      <polygon points="82,75 86,70 89,75" fill="#FFFFFF"/>
      <polygon points="74,77 78,72 81,77" fill="#FFFFFF"/>
      <!-- Explorer Hat -->
      <ellipse cx="55" cy="24" rx="26" ry="6" fill="#D4A373"/>
      <path d="M 40 24 C 40 12 70 12 70 24 Z" fill="#CCD5AE"/>
    </svg>`,
    greeting: '¡Hola explorador! Soy Dino Aventurero. ¡Prepárate para una expedición de rompecabezas y fósiles mágicos!',
    victory: '¡Increíble expedición! ¡Has resuelto el reto como un auténtico líder de dinosaurios!'
  },
  {
    id: 'dinosauria',
    name: 'Dinosauria Aventurera',
    title: 'Científica del Valle',
    emoji: '🦕',
    badge: '🌸',
    color: '#FF8A25',
    themeColor: 'from-[#4B2C99] via-[#FF8A25] to-[#FFC928]',
    accentColor: '#FF5E8E',
    avatarSvg: `<svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="dinoPink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFAAA6"/>
          <stop offset="100%" stop-color="#FF5E8E"/>
        </linearGradient>
      </defs>
      <!-- Long neck dino head -->
      <path d="M 35 95 C 30 65 50 35 75 35 C 95 35 105 55 95 75 C 85 92 55 105 35 95 Z" fill="url(#dinoPink)" stroke="#D82F63" stroke-width="3"/>
      <!-- Cute Flower -->
      <circle cx="75" cy="24" r="5" fill="#FFC928"/>
      <circle cx="70" cy="20" r="4" fill="#FFFFFF"/>
      <circle cx="80" cy="20" r="4" fill="#FFFFFF"/>
      <circle cx="75" cy="15" r="4" fill="#FFFFFF"/>
      <circle cx="70" cy="28" r="4" fill="#FFFFFF"/>
      <circle cx="80" cy="28" r="4" fill="#FFFFFF"/>
      <!-- Cheek -->
      <circle cx="62" cy="72" r="7" fill="#FFA658" opacity="0.6"/>
      <!-- Big Cute Eyes -->
      <ellipse cx="74" cy="52" rx="7" ry="9" fill="#FFFFFF"/>
      <ellipse cx="76" cy="52" rx="4.5" ry="6" fill="#35206F"/>
      <circle cx="74" cy="49" r="2.2" fill="#FFFFFF"/>
      <!-- Eyelashes -->
      <path d="M 70 44 L 66 40 M 76 43 L 76 38 M 81 45 L 86 42" stroke="#35206F" stroke-width="2" stroke-linecap="round"/>
      <!-- Smile -->
      <path d="M 68 76 Q 80 85 90 75" fill="none" stroke="#35206F" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    greeting: '¡Hola, súper genio! Te doy la bienvenida a los retos de agilidad mental. ¡Vamos a descubrir dinosaurios!',
    victory: '¡Hermoso trabajo! ¡Tu memoria y rapidez mental son increíbles!'
  },
  {
    id: 'rexy',
    name: 'Rexy el Campeón',
    title: 'Guardián del Volcán',
    emoji: '🦖',
    badge: '🌋',
    color: '#7AC943',
    themeColor: 'from-[#35206F] via-[#4F9A25] to-[#7AC943]',
    accentColor: '#FF8A25',
    avatarSvg: `<svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="rexyGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#98E062"/>
          <stop offset="100%" stop-color="#4F9A25"/>
        </linearGradient>
      </defs>
      <!-- Big Rexy Head -->
      <path d="M 25 65 C 25 30 65 20 90 30 C 110 38 110 70 95 90 C 75 105 35 95 25 65 Z" fill="url(#rexyGreen)" stroke="#2B6B10" stroke-width="3"/>
      <!-- Volcano Spikes -->
      <polygon points="40,28 47,15 54,26" fill="#FF8A25"/>
      <polygon points="58,22 66,10 74,22" fill="#FF8A25"/>
      <polygon points="78,24 85,14 91,26" fill="#FF8A25"/>
      <!-- Shiny Eyes -->
      <ellipse cx="68" cy="48" rx="8" ry="9" fill="#FFFFFF"/>
      <ellipse cx="70" cy="48" rx="5" ry="6" fill="#221245"/>
      <circle cx="68" cy="45" r="2.5" fill="#FFFFFF"/>
      <!-- Friendly Big Mouth -->
      <path d="M 55 78 Q 78 92 100 78" fill="none" stroke="#221245" stroke-width="3.5" stroke-linecap="round"/>
      <polygon points="68,78 72,83 76,78" fill="#FFFFFF"/>
      <polygon points="80,79 84,85 88,79" fill="#FFFFFF"/>
      <!-- Champion Crown -->
      <polygon points="50,16 57,2 65,12 73,2 80,16" fill="#FFC928" stroke="#D9A00A" stroke-width="1.5"/>
    </svg>`,
    greeting: '¡Roar de victoria! Soy Rexy el Campeón. ¡Acepta mis desafíos y gana la Corona de Fósiles!',
    victory: '¡ROAR! ¡Eres invencible! ¡Has conquistado el mundo jurásico!'
  },
  {
    id: 'tricy',
    name: 'Tricy el Sabio',
    title: 'Estratega Prehistórico',
    emoji: '🌿',
    badge: '💎',
    color: '#38A9E8',
    themeColor: 'from-[#35206F] via-[#38A9E8] to-[#98E062]',
    accentColor: '#38A9E8',
    avatarSvg: `<svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="tricyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#70C5F5"/>
          <stop offset="100%" stop-color="#2B78C5"/>
        </linearGradient>
      </defs>
      <!-- Triceratops Shield Frill -->
      <path d="M 20 50 C 20 15 100 15 100 50 C 100 70 85 80 85 80 L 35 80 Z" fill="#FFC928" stroke="#D4A373" stroke-width="3"/>
      <!-- 3 Horns -->
      <polygon points="25,35 15,18 35,28" fill="#FFFFFF" stroke="#D4A373" stroke-width="1.5"/>
      <polygon points="95,35 105,18 85,28" fill="#FFFFFF" stroke="#D4A373" stroke-width="1.5"/>
      <polygon points="55,42 60,25 65,42" fill="#FFFFFF" stroke="#D4A373" stroke-width="1.5"/>
      <!-- Face -->
      <circle cx="60" cy="65" r="30" fill="url(#tricyBlue)" stroke="#1D4E89" stroke-width="3"/>
      <!-- Smart Glasses -->
      <circle cx="48" cy="62" r="10" fill="none" stroke="#221245" stroke-width="2.5"/>
      <circle cx="72" cy="62" r="10" fill="none" stroke="#221245" stroke-width="2.5"/>
      <line x1="58" y1="62" x2="62" y2="62" stroke="#221245" stroke-width="2.5"/>
      <!-- Eyes inside glasses -->
      <circle cx="48" cy="62" r="4" fill="#221245"/>
      <circle cx="72" cy="62" r="4" fill="#221245"/>
      <circle cx="46" cy="60" r="1.5" fill="#FFFFFF"/>
      <circle cx="70" cy="60" r="1.5" fill="#FFFFFF"/>
      <!-- Smile -->
      <path d="M 52 80 Q 60 86 68 80" fill="none" stroke="#221245" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    greeting: '¡Hola! Soy Tricy el Sabio. Usar la lógica y pensar paso a paso es la mejor estrategia para ganar.',
    victory: '¡Brillante deducción! Tu inteligencia prehistórica es legendaria.'
  }
];
