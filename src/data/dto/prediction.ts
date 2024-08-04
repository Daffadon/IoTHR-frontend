interface TopicProps {
  name: string;
  date: string;
  ecgplot: number[];
  recordTime: string;
}

interface SamplePlotProps {
  N: number[];
  S: number[];
  V: number[];
  F: number[];
  Q: number[];
}

interface SelectionOption {
  value: string;
  label: string;
}

interface PredictionOptionProps extends SelectionOption {}
interface PredictionProps {
  inferenceTime: number;
  prediction: { N: number; S: number; V: number; F: number; Q: number };
  feature: string;
  annotation: {
    N: never[] | number[][];
    S: never[] | number[][];
    V: never[] | number[][];
    F: never[] | number[][];
    Q: never[] | number[][];
  };
  sample_plot: {
    N: number[];
    S: number[];
    V: number[];
    F: number[];
    Q: number[];
  };
}

interface PredictionOptionListProps {
  predictionId: string;
  feature: string;
}
