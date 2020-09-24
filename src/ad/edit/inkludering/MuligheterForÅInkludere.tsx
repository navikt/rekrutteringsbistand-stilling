import React, { ChangeEvent, Fragment, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, Fieldset } from 'nav-frontend-skjema';

import { CHECK_TAG, UNCHECK_TAG } from '../../adDataReducer';
import isJson from '../practicalInformation/IsJson';
import { hentKategorierMedNavn } from '../../tagHelpers';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst } from 'nav-frontend-typografi';
import './MuligheterForÅInkludere.less';

type Props = {
    tags?: string;
    checkTag: (tag: string) => void;
    uncheckTag: (tag: string) => void;
    direktemeldt: boolean;
};

const InkluderingPanel: FunctionComponent<Props> = ({
    tags,
    checkTag,
    uncheckTag,
    direktemeldt,
}) => {
    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = (tag: string) => tags && isJson(tags) && JSON.parse(tags).includes(tag);
    const kategorierMedNavn = hentKategorierMedNavn(direktemeldt);

    return (
        <Ekspanderbartpanel
            className="muligheter-for-å-inkludere blokk-s"
            tittel="Muligheter for å inkludere"
            tittelProps="undertittel"
            border
            apen
        >
            <Normaltekst>
                Arbeidsgiver er åpen for å inkludere personer som har behov for tilrettelegging
                og/eller har nedsatt funksjonsevne.
            </Normaltekst>
            <Fieldset legend="Inkludering" className="Inkludering typo-normal">
                {kategorierMedNavn.map(({ tag, navn, harUnderkategorier, underkategorier }) => (
                    <Fragment key={tag}>
                        <Checkbox
                            className="checkbox--tag skjemaelement--pink"
                            id={`tag-${tag.toLowerCase()}-checkbox`}
                            label={navn}
                            value={tag}
                            checked={tagIsChecked(tag)}
                            onChange={onTagChange}
                        />
                        {harUnderkategorier && tagIsChecked(tag) && (
                            <Fieldset legend={navn} className="Inkludering__subtags">
                                {(underkategorier || []).map(({ tag, navn }) => (
                                    <Checkbox
                                        className="checkbox--tag skjemaelement--pink"
                                        id={`tag.${tag}-checkbox`}
                                        label={navn}
                                        value={tag}
                                        key={tag}
                                        checked={tagIsChecked(tag)}
                                        onChange={onTagChange}
                                    />
                                ))}
                            </Fieldset>
                        )}
                    </Fragment>
                ))}
            </Fieldset>
        </Ekspanderbartpanel>
    );
};

InkluderingPanel.propTypes = {
    checkTag: PropTypes.func.isRequired,
    uncheckTag: PropTypes.func.isRequired,
    tags: PropTypes.string,
};

const mapStateToProps = (state) => ({
    tags: state.adData.properties.tags || '[]',
    direktemeldt: state.adData.source === 'DIR',
});

const mapDispatchToProps = (dispatch) => ({
    checkTag: (value: string) => dispatch({ type: CHECK_TAG, value }),
    uncheckTag: (value: string) => dispatch({ type: UNCHECK_TAG, value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InkluderingPanel);
