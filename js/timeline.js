var width = 750,
    height = 35,
    padding = 10,
    fdate = d3.time.format("%d %B %Y");


var data = [
    { date : new Date("July 7, 1963"), label : 'Start of the Half-Century News Record', type : 'pub' },
    { date : new Date("July 7, 2013"), label : 'Half-Century News: Volume 1', type : 'pub' },
    { date : new Date("july 7, 2063"), label : 'Half-Century News: Volume 2', type : 'pub' },
    { date : new Date("July 20, 1969"), label : 'Men Land on Moon', type : 'news' },
    { date : new Date(), label : 'Today', type : 'today' }
];

var xscale = d3.scale.linear()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([padding, width - 2 * padding]);

var svg = d3.select('#timeline').append('svg')
    .attr('width', width)
    .attr('height', height);

var line = d3.svg.line()
    .x(function(x) { return x; })
    .y(Math.ceil(3 * height / 4));

svg.append('path')
    .attr('class', 'timeline')
    .attr('d', line([padding, width - 2 * padding]));

svg.selectAll('circle')
    .data(data)
  .enter().append('circle')
    .attr('r', 4)
    .attr('class', function(d) { return d.type })
    .attr('cy', Math.ceil(3 * height / 4))
    .attr('cx', function(d) { return xscale(d.date); })
    .on('mouseover', function(d) {
        svg.selectAll('text').data([d]).call(text);
    })
    .on('mouseout', function(d) {
        svg.selectAll('text').data([]).call(text);
    });

function text(selection) {
    selection.enter().append('text')
        .text(function(d) { return [fdate(d.date), d.label].reverse().join("—"); })
        .attr('y', Math.ceil(height / 2))
        .attr('x', function(d) {
            var tw = this.getBBox().width,
                dx = xscale(d.date);

            dx = Math.min(width - 2 * padding - tw, dx);
            return dx;
        });

    selection.exit().remove();
}

