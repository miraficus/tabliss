import React from "react";

interface Props {
  title: string;
  copyright?: string;
}

const Credit: React.FC<Props> = ({ title, copyright }) => (
  <div className="title" style={{ lineHeight: 0 }}>
    <p dangerouslySetInnerHTML={{ __html: title }}></p>
    {copyright && (
      <p
        style={{ textAlign: "right" }}
        dangerouslySetInnerHTML={{ __html: `&copy; ${copyright}` }}
      ></p>
    )}
  </div>
);

export default Credit;

