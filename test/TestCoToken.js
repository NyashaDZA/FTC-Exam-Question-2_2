const CoToken = artifacts.require("./CoToken.sol");


contract("CoToken", (accounts) => {
    const buyer = accounts[0]
    const tokenOwner = accounts[1]
    const randomAddress = accounts[2]

    const buyPrice = 5;

    let tokensToMint = 5;
    let tokensToBurn = 5;
    
    context("Mint Function", function () {
        it("CoToken can correctly mint tokens", async () => {
            let CoTokenInstance = await CoToken.deployed()
            let numberOfTokens = await CoTokenInstance.balanceOf(buyer)
  
            await CoTokenInstance.mint(tokensToMint, {
                from: buyer
            })
            let balanceOfTokens = await CoTokenInstance.balanceOf(buyer)

            assert.equal(balanceOfTokens.toNumber(), tokensToMint, "incorrect number of tokens")

        })

        it("CoToken contract can correctly burn tokens", async () => {
            let CoTokenInstance = await CoToken.deployed()
            let numberOfTokens = await CoTokenInstance.balanceOf(buyer)
  
            await CoTokenInstance.burn(tokensToBurn, {
                from: buyer
            })
            let newBalanceOfTokens = await CoTokenInstance.balanceOf(buyer)
            let remainingTokens = numberOfTokens - tokensToBurn
            console.log(newBalanceOfTokens.toNumber())

            assert.equal(newBalanceOfTokens.toNumber(), remainingTokens, "incorrect number of tokens burnt")
        })

        it("The contract correctly selfdestruct", async () => {
            let CoTokenInstance = await CoToken.deployed()
            let balanceofOwner = await CoTokenInstance.balanceOf(buyer)
            console.log(balanceofOwner.toNumber())
  
            await CoTokenInstance.destroy( {
                from: buyer
            })
            console.log(balanceofOwner.toNumber())

        })        



    })











})