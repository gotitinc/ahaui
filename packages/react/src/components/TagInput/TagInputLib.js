import React from 'react';
import PropTypes from 'prop-types';

function uniq (arr) {
  const out = [];

  for (let i = 0; i < arr.length; i++) {
    if (out.indexOf(arr[i]) === -1) {
      out.push(arr[i]);
    }
  }

  return out;
}

/* istanbul ignore next */
function getClipboardData (e) {
  if (window.clipboardData) {
    return window.clipboardData.getData('Text');
  }

  if (e.clipboardData) {
    return e.clipboardData.getData('text/plain');
  }

  return '';
}

function defaultRenderTag (props) {
  const { tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other } = props;
  return (
    <span key={key} {...other}>
      {getTagDisplayValue(tag)}
      {!disabled && (<a className={classNameRemove} onClick={() => onRemove(key)} />)}
    </span>
  );
}

defaultRenderTag.propTypes = {
  key: PropTypes.number,
  tag: PropTypes.string,
  onRemove: PropTypes.func,
  classNameRemove: PropTypes.string,
  getTagDisplayValue: PropTypes.func,
};

function defaultRenderInput ({ addTag, ...props }) {
  const { onChange, value, ...other } = props;
  return (
    <input type="text" onChange={onChange} value={value} {...other} />
  );
}

defaultRenderInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  addTag: PropTypes.func,
};

function defaultRenderLayout (tagComponents, inputComponent) {
  return (
    <span>
      {tagComponents}
      {inputComponent}
    </span>
  );
}

function defaultPasteSplit (data) {
  return data.split(' ').map((d) => d.trim());
}

const defaultInputProps = {
  className: 'react-tagsinput-input',
  placeholder: 'Add a tag',
};

class TagsInput extends React.Component {
  /* istanbul ignore next */
  constructor () {
    super();
    this.state = { tag: '', isFocused: false };
    this.focus = this.focus;
    this.blur = this.blur;
  }

