import { config } from "dotenv";
import { IBundler, Bundler } from "@biconomy/bundler";
import {
    BiconomySmartAccount,
    BiconomySmartAccountConfig,
    DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import { Wallet, providers, ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import {
    BiconomyPaymaster,
    IHybridPaymaster,
    PaymasterFeeQuote,
    PaymasterMode,
    SponsorUserOperationDto
} from "@biconomy/paymaster";
const { ERC20ABI } = require('./abi')
const { CONTRACTABI } = require('./contractabi')
//import { ECDSAOwnershipValidationModule, DEFAULT_ECDSA_OWNERSHIP_MODULE } from "@biconomy/modules";


config();

const bundler: IBundler = new Bundler({
    bundlerUrl:
        "https://bundler.biconomy.io/api/v2/5/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
    chainId: ChainId.GOERLI,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

const provider = new providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
);
const wallet = new Wallet( "", provider);

const paymaster = new BiconomyPaymaster({
    paymasterUrl: ""
});


/*const module = await ECDSAOwnershipValidationModule.create({
    signer: wallet, // you will need to supply a signer from an EOA in this step
    moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE
})*/

const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
    signer: wallet,
    paymaster: paymaster,
    chainId: ChainId.GOERLI,
    bundler: bundler,
    //defaultValidationModule: module,
    //activeValidationModule: module
};

async function createAccount() {
    console.log("a")
    let biconomySmartAccount = new BiconomySmartAccount(
        biconomySmartAccountConfig
    );
    console.log("b")

    biconomySmartAccount = await biconomySmartAccount.init();
    console.log("owner: ", biconomySmartAccount.owner);
    console.log("address: ", await biconomySmartAccount.getSmartAccountAddress());
    return biconomySmartAccount;
}

async function sendLoan() {
    try {
        const biconomySmartAccount = await createAccount();
        const nftAddress = "0x8a697848D0794fF1c70344727eB91d94474edC44"
        const contract = new ethers.Contract(
            nftAddress,
            CONTRACTABI,
            provider,
        )

        // use the ethers populateTransaction method to create a raw transaction
        const minTx = await contract.populateTransaction.loanFromContract("", 1);
        console.log(minTx.data);
        const tx1 = {
            to: nftAddress,
            data: minTx.data,
        };
        let userOp = await biconomySmartAccount.buildUserOp([tx1]);
        let finalUserOp = userOp;

        const biconomyPaymaster = biconomySmartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
        let paymasterServiceData: SponsorUserOperationDto = {
            mode: PaymasterMode.SPONSORED,
            smartAccountInfo: {
                name: 'BICONOMY',
                version: '1.0.0'
            },
        };

        console.log("6")

        try{
            const paymasterAndDataWithLimits =
                await biconomyPaymaster.getPaymasterAndData(
                    finalUserOp,
                    paymasterServiceData
                );
            finalUserOp.paymasterAndData = paymasterAndDataWithLimits.paymasterAndData;

            console.log("yepx")

            // below code is only needed if you sent the glaf calculateGasLimits = true
            if (
                paymasterAndDataWithLimits.callGasLimit &&
                paymasterAndDataWithLimits.verificationGasLimit &&
                paymasterAndDataWithLimits.preVerificationGas
            ) {

                // Returned gas limits must be replaced in your op as you update paymasterAndData.
                // Because these are the limits paymaster service signed on to generate paymasterAndData
                // If you receive AA34 error check here..

                finalUserOp.callGasLimit = paymasterAndDataWithLimits.callGasLimit;
                finalUserOp.verificationGasLimit =
                    paymasterAndDataWithLimits.verificationGasLimit;
                finalUserOp.preVerificationGas =
                    paymasterAndDataWithLimits.preVerificationGas;
            }
        } catch (e) {
            console.log("error received ", e);
        }

        //5

        console.log(`userOp: ${JSON.stringify(finalUserOp, null, "\t")}`);

        // Below function gets the signature from the user (signer provided in Biconomy Smart Account)
        // and also send the full op to attached bundler instance

        try {
            const userOpResponse = await biconomySmartAccount.sendUserOp(finalUserOp);
            console.log(`userOp Hash: ${userOpResponse.userOpHash}`);
            const transactionDetails = await userOpResponse.wait();
            console.log(
                `transactionDetails: ${JSON.stringify(transactionDetails, null, "\t")}`
            );
            SendMessage("Thanks, this is the transaction: https://goerli.etherscan.io/tx/" + transactionDetails.receipt.transactionHash, "+525586169210")
        } catch (e) {
            console.log("error received ", e);
        }
    } catch (e) {
        console.log(e)
    }

}

async function send(amount : number) {
    try {
        console.log("1")
        let tokenAddress = ''
        const biconomySmartAccount = await createAccount();
        console.log("2")

        const readProvider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli")
        const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, readProvider)
        let decimals = 18

        try {
            decimals = await tokenContract.decimals()
        } catch (error) {
            throw new Error('invalid token address supplied')
        }


        console.log("3")
        const amountGwei = ethers.utils.parseUnits(amount.toString(), decimals)
        const data = (await tokenContract.populateTransaction.transfer("", amountGwei)).data
        const transaction = {
            to: tokenAddress,
            data,
        };

        console.log("4")

        // build partial userOp
        let partialUserOp = await biconomySmartAccount.buildUserOp([transaction]);
        console.log("4.55")

        let finalUserOp = partialUserOp;

        console.log("5")

        const biconomyPaymaster = biconomySmartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
        let paymasterServiceData: SponsorUserOperationDto = {
            mode: PaymasterMode.SPONSORED,
            smartAccountInfo: {
                name: 'BICONOMY',
                version: '1.0.0'
            },
        };

        console.log("6")

        try{
            const paymasterAndDataWithLimits =
                await biconomyPaymaster.getPaymasterAndData(
                    finalUserOp,
                    paymasterServiceData
                );
            finalUserOp.paymasterAndData = paymasterAndDataWithLimits.paymasterAndData;

            console.log("yepx")

            // below code is only needed if you sent the glaf calculateGasLimits = true
            if (
                paymasterAndDataWithLimits.callGasLimit &&
                paymasterAndDataWithLimits.verificationGasLimit &&
                paymasterAndDataWithLimits.preVerificationGas
            ) {

                // Returned gas limits must be replaced in your op as you update paymasterAndData.
                // Because these are the limits paymaster service signed on to generate paymasterAndData
                // If you receive AA34 error check here..

                finalUserOp.callGasLimit = paymasterAndDataWithLimits.callGasLimit;
                finalUserOp.verificationGasLimit =
                    paymasterAndDataWithLimits.verificationGasLimit;
                finalUserOp.preVerificationGas =
                    paymasterAndDataWithLimits.preVerificationGas;
            }
        } catch (e) {
            console.log("error received ", e);
        }

        //5

        console.log(`userOp: ${JSON.stringify(finalUserOp, null, "\t")}`);

        // Below function gets the signature from the user (signer provided in Biconomy Smart Account)
        // and also send the full op to attached bundler instance

        try {
            const userOpResponse = await biconomySmartAccount.sendUserOp(finalUserOp);
            console.log(`userOp Hash: ${userOpResponse.userOpHash}`);
            const transactionDetails = await userOpResponse.wait();
            console.log(
                `transactionDetails: ${JSON.stringify(transactionDetails, null, "\t")}`
            );
            SendMessage("Thanks, this is the transaction: https://goerli.etherscan.io/tx/" + transactionDetails.receipt.transactionHash, "+525586169210")
        } catch (e) {
            console.log("error received ", e);
        }

    } catch (e) {
        console.log("el errorx", e)
    }

}

const request = require("request");

let step = 0
let previousStep = 0
//TODO add last previous message timestamp
let previousTimeStamp = 1695502535


const handleStep = async (step : number) =>{
    console.log("iremos al step")
    if (step == 1) {
        SendMessage( "Hey my name is whatllet, I can create a wallet for you or I can user your wallet. What do you wanna do?", "+=")
    }
    if (step == 2) {
        //TODO crear wallet aqui
        const smartAccount = await createAccount();
        SendMessage("Hey there! this is your wallet address: " + await smartAccount.getSmartAccountAddress(),"+")
    }
    if (step == 3) {
        SendMessage( "I will send a request to 525586169210, right?", "+")
    }
    if (step == 4) {
        SendMessage("Hey there! you have a new payment request, it is for 1 USDC, would you like to pay?", "+")
        send(1)
        //SendMessage("Hey there! you have a new payment request, it is for 1 USDC, would you like to pay?", "+525586169210")
    }
    if (step == 5) {
        SendMessage("I will send a 100 USDC loan to +, is it ok?", "+")
    }
    if (step == 6) {
        sendLoan()
    }
}

const SendMessage = (message : string, phone : string) => {
    var options = {
        method: 'POST',
        url: 'https://api.ultramsg.com//messages/chat',
        headers: {'content-type': ' application/json'},
        body: JSON.stringify({
            "token": "",
            "to": phone,
            "body": message
        })
    };

    request(options, function (error: string | undefined, response: any, body: any) {
        if (error) throw new Error(error);

        console.log(body);
    });
}

const checkMessages = () => {
    var options = {
        method: 'GET',
        url: 'https://api.ultramsg.com/instance27643/chats/messages',
        qs: {
            "token": "8jpqjwua04059xn7",
            "chatId": "5215585491123@c.us",
            "limit": 1
        },
        headers: {'content-type': 'application/json'}
    };

    request(options, function (error: string | undefined, response: any, body: any) {
        if (error) throw new Error(error);

        let jsonBody = JSON.parse(body);


        askChatGPT(jsonBody.text, (err, address, reply) => {
            if (jsonBody[0].timestamp > previousTimeStamp && jsonBody[0].fromMe == false) {
                previousStep = step
                if (reply == "create_wallet") {
                    step = 0
                }
                if (reply == "request") {
                    step = 4
                }
                if (reply == "loan") {
                    step = 5
                }
                if (reply == "confirm") {
                    step = 6
                }
                handleStep(step)
            }
            previousTimeStamp = jsonBody[0].timestamp
        })
    });
}

function askChatGPT(text: string, callback: (err: any, address: any, reply: any) => void) {
    const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
    let prompt = `you need to extract for the following text, one the next intents depending on the contest: "loan", "confirm","request_money","create_wallet", you can only reply with the intent. The text is:` + text
    const ENDPOINT_URL = 'https://api.openai.com/v2/engines//completions';
    const API_KEY = '';

    const options = {
        url: ENDPOINT_URL,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150
        })
    };

    request(options, (error: any, response: any, body: string) => {
        if (error) {
            // @ts-ignore
            callback(error, {address:"", reply: ""});
            return;
        }

        const responseBody = JSON.parse(body);
        const reply = responseBody.choices[0].text.trim();

        // Extract Ethereum address
        const addressMatches = text.match(ETH_ADDRESS_REGEX);
        const address = addressMatches ? addressMatches[0] : '';

        // @ts-ignore
        callback(null, {address, reply});
    });
}

// Schedule checkMessages to run every 10 seconds
setInterval(checkMessages, 10 * 1000);

