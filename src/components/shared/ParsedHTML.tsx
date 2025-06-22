"use client";
import React, { useEffect } from "react";
import Prism from "prismjs";
import parse, { domToReact, HTMLReactParserOptions, Element } from "html-react-parser";

import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-r";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-mongodb";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface Props {
    data: string;
}

const CopyButton = ({ code }: { code: string }) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
        } catch (err) {
            // fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            console.log(err)
        }
    };
    return (
        <button
            onClick={handleCopy}
            style={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 2,
                padding: "2px 8px",
                fontSize: "0.9em",
                cursor: "pointer",
                background: "#eee",
                border: "1px solid #ccc",
                borderRadius: "4px"
            }}
        >
            Copy
        </button>
    );
};

const options: HTMLReactParserOptions = {
    replace(domNode) {
        if (
            domNode instanceof Element &&
            domNode.name === "pre" &&
            domNode.children.length &&
            domNode.children[0] instanceof Element &&
            domNode.children[0].name === "code"
        ) {
            const codeElement = domNode.children[0] as Element;
            const codeText = codeElement.children
                .map(child => (typeof child === "string" ? child : ""))
                .join("");

            // Only render the original <pre> with its children, not the whole <pre> again
            return (
                <div style={{ position: "relative" }}>
                    <CopyButton code={codeText} />
                    {domToReact([domNode], { replace: undefined })}
                </div>
            );
        }
    }
};

const ParseHTML = ({ data }: Props) => {
    useEffect(() => {
        Prism.highlightAll();
    }, [data]);

    return <div>{parse(data, options)}</div>;
};

export default ParseHTML;