import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import Search from './Search'
import Button from '@material-ui/core/Button';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class Dashboard extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [0, 1, 2, 3, 4].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          add: i === (list.length - 1),
          symbol: "EXMPLE",
          name: "Example"
        };
      }),
      newCounter: 0
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.i
    return (
      <div key={i} data-grid={el}>
        
          <div className="text">
          <div className="symbol">{el.symbol}</div>
          <div className="name">{el.name}</div> 
          <div className="text">api call for price</div>
          <Button className="scrape" size="small">Scrape and show</Button>
          </div>
        
        <div
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </div>
      </div>
    
    );
  }

  onAddItem(symbol, name) {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        symbol: symbol,
        name: name
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    //this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    return (
      <div>
        <div>
        <Search add_function={this.onAddItem}/>
      </div>
      <div>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
      </div>
    );
  }
}
import("./test-hook.jsx").then(fn => fn.default(Dashboard));