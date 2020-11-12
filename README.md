# team45

### This is a late submission due to illness of one member, we've talked with professor for a short extension

Third-Party Libraries: Material-UI, Bootstrap, Antd, React Quill, React, Chart.js

## Start
### First cd into ./client
### `npm install` and then `npm start`, if there is any modules not resolved, `npm install` the corresponding modules to fix it.
### We set the the status to be logged in and be a administrator as defualt for test purpose. Our website requires users to login to view other contents.

## Login and Sign up
Enter localhost:3000/sign-in. In the Login page, you can use (username:user, password:user) as a user or (username:admin, password:admin) as an administrator to log in.
Since we set a flag(loginStatus) in App.js, its default value is true so that it is easier to test, then you will see dashboard directly(it will only be available after you logged in). In Phase 2, we will let it be functional after receiving server's response.
Also, we have a flag(isAdmin) to see if the user is an admin or not after they logged in. This fucntion will be explained later.\\
Enter localhost:3000/sign-up to visit Sign up page. In the Sign up page, it requires you enter a correct email address like xxx@xxx.com, otherwise you cannot sign up. The functionality of the sign up button has not been implemented yet, since it relates to server call to back-end. The new users' username and password will be stored in server. Once you want to login, it will fetch the data form server for authentication.

## Community
We made a community for users to share they ideas, feelings, suggestions, etc. Users can create new post, comment on others posts, like others post and search any posts by keywords, author and title. For creating new post and comments, we use the third-party react-quill, this allows users to edit rich content like upload pictures(will be refined in Phase2 for storing images in server). You can also like others posts just by clicking like button. Furthermore, after user enter the community page, the flag(isAdmin as mentioned before) will be passed together, so that it will display the fucntionality that only admins can do like delete a post. The Delete Button will be rendered if isAdmin is true.

## Dashboard
The dashboard consists of 5 sections. A real time data of the popular cryptos; A news section showing trending news; A summary of the total of all accounts for the user. A recent activities panel; And an account section showing each account’s investment breakdowns. Users can click on the news to go to an external site (try clicking the second news :)).Users can select accounts in the account section, and the chart and breakdown will change to reflect the selected account. Users can also click on each activity to go to the related link within the app (this will be implemented with hyperlinks in phase 2).

## Trading
The trading page also consists of 5 sections. On the left there is a section showing all the currencies and a search bar. In the middle, there is a real time chart for the selected crypto. There is also a list of level 1 information for the crypto. In the middle there is a section for the users to make orders. On the right, there is a section showing the essential information and balances of the selected account. The user can search for crypto currencies on the left side and the searched crypto will update in the list. Clicking the list item will update the chart and level 1 information to the selected crypto asset. The user can change accounts on the top right, and the balances and order history will update accordingly. When making an order, the user can fill in the necessary information. Changing the order type will give the user more freedom to customize the order. Checking the bracket checkbox will create options to make bracket orders to further utilize the user’s strategies in trading.

Note: to reduce clutter and secure account information, selecting an account on this page will not update the information in Phase 1, instead it will do a server call and retrieve the latest correct info and update the components completely.

## Profile
For Profile part of the webpage, we will show AdminProfile as a template. There are two major differences between the UserProfile and the AdminProfile. One is that the admins can use the user lists to delete accounts and set the status of users to be admins using Manage User sidebar. Another one is that admins can manage the posts in community, such as delete posts, highlight posts using Manage Posts sidebar. In the home page(using Home sidebar), web users can see the account information, log out and reset password. In the wallet page, (using My Wallet page), web users can see the wallet summary, bitcoins summary and balance summary. In wallet summary, Web users can deposit and draw money. In bitcoins summary, web users can select the summary from the exact date. In my post summary, web users can see their own posts, check likes, replies and manage collect.

Edited by Siyuan Chen, Gancheng Luo, Zizhuang Fan, Deng Juan
