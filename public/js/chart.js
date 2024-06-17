
$(window).load(function(){

  const ctx = document.getElementById('myChart');

  console.log(ctx)

  new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: "price",
        data: [{ x: "2024-06-13", y: 20 }, { x: "2024-06-14", y: 20 }, { x: "2024-06-15", y: 20 }, { x: "2024-06-16", y: 20 }, { x: "2024-06-17", y: 20 }, { x: "2024-06-18", y: 20 }, { x: "2024-06-18-20:22", y: 550 }] //data: [{x: '2016-12-25', y: 20}, {x: '2016-12-26', y: 10}]
      }]
    },
    // options: {
    //   scales: {
    //     y: {
    //       title: {
    //         display: true,
    //         text: "USD",

    //       }
    //     }
    //   }
    // }
  });
})
