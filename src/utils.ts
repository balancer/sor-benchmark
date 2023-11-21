import { config } from "./config";
import { createPublicClient, formatUnits, http } from "viem";
import * as chains from "viem/chains";

export const createViemClient = (chainId: keyof typeof config, forLogs = false) => {
    const chain = Object.values(chains).find((chain) => chain.id === chainId);
    const client = createPublicClient({
        chain,
        transport: forLogs ? http(config[chainId].rpcLogs) : http(config[chainId].rpc)
    });
    return client;
}

export const fp = (num: bigint, decimals: number) =>
  Number(formatUnits(num, decimals));
