'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DecisionApp = function (_React$Component) {
    _inherits(DecisionApp, _React$Component);

    function DecisionApp(props) {
        _classCallCheck(this, DecisionApp);

        var _this = _possibleConstructorReturn(this, (DecisionApp.__proto__ || Object.getPrototypeOf(DecisionApp)).call(this, props));

        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.makeDecision = _this.makeDecision.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleRemoveOption = _this.handleRemoveOption.bind(_this);
        _this.state = {
            options: []
        };
        return _this;
    }

    _createClass(DecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);

                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {}
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
                console.log('Saving Data!');
            }
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption() {

            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'makeDecision',
        value: function makeDecision() {
            var randomNum = Math.floor(Math.random() * this.state.options.length);
            var todos = this.state.options[randomNum];
            alert(todos);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            if (!option) {
                return 'Enter valid tasks to do!';
            } else if (this.state.options.indexOf(option) > -1) {
                return 'This option Already Exists!';
            }

            this.setState(function (prevState) {
                return { options: prevState.options.concat(option) };
            });
        }
    }, {
        key: 'handleRemoveOption',
        value: function handleRemoveOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var title = 'Decsion App';
            var subtitle = 'Let this App control your life!';
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { title: title, subtitle: subtitle }),
                React.createElement(Action, {
                    makeDecision: this.makeDecision,
                    hasOption: this.state.options.length > 0
                }),
                React.createElement(Options, {
                    handleRemoveOption: this.handleRemoveOption,
                    options: this.state.options,
                    handleDeleteOption: this.handleDeleteOption
                }),
                React.createElement(AddOptions, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return DecisionApp;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.makeDecision,
                disabled: !props.hasOption
            },
            'Make Decision'
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleDeleteOption },
            'Remove All'
        ),
        props.options.map(function (option) {
            return React.createElement(Option, {
                handleRemoveOption: props.handleRemoveOption,
                key: option,
                optionText: option
            });
        })
    );
};

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        props.optionText,
        React.createElement(
            'button',
            { onClick: function onClick(e) {
                    props.handleRemoveOption(props.optionText);
                } },
            'Remove'
        )
    );
};

var AddOptions = function (_React$Component2) {
    _inherits(AddOptions, _React$Component2);

    function AddOptions(props) {
        _classCallCheck(this, AddOptions);

        var _this2 = _possibleConstructorReturn(this, (AddOptions.__proto__ || Object.getPrototypeOf(AddOptions)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOptions, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            var error = this.props.handleAddOption(option);

            this.setState(function () {
                return { error: error };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Options'
                    )
                )
            );
        }
    }]);

    return AddOptions;
}(React.Component);

ReactDOM.render(React.createElement(DecisionApp, null), document.getElementById('app'));
