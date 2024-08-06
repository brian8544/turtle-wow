'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NavData, { SubCategory, Category } from './data';
import cls from 'classnames';

const Nav: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [openSubItem, setOpenSubItem] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setOpenItem(index);
  };

  const handleMouseLeave = () => {
    setOpenItem(null);
    setOpenSubItem(null);
  };

  const handleSubMouseEnter = (subIndex: number) => {
    setOpenSubItem(subIndex);
  };

  const handleSubMouseLeave = () => {
    setOpenSubItem(null);
  };

  return (
      <nav className="flex justify-around relative z-50">
        <ul className="flex list-none m-0 p-0 relative z-50" onMouseLeave={handleMouseLeave}>
          {NavData.map((item, index) => (
            <li
              key={index}
              className={`relative z-50`}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <Link href={item.url} className="{text-white no-underline p-2 block hover:bg-lightGray rounded-md">
                {item.categoryName} {(item.categories || []).length > 0 ? '>' : ''}
              </Link>
              {(item.categories || []).length > 0 && (
                <ul className={`absolute bg-lightGray list-none m-0 p-0 top-full left-0 min-w-[150px] ${openItem === index ? 'block' : 'hidden'} z-50`}>
                  {(item.categories || []).map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`
												dropdownItem
												hover:bg-gray
												relative
												tw-surface
												p-2
												z-50
											`}
                      onMouseEnter={() => handleSubMouseEnter(subIndex)}
                      onMouseLeave={handleSubMouseLeave}
                    >
                      <Link href={subItem.url} className="text-white no-underline p-2 block hover:bg-gray-600 rounded-md">
                        {subItem.categoryName || subItem.name} {(subItem.categories || []).length > 0 ? '>' : ''}
                      </Link>
                      {(subItem.categories || []).length > 0 && (
                        <ul className={`tw-surface absolute bg-gray-600 list-none m-0 p-0 top-0 left-full min-w-[150px] ${openSubItem === subIndex ? 'block' : 'hidden'} z-50`}>
                          {(subItem.categories || []).map((subSubItem, subSubIndex) => (
                            <li className="dropdownItem p-2 hover:bg-gray" key={subSubIndex}>
                              <Link href={subSubItem.url} className="text-white no-underline p-2 block hover:bg-gray-500 rounded-md">
                                {(subSubItem as Category).name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
  );
};

export default Nav;
