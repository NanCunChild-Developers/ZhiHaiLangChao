import ChartBase from "@/app/operation/analyze/nav1/charts/ChartBase";

const LinerChart: React.FC<{}> = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  };
  return <ChartBase label={"折线图"} options={option}/>
};

export {LinerChart}