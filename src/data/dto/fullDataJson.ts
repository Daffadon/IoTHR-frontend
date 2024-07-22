interface JsonDatatype {
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
    N: number[];
    S: number[];
    V: number[];
    F: number[];
    Q: number[];
  };
}
