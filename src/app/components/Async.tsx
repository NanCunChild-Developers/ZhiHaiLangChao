'use client'

import React, {ReactNode} from "react"

const propTypes = (() => {
  let PropTypes
  try {
    PropTypes = require("prop-types")
  } catch (e) {
  }

  const childrenFn = PropTypes && PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  const stateObject =
    PropTypes &&
    PropTypes.shape({
      initialValue: PropTypes.any,
      data: PropTypes.any,
      error: PropTypes.instanceOf(Error),
      value: PropTypes.any,
      startedAt: PropTypes.instanceOf(Date),
      finishedAt: PropTypes.instanceOf(Date),
      status: PropTypes.oneOf(["initial", "pending", "fulfilled", "rejected"]),
      isInitial: PropTypes.bool,
      isPending: PropTypes.bool,
      isLoading: PropTypes.bool,
      isFulfilled: PropTypes.bool,
      isResolved: PropTypes.bool,
      isRejected: PropTypes.bool,
      isSettled: PropTypes.bool,
      counter: PropTypes.number,
      promise: PropTypes.instanceOf(Promise),
      run: PropTypes.func,
      reload: PropTypes.func,
      cancel: PropTypes.func,
      setData: PropTypes.func,
      setError: PropTypes.func,
    })

  return PropTypes && {
    Async: {
      children: childrenFn,
      promise: PropTypes.instanceOf(Promise),
      promiseFn: PropTypes.func,
      deferFn: PropTypes.func,
      watch: PropTypes.any,
      watchFn: PropTypes.func,
      initialValue: PropTypes.any,
      onResolve: PropTypes.func,
      onReject: PropTypes.func,
      reducer: PropTypes.func,
      dispatcher: PropTypes.func,
      debugLabel: PropTypes.string,
      suspense: PropTypes.bool,
    },
    Initial: {
      children: childrenFn,
      state: stateObject.isRequired,
      persist: PropTypes.bool,
    },
    Pending: {
      children: childrenFn,
      state: stateObject.isRequired,
      initial: PropTypes.bool,
    },
    Fulfilled: {
      children: childrenFn,
      state: stateObject.isRequired,
      persist: PropTypes.bool,
    },
    Rejected: {
      children: childrenFn,
      state: stateObject.isRequired,
      persist: PropTypes.bool,
    },
    Settled: {
      children: childrenFn,
      state: stateObject.isRequired,
      persist: PropTypes.bool,
    },
  }
})();

const globalScope = (() => {
  const glbl = global as any;
  if (typeof self === "object" && self.self === self) return self;
  if (typeof glbl === "object" && glbl.global === glbl) return glbl;
  if (typeof glbl === "object" && glbl.GLOBAL === glbl) return glbl;
  return {}; // fallback that relies on imported modules to be singletons
})();

globalScope.__REACT_ASYNC__ = globalScope.__REACT_ASYNC__ || {}
const noop = () => {
};

class MockAbortController implements AbortController {
  public abort = noop;
  readonly signal = {} as AbortSignal;
}

type AsyncChildren<T> = ((state: AsyncState<T>) => React.ReactNode) | React.ReactNode;
type DeferFn<T> = (
  args: any[],
  props: AsyncProps<T>,
  controller: AbortController
) => Promise<T>;
type PromiseFn<T> = (props: AsyncProps<T>, controller: AbortController) => Promise<T>;
type ReducerBaseState<T> = Omit<
  AbstractState<T>,
  "run" | "reload" | "cancel" | "setData" | "setError"
>;
type ReducerAsyncState<T> = BaseAsyncState<T, ReducerBaseState<T>>;

interface AbstractAction {
  type: string
  meta: { counter: number; [meta: string]: any }
}

type Start = AbstractAction & { type: "start"; payload: () => Promise<void> };
type Cancel = AbstractAction & { type: "cancel" };
type Fulfill<T> = AbstractAction & { type: "fulfill"; payload: T };
type Reject = AbstractAction & { type: "reject"; payload: Error; error: true };
type AsyncAction<T> = Start | Cancel | Fulfill<T> | Reject;

