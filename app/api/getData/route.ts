import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const uniswapGraphQuery = `query {
        pools(orderBy: id) {
          token0 {
            symbol
          }
          token1 {
            symbol
          }
          txCount
          volumeUSD
          liquidity
          totalValueLockedUSD
        }
      }`;
    const { subgraphType } = (await req.json()) as { 
      subgraphType: string; 
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: uniswapGraphQuery,
      }),
    };
    const queryURL = `https://api.thegraph.com/subgraphs/name/${subgraphType}`;
    const response = await fetch(queryURL, options);
    const queryResult = await response.json();
    return NextResponse.json({resData: queryResult?.data?.pools});
  } catch (error) {
    console.log(error);
  }
}
