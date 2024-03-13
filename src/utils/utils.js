export const secondsToTime = (seconds) => {
  if (seconds > 0) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    if (hours > 0) {
      return `${hours}:${minutes}:${sec}`;
    }
    return `${minutes}:${sec}`;
  } else {
    return '0:00'
  }
};
export const wave = (audio, canvas) => {
  const ctx = canvas.getContext('2d');
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audio);

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgb(0, 255, 0)';
  ctx.lineWidth = 2;

  function draw() {
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    analyser.getByteTimeDomainData(dataArray);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();

    const sliceWidth = WIDTH * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * HEIGHT / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    requestAnimationFrame(draw);
  }
  audio.addEventListener('play', () => {
    audioContext.resume().then(() => {
      draw();
    });
  });
};

export const shuffle = (array) => {
  let index = [];
  while (index.length < array.length) {
    const random = Math.floor(Math.random() * array.length);
    index.push(random);
    index = Array.from(new Set(index))
  }
  return index.map((item) => array[item])

};
export const moveElement = (event,position, target, array) => {
  event.preventDefault();
  const element = array[target]
  const newArray = array.filter((item)=>item !== element)
  newArray.splice(position, 0 ,element)
  return newArray
}
