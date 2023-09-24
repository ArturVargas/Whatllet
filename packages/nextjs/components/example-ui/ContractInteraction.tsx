
import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { IDKitWidget } from '@worldcoin/idkit';

export const ContractInteraction = () => {
  const [visible, setVisible] = useState(true);
  const [proof, setProof] = useState("400");
  const [address, setAddress] = useState("0xA295e80DC5886123254dA0F96007AAF39aE0500f");
  const [newGreeting, setNewGreeting] = useState("");
  const [fico, setFico] = useState("")
  const [scoringVector, setScoringVector] = useState([null, null, null, null, null]);

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: [newGreeting],
    value: "0.01",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const setScoringVectorValue = (index : number, value : any) => {
    let updatedVector = [...scoringVector];
    updatedVector[index] = value;
    setScoringVector(updatedVector);
  };

  return (
    <div className="flex bg-base-300 relative pb-10">
      <DiamondIcon className="absolute top-24" />
      <CopyIcon className="absolute bottom-0 left-36" />
      <HareIcon className="absolute right-0 bottom-24" />
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex gap-5 bg-base-200 bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg">
            <span className="text-3xl">⚙️</span>
            <div>
              <div>
                In this page you can set up your
                <strong> credit profile </strong>
                for the lending functionalities.
              </div>
            </div>
            <span className="text-3xl">☸️</span>
            <div>
              <div>
                Whatllet lending protocol operates on a<strong> prosumer model </strong>
                so your rules apply for both lending and borrowing.
              </div>
            </div>
          </div>
          <button
            className="btn btn-circle btn-ghost h-6 w-6 bg-base-200 bg-opacity-80 z-0 min-h-0 drop-shadow-md"
            onClick={() => setVisible(false)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Set your lending rules</span>
{/* WORLDID PROSUMER AUTH */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
          <button 
          className="flex input font-bai-jamjuree w-full px-5 bg-secondary bg-[length:100%_100%] border border-primary text-lg sm:text-2xl text-white uppercase"
          >
            Request Prosumer Auth
            </button>
            <ArrowSmallRightIcon className="w-10 h-10 mt-0.5" />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <IDKitWidget
                        app_id="app_a176d00c9ad71e10da7ebd9664398c7a" // obtained from the Developer Portal ON CHAIN
                        action="pro-sumer-human!" // this is your action name from the Developer Portal
                        signal={address}
                        onSuccess={(result: any) => {
                          console.log(result)
                          setProof(result.proof)
                      }} // TESTING callback when the modal is closed
                        enableTelemetry // optional, defaults to false
                      >
                       {({ open }) => <button onClick={open}>Verify with World ID</button>}
                      </IDKitWidget>
                    
                      {/*<IDKitWidget
                        app_id="app_dfcc03610476894b89f3e1ec3ba6dd87" // obtained from the Developer Portal OFF CHAIN
                        action="pro-sumer-human" // this is your action name from the Developer Portal
                        onSuccess={(result: any) => {
                          console.log(result)
                          setProof(result.proof)
                      }} // callback when the modal is closed
                        credential_types={['orb', 'phone']} // optional, defaults to ['orb']
                        enableTelemetry // optional, defaults to false
                      >
                        {({ open }) => <button onClick={open}>Verify with World ID</button>}
                      </IDKitWidget>*/}

                    </>
                  )}
              </div>
            </div>
          </div>
{/* FICO SCORE ATTRIBUTE */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="number"
              placeholder="Write min FICO (R) Score"
              className="input font-bai-jamjuree w-full px-5 bg-secondary bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
              onChange={e => setFico(e.target.value)}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => {
          writeAsync(); // Conservamos la llamada original
          setScoringVectorValue(1, newGreeting); // Añadimos la actualización de scoringVector
        }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Set <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
{/* WALLET ASSET BALANCE */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="number"
              placeholder="Write the min asset value"
              className="input font-bai-jamjuree w-full px-5 bg-secondary bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
              onChange={e => setNewGreeting(e.target.value)}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => {
          writeAsync(); // Conservamos la llamada original
          setScoringVectorValue(2, newGreeting); // Añadimos la actualización de scoringVector
        }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Set <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
{/* WALLET DEBT BALANCE */}
<div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="number"
              placeholder="Write max debt value"
              className="input font-bai-jamjuree w-full px-5 bg-secondary bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
              onChange={e => setNewGreeting(e.target.value)}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => {
          writeAsync(); // Conservamos la llamada original
          setScoringVectorValue(3, newGreeting); // Añadimos la actualización de scoringVector
        }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Set <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>          
{/* CREDSCORE PROTOCOL */}
<div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="text"
              placeholder="Write min. CredScore Protocol"
              className="input font-bai-jamjuree w-full px-5 bg-secondary bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
              onChange={e => setNewGreeting(e.target.value)}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => {
          writeAsync(); // Conservamos la llamada original
          setScoringVectorValue(4, newGreeting); // Añadimos la actualización de scoringVector
        }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Set <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="py-5">
            <span className="text-2xl sm:text-3xl text-black">Generate proof that you meet your own criteria</span>
          </div>
          <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-flex flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => writeAsync()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      GENERATE <ArrowSmallRightIcon className="w-10 h-5 mt-0.5" />
                    </>
                  )}
                </button>
          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Current lending rate:</span>
            <div className="badge badge-warning">3%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
