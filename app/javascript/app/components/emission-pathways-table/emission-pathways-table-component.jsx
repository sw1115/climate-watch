import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'components/table';
import NoContent from 'components/no-content';
import Search from 'components/search';
import Loading from 'components/loading';
// import Dropdown from 'components/dropdown';
import darkSearch from 'styles/themes/search/search-dark.scss';
import layout from 'styles/layout.scss';
import EspModelsProvider from 'providers/esp-models-provider';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';
import styles from './emission-pathways-table-styles.scss';

class EmissionPathwaysTable extends PureComponent {
  getTableContent() {
    const { loading, data, noContentMsg } = this.props;
    if (loading) return <Loading light className={styles.loader} />;

    return data && data.length > 0 ? (
      <Table data={data} rowHeight={60} sortBy={sortBy} />
    ) : (
      <NoContent message={noContentMsg} />
    );
  }

  render() {
    const {
      query,
      handleSearchChange,
      categoryName
      // categories,
      // handleLicenseChange,
      // handleTimeIntervalChange,
      // indicators,
      // handleHorizonChange,
      // handleSearchChange,
      // selectedLicense,
      // selectedTimeInterval,
      // selectedHorizon
    } = this.props;
    return (
      <div className={layout.content}>
        <EspModelsProvider />
        <EspScenariosProvider />
        <EspIndicatorsProvider />
        <div className={styles.col4}>
          {/* <Dropdown
            label="License"
            options={categories}
            onValueChange={handleLicenseChange}
            value={selectedLicense}
            hideResetButton
            plain
          />
          <Dropdown
            label="TimeInterval"
            options={indicators}
            onValueChange={handleTimeIntervalChange}
            value={selectedTimeInterval}
            hideResetButton
            plain
          />
          <Dropdown
            label="Horizon"
            options={indicators}
            onValueChange={handleHorizonChange}
            value={selectedHorizon}
            hideResetButton
            plain
          /> */}
          <Search
            input={query}
            theme={darkSearch}
            onChange={handleSearchChange}
            className={styles.searchBox}
            placeholder={`Search in ${categoryName}`}
            plain
          />
        </div>
        {this.getTableContent()}
      </div>
    );
  }
}

EmissionPathwaysTable.propTypes = {
  loading: PropTypes.bool,
  noContentMsg: PropTypes.string,
  data: PropTypes.array,
  // categories: PropTypes.array,
  // indicators: PropTypes.array,
  // selectedLicense: PropTypes.object,
  // selectedTimeInterval: PropTypes.object,
  // selectedHorizon: PropTypes.object,
  // handleLicenseChange: PropTypes.func,
  // handleHorizonChange: PropTypes.func,
  // handleTimeIntervalChange: PropTypes.func,
  categoryName: PropTypes.string.isRequired,
  query: PropTypes.string,
  sortBy: PropTypes.string,
  handleSearchChange: PropTypes.func
};

export default EmissionPathwaysTable;
