import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RegionsProvider from 'providers/regions-provider';
import ChartLine from 'components/charts/line';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Tag from 'components/tag';

import styles from './ghg-emissions-styles.scss';

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      data,
      config,
      sources,
      sourceSelected,
      handleSourceChange,
      breaksBy,
      breakSelected,
      handleBreakByChange,
      filters,
      filtersSelected,
      handleFilterChange,
      handleRemoveTag
    } = this.props;
    return (
      <div>
        <h2 className={styles.title}>Global Historical Emissions</h2>
        <RegionsProvider />
        <div className={styles.col4}>
          <Dropdown
            label="Source"
            options={sources}
            onChange={handleSourceChange}
            value={sourceSelected}
            clearable={false}
          />
          <Dropdown
            label="BreakBy"
            options={breaksBy}
            onChange={handleBreakByChange}
            value={breakSelected}
            clearable={false}
          />
          <Dropdown
            label={breakSelected.label}
            options={filters}
            onChange={handleFilterChange}
            value={filtersSelected}
            clearable={false}
            multi
          />
          <ButtonGroup className={styles.colEnd} />
        </div>
        <ChartLine config={config} data={data} />
        <div className={styles.tags}>
          {filtersSelected &&
            filtersSelected.map(
              filter =>
                (config.theme[filter.column] ? (
                  <Tag
                    className={styles.tag}
                    key={`${filter.value}`}
                    data={{
                      color: config.theme[filter.column].stroke,
                      label: filter.label,
                      id: filter.value
                    }}
                    onRemove={handleRemoveTag}
                  />
                ) : null)
            )}
        </div>
      </div>
    );
  }
}

GhgEmissions.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  sourceSelected: PropTypes.object.isRequired,
  handleSourceChange: PropTypes.func.isRequired,
  breaksBy: PropTypes.array.isRequired,
  breakSelected: PropTypes.object.isRequired,
  handleBreakByChange: PropTypes.func.isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  filtersSelected: PropTypes.array.isRequired,
  handleFilterChange: PropTypes.func.isRequired
};

export default GhgEmissions;
