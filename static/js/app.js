// Init function takes IDs and sets them as
// options of the dropdown menu
function init(){
    let selector = d3.select("#selDataset");
  
    d3.json("data/samples.json").then((data) => {
      //   console.log(data);
      let sampleNames = data.names;
      sampleNames.forEach((sample) => {
          selector.append("option")
          .text(sample)
          .property("value", sample);
      });
  });
};
  
// Initialize the selection
init();

// Create function optionChanged called in html
function optionChanged(newSample) {
    // console.log(newSample);
    // Filter data.metadata where sample object equals new sample
    d3.json("data/samples.json").then((data) => {
      let demoInfo = data.metadata.filter(sampleObj => sampleObj.id == newSample);
      //   console.log(demoInfo);
      //demoInfo returned like an array
      let result = demoInfo[0];
      //   Create a panel using html id sample-metadata 
      let PANEL = d3.select("#sample-metadata");
      
      //Clear panel for each selection
      PANEL.html("");
      // Append metadata keys and values for each selection
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("p").html(`<strong>${key}: </strong> ${value}`)
    });
    });
    samplePlots(newSample);
};