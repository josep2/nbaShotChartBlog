/**
 * Created by jowanza on 8/21/15.
 */
var heatRange = ['#5458A2', '#6689BB', '#FADC97', '#F08460', '#B02B48'];
d3.select(document.getElementById('chart'))
    .append("svg")
    .chart("BasketballShotChart", {
        width: 600,
        title: 'Victor Oladipo 2014-15',
        // instead of makes/attempts, use z
        hexagonFillValue: function(d) {  return d.z; },
        // switch heat scale domain to [-2.5, 2.5] to reflect range of z values
        heatScale: d3.scale.quantile()
            .domain([-2.5, 2.5])
            .range(heatRange),
        // update our binning algorithm to properly join z values
        // here, we update the z value to be proportional to the events of each point
        hexagonBin: function (point, bin) {
            var currentZ = bin.z || 0;
            var totalAttempts = bin.attempts || 0;
            var totalZ = currentZ * totalAttempts;

            var attempts = point.attempts || 1;
            bin.attempts = totalAttempts + attempts;
            bin.z = (totalZ + (point.z * attempts))/bin.attempts;
        },
    })
    .draw(data);