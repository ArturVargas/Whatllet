import { FunctionComponent } from "react";

const DashboardConnected: FunctionComponent = () => {
  return (
    <div className="relative bg-ghostwhite w-full h-[720px] overflow-hidden text-center text-[18px] text-lightsteelblue font-rubik">
      <div className="absolute top-[0px] left-[0px] rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-gray h-[720px] flex flex-col items-center justify-start">
        <div className="self-stretch flex flex-col pt-10 px-10 pb-5 items-center justify-center text-darkslategray">
          <div className="self-stretch flex flex-col pt-0 px-0 pb-5 items-center justify-center gap-[12px] border-b-[1px] border-solid border-aliceblue">
            <div className="flex flex-row items-start justify-start relative gap-[10px]">
              <img className="relative w-9 h-9 z-[0]" alt="" src="/path1.svg" />
              <img
                className="absolute my-0 mx-[!important] h-[66.67%] w-[66.67%] top-[16.67%] right-[16.67%] bottom-[16.67%] left-[16.67%] max-w-full overflow-hidden max-h-full z-[1]"
                alt=""
                src="/remixiconslinesystemeye2line1.svg"
              />
            </div>
            <div className="relative leading-[20px] font-medium">
              Welcome to ZKORE
            </div>
            <div className="relative text-smi leading-[20px] text-lightsteelblue">
              <p className="m-0">Connect with Worldcoin to</p>
              <p className="m-0">get access to your credit score</p>
            </div>
            <div className="rounded-lg flex flex-row py-3 pr-3 pl-5 items-center justify-center gap-[8px] text-mini border-[1px] border-solid border-violet">
              <div className="relative leading-[20px]">0x23fj...56k07b</div>
              <div className="flex flex-row items-center justify-start">
                <img
                  className="relative w-3.5 h-3.5 overflow-hidden shrink-0"
                  alt=""
                  src="/remixiconslinesystemarrowdownsline1.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-[20px] text-left text-mini">
          <div className="[background:linear-gradient(90deg,_rgba(225,_124,_253,_0.05),_rgba(225,_124,_253,_0.03))] w-[280px] h-[52px] flex flex-row items-center justify-center text-darkslategray">
            <div className="flex-1 flex flex-row py-0 pr-0 pl-10 items-center justify-between">
              <div className="self-stretch flex-1 flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/remixiconsfillsystemdashboardfill1.svg"
                />
                <div className="self-stretch flex-1 relative font-medium flex items-center">
                  Dashboard
                </div>
              </div>
              <div className="relative rounded-tl rounded-tr-none rounded-br-none rounded-bl bg-violet w-[4.04px] h-[52px] opacity-[0.4]" />
            </div>
          </div>
          <div className="w-[280px] h-[52px] flex flex-row items-center justify-center">
            <div className="self-stretch flex-1 flex flex-row py-0 pr-0 pl-10 items-center justify-start">
              <div className="w-[189.48px] flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/remixiconslineweathertyphoonline1.svg"
                />
                <div className="self-stretch flex-1 relative font-medium flex items-center">
                  Score
                </div>
              </div>
            </div>
          </div>
          <div className="w-[280px] h-[52px] flex flex-row items-center justify-center">
            <div className="self-stretch flex-1 flex flex-row py-0 pr-0 pl-10 items-center justify-start">
<div className="w-[189.48px] flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/remixiconslinefinancewaterflashline1.svg"
                />
                <div className="self-stretch flex-1 relative font-medium flex items-center">
                  Lending
                </div>
              </div>
            </div>
          </div>
          <div className="w-[280px] h-[52px] flex flex-row items-center justify-center">
            <div className="self-stretch flex-1 flex flex-row py-0 pr-0 pl-10 items-center justify-start">
              <div className="w-[189.48px] flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/remixiconslinesystemsettingsline1.svg"
                />
                <div className="self-stretch flex-1 relative font-medium flex items-center">
                  Settings
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col py-5 px-10 items-center justify-center gap-[20px] text-smi">
          <div className="box-border w-[200px] flex flex-row pt-10 px-0 pb-0 items-center justify-start gap-[64px] border-t-[1px] border-solid border-aliceblue">
            <img
              className="relative w-6 h-6 overflow-hidden shrink-0"
              alt=""
              src="/remixiconsfilllogoslinkedinboxfill1.svg"
            />
            <img
              className="relative w-6 h-6 overflow-hidden shrink-0"
              alt=""
              src="/remixiconsfilllogostwitterfill1.svg"
            />
            <img
              className="relative w-6 h-6 overflow-hidden shrink-0"
              alt=""
              src="/remixiconsfilllogosdiscordfill1.svg"
            />
          </div>
          <div className="relative w-[98px] h-10">
            <div className="absolute top-[0px] left-[0px] leading-[20px] whitespace-pre-wrap">
              <p className="m-0">{Made with     }</p>
              <p className="m-0">in ETH New York</p>
            </div>
            <img
              className="absolute top-[2px] left-[76px] w-3.5 h-3.5 overflow-hidden"
              alt=""
              src="/remixiconslinehealthheartline1.svg"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-[0px] left-[280px] w-[1000px] h-[720px] overflow-hidden text-mini text-darkslategray">
        <div className="absolute top-[calc(50%_-_198px)] left-[calc(50%_-_250px)] flex flex-col items-center justify-start gap-[20px]">
          <img
            className="relative w-[142.13px] h-[173.44px]"
            alt=""
            src="/illustration.svg"
          />
          <div className="w-[383px] flex flex-row items-center justify-center text-[30px]">
            <div className="self-stretch flex-1 relative font-medium">
              <p className="m-0">{Private Credit History }</p>
              <p className="m-0">{with Worldcoin & ZK}</p>
            </div>
          </div>
          <div className="relative leading-[20px] text-lightslategray inline-block w-[500px] mix-blend-normal">
            <p className="m-0">
              We're changing the credit game, enabling access to financial
              services
            </p>
            <p className="m-0">without compromising personal data.</p>
          </div>
          <div className="rounded-lg bg-violet flex flex-row py-4 px-8 items-center justify-center text-white">
            <div className="relative leading-[20px] font-medium">
              Connect Wallet
            </div>
          </div>
        </div>
        <div className="absolute top-[32px] left-[calc(50%_-_460px)] flex flex-row items-center justify-start gap-[420px] text-left text-[12px] text-lightsteelblue font-helvetica">
<div className="rounded-xl bg-gray overflow-hidden flex flex-row py-3 pr-5 pl-3 items-center justify-start gap-[8px] opacity-[0.6] border-[0.5px] border-solid border-aliceblue">
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0"
              alt=""
              src="/remixiconslinesystemsearch2line1.svg"
            />
            <div className="overflow-hidden flex flex-col items-start justify-center">
              <div className="relative leading-[150%]">
                Search address, wallet, domain or identity
              </div>
              <img
                className="relative w-[35px] h-[3.5px] hidden"
                alt=""
                src="/password-text.svg"
              />
              <div className="overflow-hidden flex flex-row py-0 px-[74.00000762939453px] items-center justify-center">
                <div className="relative w-[0.01px] h-[0.01px]" />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[24px] text-2xs text-slategray font-rubik">
            <div className="flex flex-row items-center justify-start gap-[6px]">
              <div className="flex flex-row items-center justify-start">
                <img
                  className="relative w-5 h-5 overflow-hidden shrink-0"
                  alt=""
                  src="/remixiconslinemapgasstationline1.svg"
                />
              </div>
              <div className="flex flex-row items-center justify-start">
                <div className="relative leading-[150%]">84</div>
                <img
                  className="relative w-3.5 h-3.5 overflow-hidden shrink-0"
                  alt=""
                  src="/remixiconslinesystemarrowdownsline2.svg"
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-start">
              <div className="relative leading-[150%] font-medium">USD</div>
              <img
                className="relative w-3.5 h-3.5 overflow-hidden shrink-0"
                alt=""
                src="/remixiconslinesystemarrowdownsline2.svg"
              />
            </div>
            <div className="flex flex-row items-center justify-start">
              <div className="flex flex-row items-center justify-start">
                <img
                  className="relative w-5 h-5 overflow-hidden shrink-0"
                  alt=""
                  src="/remixiconslinesystemquestionline1.svg"
                />
              </div>
              <div className="flex flex-row items-center justify-start">
                <img
                  className="relative w-3.5 h-3.5 overflow-hidden shrink-0"
                  alt=""
                  src="/remixiconslinesystemarrowdownsline2.svg"
                />
              </div>
            </div>
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0"
              alt=""
              src="/remixiconslinesystemeyeline1.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardConnected;