d3.json("data/samples.json").then(data=>{
    console.log(data);
    let ids = data.names;
    let dropdown = de.select("#selDataset");
    ids.forEach(id=>{
        dropdown.append("option").text(id)
    })
    let selected_id = 940;
    let metadata = data.metadata.filter(subject=>subject.id[0] == selected_id);
    console.log("The metadata for 940 is: ", metadata);
    // Demographic Info
    meta_div = d3.select("#sample-metadata")
    meta_div.html("");
    // console.log(meta_div.text())
    // meta_div.append("p").text("does this work ?")
    Object.entries(metadata).forEach(([key, value]) => {
        meta_div.append("p").html(`<strong>${key}: </strong> ${value}`)
    })
    // Horizontal bar chart
    let samples = samples.filter(subject => subject.id == selected_id[0]);
    console.log(samples);

});

function optionChanged({
    

        
})
function selectData(id){
    metadata = data.metadata.filter(subject => subject.id == id)[0];
    samples = data.samples.filter(subject => subject.id == id)[0];
    return{
        metadata: metadata,
        samples: samples
    }
}


function refreshCharts(){
    let selected_id = d3.select("#selDataset").text();
}
    function bar_init(samples){
        let x = ;
        let y=  ;
        let trace = {
            x: samples.sample_valuesslice(0,10).reverse(),
            y: samples.otu_ids.slice(0,10).reverse().map(id=>`OTU ${id}`),
            type: "bar",
            orientation: "h"

        };
        traceData = [trace];
        Plotly.newPlot("bar", traceData);
    };

    function bubble_plot_init(samples){
        let trace = {
            x: samplePlots.otu_ids,
            y: samples.sample_values,
            size: samples.sample_values,
            text: samples.otu_labels,
            mode: "markers",
            markers: {
                size: samples.sample_values.map(value => value/2),
                color: samples.otu_ids,
                colorscale: ""
            }
        }
        let traceData = [trace];
        Plotly.newPlot("bubble", traceData)
    }
    