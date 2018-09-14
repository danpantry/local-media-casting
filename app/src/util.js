import React from 'react'

export function getDisplayName(componentClass) {
  return componentClass.displayName || componentClass.name
}

/**
 * Connects the given component to the resources it declares it needs.
 *
 * The `fetchData` property on the given `componentClass` is called when the component is mounted. `fetchData` must return a `Promise`. The object yielded by the `Promise` will be passed directly as `props` to the `componentClass` and the resulting element rendered.
 *
 * While the component is rendering, a loading message is displayed.
 *
 * @param {Function} componentClass The class of the component to connect. This must be a function which returns a React element when invoked and has a `fetchData` property.
 *
 * @example
 *
 *    function MyComponent({ todos }) { return null }
 *    MyComponent.fetchData = () => Promise.resolve({ todos: [] })
 *
 *    const ConnectedComponent = connect(MyComponent)
 *    const element = React.createElement(ConnectedComponent)
 *
 *    // This will call fetchData() when it is mounted.
 *    // After the data is fetched, this is equivalent to:
 *    React.createElement(MyComponent, { todos: [] })
 */
export function connect(componentClass) {
  return class ConnectedComponent extends React.Component {
    state = {
      isFetching: true,
      childProps: {}
    }

    static displayName = `connect(${getDisplayName(componentClass)})`

    async componentDidMount() {
      this.setState({ isFetching: true })
      const data = await componentClass.fetchData()
      this.setState({ isFetching: false, childProps: data })
    }

    render() {
      if (this.state.isFetching) {
        return <h1>Loading...</h1>
      }

      return React.createElement(componentClass, this.state.childProps)
    }
  }
}
