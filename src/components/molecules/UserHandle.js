const UserHandle = ({ user }) => (
  <div className="main-card--user-info">
    <div className="main-card--name">{user.nome}</div>
    <div className="main-card--username">@{user.usuario}</div>
  </div>
);

export default UserHandle;
