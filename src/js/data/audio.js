const defaultVolume = 0.1;
const highVolume = 0.5;
export const audio = {
  map: new Howl({
    src: './../../assets/audio/map.wav',
    html5: true,
    volume: defaultVolume,
  }),
  initBattle: new Howl({
    src: './../../assets/audio/initBattle.wav',
    html5: true,
    volume: defaultVolume,
  }),
  battle: new Howl({
    src: './../../assets/audio/battle.mp3',
    html5: true,
    volume: defaultVolume,
  }),
  tackleHit: new Howl({
    src: './../../assets/audio/tackleHit.wav',
    html5: true,
    volume: defaultVolume,
  }),
  fireballHit: new Howl({
    src: './../../assets/audio/fireballHit.wav',
    html5: true,
    volume: defaultVolume,
  }),
  initFireball: new Howl({
    src: './../../assets/audio/initFireball.wav',
    html5: true,
    volume: defaultVolume,
  }),
  victory: new Howl({
    src: './../../assets/audio/victory.wav',
    html5: true,
    volume: highVolume,
  }),
};
