function CommentHeader({ name, handle, date }) {
  return (
    <div className="comment-card--header">
      <div className="comment-card--name">{name}</div>
      <div className="comment-card--username">@{handle}</div>
      <div className="comment-card--date">{date}</div>
    </div>
  );
}

export default CommentHeader;
