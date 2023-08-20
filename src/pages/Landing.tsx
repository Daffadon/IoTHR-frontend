import GuestLayout from '../components/layout/GuestLayout';
import hr from '../assets/ilustration/hrilustration.svg';
import tech from '../assets/ilustration/tech_ilustration.png';
import elipse from '../assets/ilustration/elipse.png';
import { steps } from '../data/page/landing/characteristic';
import Card from '../components/card/Card';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <GuestLayout>
      <div className="flex justify-center items-center min-h-[80vh] py-[10em] bg-landing bg-no-repeat bg-contain bg-right">
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
      <div className="flex justify-center items-center flex-col min-h-[100vh] relative">
        <img src={tech} alt="" />
        <p className="w-9/12 text-center mt-12 text-lg">
          Introducing our cutting-edge arrhythmia detection product – a wearable marvel that
          prioritizes your heart health. Equipped with advanced sensors, it seamlessly monitors your
          heartbeat, offering unmatched reliability and accuracy in detecting irregular rhythms.
          Embrace the simplicity of at-home testing, empowering yourself with proactive insights for
          better heart care. With our product, safeguarding your cardiovascular well-being has never
          been this effortless or effective.
        </p>
        <img src={elipse} alt="elipse" className="absolute bottom-10 left-24 w-32 h-40" />
        <img
          src={elipse}
          alt="elipse"
          className="absolute bottom-40 right-24 w-32 h-40 rotate-180"
        />
      </div>
      <div className=" flex flex-col justify-center items-center min-h-[80vh]">
        <h1 className="text-3xl font-bold mb-10">STEP BY STEP</h1>
        <div className="flex justify-center items-center w-8/12 gap-5">
          {steps.map((step) => {
            return <Card title={step.name} content={step.content} imgsrc={step.img} />;
          })}
        </div>
      </div>
      <div className="flex justify-around items-center pb-10">
        <h1 className="px-8 py-2 text-xl font-semibold">Let's Join with Us</h1>
        <Link to={'/login'} className="bg-blue-900 text-white px-8 py-2 rounded text-xl font-bold">
          Get Started
        </Link>
        {/* <p className="bg-blue-900 text-white px-8 py-2 rounded text-xl font-bold">Get Started</p> */}
      </div>
    </GuestLayout>
  );
};

export default Landing;
