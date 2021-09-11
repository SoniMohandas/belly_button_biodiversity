// Init function takes ID num and sets them as
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
    //   Select the first value sampleNames array
      let newSample = sampleNames[0];
      demographicInfo(newSample);
      samplePlots(newSample);

  });
};

function optionChanged(newSample){
    demographicInfo(newSample);
    samplePlots(newSample);
}
 
// Initialize the selection
init();

// Create function demographicInfo called in function optionChanged
function demographicInfo(nextSample){
    d3.json("data/samples.json").then((data) => {
      let demoInfo = data.metadata.filter(newObj => newObj.id == nextSample);
    //   console.log(demoInfo);
      //demoInfo returned like an array
      let result = demoInfo[0];
    //   Create a panel using html id sample-metadata 
      let panel = d3.select("#sample-metadata");      
      //Clear panel for each selection
      panel.html("");
    // Append metadata keys and values for each selection
    Object.entries(result).forEach(([key, value]) => {
        panel.append("p").html(`<strong>${key}: </strong> ${value}`)
    });
    });
};