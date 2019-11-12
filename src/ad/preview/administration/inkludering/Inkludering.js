import React from 'react';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import EtikettInfo from 'nav-frontend-etiketter';
import { Tags } from '../../../../common/tags';
import './inkludering.less';
import { TAG_HIERARCHY_SPACER } from '../../../tagHelpers';

class Inkludering extends React.Component {
  render () {
    if(!this.props.tags || !this.props.tags.length) {
      return null;
    }
    return (
      <div className="Inkludering__preview">
        <Element>Inkludering</Element>
        <div>{this.props.tags
          .map(tagName => <EtikettInfo key={tagName} type="info" className="preview__tagname">{tagName}</EtikettInfo>)}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const tagsString = state.adData.properties.tags;
  const tags = tagsString != undefined ? JSON.parse(tagsString) : [];

  const tagNames =  tags.map(tagKey =>  {
    const tag = Tags[tagKey];

    if (tagKey.includes(TAG_HIERARCHY_SPACER)) {
      const [baseTagKey, subTagKey] = tagKey.split(TAG_HIERARCHY_SPACER);
      return Tags[baseTagKey].subTags.tags
        .find(subTag => subTag.key === subTagKey).label;

    } else {
      return tag.label;
    }    
  });
  
  return ({
    tags: tagNames
})};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Inkludering);