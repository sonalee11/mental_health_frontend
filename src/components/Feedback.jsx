import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Star from "./Star";
const baseUrl = "https://mental-health-project-backend.onrender.com";

export default function FeedbackForm() {
  const [name, setname] = useState("");
  const [suggetions, setSuggetions] = useState("");
  const [rating, setrating] = useState(0);
  const [therapyNames, settherapyNames] = useState([]);

  const navigate = useNavigate()

  const handleOptionChange = (option) => {
    if (therapyNames.includes(option)) {
      settherapyNames(therapyNames.filter((item) => item !== option));
    } else {
      settherapyNames([...therapyNames, option]);
    }
  };

  const handleRatingChange = (value) => {
    setrating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-Z]+$/;

    if (name.length > 20 && name.length <= 3) {
      return toast.error("name Should be in between 3 to 20 letters");
    }

    if (!name.match(nameRegex)) {
      return toast.error("name must contain only alphabets");
    }
    console.log(name, suggetions, rating, therapyNames);
    axios
      .post(`${baseUrl}/feedback`, { name, suggetions, rating, therapyNames })
      .then((result) => {
        toast.success("Thank you for your feedback");
        navigate("/resfeedback")
      })
      .catch((err) => {
        toast.error("Failed to submit feedback");
      });
  };

  return (
    <main className="bg-blue-200">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
        <div
          className="sm:mx-auto sm:w-full sm:max-w-sm shadow-md"
          style={{
            border: "2px solid black",
            borderRadius: "1rem",
            backgroundColor: "transparent",
          }}
          id="contact"
        >
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Feedback Form
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
              <div className="ms-3 me-3">
                <label
                  htmlFor="name"
                  className="block text-lg font-bold leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 font-bold text-gray-900 shadow-sm ring-2 ring-inset  ring-green-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="ms-3 me-3">
                <label className="block text-lg font-bold leading-6 text-gray-900">
                  Therapy Name
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="stress"
                      name="stress"
                      type="checkbox"
                      className="focus:ring-blue-900 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      onChange={() => handleOptionChange("stress")}
                    />
                    <label
                      htmlFor="stress"
                      className="ml-3 block text-sm font-bold text-gray-900"
                    >
                      Stress
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="depression"
                      name="depression"
                      type="checkbox"
                      className="focus:ring-blue-900 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      onChange={() => handleOptionChange("depression")}
                    />
                    <label
                      htmlFor="depression"
                      className="ml-3 block text-sm font-bold text-gray-900"
                    >
                      Depression
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="anxiety"
                      name="anxiety"
                      type="checkbox"
                      className="focus:ring-blue-900  h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      onChange={() => handleOptionChange("anxiety")}
                    />
                    <label
                      htmlFor="anxiety"
                      className="ml-3 block text-sm font-bold text-gray-900"
                    >
                      Anxiety
                    </label>
                  </div>
                </div>
              </div>

              <div className="ms-3 me-3">
                <label
                  htmlFor="comment"
                  className="block text-lg font-bold ms-3 leading-6 text-gray-900"
                >
                  Suggetions
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    id="suggetions"
                    name="suggetions"
                    value={suggetions}
                    onChange={(e) => {
                      setSuggetions(e.target.value);
                    }}
                    required
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset  ring-green-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="ms-3 me-3">
                <label
                  htmlFor="rating"
                  className="block text-lg font-bold leading-6 text-gray-900 text-center my-3"
                >
                  Rating
                </label>
                <div className="flex justify-center">
                  <Star
                    filled={rating >= 1}
                    onClick={() => handleRatingChange(1)}
                  />
                  <Star
                    filled={rating >= 2}
                    onClick={() => handleRatingChange(2)}
                  />
                  <Star
                    filled={rating >= 3}
                    onClick={() => handleRatingChange(3)}
                  />
                  <Star
                    filled={rating >= 4}
                    onClick={() => handleRatingChange(4)}
                  />
                  <Star
                    filled={rating >= 5}
                    onClick={() => handleRatingChange(5)}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex w-1/4 justify-center rounded-md bg-[#B0E2E6] px-2 py-1.5 text-sm font-bold leading-6 text-black-900 shadow-xl  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                mb-4 "
                  id="allbtn"
                  style={{ border: "2px solid black" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
