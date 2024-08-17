// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    const filteredMetadata = metadata.filter(function(object) {
      return object.id === sample;
    });

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    filteredMetadata.forEach(function(item) {
      panel.append('p')
        .text(`${item.key}: ${item.value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;


    // Filter the samples for the object with the desired sample number
    const filteredSamples = samples.filter(function(object) {
      return object.id === sample;
    });

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = filteredSamples.otu_ids;
    let otu_labels = filteredSamples.otu_labels;
    let sample_values = filteredSamples.sample_values;


    // Build a Bubble Chart
    const svg = d3.select("#bubble")
      .append("svg")
      .attr("width", 800)
      .attr("height", 400);

    //marker colors
    var color = d3.scaleThreshold().domain(otu_ids).range(["red", "yellow", "green", "blue"]);

    svg.selectAll("circle")
      .data(otu_ids)
      .enter()
      .append("circle")
      // Use the otu_ids for the x values.
      .attr("cx", (d,i) => d)
      // Use the sample_values for the y values.
      .attr("cy", (d,i) => sample_values[i])
      // Use the sample_values for the marker size.
      .attr("radius", (d,i) => sample_values[i])
      // Use the otu_ids for the marker colors.
      .attr("fill", (d) => color[d])

    svg.selectAll("text")
      .data(otu_labels)
      .enter()
      .append("text")
      .attr("x", (d, i) => otu_ids[i]) // Position text based on x-coordinate of circles
      .attr("y", (d, i) => sample_values[i]) // Position text based on y-coordinate of circles
      .text((d) => d); // Set the text content to the otu_labels


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
