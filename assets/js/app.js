// @TODO: YOUR CODE HERE!

d3.csv('data.csv').then(function(data) {

var svgHeight = 400;
var svgWidth = 1000;

// margins
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;


var svg = d3.select('#scatter').append('svg')
  .attr('height', svgHeight)
  .attr('width', svgWidth);

// shift everything over by the margins
var chartGroup = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);


// scale y to chart height
var yScale = d3.scaleLinear()
.domain(d3.extent(data, d => +d.poverty))
  .range([0, chartHeight]);  // reversed for bottom up chart

// scale x to chart width
var xScale = d3.scaleLinear()
.domain(d3.extent(data, d => +d.healthcare))
  .range([0, chartWidth])

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// set x to the bottom of the chart
chartGroup.append('g')
  .attr('transform', `translate(0, ${chartHeight})`)
  .call(xAxis);


    // set y to the y axis
    // This syntax allows us to call the axis function
    // and pass in the selector without breaking the chaining
    chartGroup.append('g')
      .call(yAxis);

    chartGroup.selectAll('circle')  
  .data(data)
  .enter()
  .append('circle')
  .classed('scatter', true)
  .attr('cx', (d, i) => xScale(d.poverty))
  .attr('cy', d => yScale(d.healthcare))
  .attr('r', 8.5)
  
  chartGroup.selectAll('text.stateText')
.data(data)
.enter()
.append('text')
.attr('class', 'stateText')
.attr('x', (d, i) => xScale(d.poverty))
.attr('y', d => yScale(d.healthcare))
.text(d => d.abbr)
});