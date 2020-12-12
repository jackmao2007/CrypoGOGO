const log = console.log

/*********** User API Calls for front-end */
export const checkSession = (app) => {
    const url = "users/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const deleteAccount = (username, dashboardComp) => {
        const url = `api/user/`;
        const request = new Request(url + username, {
            method: "delete",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
        });

        // Send the request with fetch()
        fetch(request)
        .then((res) => {
            //Handle response we get from the API.
            //Usually check the error codes to see what happened.
            if (res.status === 200) {
                //If student was added successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Success: Deleted an account.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not delete an account.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        })     
   }
export const getUserbyUsername = async (info, username) => {
        try {
        const url = `api/users/` + username;
        const resp = await fetch(url);
        const user = await resp.json()
        info.setState({
            user: user
        })
    } catch (error) {
        log(error)
    }
 }

 export const getUsers = (formComp) => {
      // the URL for the request
      const url = "api/users";

      // Since this is a GET request, simply call fetch on the URL
      fetch(url,{
            headers: {
                'Accept': 'application/json'
            }
      })
          .then(res => {
              if (res.status === 200) {
                  // return a promise that resolves with the JSON body
                  return res.json();
                  console.log(0)
              } else {
                  alert("Could not get users");
              }
          })
          .then(json=> {
              // the resolved promise with the JSON body
               formComp.setState({ userList: json.users });
          })
          .catch(error => {
              console.log(error);
          });
   };

 export const updatePassword = (formComp) => {
        const user = formComp.state
        const url = `api/users/` + user.username;
        const request = new Request(url, {
            method: "patch",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });    
        fetch(request)
            .then(function (res) {
            if (res.status === 200) {
                formComp.setState({
                    message: {
                        body: "Success: Update Password.",
                        type: "success"
                    }
                });
            } else {
                formComp.setState({
                    message: {
                        body: "Error: Could not update Password.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    }



export const getAccounts = (accountList) => {
      //  the URL for the request
      const url = "api/accounts";

      // Since this is a GET request, simply call fetch on the URL
      fetch(url,{
            headers: {
                'Accept': 'application/json'
            }
      })
          .then(res => {
              if (res.status === 200) {
                  // return a promise that resolves with the JSON body
                  return res.json();
              } else {
                  alert("Could not get accounts");
              }
          })
          .then(json => {
              // the resolved promise with the JSON body
              accountList.setState({ accountList: json.accounts });
          })

   };