  static propTypes = {
    focusedClassName: PropTypes.string,
    addKeys: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),
    addOnBlur: PropTypes.bool,
    addOnPaste: PropTypes.bool,
    currentValue: PropTypes.string,
    inputValue: PropTypes.string,
    inputProps: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func,
    removeKeys: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),
    renderInput: PropTypes.func,
    renderTag: PropTypes.func,
    renderLayout: PropTypes.func,
    pasteSplit: PropTypes.func,
    tagProps: PropTypes.object,
    onlyUnique: PropTypes.bool,
    value: PropTypes.array.isRequired,
    maxTags: PropTypes.number,
    validate: PropTypes.func,
    validationRegex: PropTypes.instanceOf(RegExp),
    disabled: PropTypes.bool,
    tagDisplayProp: PropTypes.string,
    preventSubmit: PropTypes.bool,
  }

  static defaultProps = {
    className: 'react-tagsinput',
    focusedClassName: 'react-tagsinput--focused',
    addKeys: [9, 13],
    addOnBlur: false,
    addOnPaste: false,
    inputProps: {},
    removeKeys: [8],
    renderInput: defaultRenderInput,
    renderTag: defaultRenderTag,
    renderLayout: defaultRenderLayout,
    pasteSplit: defaultPasteSplit,
    tagProps: { className: 'react-tagsinput-tag', classNameRemove: 'react-tagsinput-remove' },
    onlyUnique: false,
    maxTags: -1,
    validate: () => true,
    validationRegex: /.*/,
    disabled: false,
    tagDisplayProp: null,
    preventSubmit: true,
  }

  _getTagDisplayValue = (tag) => {
    const { tagDisplayProp } = this.props;

    if (tagDisplayProp) {
      return tag[tagDisplayProp];
    }

    return tag;
  }

  _makeTag = (tag) => {
    const { tagDisplayProp } = this.props;

    if (tagDisplayProp) {
      return {
        [tagDisplayProp]: tag,
      };
    }

    return tag;
  }

  _removeTag = (index) => {
    const value = this.props.value.concat([]);
    if (index > -1 && index < value.length) {
      const changed = value.splice(index, 1);
      this.props.onChange(value, changed, [index]);
    }
  }

  _clearInput = () => {
    if (this.hasControlledInput()) {
      this.props.onChangeInput('');
    } else {
      this.setState({ tag: '' });
    }
  }

  _tag = () => {
    if (this.hasControlledInput()) {
      return this.props.inputValue;
    }

    return this.state.tag;
  }

  _addTags = (tags) => {
    const { onChange, onValidationReject, onlyUnique, maxTags, value } = this.props;

    if (onlyUnique) {
      tags = uniq(tags);
      tags = tags.filter((tag) => value.every((currentTag) => this._getTagDisplayValue(currentTag) !== this._getTagDisplayValue(tag)),
      );
    }

    const rejectedTags = tags.filter((tag) => !this._validate(this._getTagDisplayValue(tag)));
    tags = tags.filter((tag) => this._validate(this._getTagDisplayValue(tag)));
    tags = tags.filter((tag) => {
      const tagDisplayValue = this._getTagDisplayValue(tag);
      if (typeof tagDisplayValue.trim === 'function') {
        return tagDisplayValue.trim().length > 0;
      }
      return tagDisplayValue;
    });

    if (maxTags >= 0) {
      const remainingLimit = Math.max(maxTags - value.length, 0);
      tags = tags.slice(0, remainingLimit);
    }

    if (onValidationReject && rejectedTags.length > 0) {
      onValidationReject(rejectedTags);
    }

    if (tags.length > 0) {
      const newValue = value.concat(tags);
      const indexes = [];
      for (let i = 0; i < tags.length; i++) {
        indexes.push(value.length + i);
      }
      onChange(newValue, tags, indexes);
      this._clearInput();
      return true;
    }

    if (rejectedTags.length > 0) {
      return false;
    }

    this._clearInput();
    return false;
  }

  _validate = (tag) => {
    const { validate, validationRegex } = this.props;

    return validate(tag) && validationRegex.test(tag);
  }

  _shouldPreventDefaultEventOnAdd = (added, empty, keyCode) => {
    if (added) {
      return true;
    }

    if (keyCode === 13) {
      return (this.props.preventSubmit || !this.props.preventSubmit && !empty);
    }

    return false;
  }

  focus = () => {
    if (this.input && typeof this.input.focus === 'function') {
      this.input.focus();
    }

    this.handleOnFocus();
  }

  blur = () => {
    if (this.input && typeof this.input.blur === 'function') {
      this.input.blur();
    }

    this.handleOnBlur();
  }

  accept = () => {
    let tag = this._tag();

    if (tag !== '') {
      tag = this._makeTag(tag);
      return this._addTags([tag]);
    }

    return false;
  }

  addTag = (tag) => this._addTags([tag])

  clearInput = () => {
    this._clearInput();
  }

  handlePaste = (e) => {
    const { addOnPaste, pasteSplit } = this.props;

    if (!addOnPaste) {
      return;
    }

    e.preventDefault();

    const data = getClipboardData(e);
    const tags = pasteSplit(data).map((tag) => this._makeTag(tag));

    this._addTags(tags);
  }

  handleKeyDown = (e) => {
    if (e.defaultPrevented) {
      return;
    }

    const { value, removeKeys, addKeys } = this.props;
    const tag = this._tag();
    const empty = tag === '';
    const keyCode = e.keyCode;
    const key = e.key;
    const add = addKeys.indexOf(keyCode) !== -1 || addKeys.indexOf(key) !== -1;
    const remove = removeKeys.indexOf(keyCode) !== -1 || removeKeys.indexOf(key) !== -1;

    if (add) {
      const added = this.accept();
      if (this._shouldPreventDefaultEventOnAdd(added, empty, keyCode)) {
        e.preventDefault();
      }
    }

    if (remove && value.length > 0 && empty) {
      e.preventDefault();
      this._removeTag(value.length - 1);
    }
  }

  handleClick = (e) => {
    if (e.target === this.div) {
      this.focus();
    }
  }

  handleChange = (e) => {
    const { onChangeInput } = this.props;
    const { onChange } = this.props.inputProps;
    const tag = e.target.value;

    if (onChange) {
      onChange(e);
    }

    if (this.hasControlledInput()) {
      onChangeInput(tag);
    } else {
      this.setState({ tag });
    }
  }

  handleOnFocus = (e) => {
    const { onFocus } = this.props.inputProps;

    if (onFocus) {
      onFocus(e);
    }

    this.setState({ isFocused: true });
  }

  handleOnBlur = (e) => {
    const { onBlur } = this.props.inputProps;

    this.setState({ isFocused: false });

    if (e == null) {
      return;
    }

    if (onBlur) {
      onBlur(e);
    }

    if (this.props.addOnBlur) {
      const tag = this._makeTag(e.target.value);
      this._addTags([tag]);
    }
  }

  handleRemove = (tag) => {
    this._removeTag(tag);
  }

  inputProps = () => {
    // eslint-disable-next-line
    let {onChange, onFocus, onBlur, ...otherInputProps} = this.props.inputProps

    const props = {
      ...defaultInputProps,
      ...otherInputProps,
    };

    if (this.props.disabled) {
      props.disabled = true;
    }

    return props;
  }

  inputValue = (props) => props.currentValue || props.inputValue || ''

  hasControlledInput = () => {
    const { inputValue, onChangeInput } = this.props;

    return typeof onChangeInput === 'function' && typeof inputValue === 'string';
  }

  componentDidMount() {
    if (this.hasControlledInput()) {
      return;
    }

    this.setState({
      tag: this.inputValue(this.props),
    });
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore next */
    if (this.hasControlledInput()) {
      return;
    }

    if (!this.inputValue(nextProps)) {
      return;
    }

    this.setState({
      tag: this.inputValue(nextProps),
    });
  }

  render() {
    /* eslint-disable */
    let {
      value,
      onChange,
      tagProps,
      renderLayout,
      renderTag,
      renderInput,
      addKeys,
      removeKeys,
      className,
      focusedClassName,
      addOnBlur,
      addOnPaste,
      inputProps,
      pasteSplit,
      onlyUnique,
      maxTags,
      validate,
      validationRegex,
      disabled,
      tagDisplayProp,
      inputValue,
      onChangeInput,
      ...other
    } = this.props
    /* eslint-enable */

    const { isFocused } = this.state;

    if (isFocused) {
      className += ` ${focusedClassName}`;
    }

    const tagComponents = value.map((tag, index) => renderTag({
      key: index,
      tag,
      onRemove: this.handleRemove,
      disabled,
      getTagDisplayValue: this._getTagDisplayValue,
      ...tagProps,
    }));

    const inputComponent = renderInput({
      ref: (r) => { this.input = r; },
      value: this._tag(),
      onPaste: this.handlePaste,
      onKeyDown: this.handleKeyDown,
      onChange: this.handleChange,
      onFocus: this.handleOnFocus,
      onBlur: this.handleOnBlur,
      addTag: this.addTag,
      ...this.inputProps(),
    });

    return (
      <div ref={(r) => { this.div = r; }} onClick={this.handleClick} className={className}>
        {renderLayout(tagComponents, inputComponent)}
      </div>
    );
  }
}

export default TagsInput;
