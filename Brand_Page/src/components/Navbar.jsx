const Navbar = () => {
  return (
    <>
    <nav className="flex justify-around items-center bg-slate-400">
      <div className="w-20 h-20 flex justify-around items-center">
          <img src="/src/images/MI.png" alt="" />
      </div>
      <div className="ml-5 mr-5">
        <ul className="flex justify-center items-center gap-5">
          <li>Menu</li>
          <li>Location</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <button className="bg-red-400 p-3 rounded-md text-yellow-50" type="button">Login</button>
      </div>

    </nav>
    </>
  )
}

export default Navbar
