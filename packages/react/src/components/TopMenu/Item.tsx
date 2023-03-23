import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';
import SafeAnchor from 'components/SafeAnchor';
import { Badge, BadgeVariant } from 'components/Badge';
import TopMenuContext from './Context';

const propTypes = {
  /** A key that associates the TopMenu with it's controlling TopMenu.Item.*/
  eventKey: PropTypes.string,
  /**
   * Manually set the visual state of the TopMenu.Item to disabled
   * @default false
   * */
  disabled: PropTypes.bool,
  /** The badge to display. The structure can get from Component Badge  */
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
const defaultProps = {};

interface ItemProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Manually set the visual state of the TopMenu.Item to disabled
   * @default false
   * */
  disabled: boolean;
  /** The badge to display. The structure can get from Component Badge  */
  badge: string | (() => React.ReactNode);
  isSubItem?: boolean;
  index?: number;
  path?: string;
}

export const Item: RefForwardingComponent<'span', ItemProps> = React.forwardRef<any, ItemProps>(
  ({ className, disabled, children, badge, isSubItem, index, path, ...props }, ref) => {
    let active;

    const context = useContext(TopMenuContext);

    if (path === context.current) {
      active = true;
    }

    const Component = active || disabled ? 'span' : SafeAnchor;

    const onClick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      context.onSelect(path);
    };
    return (
      <div
        onClick={disabled ? null : onClick}
        className={classNames(
          'TopMenu-item u-positionRelative u-paddingVerticalExtraTiny',
          index > 0 && !isSubItem && 'u-marginLeftLarge',
          active && 'is-active',
          isSubItem ? 'u-flex hover:u-backgroundLightest u-paddingHorizontalSmall' : 'u-flexInline u-alignItemsCenter',
          disabled ? 'is-disabled u-cursorNotAllow u-pointerEventsNone' : 'u-cursorPointer',
          className && className
        )}
      >
        {active && !isSubItem && (
          <>
            <div
              className={classNames(
                'TopMenu-itemBefore u-heightExtraTiny u-zIndexPosition',
                'u-positionAbsolute u-positionLeft u-positionTop u-backgroundTransparent u-widthFull'
              )}
            />
            <div
              className={classNames(
                'TopMenu-itemAfter u-heightExtraTiny u-zIndexPosition',
                'u-positionAbsolute u-positionLeft u-positionBottom u-backgroundPrimary u-widthFull'
              )}
            />
          </>
        )}
        <Component
          ref={ref}
          {...props}
          className={classNames(
            'u-positionRelative u-flexInline u-flexGrow1 u-paddingVerticalTiny hover:u-textDecorationNone',
            active ? 'u-textLink' : !disabled && 'u-textDark hover:u-textLink',
            disabled && 'u-textLight'
          )}
        >
          <div className="u-flexGrow1">{children}</div>

          {badge && (
            <span className="u-marginLeftExtraSmall">
              {typeof badge === 'function' ? (
                badge()
              ) : (
                <Badge variant={disabled ? BadgeVariant.DEFAULT : BadgeVariant.POSITIVE}>{badge}</Badge>
              )}
            </span>
          )}
        </Component>
      </div>
    );
  }
);

Item.defaultProps = defaultProps;
Item.displayName = 'TopMenuItem';
Item.propTypes = propTypes;
