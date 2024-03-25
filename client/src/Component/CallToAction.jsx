import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction({category}) {
  return (
    <div className='flex flex-col sm:flex-row  justify-center items-center p-3 text-center border-2 border-teal-300 rounded-tl-3xl rounded-br-3xl '>
        <div className="flex-1">
            <h2>Want to Learn more About {category} ?</h2>
            <p>Checkout these resouses with more than 1000 js projects</p>
            <Button className='rounded-tl-xl rounded-bl-none mx-auto mt-3 ' gradientDuoTone={"purpleToPink"}> <a href="https://github.com/Usmanghani1518" target='_blank' rel='noopner noreferrer'>100 {category} Projects</a></Button>
        </div>
        <div className="flex-1"><img className='p-7' src="https://www.freecodecamp.org/news/content/images/2023/01/cover-template--7-.png" alt="" /></div>
    </div>
  )
}
  