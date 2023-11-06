export const toHRPayload = (data: {
  value: {
    name: string;
    date: string;
    prediction: { N: number; S: number; V: number; F: number; Q: number };
    feature: string;
    runtime: number;
    ecgplot: number[];
    annotation: number[][][];
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

export const toECGPayload = (data: number[]) => {
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
