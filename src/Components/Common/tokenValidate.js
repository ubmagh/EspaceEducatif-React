function validateToken(data) {
  if (
    data.error + "" === "userNotFound" ||
    data.error + "" === "token_expired" ||
    data.error + "" === "token_invalid" ||
    data.error + "" === "token_absent"
  ) {
    localStorage.clear();
    window.location =
      window.location.protocol + "//" + window.location.host + "/";
  }
}

export default validateToken;
