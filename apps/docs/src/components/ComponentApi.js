import { graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import Anchor from './Anchor';
import Heading from './Heading';
import ImportApi from './ImportApi';
import PropTable from './PropTable';

const propTypes = {};

function ComponentApi({ heading, metadata, exportedBy }) {
  const { description } = metadata;
  let { displayName: name } = metadata;
  const descHtml = description && description.childMarkdownRemark.html;
  let importName = name;

  if (exportedBy) {
    name = `${exportedBy.displayName}.${name
      .split(exportedBy.displayName)
      .pop()}`;
    importName = exportedBy.displayName;
  }

  const id = `${kebabCase(name)}-props`;
  return (
    <>
      <Heading h={heading || '3'} id={id} title={name} className="u-marginVerticalSmall">
        <div className="u-flex u-alignItemsCenter">
          <Anchor target={id}>
            <span className=" text-monospace">{name}</span>
          </Anchor>
        </div>
      </Heading>

      <ImportApi name={importName} />
      {/* use composes here */}
      {descHtml && <div dangerouslySetInnerHTML={{ __html: descHtml }} />}
      <PropTable metadata={metadata} />
    </>
  );
}

ComponentApi.propTypes = propTypes;

export default ComponentApi;

export const metadataFragment = graphql`
  fragment ComponentApi_metadata on ComponentMetadata {
    composes
    displayName
    description {
      childMarkdownRemark {
        html
      }
    }
    ...PropTable_metadata
  }
`;
