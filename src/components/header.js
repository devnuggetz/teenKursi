import React from "react";

export default function Header() {
  return (
    <header>
      <div className='header-inner'>
        <div className='logo'>KURSI.</div>
        <nav>
          <ul>
            <li>
              <a href='/'>DEKHO</a>
            </li>
            <li>
              <a href='/'>BECHO</a>
            </li>
            <li>
              <a href='/'>KHAREEDO</a>
            </li>
            <li className='btn'>
              <a href='/'>ORDER</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}