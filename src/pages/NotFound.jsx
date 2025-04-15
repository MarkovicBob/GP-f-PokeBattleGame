import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center gap-5">
        <h1 className="text-9xl font-extrabold">404</h1>
        <h3 className="text-4xl">Sorry, we couldn't find this page.</h3>
        <p className="text-xl">
          But dont worry, you can find plenty
          <br /> of other things on our homepage.
        </p>
        <button className="bg-blue-500 rounded-2xl px-6 py-3">
          <Link to="/" className="text-white">
            Back to homepage
          </Link>
        </button>
      </div>
    </>
  );
}

export default NotFound;
