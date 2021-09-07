// Init function takes ID num and sets them as
// options of the dropdown menu
function init() {
    let selector = d3.select("#selDataset");
  
    d3.json("data/samples.json").then((data) => {
    //   console.log(data);
      let sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  });
};
  
// Initialize the selection
init();

// optionChanged function is called in html
function optionChanged(newSample) {
    // console.log(newSample);
    demographicInfo(newSample);
    samplePlots(newSample);
};

// buildMetadata function called in optionChanged
function demographicInfo(sample) {
    d3.json("data/samples.json").then((data) => {
      let demoInfo = data.metadata.filter(sampleObj => sampleObj.id == sample);

      //demoInfo returned like an array =[0]
      let result = demoInfo[0]; 
      let PANEL = d3.select("#sample-metadata");
      
      //Clear panel for the next selection
      PANEL.html("");

      PANEL.append("h6").text(`ID: ${result.id}`);
      PANEL.append("h6").text(`Ethnicity: ${result.ethnicity}`);
      PANEL.append("h6").text(`Gender: ${result.gender}`);
      PANEL.append("h6").text(`Age: ${result.age}`);
      PANEL.append("h6").text(`Location: ${result.location}`);
      PANEL.append("h6").text(`BBtype: ${result.bbtype}`);
      PANEL.append("h6").text(`Washing/week: ${result.wfreq}`);
    });
};