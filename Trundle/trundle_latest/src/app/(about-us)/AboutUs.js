import React from 'react'
import './privacy.css';
import Tab from "./Tab"
import LastUpdate from './LastUpdate';

const PrivacyType = ({ subtitle, description, textCenter }) => {

  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return (
    <div className='section'>
      <p className='sub-title'>
        {subtitle}
      </p>
      {description?.map((data, index) => {
        const parts = [];
        let match;
        let lastIndex = 0;
        while ((match = urlRegex.exec(data)) !== null) {
          const link = match[0].replace(')', ''); // Remove the ending ')'
          parts.push(data.slice(lastIndex, match.index)); // Push the text before the link
          parts.push(<a key={match.index} className='about-link' style={{ color: "#6f27ff" }} href={link} target="_blank" rel="noopener noreferrer">{match[0]}</a>); // Push the link
          lastIndex = urlRegex.lastIndex; // Update the lastIndex
        }
        parts.push(data.slice(lastIndex)); // Push the remaining text after the last match

        const emailMatch = parts.find(part => typeof part === 'string' && emailRegex.test(part));
        if (emailMatch) {
          const email = emailMatch.match(emailRegex)[0];
          const emailPart = emailMatch.replace(email, '');
          parts[parts.indexOf(emailMatch)] = <a key="email" href={`mailto:${email}`} style={{ color: "#6f27ff" }}>{email}</a>;
          parts.splice(parts.indexOf(emailMatch) + 1, 0, emailPart);
        }

        // parts.push('.'); // Add a full stop at the end of the paragraph

        return (
          <div key={index} className={`description mb-2 ${textCenter && `text-center`}`} style={{ color: "#666666" }}>
            {parts}
          </div>
        );
      })}
    </div>
  )
}

const PrivacyList = ({ _subtitle, listItems }) => {
  return (
    <div className='section'>
      <p className='sub-title'>{_subtitle}</p>
      <ul className='privacy-list'>
        {listItems?.map((data, index) => {
          return (
            <li key={index}>
              <p className='mb-0' style={{ opacity: .6 }}>
                {data}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function AboutUs({ dataList, textCenter }) {
  return (
    <div className='container privacy-policy-tab'>
      <div className="row">
        <div className="col-xl-10 mx-auto">
          <Tab />
          <div className='about-page'>
            <p className='page-title text-center'>
              {dataList?.pageTitle}
            </p>
            {dataList?.sections?.map((data, index) => {
              if (data?.isList) {
                return (
                  <PrivacyList key={index} _subtitle={data?.title} listItems={data?.items} />
                )
              } else {
                return (
                  <PrivacyType key={index} subtitle={data?.title} description={data?.description} textCenter={textCenter} />
                )
              }
            })}
            <LastUpdate />
          </div>
        </div>
      </div>
    </div>
  )
}
