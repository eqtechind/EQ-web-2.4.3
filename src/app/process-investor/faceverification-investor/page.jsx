"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const Link_ac = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();
  // Set the initial verification code as null
  const [verificationCode, setVerificationCode] = useState(null);
  
  // Backend integration states
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('unknown');
  const [connectionRetries, setConnectionRetries] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null);

  // Function to generate a random verification code
  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Generates a random 6-character code
  };

  // Check API availability on component mount
  useEffect(() => {
    checkApiAvailability();
  }, []);

  // Check if API is available
  const checkApiAvailability = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setApiStatus('available');
      } else {
        setApiStatus('unavailable');
      }
    } catch (error) {
      console.log('API health check failed:', error.message);
      setApiStatus('unavailable');
    }
  };

  // Retry API connection
  const retryApiConnection = async () => {
    setConnectionRetries(prev => prev + 1);
    await checkApiAvailability();
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

  // Enhanced capture photo function with backend integration
  const capturePhoto = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size equal to video element size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to an image
    const imageUrl = canvas.toDataURL("image/png");
    setCapturedImage(imageUrl);
    
    setIsLoading(true);

    // Prepare data for backend
    const submissionData = {
      faceVerification: {
        verificationCode: verificationCode,
        imageData: imageUrl,
        timestamp: new Date().toISOString()
      },
      step: 'face_verification'
    };

    try {
      const response = await fetch('http://localhost:5001/api/investor/face-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse);
        throw new Error('Backend server returned an error page. Please check if the server is running.');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong on the server.');
      }

      setApiStatus('available');
      toast.success("Face verification completed successfully!");
      
      // Store the face verification data in localStorage for the next steps
      localStorage.setItem('investorFaceVerificationData', JSON.stringify({
        ...submissionData,
        _id: result.data?._id || result._id,
        _verified: true
      }));

      // Navigate to next step
      router.push("/process-investor/document-investor");

    } catch (error) {
      console.error('Face verification submission failed:', error);
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        toast.error("Backend server is not running. Please start the server or contact support.");
      } else if (error.message.includes('Backend server returned an error page')) {
        toast.error("Backend server error. Please check if the server is running correctly.");
      } else {
        toast.error("Face verification failed: " + error.message);
      }
      
      setApiStatus('unavailable');
      
      // For development, continue with local storage even if API fails
      console.log('Continuing with local storage for development...');
      localStorage.setItem('investorFaceVerificationData', JSON.stringify({
        ...submissionData,
        _id: `temp_${Date.now()}`,
        _savedLocally: true,
        _apiError: error.message
      }));
      
      // Still navigate to next step for development
      router.push("/process-investor/document-investor");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Refresh Code button click
  const refreshCode = () => {
    setVerificationCode(generateRandomCode());
  };

  // Handle Skip button click
  const handleSkip = () => {
    // Store a placeholder for skipped face verification
    localStorage.setItem('investorFaceVerificationData', JSON.stringify({
      faceVerification: {
        verificationCode: null,
        imageData: null,
        timestamp: new Date().toISOString(),
        skipped: true
      },
      step: 'face_verification',
      _id: `temp_${Date.now()}`,
      _savedLocally: true,
      _skipped: true
    }));

    toast.info("Face verification skipped - you can complete this later");
    router.push("/process-investor/document-investor");
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

        {/* API Status Indicator */}
        <div className="mb-6 flex items-center justify-center gap-2">
          {apiStatus === 'available' ? (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Backend connected</span>
            </div>
          ) : apiStatus === 'unavailable' ? (
            <div className="flex items-center gap-2 text-orange-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Backend unavailable - will save locally</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={retryApiConnection}
                disabled={connectionRetries >= 3}
                className="ml-2 text-xs"
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Checking connection...</span>
            </div>
          )}
        </div>

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
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> You can skip this step for now and complete face verification later if needed.
              </p>
            </div>

            <div className="flex flex-col items-center mt-8">
              {/* Display the verification code only after it's generated */}
              <div className="w-[120px] h-[80px] border border-gray-200 shadow-md flex items-center justify-center">
                <h1 className="text-2xl font-bold">{verificationCode}</h1>
              </div>
              <Button
                onClick={refreshCode}
                disabled={isLoading}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Refresh Code
              </Button>
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

            {/* Capture and Skip Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={capturePhoto}
                disabled={isLoading || !verificationCode}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex gap-2 items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Capture Photo'
                )}
              </Button>
              
              <Button
                onClick={handleSkip}
                disabled={isLoading}
                variant="outline"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex gap-2 items-center justify-center"
              >
                Skip for Now
              </Button>
            </div>

            {/* Captured Image Preview */}
            {capturedImage && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Captured Image:</h3>
                <img 
                  src={capturedImage} 
                  alt="Captured verification photo" 
                  className="w-full h-32 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
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