interface AsyncOptions<T> {
  promise?: Promise<T>
  promiseFn?: PromiseFn<T>
  deferFn?: DeferFn<T>
  watch?: any
  watchFn?: (props: AsyncProps<T>, prevProps: AsyncProps<T>) => any
  initialValue?: T
  onResolve?: (data: T) => void
  onReject?: (error: Error) => void
  reducer?: (
    state: ReducerAsyncState<T>,
    action: AsyncAction<T>,
    internalReducer: (state: ReducerAsyncState<T>, action: AsyncAction<T>) => ReducerAsyncState<T>
  ) => AsyncState<T>
  dispatcher?: (
    action: AsyncAction<T>,
    internalDispatch: (action: AsyncAction<T>) => void,
    props: AsyncProps<T>
  ) => void
  debugLabel?: string

  [prop: string]: any
}

interface AsyncProps<T> extends AsyncOptions<T> {
  children?: AsyncChildren<T>
}

interface AbstractState<T> {
  initialValue?: T | Error
  counter: number
  promise: Promise<T>
  run: (...args: any[]) => void
  reload: () => void
  cancel: () => void
  setData: (data: T, callback?: () => void) => T
  setError: (error: Error, callback?: () => void) => Error
}

type AsyncInitial<T, S = AbstractState<T>> = S & {
  initialValue?: undefined
  data: undefined
  error: undefined
  value: undefined
  startedAt: undefined
  finishedAt: undefined
  status: "initial"
  isInitial: false
  isPending: false
  isLoading: false
  isFulfilled: false
  isResolved: false
  isRejected: false
  isSettled: false
}
type AsyncPending<T, S = AbstractState<T>> = S & {
  data: T | undefined
  error: Error | undefined
  value: T | Error | undefined
  startedAt: Date
  finishedAt: undefined
  status: "pending"
  isInitial: false
  isPending: true
  isLoading: true
  isFulfilled: false
  isResolved: false
  isRejected: false
  isSettled: false
}
type AsyncFulfilled<T, S = AbstractState<T>> = S & {
  data: T
  error: undefined
  value: T
  startedAt: Date
  finishedAt: Date
  status: "fulfilled"
  isInitial: false
  isPending: false
  isLoading: false
  isFulfilled: true
  isResolved: true
  isRejected: false
  isSettled: true
}
type AsyncRejected<T, S = AbstractState<T>> = S & {
  data: T | undefined
  error: Error
  value: Error
  startedAt: Date
  finishedAt: Date
  status: "rejected"
  isInitial: false
  isPending: false
  isLoading: false
  isFulfilled: false
  isResolved: false
  isRejected: true
  isSettled: true
}
type BaseAsyncState<T, S> =
  | AsyncInitial<T, S>
  | AsyncPending<T, S>
  | AsyncFulfilled<T, S>
  | AsyncRejected<T, S>
type AsyncState<T, S extends AbstractState<T> = AbstractState<T>> = BaseAsyncState<T, S>
type InitialChildren<T> = ((state: AsyncInitial<T>) => React.ReactNode) | React.ReactNode
type PendingChildren<T> = ((state: AsyncPending<T>) => React.ReactNode) | React.ReactNode
type FulfilledChildren<T> =
  | ((data: T, state: AsyncFulfilled<T>) => React.ReactNode)
  | React.ReactNode
type RejectedChildren<T> =
  | ((error: Error, state: AsyncRejected<T>) => React.ReactNode)
  | React.ReactNode
type SettledChildren<T> =
  | ((state: AsyncFulfilled<T> | AsyncRejected<T>) => React.ReactNode)
  | React.ReactNode

interface InitialProps<T> {
  children?: InitialChildren<T>
  persist?: boolean
}

interface PendingProps<T> {
  children?: PendingChildren<T>
  initial?: boolean
}

interface FulfilledProps<T> {
  children?: FulfilledChildren<T>
  persist?: boolean
}

interface RejectedProps<T> {
  children?: RejectedChildren<T>
  persist?: boolean
}

interface SettledProps<T> {
  children?: SettledChildren<T>
  persist?: boolean
}

class Async<T> extends React.Component<AsyncProps<T>, AsyncState<T>> {
}

