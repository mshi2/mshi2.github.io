function vis(sample){
    // Read in json file
    d3.json("samples.json").then(function(BBData) {
        console.log(BBData);
        //filter samples by ID
        filteredsamples = BBData.samples.filter(sample => sample.id);
        console.log(filteredsamples);
        //create variable for OTUID
        var fotuID = filteredsamples[0].otu_ids;
        // console.log(otuID);
        //create variable for top ten OTUs using slice
        var ten_otu = filteredsamples[0].otu_ids.slice(0,10).reverse();
        // console.log(ten_otu);
        //create variable for sample values of ten_otu
        var otuvalues = filteredsamples[0].sample_values.slice(0,10).reverse();
        // console.log(otuvalues);
        //create variable for outlabel
        var labelotu = filteredsamples[0].otu_labels.slice(0,10).reverse();
        // console.log(labelotu);
    
      // Bar chart
        var BBplot1 = {
        x: otuvalues,
        y: ten_otu.map(fotuID => `OTU ${fotuID}`),
        text: labelotu,
        type: "bar",
        orientation: "h"
        };
        //data array
        var data1 = [BBplot1];
        //layout
        var layout = {
            title: "Top 10 OTUs",
            
          };
    
        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", data1, layout);
        
        //Bubble plot
        var otu_ids = BBData.samples[0].otu_ids;
        var sample_values = BBData.samples[0].sample_values;
        otu_labels = BBData.samples[0].otu_labels
        var BBplot2 = {
          x: otu_ids,
          y: sample_values,
          marker_size : sample_values,
          mode: "markers",
          text: otu_labels, 
          marker:{
            color: otu_ids,
            size: sample_values
          }
        }; 
      
        //data array
        var data2 = [BBplot2];
        //layout
        var layout2 = {
          title: "OTUs in patients",
          xaxis: {title: "OTU ID"},
          yaxis: {title: "Sample values"}
        };
        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bubble", data2, layout2);
      });  
    } 
 
function metadata(sample){
  d3.json("samples.json").then(function(BBData) {
// Demographic Information
    var DemoID = BBData.metadata.filter(sample => sample.id);
    console.log(DemoID);
    var ids = DemoID[0];
    d3.select("#sample-metadata").html("");
    Object.entries(ids).forEach(
      ([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`));
      
});
}

       
function init(){
  //Dropdown menu
  //select drop down menu with d3
  var dropdownMenu = d3.selectAll("#selDataset").on("change", optionChanged); 
  d3.json("samples.json").then((BBData) => {
    //assign value to dropdown menu
    var SampleIDs = BBData.names;
    SampleIDs.forEach((ID) => {
      dropdownMenu.append("option")
                  .text(ID)
                  .property("value", ID)
    });

    // Use the first sample from the list to build the initial plots
    vis(SampleIDs[0]);
    metadata(SampleIDs[0])
  });
}
// create the function for the change event
function optionChanged(sample) {
  vis(sample);
  metadata(sample);
} 
  
init(); 
    