import React from 'react'
import warning from 'warning'

export function getDisplayName(componentClass) {
  return componentClass.displayName || componentClass.name
}

/**
 * Connects the given component to the resources it declares it needs.
 *
 * The `fetchData` property on the given `componentClass` is called when the component is mounted. `fetchData` must return a `Promise`. The object yielded by the `Promise` will be passed directly as `props` to the `componentClass` and the resulting element rendered.
 *
 * Props that are passed directly to the created component are passed to fetchData but are not passed on to the rendered component. If you want to do this, merge in the props in the fetchData method
 *
 * While the component is rendering, a loading message is displayed.
 *
 * The `componentWillRefetch(previousProps)` static method is called when the props change. Return true from this method to trigger a re-fetch of data.
 *
 * @param {Function} componentClass The class of the component to connect. This must be a function which returns a React element when invoked and has a `fetchData` property.
 *
 * @example
 *
 *    function MyComponent({ todos }) { return null }
 *    MyComponent.fetchData = (props) => Promise.resolve({ todos: [] })
 *
 *    const ConnectedComponent = connect(MyComponent)
 *    const element = React.createElement(ConnectedComponent)
 *
 *    // This will call fetchData() when it is mounted.
 *    // After the data is fetched, this is equivalent to:
 *    React.createElement(MyComponent, { todos: [] })
 *
 *    // example of merging props
 *    function MyComponent({ todos, className }) { return null }
 *    MyComponent.fetchData = (props) =>
 *      Promise.resolve({ todos: [], ...props })
 */
export function connect(componentClass) {
  const displayName = getDisplayName(componentClass)

  return class ConnectedComponent extends React.Component {
    state = {
      isFetching: true,
      childProps: {}
    }

    constructor() {
      super()

      warning(
        componentClass.componentWillRefresh,
        `${displayName} has no componentWillRefetch property. This component will never refresh! If you are sure this is what you want, create a componentWillRefetch method on the constructor function that always returns false.`
      )
    }

    static displayName = `connect(${displayName})`

    fetchData() {
      if (!componentClass.fetchData) {
        warning(
          false,
          `${displayName} has no fetchData property. connect() will be no-op.`
        )

        if (this.state.isFetching) {
          this.setState({ isFetching: false })
        }

        return
      }

      this.setState({ isFetching: true })
      // HACK this is a massive bodge that prevents tests from failing.
      // In tests, componentDidMount() will fire but the component might get unmounted immediately after it is mounted. If this is the case, it will throw an error that crashes the process - unless we delay the invocation of fetchData() 'til the next tick. We use setTimeout() to make sure this comes after all queued functions are finished, rather than setImmediate() which only checks I/O events.
      // A long term solution to this would be to implement a mock API and use setImmediate() in the tests.
      setTimeout(async () => {
        const data = await componentClass.fetchData(this.props)
        this.setState({ isFetching: false, childProps: data })
      }, 0)
    }

    async componentDidMount() {
      return await this.fetchData()
    }

    async componentDidUpdate(previousProps) {
      if (!componentClass.componentWillRefetch) {
        return Promise.resolve()
      }

      if (componentClass.componentWillRefetch(previousProps)) {
        return await this.fetchData()
      }
    }

    render() {
      if (this.state.isFetching) {
        return <h1>Loading...</h1>
      }

      return React.createElement(componentClass, this.state.childProps)
    }
  }
}

/**
 * Retrieves a key from the given HTML5 history compliant location state.
 */
export function getPropFromLocationState(
  location,
  propName,
  defaultValue = undefined
) {
  if (!location || 'state' in location === false) {
    return defaultValue
  }

  return location.state[propName] || defaultValue
}
