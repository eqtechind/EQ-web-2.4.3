"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Link_ac = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();
  // Set the initial verification code as null
  const [verificationCode, setVerificationCode] = useState(null);

  // Function to generate a random verification code
  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Generates a random 6-character code
  };

  // Function to start video streaming from the front camera
  const startWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } }) // 'facingMode: "user"' ensures the front camera
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  // Capture photo function
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size equal to video element size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to an image (this can be sent to a server or processed)
    const imageUrl = canvas.toDataURL("image/png");
    console.log("Captured Image:", imageUrl); // You can handle the image data here (upload, save, etc.)
    router.push("/process-startup/document-startup");
  };

  // Handle Refresh Code button click
  const refreshCode = () => {
    setVerificationCode(generateRandomCode());
  };

  // Start the webcam on component mount
  useEffect(() => {
    // Generate the verification code after component has mounted
    setVerificationCode(generateRandomCode());
    startWebcam();
  }, []);

  return (
    <div className="relative w-full h-[170vh] lg:h-[auto] overflow-hidden pr-10">
      <div className="absolute top-[-110vh] right-[-180vh] w-[300vh] h-[200vh] bg-blue-500 rounded-tl-[100vh] rounded-bl-[100vh]"></div>
      <div className="relative z-10">
        <section className="mt-8 ml-12 h-[100px] w-full md:w-1/2">
          <div className="text-gray-500">
            <h3>Step 5 of 6</h3>
          </div>
          <div>
            <h1 className="text-xl font-bold text-center md:text-left">
              Face verification (IPV)
            </h1>
          </div>
        </section>

        <section className="flex flex-col md:flex-row mt-0">
          {/* Instructions Section */}
          <section className="border border-gray-200 rounded-xl bg-white w-full md:w-3/5 mx-4 md:mx-12 p-6 md:p-12">
            <label>
              <div className="text-blue-600">
                <h2 className="text-lg font-semibold text-center md:text-left">
                  In order to perform your facial verification kindly
                </h2>
                <h2 className="text-lg font-semibold text-center md:text-left">
                  follow the given steps.
                </h2>
              </div>
            </label>
            <ol className="list-decimal ml-6 mt-4">
              <li>
                <h3 className="text-base font-medium">
                  Take a blank paper and using a black marker neatly write the
                  below generated code on the paper.
                </h3>
              </li>
              <li>
                <h3 className="text-base font-medium mt-4">
                  Click a picture of yourself holding the paper. The paper and
                  your face need to be clearly visible in the photo.
                </h3>
              </li>
            </ol>

            <div className="flex flex-col items-center mt-8">
              {/* Display the verification code only after it's generated */}
              <div className="w-[120px] h-[80px] border border-gray-200 shadow-md flex items-center justify-center">
                <h1 className="text-2xl font-bold">{verificationCode}</h1>
              </div>
              <button
                onClick={refreshCode}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Refresh Code
              </button>
            </div>
          </section>

          {/* Webcam Section */}
          <section className="border border-gray-200 rounded-xl bg-white w-full md:w-2/5 mx-4 md:mx-12 p-6 md:p-12 mt-8 md:mt-0">
            <div>
              <h1 className="text-xl font-bold text-center md:text-left">
                Live Webcam Here
              </h1>
            </div>
            <div className="relative w-full h-[320px]">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
            </div>

            {/* Capture Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={capturePhoto}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Capture Photo
              </button>
            </div>
          </section>
        </section>

        <div className="text-blue-700 mt-8 ml-24 text-center md:text-left">
          <p className="text-sm">
            *EQvisor does not save the uploaded photo for any use other than
            face verification. We adhere to our terms and conditions.
          </p>
        </div>
      </div>

      {/* Hidden Canvas to capture the image */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default Link_ac;
