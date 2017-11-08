## Usage

### Simplest

Simplest example：

```js
class SimplestSampleComponent extends React.Component {

  ...

  render() {
    return (
      <div>
        <div className="btn-group">
          {this.renderButtons()}
        </div>
        <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
          {this.renderItems()}
        </AutoResponsive>
      </div>
    );
  }
}
```

### waterfall

The completion of a waterfall layout becomes very simple

```js

class WaterfallSampleComponent extends React.Component {

  ...

  render() {
    return (
      <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
        {
          arrayList.map(function(i) {
            return <div onClick={this.clickItemHandle} className="item" style={this.state.styleList[i]}>{i}</div>;
          }, this)
        }
      </AutoResponsive>
    );
  }
}

```

## Examples

- [Sample1](./examples)

## Related Edition

- [ReactNative Edition](//github.com/xudafeng/autoresponsive_react_native_sample)
- [Vue Edition](//github.com/xudafeng/autoresponsive-vue)
