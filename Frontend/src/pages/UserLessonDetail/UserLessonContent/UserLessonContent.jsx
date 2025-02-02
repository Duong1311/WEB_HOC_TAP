import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkParse from "remark-parse";
import rehypeHighlight from "rehype-highlight";

/* eslint-disable react/prop-types */
export default function UserLessonContent({ markdown }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Select all iframes within the contentRef and add the allowfullscreen attribute
      const iframes = contentRef.current.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        // console.log("Adding allowfullscreen to iframe:", iframe); // Debugging line
        iframe.setAttribute("allowfullscreen", "true");
      });
    }
  }, [markdown]);
  // console.log("Markdown:", markdown); // Debugging line
  return (
    <div className="center min-h-screen mt-10">
      <style>
        {`.center img {
              display: block;
              margin-left: auto;
              margin-right: auto;
              max-width: 100%;
              padding-top: 40px;
              padding-bottom: 40px;
          }
          .center iframe {
              display: block;
              margin-left: auto;
              margin-right: auto;
              padding-top: 40px;
              padding-bottom: 40px;
              width: 100%;
              height: 700px;
          }
          `}
      </style>

      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: markdown }} />
      {/* <Markdown
        remarkPlugins={[remarkGfm, remarkParse]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
      >
        {markdown}
      </Markdown> */}
    </div>
  );
}
