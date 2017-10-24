import React, { PureComponent } from 'react';
import prepLogo from 'assets/icons/prep-logo.svg';
import Icon from 'components/icon';
import styles from './prep-link-styles.scss';

class PrepLink extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.link}>
        <div className={styles.logo}>
          <Icon icon={prepLogo} className={styles.logoIcon} />
        </div>
        <div className={styles.description}>
          For adaptation planners that would like to explore indicators and data
          related to risk and vulnerability, visit PREP
        </div>
      </div>
    );
  }
}

export default PrepLink;
