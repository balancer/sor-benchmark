import { parseAbi, parseAbiItem } from 'viem';
import { Chains } from "./config";
import { createViemClient } from './utils';

const event = parseAbiItem('event Swap(bytes32 indexed poolId, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut)');

export const getSwaps = async (chainId: Chains = 1, toBlock: bigint) => {
    const client = createViemClient(chainId, true);

    const allLogs: { blockNumber: bigint, args: { poolId?: `0x${string}`, tokenIn?: `0x${string}`, tokenOut?: `0x${string}`, amountIn?: bigint } }[] = []
    for (let i = 0; i < 10; i++) {
        const logs = await client.getLogs({
            address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
            event,
            fromBlock: toBlock - BigInt((i + 1) * 1000 - i),
            toBlock: toBlock - BigInt(i * 1000 - i),
        });
        allLogs.push(...logs);
    }

    const poolIds = allLogs.map(log => log.args.poolId).filter((poolId, i, arr) => arr.indexOf(poolId) === i);
    const poolSymbols = await client.multicall({
        contracts: poolIds.map(poolId => ({
            address: poolId!.substring(0, 42) as `0x${string}`,
            abi: parseAbi([
                'function symbol() view returns (string)',
            ]),
            functionName: 'symbol'
        })),
    });
    // Pool Symbols to map
    const poolSymbolMap = Object.fromEntries(poolIds.map((poolId, i) => [poolId, poolSymbols[i].result]));

    // Filter out LBPs
    const logs = allLogs.filter(log => {
        const symbol = poolSymbolMap[log.args.poolId!];
        return !symbol?.includes('_LBP') && !symbol?.includes('_TLA');
    });

    const swaps = logs.map(log => ({
        tokenIn: log.args.tokenIn!.toLowerCase(),
        tokenOut: log.args.tokenOut!.toLowerCase(),
        amount: String(log.args.amountIn!),
        chainId,
        blockNumber: Number(log.blockNumber),
    }));

    return swaps;
}
