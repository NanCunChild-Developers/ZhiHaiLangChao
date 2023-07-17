'use client';

import ReactMarkdown from "react-markdown";
import Async from "@/app/components/Async";

const Markdown: React.FC<{
  href?: string,
}> = ({href}) => {
  return <Async promiseFn={() => {
    if (href === undefined) {
      return Promise.resolve("");
    }
    return (async () => {
      const resp = await fetch(href);
      if (resp.ok) {
        return await resp.text();
      } else {
        return Promise.reject(resp.statusText);
      }
    })();
  }}>
    <Async.Pending>
      {"Now loading"}
    </Async.Pending>
    <Async.Rejected>
      {error => {
        console.error(error);
        return <div>Failed to load</div>
      }}
    </Async.Rejected>
    <Async.Fulfilled>
      {data => {
        console.log(data);
        return <ReactMarkdown>
          {data as string}
        </ReactMarkdown>
      }}
    </Async.Fulfilled>
  </Async>
};

export default Markdown;