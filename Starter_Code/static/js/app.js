// Build the metadata panel
function buildMetadata(sample) {
  d3.json(
    "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"
  ).then(data => {
    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    const filteredMetadata = metadata.filter(function (object) {
      return object.id === parseInt(sample);
    });

    // console.log(filteredMetadata);

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(filteredMetadata[0]).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json(
    "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"
  ).then(data => {
    // Get the samples field
    let samples = data.samples;
    // console.log(samples);

    // Filter the samples for the object with the desired sample number
    const filteredSamples = samples.filter(function (object) {
      return object.id === sample;
    });

    // console.log(filteredSamples);

    let otu_ids = [];
    let otu_labels = [];
    let sample_values = [];

    // Get the otu_ids, otu_labels, and sample_values
    if (filteredSamples.length > 0) {
      otu_ids = filteredSamples[0].otu_ids;
      otu_labels = filteredSamples[0].otu_labels;
      sample_values = filteredSamples[0].sample_values;
    } else {
      console.error("No samples found with ID");
    }

    // Build a Bubble Chart
    const bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      },
      text: otu_labels
    };

    const bubbleData = [bubbleTrace];
    const bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Number of Bacteria" }
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids
      .slice(0, 10)
      .map(otu_id => `OTU ${otu_id}`)
      .reverse();
    let xticks = sample_values.slice(0, 10).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    const barTrace = {
      x: xticks,
      y: yticks,
      type: "bar",
      orientation: "h"
    };

    const barData = [barTrace];
    const barLayout = {
      title: "Top 10 OTUs Found",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU ID", tickvals: yticks }
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json(
    "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"
  ).then(data => {
    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownmenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++) {
      dropdownmenu.append("option").text(names[i]).attr("value", names[i]);
    }

    // Get the first sample from the list
    let firstSample = names[0];
    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
