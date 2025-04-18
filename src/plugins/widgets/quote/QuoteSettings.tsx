import React, { FC } from "react";
// import categories from "./categories";
import { FormattedMessage } from "react-intl";
import { Props, defaultData } from "./types";

const QuoteSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="QuoteSettings">
    {/* <h5><FormattedMessage
          id="plugins.quotes.dailyQuotes"
          defaultMessage="Daily Quotes"
          description="Daily Quotes title"
        /></h5>
    {categories.map((category) => (
      <label key={category.key}>
        <input
          type="radio"
          checked={data.category === category.key}
          onChange={() => setData({ category: category.key })}
        />{" "}
        {category.name}
      </label>
    ))}
    <p>
    <FormattedMessage
          id="plugins.poweredBy"
          defaultMessage="Powered by"
          description="Powered by title"
        />{" "}
      <a
        href="https://theysaidso.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        They Said So
      </a>
    </p> */}
    <p>Daily Quotes from 'They Said So' are no longer available, I apologize for the inconvenience this may have caused.</p>

    <label>
      <input
        type="radio"
        checked={data.category === "dwyl"}
        onChange={() => setData({ category: "dwyl" })}
      />{" "}
      Quotes from 'dwyl'
    </label>
    <p>
      Powered by{" "}
      <a
        href="https://github.com/dwyl/quotes"
        target="_blank"
        rel="noopener noreferrer"
      >
        DWYL Quotes
      </a>
    </p>

    <label>
      <input
        type="radio"
        checked={data.category === "quotable"}
        onChange={() => setData({ category: "quotable" })}
      />{" "}
      Random Quotable Quote
    </label>
    <p>
      Powered by{" "}
      <a
        href="https://github.com/lukePeavey/quotable"
        target="_blank"
        rel="noopener noreferrer"
      >
        Quotable
      </a>
    </p>

    <label>
      <input
        type="radio"
        checked={data.category === "randomBible"}
        onChange={() => setData({ category: "randomBible" })}
      />{" "}
      <FormattedMessage
        id="plugins.quotes.randomBibleVerse"
        defaultMessage="Random Bible Verse"
        description="Bible verse option"
      />
    </label>
    <p>
      <FormattedMessage
        id="plugins.quotes.randomBibleVerseDescription"
        defaultMessage="Top inspirational verses from the Bible."
        description="Bible verse description"
      />
    </p>

    <h5><FormattedMessage
          id="plugins.quotes.hourlyQuotes"
          defaultMessage="Hourly Quotes"
          description="Hourly Quotes title"
        /></h5>
    <label>
      <input
        type="radio"
        checked={data.category === "developerexcuses"}
        onChange={() => setData({ category: "developerexcuses" })}
      />{" "}
      Developer Excuses
    </label>
    <p>
    <FormattedMessage
          id="plugins.poweredBy"
          defaultMessage="Powered by"
          description="Powered by title"
        />{" "}
      <a
        href="http://www.developerexcuses.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developer Excuses
      </a>
    </p>
  </div>
);

export default QuoteSettings;