import { SmartOrderRouter, Token, SubgraphPoolProvider } from "@balancer/sdk";
import { config } from "./config";
import { parseAbi } from "viem";

export const initV2 = async (chainId: keyof typeof config, blockNumber: bigint) => {
    const subgraph = new SubgraphPoolProvider(chainId, config[chainId].subgraph);
    const sor = new SmartOrderRouter({
        chainId,
        rpcUrl: config[chainId].rpc,
        poolDataProviders: [subgraph],
    });
    await sor.fetchAndCachePools(blockNumber);
    return sor;
}

const tokenDetails = {} as Record<string, ReturnType<typeof getERC20Info>>;

export const getERC20Info = async (client: any, address: string) => {
    if (tokenDetails[address]) {
        return tokenDetails[address];
    }

    const abi = parseAbi([
        'function decimals() view returns (uint)',
        'function symbol() view returns (string)',
    ])
    const erc20 = {
        address: address as `0x${string}`,
        abi,
    } as const
    const details = await client.multicall({
        contracts: [{
            ...erc20,
            functionName: 'decimals',
        }, {
            ...erc20,
            functionName: 'symbol',
        }],
    })
    return {
        decimals: details[0].result && Number(details[0].result) || 18,
        symbol: details[1].result,
    };
}

export const getV2Payload = async (fromToken: string, toToken: string, fromAmount: string, chainId: keyof typeof config, client: any) => {
    tokenDetails[fromToken] ||= await getERC20Info(client, fromToken)
    tokenDetails[toToken] ||= await getERC20Info(client, toToken)
    const inDetails = tokenDetails[fromToken];
    const outDetails = tokenDetails[toToken];
    const v2In = new Token(chainId, fromToken as `0x${string}`, inDetails.decimals, inDetails.symbol);
    const v2Out = new Token(chainId, toToken as `0x${string}`, outDetails.decimals, outDetails.symbol);
    return [v2In, v2Out, 0, fromAmount];
}
