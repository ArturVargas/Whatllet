import {
    Account,
    cairo,
    CallData,
    constants,
    ec,
    hash,
    json,
    Provider,
    SignerInterface,
    stark,
    Calldata,
    Uint256,
    Contract,
    uint256, Call
} from "starknet";
import * as fs from "fs";

const provider = new Provider({sequencer: {network: constants.NetworkName.SN_GOERLI}});
const privateKey = stark.randomAddress();
//const privateKey = '0x3529d8ef9bcd42fd3c4c2a9eeab6343903ec9abf444577d42570893332b5361'
let contactAddress = ""
const OZaccountClassHash = "";
console.log('New OZ account:\nprivateKey=', privateKey);
const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);
console.log('publicKey=', starkKeyPub);
// Calculate future address of the account
const OZaccountConstructorCallData = CallData.compile({ publicKey: starkKeyPub });
const addrETH = "";
async function createAccount() {
    // connect provide

// new Open Zeppelin account v0.5.1
// Generate public and private key pair.
    //const privateKey = stark.randomAddress();

    const OZcontractAddress = hash.calculateContractAddressFromHash(
        starkKeyPub,
        OZaccountClassHash,
        OZaccountConstructorCallData,
        0
    );
    console.log('Precalculated account address=', OZcontractAddress);
    contactAddress = OZcontractAddress
    return contactAddress
}

//createTransaction();

const deployWallet = async (OZcontractAddress: string) => {
    const OZaccount = new Account(provider, OZcontractAddress, privateKey);

    const { transaction_hash, contract_address } = await OZaccount.deployAccount({
        classHash: OZaccountClassHash,
        constructorCalldata: OZaccountConstructorCallData,
        addressSalt: starkKeyPub
    });

    await provider.waitForTransaction(transaction_hash);
    console.log('✅ New OpenZeppelin account created.\n   address =', contract_address);
}

const send = async () => {
    const account0 = new Account(provider, contactAddress, privateKey);
    console.log("Deployment Tx - ERC20 Contract to Starknet...");
    const compiledErc20mintable = json.parse(fs.readFileSync("compiled_contracts/ERC20MintableOZ051.json").toString("ascii"));
    const initialTk: Uint256 = cairo.uint256(100);
    const erc20CallData: CallData = new CallData(compiledErc20mintable.abi);
    const ERC20ConstructorCallData: Calldata = erc20CallData.compile("constructor", {
        name: "niceToken",
        symbol: "NIT",
        decimals: 18,
        initial_supply: initialTk,
        recipient: account0.address,
        owner: account0.address
    });

    console.log("constructor=", ERC20ConstructorCallData);
    const deployERC20Response = await account0.declareAndDeploy({
        contract: compiledErc20mintable,
        constructorCalldata: ERC20ConstructorCallData
    });
    console.log("ERC20 declared hash: ", deployERC20Response.declare.class_hash);
    console.log("ERC20 deployed at address: ", deployERC20Response.deploy.contract_address);

// Get the erc20 contract address
    const erc20Address = deployERC20Response.deploy.contract_address;
// Create a new erc20 contract object
    const erc20 = new Contract(compiledErc20mintable.abi, erc20Address, provider);
    erc20.connect(account0);

    // Check balance - should be 100
    console.log(`Calling Starknet for account balance...`);
    const balanceInitial = await erc20.balanceOf(account0.address);
    console.log("account0 has a balance of:", uint256.uint256ToBN(balanceInitial.balance).toString()); // Cairo 0 response

// Mint 1000 tokens to account address
    const amountToMint = cairo.uint256(1000);
    console.log("Invoke Tx - Minting 1000 tokens to account0...");
    const { transaction_hash: mintTxHash } = await erc20.mint(
        account0.address,
        amountToMint,
        { maxFee: 900_000_000_000_000 }
    );

// Wait for the invoke transaction to be accepted on Starknet
    console.log(`Waiting for Tx to be Accepted on Starknet - Minting...`);
    await provider.waitForTransaction(mintTxHash);

// Check balance - should be 1100
    console.log(`Calling Starknet for account balance...`);
    const balanceBeforeTransfer = await erc20.balanceOf(account0.address);
    console.log("account0 has a balance of:", uint256.uint256ToBN(balanceBeforeTransfer.balance).toString()); // Cairo 0 response

// Execute tx transfer of 10 tokens
    console.log(`Invoke Tx - Transfer 10 tokens back to erc20 contract...`);
    const toTransferTk: Uint256 = cairo.uint256(10);
    const transferCallData: Call = erc20.populate("transfer", {
        recipient: erc20Address,
        amount: toTransferTk // with Cairo 1 contract, 'toTransferTk' can be replaced by '10n'
    });
    const { transaction_hash: transferTxHash } = await erc20.transfer( transferCallData.calldata);

// Wait for the invoke transaction to be accepted on Starknet
    console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
    await provider.waitForTransaction(transferTxHash);

// Check balance after transfer - should be 1090
    console.log(`Calling Starknet for account balance...`);
    const balanceAfterTransfer = await erc20.balanceOf(account0.address);
    console.log("account0 has a balance of:", uint256.uint256ToBN(balanceAfterTransfer.balance).toString()); // Cairo 0 response
    console.log("✅ Script completed.");
}


const request = require("request");

let step = 0
let previousStep = 0
//TODO add last previous message timestamp
let previousTimeStamp = 1695502535


const handleStep = async (step : number) =>{
    console.log("iremos al step")
    if (step == 1) {
        SendMessage( "Hey my name is whatllet, I can create an account for you or I can user your own account. What do you wanna do?", "+525585491123")
    }
    if (step == 2) {
        //TODO crear wallet aqui
        const smartAccount = await createAccount();
        SendMessage("Hey there! this is your wallet address: " + smartAccount,"+525585491123")
    }
    if (step == 3) {
        SendMessage( "I will send a request to 525586169210, right?", "+525585491123")
    }
    if (step == 4) {
        SendMessage("Hey there! please help Tony activate the new wallet. Send some ETH to this address: " , "+525586169210")
        SendMessage(contactAddress , "+525586169210")
        setTimeout(() => {
            deployWallet(contactAddress)
            SendMessage("Your wallet is now activated, check it out here: https://goerli.voyager.online/contract/" + contactAddress, "+525585491123")
        }, 120000);
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
setInterval(checkMessages, 20 * 1000);

