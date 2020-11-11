# team45

Third-Party Libraries: Material-UI, Bootstrap, Antd, React Quill, React.js

## Start:
### First cd into ./client
### `npm install` and then `npm start`, if there is any modules not resolved, `npm install` the corresponding modules to fix it.

## Login:
In the Login page, you can use (username:user, password:user) as a user or (username:admin, password:admin) as an administrator to log in.
Since we set a flag(loginStatus) in App.js, its default value is true so that it is easier to test, then you will see dashboard directly(it will only be available after you logged in). In Phase 2, we will let it be functional after receiving server's response.
Also, we have a flag(isAdmin) to see if the user is an admin or not after they logged in. This fucntion will be explained later.
In the Sign up page, it requires you enter a correct email address like xxx@xx.com, otherwise you cannot sign up. The functionality of the sign up button has not been implemented yet, since it relates to server call to back-end. The new users' username and password will be stored in server. Once you want to login, it will fetch the data for authentication.

## Community:
We made a community for users to share they ideas, feelings, suggestions, etc. Users can create new post, comment on others posts, like others post and search any posts by keywords. For creating new post and comments, we use the third-party react-quill, this allows users to edit rich content like upload pictures(will be refined in Phase2 for storing images in server). You can also like others posts just by clicking like button.

## Dashboard
The dashboard consists of 5 sections. A real time data of the popular cryptos; A news section showing trending news; A summary of the total of all accounts for the user. A recent activities panel; And an account section showing each account’s investment breakdowns. Users can click on the news to go to an external site (try clicking the second news :)).Users can select accounts in the account section, and the chart and breakdown will change to reflect the selected account. Users can also click on each activity to go to the related link within the app (this will be implemented with hyperlinks in phase 2).

## Trading
The trading page also consists of 5 sections. On the left there is a section showing all the currencies and a search bar. In the middle, there is a real time chart for the selected crypto. There is also a list of level 1 information for the crypto. In the middle there is a section for the users to make orders. On the right, there is a section showing the essential information and balances of the selected account. The user can search for crypto currencies on the left side and the searched crypto will update in the list. Clicking the list item will update the chart and level 1 information to the selected crypto asset. The user can change accounts on the top right, and the balances and order history will update accordingly. When making an order, the user can fill in the necessary information. Changing the order type will give the user more freedom to customize the order. Checking the bracket checkbox will create options to make bracket orders to further utilize the user’s strategies in trading.

Note: to reduce clutter and secure account information, selecting an account on this page will not update the information in Phase 1, instead it will do a server call and retrieve the latest correct info and update the components completely.
