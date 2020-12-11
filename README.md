# team45 CryptoGoGo

Third-Party Libraries: Material-UI, Bootstrap, Antd, React Quill, React, Chart.js, [moment.js](https://momentjs.com/), [Currents](https://currentsapi.services/en), [Coingecko](https://www.coingecko.com/en), [TradeView](https://www.tradingview.com/ideas/tradeview/)

## Start
First go to our deployed app link: [CryptGoGo](https://agile-shelf-49866.herokuapp.com/).
For general user functionality, you can login with username: user, password: user.
For admin functionality, you can login with username: admin, password: admin.
And you can signup with your own email, username and password. The username and password should have a minimal length of 4 and username should be unique. We have set alter for the conditions not satisfied.
Since we did not use flexible layout, please use under 16:9 ratio and 1080p. If you are using 2k , please scale to 125%.

## Community
You can create new post with the CREATE NEW POST button, which will be a Dialog. You can search for post by keyword with the input box under the new post button. Within the specific post, you can type in comment in the Reply input and submmit the comment by the button on its right. If you login as an admin, you can see buttons for delete post and delete comment. You can like a post by the red button. You can include a image in your post but we have a size limit as around 2mb and please do not upload images with too high reslution since we did not user flexible layout.

## Dashboard
The dashboard consists of 5 sections. A real time data of the popular cryptos; A news section showing trending news; A summary of the total of all accounts for the user. A recent activities panel; And an account section showing each account’s investment breakdowns. Users can click on the news to go to an external site.Users can select accounts in the account section, and the chart and breakdown will change to reflect the selected account. Users can also see each activity about the oders information.

## Trading
The trading page also consists of 5 sections. On the left there is a section showing all the currencies and a search bar. In the middle, there is a real time chart for the selected crypto. There is also a list of level 1 information for the crypto. In the middle there is a section for the users to make orders. On the right, there is a section showing the essential information and balances of the selected account. The user can search for crypto currencies on the left side and the searched crypto will update in the list. Clicking the list item will update the chart and level 1 information to the selected crypto asset. The user can change accounts on the top right, and the balances and order history will update accordingly. When making an order, the user can fill in the necessary information. Changing the order type will give the user more freedom to customize the order. Checking the bracket checkbox will create options to make bracket orders to further utilize the user’s strategies in trading.

Note: to reduce clutter and secure account information, selecting an account on this page will not update the information in Phase 1, instead it will do a server call and retrieve the latest correct info and update the components completely.

For back-end, if you make an order, it will not be accepted immediately. The server will traverse all orders every 5 seconds. You can refresh the page to check the status of the orders in the Orders section.

## Profile
For Profile part of the webpage, you can see your user information. If login as admin, you will see functionalities to manage user and manage post. As mentioned in the Community section, you can delete a post or a comment. For user management, you can delete a user or set a user as admin. In the home page(using Home sidebar), web users can see the account information and reset password. In the wallet page, (using My Wallet page), web users can see the wallet summary, currency summary and balance summary. You can also add a account for trading. 


Edited by Siyuan Chen, Gancheng Luo, Zizhuang Fan, Deng Juan
