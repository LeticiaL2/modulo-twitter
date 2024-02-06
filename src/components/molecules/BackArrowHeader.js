import BackArrowIcon from '../atoms/BackArrowIcon';

const BackArrowHeader = ({ title }) => (
  <div className="tweet-details--header">
    <div className="tweet-details--back-arrow-container">
      <a className="tweet-details--back-anchor" href="/feed">
        <BackArrowIcon className="tweet-details--back-arrow" />
      </a>
    </div>
    <div className="tweet-details--header-title">{title}</div>
  </div>
);

export default BackArrowHeader;
