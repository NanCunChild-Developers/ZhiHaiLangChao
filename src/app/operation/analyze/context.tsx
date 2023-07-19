import React, {ReactNode} from "react";

class PropsWrapper<T> {
  public readonly name: string|undefined;
  private readonly __getter__: () => T | undefined;
  private readonly __setter__: (value: T | undefined) => void;

  constructor(name:string|undefined,getter: () => T | undefined, setter: (value: T | undefined) => void) {
    this.name = name;
    this.__getter__ = getter;
    this.__setter__ = setter;
  }

  get value() {
    return this.__getter__();
  }

  set value(value: T | undefined) {
    this.__setter__(value);
  }
}

type AnalyzeContextType = {
  current?: PropsWrapper<string>;
}
const context = React.createContext<AnalyzeContextType>(null!);
const {Provider} = context;

const WrappedAnalyzeContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [current, setCurrent] = React.useState<string>();
  return <Provider value={{
    current: new PropsWrapper("current",() => current, setCurrent)
  }}>
    {children}
  </Provider>
}

async function ProcessUploads(files: object[]) {
  console.log(files);
}

export type {
  AnalyzeContextType,
}

export {
  PropsWrapper,
  context as AnalyzeContext,
  Provider as AnalyzeContextProvider,
  WrappedAnalyzeContextProvider,
  ProcessUploads
}