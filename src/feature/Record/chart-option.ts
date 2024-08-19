export const setChartLineOption = (selected: TopicProps, featureSelected: PredictionProps) => {
  const dataEcg = selected?.ecg_plot;
  const classificationPin = featureSelected.annotation;
  const optionSeries = [];
  for (const key in classificationPin) {
    const propertyName = key as keyof typeof classificationPin;
    if (propertyName === 'N' || classificationPin[propertyName] === null) {
      continue;
    }
    optionSeries.push({
      type: 'scatter',
      data: [...classificationPin[propertyName]],
      symbol: 'pin',
      symbolSize: 50,
      label: {
        show: true,
        formatter: propertyName,
        position: 'inside',
        fontWeight: ' Bold'
      }
    });
  }
  const seconds = Array.from({ length: dataEcg?.length }, (_, i) => (i / 130).toFixed(3));

  const opt = {
    title: {
      text: 'Heart Rate Graphic',
      left: 'center',
      top: '15  '
    },
    dataZoom: [
      {
        id: 'dataZoomX',
        type: 'inside',
        xAxisIndex: [0],
        filterMode: 'filter'
      },
      {
        id: 'dataZoomY',
        type: 'slider',
        xAxisIndex: [0],
        filterMode: 'filter'
      }
    ],
    xAxis: {
      name: 'Time (s)',
      type: 'category',
      data: seconds
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: dataEcg,
        type: 'line'
      },
      ...optionSeries
    ],
    animation: true
  };
  return opt;
};

export const setChartBarOption = (selected: PredictionProps | undefined) => {
  const prediction = selected?.prediction;
  const data = [];
  const keyData = [];

  for (const key in prediction) {
    const property = key as keyof typeof prediction;
    data.push(prediction[property]);
    keyData.push(property);
  }

  const option = {
    title: {
      text: 'Heart Rate Bar Graphic',
      left: 'center',
      top: '15  '
    },
    xAxis: {
      type: 'category',
      data: keyData
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        data: data,
        type: 'bar'
      }
    ]
  };
  return option;
};

export const setPlotOption = (data: number[] | number[][], nama: string) => {
  const index = Array.from({ length: data.length }, (_, i) => i);

  const option = {
    title: {
      text: nama,
      left: 'center',
      bottom: '15  '
    },
    xAxis: {
      type: 'category',
      data: index
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data,
        type: 'line'
      }
    ]
  };
  return option;
};
