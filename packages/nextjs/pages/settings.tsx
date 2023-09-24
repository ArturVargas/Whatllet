import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";

const Settings: NextPage = () => {
  {
    /*const { address } = useAddress()
  const onSuccess = async (merkleProof,nullifierHash, proof, credentialType1) => {
     
  }
*/
  }
  return (
    <>
      <MetaHeader title="Credit Profile | Whatllet" description="To enable WhatsApp lending, set up your risk profile">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <ContractInteraction />
        <ContractData />
        {/*<IDKitWidget
          app_id="aapp_a176d00c9ad71e10da7ebd9664398c7a" // obtained from the Developer Portal
          action="pro-sumer-human!" // this is your action name from the Developer Portal
          signal={address}
          onSuccess={onSuccess} // callback when the modal is closed
          enableTelemetry // optional, defaults to false
        >
          {({ open }) => <button onClick={open}>Verify with World ID</button>}
        </IDKitWidget>*/}
      </div>
    </>
  );
};

export default Settings;
