require('./css/ace.scss');
require('./css/app.scss');
const React = require('react');
const { MDXProvider } = require('@mdx-js/react');

const Heading = require('./components/Heading');
const CodeBlock = require('./components/CodeBlock');
const LinkedHeading = require('./components/LinkedHeading');

const getMode = (className = '') => {
  const [, mode] = className.match(/language-(\w+)/) || [];
  return mode;
};
const components = {
  wrapper: props => <React.Fragment {...props} />,
  h1: props => <Heading h="1" {...props} />,
  h2: props => <LinkedHeading h="2" {...props} />,
  h3: props => <LinkedHeading h="3" {...props} />,
  h4: props => <LinkedHeading h="4" {...props} />,
  h5: props => <LinkedHeading h="5" {...props} />,
  pre: props => (React.isValidElement(props.children) ? (
    <CodeBlock
      codeText={props.children.props.children}
      mode={getMode(props.children.props.className)}
    />
  ) : (
    <pre {...props} />
  )),
};

module.exports = ({ element, ...props }) => (
  <MDXProvider components={components}>
    {element}
  </MDXProvider>
);
