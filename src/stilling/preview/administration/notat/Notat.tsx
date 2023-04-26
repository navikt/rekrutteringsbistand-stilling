import React from 'react';
import { useSelector } from 'react-redux';
import ProcessString from 'react-process-string';
import { BodyLong, BodyShort, Label } from '@navikt/ds-react';

const Notat = () => {
    const notat = useSelector((state: any) => state.stillingsinfoData.notat);

    const notatTekst =
        notat && notat.length
            ? ProcessString([
                  {
                      regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.)/gim,
                      fn: (key, result) => (
                          <span key={key}>
                              <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}
                                  className="navds-link"
                              >
                                  {result[2]}.{result[3]}
                                  {result[4]}
                              </a>
                              {result[5]}
                          </span>
                      ),
                  },
              ])(notat)
            : 'Det er ikke lagt inn notater.';

    return (
        <div>
            <BodyShort size="small" spacing>
                <Label size="small">Notater</Label>
            </BodyShort>
            <BodyLong size="small">{notatTekst}</BodyLong>
        </div>
    );
};

export default Notat;
