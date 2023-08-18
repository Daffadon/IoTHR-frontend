import GuestLayout from '../components/layout/GuestLayout';
import hr from '../assets/ilustration/hrilustration.svg';
import tech from '../assets/ilustration/tech_ilustration.png';
import elipse from '../assets/ilustration/elipse.png';
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
        <img src={elipse} alt="" className="absolute bottom-10 left-24 w-32 h-40" />
        <img src={elipse} alt="" className="absolute bottom-40 right-24 w-32 h-40 rotate-180" />
      </div>
      <div></div>
      {/* step by step */}
    </GuestLayout>
  );
};

export default Landing;
