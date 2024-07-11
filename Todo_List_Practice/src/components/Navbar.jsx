
const Navbar = () => {
  return (
    <div className='flex justify-between bg-violet-500 text-white py-3'>
        <div className="">
            <span className=" font-bold text-xl mx-8"> i Task </span>
        </div>
      <ul className="flex gap-8 mx-8">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Task</li>
      </ul>
    </div>
  )
}

export default Navbar

