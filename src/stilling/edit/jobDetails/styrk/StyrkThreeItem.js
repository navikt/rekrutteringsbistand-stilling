import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Chevron from 'nav-frontend-chevron';

export default class StyrkThreeItem extends React.Component {
    onClick = (e) => {
        e.stopPropagation();
        this.props.onClick(this.props.item);
    };

    render() {
        const { item } = this.props;
        if (!item.visible) {
            return null;
        }
        return (
            <div className="StyrkThreeItem typo-normal">
                {item.children ? (
                    <button
                        onClick={this.onClick}
                        className={classNames(
                            'StyrkThreeItem__branch',
                            `StyrkThreeItem__branch--level${item.level}`,
                            {
                                'StyrkThreeItem__branch--expanded': item.expanded,
                            }
                        )}
                    >
                        <Chevron
                            className="StyrkThreeItem__branch__chevron"
                            type={item.expanded ? 'ned' : 'høyre'}
                        />
                        {item.code}: {item.name}
                    </button>
                ) : (
                    <button onClick={this.onClick} className="StyrkThreeItem__sibling">
                        {item.code}: {item.name}
                        {item.alternativeNames && item.alternativeNames.length > 0 && (
                            <div className="StyrkThreeItem__sibling__alternativeNames typo-undertekst">
                                {item.alternativeNames.join(', ')}
                            </div>
                        )}
                    </button>
                )}
                {item.expanded &&
                    item.children &&
                    item.children.map((child) => (
                        <StyrkThreeItem key={child.id} item={child} onClick={this.props.onClick} />
                    ))}
            </div>
        );
    }
}

StyrkThreeItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        code: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};
