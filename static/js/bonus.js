// Bar and Bubble charts
// Create the buildCharts function.
function samplePlots(sample) {
    // Use d3.json to load and retrieve the samples.json file 
    d3.json("data/samples.json").then((data) => {
    //   console.log(data);
      // Create a variable that holds the samples array. 
      let sampleArray = data.samples.filter(obj => obj.id == sample);
      // Create a variable that holds the first sample in the array.
      let result = sampleArray[0];
      // Create variables that hold the otu_ids, otu_labels, and sample_values.
      let otuIDs = result.otu_ids;
      let otuLabels = result.otu_labels;
      let sampleValues = result.sample_values; 
      // Create a variable that filters the metadata array 
      let metaArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
      // Create a variable that holds the first sample in the metadata array
      let metaResult = metaArray[0];
      // Create a variable that holds the washing frequency
      let washingFreq = parseInt(metaResult.wfreq);
   
      // Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
  
      let yticks = otuIDs.slice(0,10).reverse().map(function (elem) {return `OTU ${elem}`});
      let xticks = sampleValues.slice(0,10).reverse();
      let labels = otuLabels.slice(0,10).reverse();
  
      // Create the trace for the bar chart. 
      let barTrace = {
        x: xticks,
        y: yticks,
        type: 'bar',
        orientation: 'h',
        text: labels,
        marker: {
            color: "#9FE2BF"
        }
      };
      // Create the layout for the bar chart. 
      let barLayout = {
       title: "Top 10 Bacteria Cultures Found",
      };
      // Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", [barTrace], barLayout);
  
      // Create the trace for the bubble chart.
      let bubbleTrace = {
        x: otuIDs,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: otuIDs
        }
      };
      
      // Create the layout for the bubble chart.
      let bubbleLayout = {
        height: 700,
        title: "Bacteria Cultures Per Sample",
        xaxis: {title: "OTU ID"},
        showlegend: false
      };
      
      // Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);   
  
      // Gauge chart
      let gaugeTrace = {
        value: washingFreq,
        title: {text: "Belly Button Washing Frequency<br>Scrubs per Week"},
        type: "indicator",
        delt: {reference: 380},
        mode: "gauge+number+delta",
        gauge: {
          axis: {range: [0,10]},
          steps: [
            {range: [0,2], color:"#c1c63d"},
            {range: [2,4], color:"#9FE2BF"},
            {range: [4,6], color:"#DAF7A6"},
            {range: [6,8], color:"#AF7AC5"},
            {range: [8,10], color:"#A3E4D7"}
          ]
        }
      };
  
      let gaugeLayout = {
        width: 500, height: 450, margin: {t: 0, b: 0}
      };
  
      Plotly.newPlot("gauge", [gaugeTrace], gaugeLayout);
  
    });
};