
export const Navbar = () => {
  return (
    <nav className='flex justify-around bg-purple-500 text-white py-3 text-lg'>
       <div className="logo">
         <span className='font-bold text-xl mx-8'>Task</span>
       </div>
        <ul className="flex gap-9">
            <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all  '>Your Tasks</li>
        </ul>
    </nav>
  )
}
