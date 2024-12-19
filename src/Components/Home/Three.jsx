import Spline from "@splinetool/react-spline";

export default function App() {
  return (
    <>
      <div className="relative h-full w-full">
        <Spline
          className="rounded-[10em] relative"
          scene="https://prod.spline.design/yp9JOPIwSn7Gbthf/scene.splinecode"
        />
        <div className="h-10 w-40 bg-[#222222] absolute right-0 bottom-4 rounded-full"></div>
      </div>
    </>
  );
}
