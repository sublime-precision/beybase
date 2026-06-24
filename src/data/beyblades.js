export const BEYBLADE_TYPES = ['Attack', 'Defense', 'Stamina', 'Balance'];

export const KNOWN_BLADES = [
  {
    id: 'dranzer', name: 'Dranzer', type: 'Stamina', series: 'X',
    stats: { attack: 5, defense: 5, stamina: 10, burstResistance: 6, spinSpeed: 9 },
    rating: 82,
  },
  {
    id: 'dragoon', name: 'Dragoon', type: 'Attack', series: 'X',
    stats: { attack: 9, defense: 3, stamina: 5, burstResistance: 4, spinSpeed: 8 },
    rating: 72,
  },
  {
    id: 'draciel', name: 'Draciel', type: 'Defense', series: 'X',
    stats: { attack: 3, defense: 10, stamina: 7, burstResistance: 9, spinSpeed: 4 },
    rating: 80,
  },
  {
    id: 'driger', name: 'Driger', type: 'Balance', series: 'X',
    stats: { attack: 7, defense: 7, stamina: 7, burstResistance: 7, spinSpeed: 7 },
    rating: 78,
  },
  {
    id: 'phoenix_wing', name: 'Phoenix Wing', type: 'Attack', series: 'X',
    stats: { attack: 8, defense: 4, stamina: 4, burstResistance: 5, spinSpeed: 9 },
    rating: 74,
  },
  {
    id: 'shark_edge', name: 'Shark Edge', type: 'Attack', series: 'X',
    stats: { attack: 9, defense: 3, stamina: 3, burstResistance: 3, spinSpeed: 10 },
    rating: 70,
  },
  {
    id: 'leon_claw', name: 'Leon Claw', type: 'Defense', series: 'X',
    stats: { attack: 5, defense: 8, stamina: 5, burstResistance: 7, spinSpeed: 5 },
    rating: 72,
  },
  {
    id: 'cobalt_drake', name: 'Cobalt Drake', type: 'Defense', series: 'X',
    stats: { attack: 4, defense: 9, stamina: 6, burstResistance: 8, spinSpeed: 4 },
    rating: 74,
  },
  {
    id: 'hells_hammer', name: "Hell's Hammer", type: 'Stamina', series: 'X',
    stats: { attack: 5, defense: 4, stamina: 9, burstResistance: 5, spinSpeed: 8 },
    rating: 74,
  },
  {
    id: 'wizard_arrow', name: 'Wizard Arrow', type: 'Stamina', series: 'X',
    stats: { attack: 4, defense: 6, stamina: 9, burstResistance: 5, spinSpeed: 9 },
    rating: 76,
  },
  {
    id: 'rhino_horn', name: 'Rhino Horn', type: 'Balance', series: 'X',
    stats: { attack: 6, defense: 7, stamina: 6, burstResistance: 8, spinSpeed: 6 },
    rating: 72,
  },
  {
    id: 'knight_shield', name: 'Knight Shield', type: 'Defense', series: 'X',
    photos: ['/beyblades/knight-shield-top.jpg', '/beyblades/knight-shield-side.jpg'],
    stats: { attack: 4, defense: 9, stamina: 6, burstResistance: 8, spinSpeed: 5 },
    rating: 75,
  },
];

export const KNOWN_RATCHETS = [
  { id: '3_60', name: '3-60', height: 60 },
  { id: '4_80', name: '4-80', height: 80 },
  { id: '5_60', name: '5-60', height: 60 },
  { id: '5_80', name: '5-80', height: 80 },
  { id: '6_60', name: '6-60', height: 60 },
  { id: '9_60', name: '9-60', height: 60 },
];

export const KNOWN_BITS = [
  { id: 'flat',      name: 'Flat',      type: 'Attack',  description: 'Aggressive movement pattern' },
  { id: 'ball',      name: 'Ball',      type: 'Defense', description: 'Stable and defensive' },
  { id: 'point',     name: 'Point',     type: 'Stamina', description: 'High spin endurance' },
  { id: 'gear_flat', name: 'Gear Flat', type: 'Attack',  description: 'Enhanced aggression' },
  { id: 'needle',    name: 'Needle',    type: 'Stamina', description: 'Maximum stamina' },
  { id: 'rush',      name: 'Rush',      type: 'Attack',  description: 'Fast burst attack' },
  { id: 'taper',     name: 'Taper',     type: 'Balance', description: 'Balanced performance' },
  { id: 'unite',     name: 'Unite',     type: 'Balance', description: 'Adaptive movement' },
];

export const TYPE_COLORS = {
  Attack:  '#ef4444',
  Defense: '#3b82f6',
  Stamina: '#22c55e',
  Balance: '#eab308',
};

export const TYPE_BG = {
  Attack:  'bg-red-500/20 text-red-400 border-red-500/30',
  Defense: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Stamina: 'bg-green-500/20 text-green-400 border-green-500/30',
  Balance: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};
