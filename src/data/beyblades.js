export const BEYBLADE_TYPES = ['Attack', 'Defense', 'Stamina', 'Balance'];

export const KNOWN_BLADES = [
  { id: 'dranzer', name: 'Dranzer', type: 'Stamina', series: 'X' },
  { id: 'dragoon', name: 'Dragoon', type: 'Attack', series: 'X' },
  { id: 'draciel', name: 'Draciel', type: 'Defense', series: 'X' },
  { id: 'driger', name: 'Driger', type: 'Balance', series: 'X' },
  { id: 'phoenix_wing', name: 'Phoenix Wing', type: 'Attack', series: 'X' },
  { id: 'shark_edge', name: 'Shark Edge', type: 'Attack', series: 'X' },
  { id: 'leon_claw', name: 'Leon Claw', type: 'Defense', series: 'X' },
  { id: 'cobalt_drake', name: 'Cobalt Drake', type: 'Defense', series: 'X' },
  { id: 'hells_hammer', name: "Hell's Hammer", type: 'Stamina', series: 'X' },
  { id: 'wizard_arrow', name: 'Wizard Arrow', type: 'Stamina', series: 'X' },
  { id: 'rhino_horn', name: 'Rhino Horn', type: 'Balance', series: 'X' },
  { id: 'knight_shield', name: 'Knight Shield', type: 'Defense', series: 'X', photos: ['/beyblades/knight-shield-top.jpg', '/beyblades/knight-shield-side.jpg'] },
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
  { id: 'flat', name: 'Flat', type: 'Attack', description: 'Aggressive movement pattern' },
  { id: 'ball', name: 'Ball', type: 'Defense', description: 'Stable and defensive' },
  { id: 'point', name: 'Point', type: 'Stamina', description: 'High spin endurance' },
  { id: 'gear_flat', name: 'Gear Flat', type: 'Attack', description: 'Enhanced aggression' },
  { id: 'needle', name: 'Needle', type: 'Stamina', description: 'Maximum stamina' },
  { id: 'rush', name: 'Rush', type: 'Attack', description: 'Fast burst attack' },
  { id: 'taper', name: 'Taper', type: 'Balance', description: 'Balanced performance' },
  { id: 'unite', name: 'Unite', type: 'Balance', description: 'Adaptive movement' },
];

export const TYPE_COLORS = {
  Attack: 'red',
  Defense: 'blue',
  Stamina: 'green',
  Balance: 'yellow',
};

export const TYPE_BG = {
  Attack: 'bg-red-500/20 text-red-400 border-red-500/30',
  Defense: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Stamina: 'bg-green-500/20 text-green-400 border-green-500/30',
  Balance: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};
