import GuestLayout from '../components/layout/GuestLayout';
import hr from '../assets/ilustration/hrilustration.svg';
import tech from '../assets/ilustration/tech_ilustration.png';
import elipse from '../assets/ilustration/elipse.png';
import { steps } from '../data/page/landing/characteristic';
import Card from '../components/card/Card';
import { Link } from 'react-router-dom';
import bg from '../assets/background/section1_landing.svg';
const Landing = () => {
  return (
    <GuestLayout>
      <div className="flex flex-col">
        <div className="flex justify-center items-center h-[85vh] py-[10em] relative overflow-hidden">
          <img src={bg} alt="elipse" className="absolute -z-10 -right-52 -top-10 w-1/2 h-1/2" />
          <div className="w-1/2 flex justify-center items-center ">
            <img src={hr} alt="Ilustrasi" />
          </div>
          <div className="w-1/2 px-10">
            <h2 className="text-4xl font-bold text-blue-800">Let's Check Your Heartbeat</h2>
            <p className="w-10/12 mt-5 text-lg">
              Take charge of your well-being by checking your heartbeat for arrhythmia detection.
              Early identification can prevent complications, providing peace of mind and ensuring a
              healthier tomorrow.
            </p>
          </div>
        </div>
        <div className="w-[40%] h-2 bg-blue-700 rounded mx-auto animate-bounce"></div>
      </div>
      <div className="flex justify-start items-center flex-col min-h-[100vh] relative">
        <img src={tech} alt="" />
        <p className="w-9/12 text-center mt-12 text-lg">
          Introducing our cutting-edge arrhythmia detection product - a wearable marvel that
          prioritizes your heart health. Equipped with advanced sensors, it seamlessly monitors your
          heartbeat, offering unmatched reliability and accuracy in detecting irregular rhythms.
          Embrace the simplicity of at-home testing, empowering yourself with proactive insights for
          better heart care. With our product, safeguarding your cardiovascular well-being has never
          been this effortless or effective.
        </p>
        <img src={elipse} alt="elipse" className="absolute bottom-24 left-24 w-32 h-40" />
        <img
          src={elipse}
          alt="elipse"
          className="absolute bottom-72 right-24 w-32 h-40 rotate-180"
        />
      </div>
      <div className=" flex flex-col justify-center items-center min-h-[50vh]">
        <h1 className="text-3xl font-bold mb-10">STEP BY STEP</h1>
        <div className="flex justify-center items-center w-8/12 gap-5">
          {steps.map((step, i) => {
            return <Card key={i} title={step.name} content={step.content} imgsrc={step.img} />;
          })}
        </div>
      </div>
      <div className="grid place-items-center w-full min-h-[50vh]">
        <div className="flex flex-col justify-center items-center bg-blue-700 py-10 w-full h-[75%]">
          <h1 className="text-2xl font-semibold text-white">Let's Join With Us</h1>
          <p className="text-lg font-medium text-white">
            Begin with the first step to get more interesting experience
          </p>
          <Link
            to={'/login'}
            className="bg-blue-900 text-white px-10 py-3 rounded-xl text-xl font-bold border-none mt-10 hover:scale-105 hover:bg-black duration-150 ">
            Get Started
          </Link>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Landing;
