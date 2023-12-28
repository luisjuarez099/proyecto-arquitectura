"use client";
import React from 'react'
const footerNavs = [
    {
        href: '/',
        name: 'About'
    },
    {
        href: '/',
        name: 'Blog'
    },
    {
        href: '/Contacto',
        name: 'Contacto'
    },
    {
        href: '/',
        name: 'Team'
    },
    {
        href: '/',
        name: 'Careers'
    },

    {
        href: '/dashboard/profile',
        name: 'Perfil'
    }
]
export const Footer = () => {
  return (
    <div>
         <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <p className="leading-relaxed mt-2 text-[15px]">
                    Lorem Ipsum has been the &reg; standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                {
                    footerNavs.map((nav, index) => (
                        <li key={index}>
                            <a href={nav.href}>
                                {nav.name.toLowerCase()}
                            </a>
                        </li>
                    )
                )}
            </ul>
            <div className="mt-8 items-center justify-between sm:flex">
                <div className="mt-4 sm:mt-0">
                    &copy; 2022 Float UI All rights reserved.
                </div>
                
            </div>
            <style jsx>{`
                .svg-icon path,
                .svg-icon polygon,
                .svg-icon rect {
                    fill: currentColor;
                }
            `}</style>
        </footer>
    </div>
  )
}
