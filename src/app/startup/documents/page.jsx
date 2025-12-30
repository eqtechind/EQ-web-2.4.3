import React from "react";

const DocumentUpload = () => {
  const documents = [
    { id: 1, name: "Certificate of Incorporation", input: true },
    {
      id: 2,
      name: "Order Books: document proof of projected revenue.",
      input: false,
    },
    {
      id: 3,
      name: "Start-up India certificate (DPIIT Registration Proof)",
      input: false,
    },
    { id: 4, name: "Companies Act Letter", input: false },
    { id: 5, name: "Income Tax Act", input: false },
    { id: 6, name: "Goods and Service Tax Act (GST)", input: false },
  ];

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen">
        <h2 className="text-lg text-start w-[70%] font-semibold mb-4 text-gray-800">
          Kindly fill all the details related to your startup:
        </h2>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-md p-6">

        {/* Documents Table */}
        <div className=" pt-4">
          <h3 className="font-semibold mb-2 text-gray-700">Documents:</h3>
          <p className="border-t border-gray-300 text-sm text-gray-500 mb-4">
            Kindly upload the following documents:-
          </p>
          <div className="rounded-md overflow-hidden">
            <table className="w-full border border-collapse rounded-md">
              <thead>
                <tr className=" text-white">
                  <th className="bg-blue-700 p-2">S.no</th>
                  <th className="p-2 bg-white text-black">
                    Name of the document
                  </th>
                  <th className="bg-blue-400 p-2">Upload Link</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr
                    key={doc.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="p-2 text-center font-semibold text-white bg-blue-700">
                      {doc.id}.
                    </td>
                    <td className="px-2 text-gray-700">
                      {doc.input ? (
                        <div className="flex justify-start items-center">
                          <div className="w-[60vh] border-r h-full border-blue-600">{doc.name}</div>
                          <input
                            type="text"
                            placeholder="Enter CIN"
                            className="ml-2 p-2 border border-gray-300 rounded"
                          />
                        </div>
                      ) : (
                        <span>{doc.name}</span>
                      )}
                    </td>
                    <td className="p-2 text-center bg-blue-400">
                      <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
                        <i className="mr-1">📤</i> Upload
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white w-full font-semibold px-10 py-2 rounded transition">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;

//next page to be designed and added
// kyc completed successfully

