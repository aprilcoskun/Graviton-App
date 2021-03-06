/*
########################################
              MIT License

Copyright (c) 2019 Marc Espín Sanz

License > https://github.com/Graviton-Code-Editor/Graviton-App/blob/master/LICENSE.md

#########################################
*/

//Creating a notification, example:

/*

const my_noti = new Notification({
  title:"Test",
  content:"This is the content!",
  buttons:{
    "Click":{
      click:function(){
        console.log("Do something")
      }
    },
    "Close":{}
  },
  delay:3000
})

my_noti.close() //Close

*/

"use strict"

module.exports = {
  Notification: function (object) {
    if (_notifications.length >= 3) { //Remove one notification in case there are 3
      _notifications[0].remove();
      _notifications.splice(0, 1);
    }
    const body = document.createElement("div");
    body.classList.add("notificationBody");
    body.setAttribute("id", _notifications.length);
    body.innerHTML = `
      <button class=close onclick="closeNotification(this)">
          ${icons["close"]}
      </button>
      <h1>${object.title}</h1>
      <div>
          <p >${object.content}</p>
      </div>
      ${object.buttons!=undefined?"<span class=line_space_menus></span>":""}
      <div>
          
      </div> `;
    if (object.buttons != undefined) {
      const buttons = object.buttons
      Object.keys(buttons).map(function (key) {
        const id = Math.random();
        const button = document.createElement("button");
        button.innerText = key;
        sleeping(1).then(() => {
          button.addEventListener("click", buttons[key].click)
          button.setAttribute("onClick", "closeNotification(this.parentElement)")
        });
        body.children[4].appendChild(button)
      })
    }
    document.getElementById("notifications").appendChild(body);
    this.body = body;
    _notifications.push(body);
    const delay = object.delay == undefined ? 7000 : object.delay
    const wait = setTimeout(() => {
      for (i = 0; i < _notifications.length; i++) {
        if (_notifications[i] === body) {
          _notifications.splice(i, 1);
          body.remove();
        }
      }
    }, delay); //Wait 7 seconds until the notification automatically deletes it self
    this.close = function () {
      for (i = 0; i < _notifications.length; i++) {
        if (_notifications[i] === this.body) {
          _notifications.splice(i, 1);
          this.body.remove();
        }
      }
    }
  },
  closeNotification: function (element) {
    for (i = 0; i < _notifications.length; i++) {
      if (_notifications[i] === element.parentElement) {
        _notifications.splice(i, 1);
        element.parentElement.remove();
      }
    }
  }
};