type GenericAsync = typeof Async & {
  Initial<T>(props: InitialProps<T>): ReactNode
  Pending<T>(props: PendingProps<T>): ReactNode
  Loading<T>(props: PendingProps<T>): ReactNode
  Fulfilled<T>(props: FulfilledProps<T>): ReactNode
  Resolved<T>(props: FulfilledProps<T>): ReactNode
  Rejected<T>(props: RejectedProps<T>): ReactNode
  Settled<T>(props: SettledProps<T>): ReactNode
}

type AsyncConstructor<T> = React.ComponentClass<AsyncProps<T>> & {
  Initial: React.FC<InitialProps<T>>
  Pending: React.FC<PendingProps<T>>
  Loading: React.FC<PendingProps<T>>
  Fulfilled: React.FC<FulfilledProps<T>>
  Resolved: React.FC<FulfilledProps<T>>
  Rejected: React.FC<RejectedProps<T>>
  Settled: React.FC<SettledProps<T>>
}

const NeverSettle = (function () {
} as unknown) as { new(): Promise<never> }
/* istanbul ignore next */
if (Object.setPrototypeOf) {
  Object.setPrototypeOf(NeverSettle, Promise)
} else {
  ;(NeverSettle as any).__proto__ = Promise
}
NeverSettle.prototype = Object.assign(Object.create(Promise.prototype), {
  finally() {
    return this
  },
  catch() {
    return this
  },
  then() {
    return this
  },
})
const neverSettle = new NeverSettle()

enum ActionTypes {
  start = "start",
  cancel = "cancel",
  fulfill = "fulfill",
  reject = "reject",
}

enum StatusTypes {
  initial = "initial",
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
}

const getStatusProps = (status: StatusTypes) => ({
  status,
  isInitial: status === StatusTypes.initial,
  isPending: status === StatusTypes.pending,
  isLoading: status === StatusTypes.pending, // alias
  isFulfilled: status === StatusTypes.fulfilled,
  isResolved: status === StatusTypes.fulfilled, // alias
  isRejected: status === StatusTypes.rejected,
  isSettled: status === StatusTypes.fulfilled || status === StatusTypes.rejected,
})
const getInitialStatus = <T, >(value?: T | Error, promise?: Promise<T> | PromiseFn<T>) => {
  if (value instanceof Error) return StatusTypes.rejected
  if (value !== undefined) return StatusTypes.fulfilled
  if (promise) return StatusTypes.pending
  return StatusTypes.initial
}
const getIdleStatus = <T, >(value?: T | Error) => {
  if (value instanceof Error) return StatusTypes.rejected
  if (value !== undefined) return StatusTypes.fulfilled
  return StatusTypes.initial
}
const init = <T, >({
                     initialValue,
                     promise,
                     promiseFn,
                   }: {
  initialValue?: Error | T
  promise?: Promise<T>
  promiseFn?: PromiseFn<T>
}) =>
  ({
    initialValue,
    data: initialValue instanceof Error ? undefined : initialValue,
    error: initialValue instanceof Error ? initialValue : undefined,
    value: initialValue,
    startedAt: promise || promiseFn ? new Date() : undefined,
    finishedAt: initialValue ? new Date() : undefined,
    ...getStatusProps(getInitialStatus(initialValue, promise || promiseFn)),
    counter: 0,
    promise: neverSettle,
  } as ReducerAsyncState<T>)

