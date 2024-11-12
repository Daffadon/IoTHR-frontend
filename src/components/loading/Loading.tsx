import { Spinner } from "flowbite-react"

const Loading = () => {
  return (
    <div className='absolute h-screen w-full bg-black z-10 opacity-95 flex justify-center items-center'>
      <Spinner aria-label="Extra large spinner example" size="xl" />
    </div >
  )
}

export default Loading