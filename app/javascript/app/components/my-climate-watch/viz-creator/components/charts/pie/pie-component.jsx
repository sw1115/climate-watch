import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie as RePie, ResponsiveContainer, Cell } from 'recharts';
import { pieLabel } from '../labels';

const Pie = ({ className, width, height, config }) => (
  <ResponsiveContainer className={className} width={width} height={height}>
    <PieChart>
      <RePie {...config.chart}>
        {config.chart.data.map(d => (
          <Cell key={d.key} fill={config.theme[d.key].fill} />
        ))}
      </RePie>
      {pieLabel(width, config.chart.topLabel.y, config.chart.topLabel.text)}
    </PieChart>
  </ResponsiveContainer>
);

Pie.propTypes = {
  className: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  chart: PropTypes.PropTypes.object,
  config: PropTypes.object
};

Pie.defaultProps = {
  width: '100%',
  height: '300px'
};

export default Pie;
