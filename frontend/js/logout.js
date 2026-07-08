function checkAuth() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
        return false;
    }
    return true;
}

function logout(){

    localStorage.clear();

    window.location.href = "login.html";

}