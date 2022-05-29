import React from 'react';
import { Button } from '@ahaui/react';
import { Link } from 'gatsby';
import pkg from '../../../../packages/react/package.json';

import withLayout from '../withLayout';

export default withLayout(
  class HomePage extends React.Component {
    render() {
      return (
        <div className="u-flex u-marginTopMedium lg:u-marginTopLarge u-flexColumn">
          <div className="Grid">
            <div className="u-sizeFull lg:u-size10of12 lg:u-offset1of12">
              <div className="u-textCenter">
                <div className="u-marginBottomLarge">
                  <img src={require('src/assets/home-ilu.svg')} alt="" className="u-maxWidthFull" />
                </div>
                <div className="u-textPrimary u-text400 u-fontMedium u-textUppercase">
                  Aha Design System
                </div>
                <div className="u-text1000 u-marginTopMedium">
                  An ever-evolving system that enables us to build higher quality products more&nbsp;efficiently
                </div>
                <Button
                  as={Link}
                  size="large"
                  className="u-marginTopLarge"
                  to="/getting-started/introduction"
                >
                  Get started
                </Button>
                <div className="u-marginTopSmall">
                  Current release:&nbsp;
                  <Link to="/release-notes/">
                    {pkg.version}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  },
);
