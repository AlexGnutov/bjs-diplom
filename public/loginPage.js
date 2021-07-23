'use strict';

let form = new UserForm();

form.loginFormCallback = function(data) {
    ApiConnector.login(data, loginServerResponse);
}

function loginServerResponse(reply) {
    //console.log(reply);
    if (reply.success === true) {
        location.reload();
    } else {
        form.setLoginErrorMessage(reply.error);
    }
}

form.registerFormCallback = function(data) {
    ApiConnector.register(data, registerServerResponse);
}

function registerServerResponse(reply) {
    //console.log(reply);
    if (reply.success === true) {
        location.reload();
    } else {
        form.setRegisterErrorMessage(reply.error);
    }
}