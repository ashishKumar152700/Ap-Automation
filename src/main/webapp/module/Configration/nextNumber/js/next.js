
    function createPieChart(data) {
        
        var fraction1 = data
        var fraction2 = parseFloat(1.0) - parseFloat(fraction1)

        let fractions = [fraction1, fraction2]

        let colors = ["#1ab394", "#d7d7d7"]

        const centerX = 8;
        const centerY = 8;
        const radius = 8;

        let startAngle = 270;
        let endAngle;

        let paths = '';

        for (let i = 0; i < fractions.length; i++) {
            const fraction = fractions[i];
            const color = colors[i];

            endAngle = startAngle + (fraction * 360);

            const startAngleRad = startAngle * (Math.PI / 180);
            const endAngleRad = endAngle * (Math.PI / 180);

            const startX = centerX + radius * Math.cos(startAngleRad);
            const startY = centerY + radius * Math.sin(startAngleRad);
            const endX = centerX + radius * Math.cos(endAngleRad);
            const endY = centerY + radius * Math.sin(endAngleRad);

            const largeArcFlag = fraction > 0.5 ? 1 : 0;
            const sweepFlag = 1;

            const path = `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY} Z`;

            paths += `<path d="${path}" fill="${color}" />`;

            startAngle = endAngle;
        }

        return paths
    }


  
