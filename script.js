// src/script.js
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
let isDarkMode = prefersDarkMode;

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  applyTheme();
}

function applyTheme() {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

const toggleButton = document.getElementById('dark-mode-toggle');
toggleButton.addEventListener('click', toggleDarkMode);

applyTheme();

const welcomeHeader = document.querySelector('.hero h1');
welcomeHeader.classList.add('animate__animated', 'animate__fadeInDown');

// D3 Bar Chart
const data = [
  { skill: 'Web Design', expertise: 8 },
  { skill: 'Web Development', expertise: 9 },
  { skill: 'UI/UX Design', expertise: 7 },
];

const svgWidth = 300;
const svgHeight = 200;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

const svg = d3.select('#bar-chart')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .style('display', 'block') // To center the SVG element
  .style('margin', 'auto'); // To center the SVG element

const chart = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xScale = d3.scaleBand()
  .domain(data.map(d => d.skill))
  .range([0, chartWidth])
  .padding(0.2);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.expertise)])
  .range([chartHeight, 0]);

const bars = chart.selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', d => xScale(d.skill))
  .attr('y', d => yScale(d.expertise))
  .attr('width', xScale.bandwidth())
  .attr('height', d => chartHeight - yScale(d.expertise))
  .attr('fill', '#007BFF');

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

chart.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${chartHeight})`)
  .call(xAxis);

chart.append('g')
  .attr('class', 'y-axis')
  .call(yAxis);
