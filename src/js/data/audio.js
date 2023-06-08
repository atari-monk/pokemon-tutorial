const defaultVolume = 0.1;
const highVolume = 0.5;
const prod = 'https://atari-monk.github.io/pokemon-tutorial/assets/audio/';
const local = './../../assets/audio/';
const isProd = true;
const host = isProd ? prod : local;
export const audio = {
  map: new Howl({
    src: host + 'map.wav',
    html5: true,
    volume: defaultVolume,
  }),
  initBattle: new Howl({
    src: host + 'initBattle.wav',
    html5: true,
    volume: defaultVolume,
  }),
  battle: new Howl({
    src: host + 'battle.mp3',
    html5: true,
    volume: defaultVolume,
  }),
  tackleHit: new Howl({
    src: host + 'tackleHit.wav',
    html5: true,
    volume: defaultVolume,
  }),
  fireballHit: new Howl({
    src: host + 'fireballHit.wav',
    html5: true,
    volume: defaultVolume,
  }),
  initFireball: new Howl({
    src: host + 'initFireball.wav',
    html5: true,
    volume: defaultVolume,
  }),
  victory: new Howl({
    src: host + 'victory.wav',
    html5: true,
    volume: highVolume,
  }),
};
