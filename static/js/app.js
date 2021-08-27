var socData;
// function init() {
// d3.json("/api/all").then(data =>{
//   socData = data
//   var names = data.names
//   var selDataset = d3.select("#selDataset");
//   names.forEach(n=>{
//     selDataset.append("option").property("value", n).text(n)
//   })
//   buildCharts()
// });
// }
function buildCharts() {
    // var selected = d3.select("#selDataset").property("value");
    // var metadata = bbData.metadata.filter(obj => obj.id == selected)[0];
    // var samples = bbData.samples.filter(obj => obj.id == selected)[0];
    // var demo = d3.select("#sample-metadata")
    // demo.html("")
    // Object.entries(metadata).forEach(([key,value])=>{
    //   demo.append("p").html(`<b>${key}:</b> ${value}`)
    // });
    // var {otu_ids, sample_values, otu_labels} = samples
    var barData = [{
      x:socData.num_tickets.slice(0, 10).reverse(),
      y:socData.tickets_closed_by.slice(0, 10).reverse().map(x=>`ID ${x}`),
      text:socData.tickets_closed_by.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    }];
    var barLayout = {
      title: "Top 10 Events by Type and Severity",
      margin: { t: 30, l: 150 }
    } 
    var config = {
      responive: true
    }
    Plotly.newPlot("bar", barData, barLayout, config)
    var bubbleLayout = {
      title: "Ticket Distribution",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "Analyst",
      tickmode:"array",
      tickvals:[...Array(socData.tickets_closed_by.length).keys()],
      ticktext:socData.tickets_closed_by
    },
      margin: { t: 30 }
    }
    var bubbleData = [
    {
      x: [...Array(socData.tickets_closed_by.length).keys()],
      y: socData.num_tickets ,
      text: socData.tickets_closed_by ,
      mode: "markers",
      marker: {
        size: socData.num_tickets,
        color: [...Array(socData.tickets_closed_by.length).keys()],
        colorscale: [
          ['0.0', 'rgb(165,0,38)'],
          ['0.111111111111', 'rgb(215,48,39)'],
          ['0.222222222222', 'rgb(244,109,67)'],
          ['0.333333333333', 'rgb(253,174,97)'],
          ['0.444444444444', 'rgb(254,224,144)'],
          ['0.555555555556', 'rgb(224,243,248)'],
          ['0.666666666667', 'rgb(171,217,233)'],
          ['0.777777777778', 'rgb(116,173,209)'],
          ['0.888888888889', 'rgb(69,117,180)'],
          ['1.0', 'rgb(49,54,149)']
        ]
      }
    }  
  ];
    Plotly.newPlot ("bubble", bubbleData, bubbleLayout);
  };
  
  function init() {
  var selector = d3.select("#selDataset");
  d3.json("/api/all").then((data) =>{
    var sampleNames = data.names;
    socData = data
    // sampleNames.forEach((sample) => {
    //   selector
    //     .append("option")
    //     .text(sample)
    //     .property("value");
    // });  
    // var firstSample =sampleNames[0];
    buildCharts();
    //buildMetadata(firstSample);  
    console.log(socData)
  })
  }
  function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  init()