const asyncReducer = <T, >(state: ReducerAsyncState<T>, action: AsyncAction<T>) => {
  switch (action.type) {
    case ActionTypes.start:
      return {
        ...state,
        startedAt: new Date(),
        finishedAt: undefined,
        ...getStatusProps(StatusTypes.pending),
        counter: action.meta.counter,
        promise: action.meta.promise,
      } as AsyncPending<T, ReducerBaseState<T>>
    case ActionTypes.cancel:
      return {
        ...state,
        startedAt: undefined,
        finishedAt: undefined,
        ...getStatusProps(getIdleStatus(state.error || state.data)),
        counter: action.meta.counter,
        promise: action.meta.promise,
      } as
        | AsyncInitial<T, ReducerBaseState<T>>
        | AsyncFulfilled<T, ReducerBaseState<T>>
        | AsyncRejected<T, ReducerBaseState<T>>
    case ActionTypes.fulfill:
      return {
        ...state,
        data: action.payload,
        value: action.payload,
        error: undefined,
        finishedAt: new Date(),
        ...getStatusProps(StatusTypes.fulfilled),
        promise: action.meta.promise,
      } as AsyncFulfilled<T, ReducerBaseState<T>>
    case ActionTypes.reject:
      return {
        ...state,
        error: action.payload,
        value: action.payload,
        finishedAt: new Date(),
        ...getStatusProps(StatusTypes.rejected),
        promise: action.meta.promise,
      } as AsyncRejected<T, ReducerBaseState<T>>
    default:
      return state
  }
}
const dispatchMiddleware = <T, >(
  dispatch: (action: AsyncAction<T>, ...args: any[]) => void
) => (action: AsyncAction<T>, ...args: unknown[]) => {
  dispatch(action, ...args)
  if (action.type === ActionTypes.start && typeof action.payload === "function") {
    void action.payload();
  }
}


type ChildrenFn = (...args: any[]) => React.ReactNode

const renderFn = (children: React.ReactNode | ChildrenFn, ...args: any[]) => {
  if (typeof children === "function") {
    const render = children as ChildrenFn
    return render(...args)
  }
  return children
}
/**
 * Renders only when no promise has started or completed yet.
 *
 * @prop {Function|Node} children Function (passing state) or React node
 * @prop {Object} state React Async state object
 * @prop {boolean} persist Show until we have data, even while pending (loading) or when an error occurred
 */
const IfInitial = <T extends {}>({
                                   children,
                                   persist,
                                   state = {} as any,
                                 }: {
  children?: InitialChildren<T>
  persist?: boolean
  state: AsyncState<T>
}) => <>{state.isInitial || (persist && !state.data) ? renderFn(children, state) : null}</>

/**
 * Renders only while pending (promise is loading).
 *
 * @prop {Function|Node} children Function (passing state) or React node
 * @prop {Object} state React Async state object
 * @prop {boolean} initial Show only on initial load (data is undefined)
 */
const IfPending = <T extends {}>({
                                   children,
                                   initial,
                                   state = {} as any,
                                 }: {
  children?: PendingChildren<T>
  initial?: boolean
  state: AsyncState<T>
}) => <>{state.isPending && (!initial || !state.value) ? renderFn(children, state) : null}</>

/**
 * Renders only when promise is resolved.
 *
 * @prop {Function|Node} children Function (passing data and state) or React node
 * @prop {Object} state React Async state object
 * @prop {boolean} persist Show old data while pending (promise is loading)
 */
const IfFulfilled = <T extends {}>({
                                     children,
                                     persist,
                                     state = {} as any,
                                   }: {
  children?: FulfilledChildren<T>
  persist?: boolean
  state: AsyncState<T>
}) => (
  <>{state.isFulfilled || (persist && state.data) ? renderFn(children, state.data, state) : null}</>
)

/**
 * Renders only when promise is rejected.
 *
 * @prop {Function|Node} children Function (passing error and state) or React node
 * @prop {Object} state React Async state object
 * @prop {boolean} persist Show old error while pending (promise is loading)
 */
const IfRejected = <T extends {}>({
                                    children,
                                    persist,
                                    state = {} as any,
                                  }: {
  children?: RejectedChildren<T>
  persist?: boolean
  state: AsyncState<T>
}) => (
  <>
    {state.isRejected || (persist && state.error) ? renderFn(children, state.error, state) : null}
  </>
)

/**
 * Renders only when promise is fulfilled or rejected.
 *
 * @prop {Function|Node} children Function (passing state) or React node
 * @prop {Object} state React Async state object
 * @prop {boolean} persist Show old data or error while pending (promise is loading)
 */
const IfSettled = <T extends {}>({
                                   children,
                                   persist,
                                   state = {} as any,
                                 }: {
  children?: SettledChildren<T>
  persist?: boolean
  state: AsyncState<T>
}) => <>{state.isSettled || (persist && state.value) ? renderFn(children, state) : null}</>

/**
 * createInstance allows you to create instances of Async that are bound to a specific promise.
 * A unique instance also uses its own React context for better nesting capability.
 */
