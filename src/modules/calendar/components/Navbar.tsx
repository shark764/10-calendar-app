const Navbar = () => {
  const authName = 'Daniel Hernandez';

  const handleLogout = () => {
    console.log('Bye!');
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt" />
        &nbsp;{authName}
      </span>

      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={handleLogout}>
        <i className="fa-solid fa-right-from-bracket" />
        <span>&nbsp;Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
