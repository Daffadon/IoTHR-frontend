export const toHRPayload = (data: {
  value: {
    name: string;
    date: string;
    prediction: { N: number; S: number; V: number; F: number; Q: number };
    feature: string;
    runtime: number;
    ecgplot: number[];
    annotation: {
      N: never[] | number[][];
      S: never[] | number[][];
      V: never[] | number[][];
      F: never[] | number[][];
      Q: never[] | number[][];
    };
    sample_plot: {
      N: number[] | number[][];
      S: number[] | number[][];
      V: number[] | number[][];
      F: number[] | number[][];
      Q: number[] | number[][];
    };
  };
  label: string;
}) => {
  let payload = [];
  for (let i = 0; i < data?.value?.ecgplot.length; i++) {
    const obj = {
      pulse: data.value.ecgplot[i]
    };
    payload.push(obj);
  }
  return payload;
};

export const toECGPayload = (data: number[] | number[][]) => {
  let payload = [];
  for (let i = 0; i < data.length; i++) {
    const obj = {
      pulse: data[i]
    };
    payload.push(obj);
  }
  return payload;
};

interface PredictionData {
  F: number;
  N: number;
  Q: number;
  S: number;
  V: number;
}
export const toPredictionValue = (data: PredictionData) => {
  const payload = [];

  for (const key in data) {
    const propertyName = key as keyof PredictionData;
    payload.push({
      name: propertyName,
      value: data[propertyName]
    });
  }
  return payload;
};
