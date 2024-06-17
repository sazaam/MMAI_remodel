

$(window).load(function () {
  
  new Chartist.Line('.ct-chart', {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    series: [[12, 9, 100, 8, 5]]
  }, {
    fullWidth: true,
    chartPadding: {
      right: 40
    }
  });
  
});