function createInstance<T extends {}>(
  defaultOptions: AsyncProps<T> = {},
  displayName = "Async"
): AsyncConstructor<T>{
  const {Consumer: UnguardedConsumer, Provider} = React.createContext<AsyncState<T> | undefined>(
    undefined
  )

  function Consumer({children}: { children: (value: AsyncState<T>) => React.ReactNode }) {
    return (
      <UnguardedConsumer>
        {value => {
          if (!value) {
            throw new Error(
              "this component should only be used within an associated <Async> component!"
            )
          }
          return children(value)
        }}
      </UnguardedConsumer>
    )
  }

  type Props = AsyncProps<T>
  type State = AsyncState<T>
  type Constructor = AsyncConstructor<T>

  class Async extends React.Component<Props, State> {
    private mounted = false
    private counter = 0
    private args: any[] = []
    private promise?: Promise<T> = neverSettle
    private abortController: AbortController = new MockAbortController()
    private readonly debugLabel?: string
    private readonly dispatch: (action: AsyncAction<T>, ...args: any[]) => void

    constructor(props: Props) {
      super(props)

      this.start = this.start.bind(this)
      this.load = this.load.bind(this)
      this.run = this.run.bind(this)
      this.cancel = this.cancel.bind(this)
      this.onResolve = this.onResolve.bind(this)
      this.onReject = this.onReject.bind(this)
      this.setData = this.setData.bind(this)
      this.setError = this.setError.bind(this)

      const promise = props.promise
      const promiseFn = props.promiseFn || defaultOptions.promiseFn
      const initialValue = props.initialValue || defaultOptions.initialValue

      this.state = {
        ...init<T>({initialValue, promise, promiseFn}),
        cancel: this.cancel,
        run: this.run,
        reload: () => {
          this.load()
          void this.run(...this.args)
        },
        setData: this.setData,
        setError: this.setError,
      }
      this.debugLabel = props.debugLabel || defaultOptions.debugLabel

      const {devToolsDispatcher} = globalScope.__REACT_ASYNC__
      const _reducer = props.reducer || defaultOptions.reducer
      const _dispatcher = props.dispatcher || defaultOptions.dispatcher || devToolsDispatcher
      const reducer: (
        state: ReducerAsyncState<T>,
        action: AsyncAction<T>
      ) => ReducerAsyncState<T> = _reducer
        ? (state, action) => _reducer(state, action, asyncReducer)
        : asyncReducer
      const dispatch = dispatchMiddleware<T>((action, callback) => {
        this.setState(state => reducer(state, action), callback)
      })
      this.dispatch = _dispatcher ? action => _dispatcher(action, dispatch, props) : dispatch
    }

    componentDidMount() {
      this.mounted = true
      if (this.props.promise || !this.state.initialValue) {
        this.load()
      }
    }

    componentDidUpdate(prevProps: Props) {
      const {watch, watchFn = defaultOptions.watchFn, promise, promiseFn} = this.props
      if (watch !== prevProps.watch) {
        if (this.counter) this.cancel()
        return this.load()
      }
      if (
        watchFn &&
        watchFn({...defaultOptions, ...this.props}, {...defaultOptions, ...prevProps})
      ) {
        if (this.counter) this.cancel()
        return this.load()
      }
      if (promise !== prevProps.promise) {
        if (this.counter) this.cancel()
        if (promise) return this.load()
      }
      if (promiseFn !== prevProps.promiseFn) {
        if (this.counter) this.cancel()
        if (promiseFn) return this.load()
      }
    }

    componentWillUnmount() {
      this.cancel()
      this.mounted = false
    }

    getMeta<M>(meta?: M) {
      return {
        counter: this.counter,
        promise: this.promise,
        debugLabel: this.debugLabel,
        ...meta,
      }
    }

    start(promiseFn: () => Promise<T>) {
      if ("AbortController" in globalScope) {
        this.abortController.abort()
        this.abortController = new globalScope.AbortController!()
      }
      this.counter++
      return (this.promise = new Promise((resolve, reject) => {
        if (!this.mounted) return
        const executor = () => promiseFn().then(resolve, reject)
        this.dispatch({type: ActionTypes.start, payload: executor, meta: this.getMeta()})
      }))
    }

    load() {
      const promise = this.props.promise
      const promiseFn = this.props.promiseFn || defaultOptions.promiseFn
      if (promise) {
        this.start(() => promise)
          .then(this.onResolve(this.counter))
          .catch(this.onReject(this.counter))
      } else if (promiseFn) {
        const props = {...defaultOptions, ...this.props}
        this.start(() => promiseFn(props, this.abortController))
          .then(this.onResolve(this.counter))
          .catch(this.onReject(this.counter))
      }
    }

    run(...args: any[]) {
      const deferFn = this.props.deferFn || defaultOptions.deferFn
      if (deferFn) {
        this.args = args
        const props = {...defaultOptions, ...this.props}
        return this.start(() => deferFn(args, props, this.abortController)).then(
          this.onResolve(this.counter),
          this.onReject(this.counter)
        )
      }
    }

    cancel() {
      const onCancel = this.props.onCancel || defaultOptions.onCancel
      onCancel && onCancel()
      this.counter++
      this.abortController.abort()
      this.mounted && this.dispatch({type: ActionTypes.cancel, meta: this.getMeta()})
    }

    onResolve(counter: Number) {
      return (data: T) => {
        if (this.counter === counter) {
          const onResolve = this.props.onResolve || defaultOptions.onResolve
          this.setData(data, () => onResolve && onResolve(data))
        }
        return data
      }
    }

    onReject(counter: Number) {
      return (error: Error) => {
        if (this.counter === counter) {
          const onReject = this.props.onReject || defaultOptions.onReject
          this.setError(error, () => onReject && onReject(error))
        }
        return error
      }
    }

    setData(data: T, callback?: () => void) {
      this.mounted &&
      this.dispatch({type: ActionTypes.fulfill, payload: data, meta: this.getMeta()}, callback)
      return data
    }

    setError(error: Error, callback?: () => void) {
      this.mounted &&
      this.dispatch(
        {type: ActionTypes.reject, payload: error, error: true, meta: this.getMeta()},
        callback
      )
      return error
    }

    render() {
      const {children, suspense} = this.props
      if (suspense && this.state.isPending && this.promise !== neverSettle) {
        // Rely on Suspense to handle the loading state
        throw this.promise
      }
      if (typeof children === "function") {
        const render = children as (state: State) => React.ReactNode
        return <Provider value={this.state}>{render(this.state)}</Provider>
      }
      if (children !== undefined && children !== null) {
        return <Provider value={this.state}>{children}</Provider>
      }
      return null
    }
  }

  if (propTypes) (Async as React.ComponentClass).propTypes = propTypes.Async

  const AsyncInitial: Constructor["Initial"] = props => (
    <Consumer>{st => <IfInitial<T> {...props} state={st}/>}</Consumer>
  )
  const AsyncPending: Constructor["Pending"] = props => (
    <Consumer>{st => <IfPending<T> {...props} state={st}/>}</Consumer>
  )
  const AsyncFulfilled: Constructor["Fulfilled"] = props => (
    <Consumer>{st => <IfFulfilled<T> {...props} state={st}/>}</Consumer>
  )
  const AsyncRejected: Constructor["Rejected"] = props => (
    <Consumer>{st => <IfRejected<T> {...props} state={st}/>}</Consumer>
  )
  const AsyncSettled: Constructor["Settled"] = props => (
    <Consumer>{st => <IfSettled<T> {...props} state={st}/>}</Consumer>
  )

  AsyncInitial.displayName = `${displayName}.Initial`
  AsyncPending.displayName = `${displayName}.Pending`
  AsyncFulfilled.displayName = `${displayName}.Fulfilled`
  AsyncRejected.displayName = `${displayName}.Rejected`
  AsyncSettled.displayName = `${displayName}.Settled`

  return Object.assign(Async, {
    displayName: displayName,
    Initial: AsyncInitial,
    Pending: AsyncPending,
    Loading: AsyncPending, // alias
    Fulfilled: AsyncFulfilled,
    Resolved: AsyncFulfilled, // alias
    Rejected: AsyncRejected,
    Settled: AsyncSettled,
  })
}

export default createInstance() as GenericAsync;