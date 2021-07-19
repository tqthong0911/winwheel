let wheelSpinning = false;
let currentStep = 0;
let indexHardResult = 0;
const common = {
  textFontSize: 13,
  textMargin: 0,
  textOrientation: "curved",
  textAlignment: "center",
  textAligment: "center",
  animation: {
    type: "spinToStop",
    duration: 5,
    spins: 15,
    callbackFinished,
  },
};

const configs = [
  {
    ...common,
    id: 1,
    numSegments: 7,
    rotationAngle: -45,
    innerRadius: 84,
    outerRadius: 40,
    segments: [
      { fillStyle: "#eae56f", text: "QUAY\nTIẾP", value: -1, size: 90 },
      { fillStyle: "#7de6ef", text: "x0.5", value: 0.5 },
      { fillStyle: "#e7706f", text: "0", value: 0 },
      { fillStyle: "#eae56f", text: "x1", value: 1 },
      { fillStyle: "#cc3333", text: "x1.5", value: 1.5 },
      { fillStyle: "#7de6ef", text: "x0.5", value: 0.5 },
      { fillStyle: "#e7706f", text: "0", value: 0 },
    ],
    pins: {
      number: 7,
      responsive: true,
      fillStyle: "#FFEDBE",
      margin: -47,
    },
  },
  {
    ...common,
    id: 2,
    numSegments: 9,
    rotationAngle: 0,
    innerRadius: 124,
    outerRadius: 84,
    segments: [
      { fillStyle: "#eae56f", text: "0", value: 0 },
      { fillStyle: "#89f26e", text: "x2", value: 2 },
      { fillStyle: "#7de6ef", text: "QUAY\nTIẾP", value: -1 },
      { fillStyle: "#e7706f", text: "x1.5", value: 1.5 },
      { fillStyle: "#eae56f", text: "x7", value: 7 },
      { fillStyle: "#89f26e", text: "x2", value: 2 },
      { fillStyle: "#7de6ef", text: "x2", value: 2 },
      { fillStyle: "#e7706f", text: "x5", value: 5 },
      { fillStyle: "#e7706f", text: "x1.5", value: 1.5 },
    ],
    pins: {
      number: 9,
      responsive: true,
      fillStyle: "#FFEDBE",
      margin: -42,
    },
  },
  {
    ...common,
    id: 3,
    numSegments: 9,
    rotationAngle: -45,
    innerRadius: 160,
    outerRadius: 124,
    segments: [
      { fillStyle: "#eae56f", text: "0", value: 0 },
      { fillStyle: "#89f26e", text: "x2", value: 2 },
      { fillStyle: "#7de6ef", text: "Nổ hũ", size: 90, value: 35 },
      { fillStyle: "#e7706f", text: "x1.5", value: 1.5 },
      { fillStyle: "#eae56f", text: "x7", value: 7 },
      { fillStyle: "#89f26e", text: "x2", value: 2 },
      { fillStyle: "#7de6ef", text: "x2", value: 2 },
      { fillStyle: "#e7706f", text: "x5", value: 5 },
      { fillStyle: "#e7706f", text: "x1.5", value: 1.5 },
    ],
    pins: {
      number: 9,
      responsive: true,
      fillStyle: "#FFEDBE",
      margin: -38,
    },
  },
];

function getWheelList(configs) {
  return configs.map(({ id, segments, ...rest }, index) => {
    const defaultSize = getDefaultSize(segments);
    const _segments = segments.reduce(
      (prev, { size, ...segmentRest }, indexSegment) => {
        const _size = size || defaultSize;
        const isFirstItem = indexSegment === 0;

        return [
          ...prev,
          {
            size,
            stopValue: isFirstItem
              ? _size
              : prev[indexSegment - 1].stopValue + _size,
            ...segmentRest,
          },
        ];
      },
      []
    );
    let theWheel = new Winwheel({
      canvasId: `canvas${id}`,
      segments: _segments,
      ...rest,
    });

    function stopAngle() {
      const indexHardResult = HARD_RESULT[indexHardResult][currentStep];
      const start = _segments[indexHardResult - 1]?.stopValue
        ? _segments[indexHardResult - 1]?.stopValue + 1
        : 0;
      const stop = _segments[indexHardResult].stopValue;
      const stopAt = Math.random() * (stop - start) + start;
      theWheel.animation.stopAngle = stopAt;
    }

    return { theWheel, stopAngle };
  });
}

const wheelList = getWheelList(configs);

function resetAll() {
  wheelList.map(({ theWheel }) => {
    const { rotationAngle } = configs[currentStep];

    theWheel.canvas.classList.remove("active");
    theWheel.stopAnimation(false);
    theWheel.rotationAngle = rotationAngle % 360;
    theWheel.draw();
    wheelSpinning = false;
  });
}

function callbackFinished(indicatedSegment) {
  const isNextSpin = indicatedSegment.value < 0;

  if (!isNextSpin) {
    const valueSuccess = getYourBet() * indicatedSegment.value;
    setYourCash(valueSuccess + getYourCash());
    alert("Chúc mừng bạn trúng: " + valueSuccess);
    // set next hardResult
    indexHardResult++;
    indexHardResult = indexHardResult % HARD_RESULT.length;
    // reset currentStep
    currentStep = 0;
    resetAll();
    return;
  }
  resetWheel();
  currentStep++;
  currentStep = currentStep % configs.length;
  // set next hardResult when finish cycle
  indexHardResult += currentStep === 0 ? 1 : 0;
}

function startSpin() {
  if (wheelSpinning === false) {
    const { stopAngle, theWheel } = wheelList[currentStep];
    theWheel.canvas.classList.add("active");
    stopAngle();
    theWheel.startAnimation();
    wheelSpinning = true;
  }
}

function resetWheel() {
  const { theWheel } = wheelList[currentStep];
  theWheel.stopAnimation(false);
  theWheel.draw();
  wheelSpinning = false;
}
